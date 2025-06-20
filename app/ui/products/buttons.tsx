'use client';

import { deleteArtisanProduct, deleteArtisanBanner, deleteArtisanPhoto, updateRating } from "@/app/lib/action";
import { Product } from "@/app/lib/definitions";
import { formatNumber, splitAndGetLast } from "@/app/lib/utils";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";

export function UpdateArtisanProduct({ artisan_id, product_id }: { artisan_id: string, product_id: string }) {
    return (
        <Link
            href={`/profile/${artisan_id}/${product_id}/edit`}
            className="cardTag cardBtn">
            Edit <PencilIcon className="w-5 inline-block" />
        </Link>
    );
}

export function DeleteArtisanProduct({ artisan_id, product_id }: { artisan_id: string, product_id: string }) {
    const deleteBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = deleteBtnRef.current;
        if (!button) return;

        const handleClick = async () => {
            const confirmDelete = confirm("All files and transactions associated with this product will be lost, do you want to proceed?");
            if (confirmDelete) {
                const report = await deleteArtisanProduct(artisan_id, product_id);
                // display report
                if (report.sucess) {
                    toast.success(report.message);
                } else {
                    toast.error(`${report.message}\n${report.error}`);
                }
            }
        };

        button.addEventListener('click', handleClick);

        // clearnup: remove listener on unmount
        return () => {
            button.removeEventListener('click', handleClick);
        }
    });

    return (
        <button ref={deleteBtnRef} type="button" className="cardTag cardBtn">
            Delete <TrashIcon className="w-5 inline-block" />
        </button>
    );
}


export function DeleteArtisanPhoto({ id, photo_url }: { id: string, photo_url: string }) {
    const deleteBtnRef = useRef<HTMLButtonElement>(null);
    const [isDeleted, setIsDeleted] = useState(false); // State to track deletion

    useEffect(() => {
        const button = deleteBtnRef.current;
        if (!button || isDeleted) return; // Skip if button doesn't exist or already deleted

        const handleClick = async () => {
            const confirmDelete = confirm("Delete Profile Photo?");
            if (confirmDelete) {
                const report = await deleteArtisanPhoto(id, photo_url);
                // display report
                if (report.sucess) {
                    toast.success(report.message);
                    setIsDeleted(true); // Update state to trigger removal
                } else {
                    toast.error(`${report.message}\n${report.error}`);
                }
            }
        };

        button.addEventListener('click', handleClick);

        // cleanup: remove listener on unmount
        return () => {
            button.removeEventListener('click', handleClick);
        }
    }, [isDeleted]); // Add isDeleted to dependencies

    if (isDeleted) {
        return null; // Don't render anything if deleted
    }

    return (
        <button ref={deleteBtnRef} type="button" className="text-sm text-green-500 mt-1">
            <TrashIcon className="w-5 inline-block" />{splitAndGetLast(photo_url, '/')}
        </button>
    );
}

export function DeleteArtisanBanner({ id, photo_url }: { id: string, photo_url: string }) {
    const deleteBtnRef = useRef<HTMLButtonElement>(null);
    const [isDeleted, setIsDeleted] = useState(false); // New state to track deletion

    useEffect(() => {
        const button = deleteBtnRef.current;
        if (!button || isDeleted) return; // Skip if already deleted

        const handleClick = async () => {
            const confirmDelete = confirm("Delete Profile Banner?");
            if (confirmDelete) {
                const report = await deleteArtisanBanner(id, photo_url);
                // display report
                if (report.sucess) {
                    toast.success(report.message);
                    setIsDeleted(true); // Update state to hide button
                } else {
                    toast.error(`${report.message}\n${report.error}`);
                }
            }
        };

        button.addEventListener('click', handleClick);

        // cleanup: remove listener on unmount
        return () => {
            button.removeEventListener('click', handleClick);
        }
    }, [isDeleted]); // Add isDeleted to dependency array

    if (isDeleted) {
        return null; // Return nothing if deleted
    }

    return (
        <button ref={deleteBtnRef} type="button" className="text-sm text-green-500 mt-1">
            <TrashIcon className="w-5 inline-block" />{splitAndGetLast(photo_url, '/')}
        </button>
    );
}


export function LikeDislikeProductButtons({ product_data }: { product_data: Product }) {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [likeCount, setLikeCount] = useState(product_data.rating.likes);
    const [dislikeCount, setDislikeCount] = useState(product_data.rating.dislikes);

    const { data: session, status } = useSession();
    let product_id = product_data.id;

    // set initial rating state
    useEffect(() => {
        if (product_data.my_rating) {
            const myRating = product_data.my_rating;

            if (myRating === 'like') {
                setLiked(true);
                setDisliked(false);
                setLikeCount(prev => prev - 1); // Adjust count if needed
            } else if (myRating === 'dislike') {
                setLiked(false);
                setDisliked(true);
                setDislikeCount(prev => prev - 1); // Adjust count if needed
            } else {
                setLiked(false);
                setDisliked(false);
            }
        }
    }, [product_data.my_rating]);

    let current_rating = null;
    const like_state = "like";
    const dislike_state = "dislike";

    const handleLike = () => {
        if (session?.user) {
            if (liked) {
                setLiked(false);
                setLikeCount(prev => prev - 1);
                current_rating = null;
            } else {
                setLiked(true);
                setLikeCount(prev => disliked ? prev + 2 : prev + 1);
                setDisliked(false);
                setDislikeCount(prev => disliked ? prev - 1 : prev);
                current_rating = like_state;
            }

            updateRating(product_id, current_rating);
        } else {
            toast.warning("You are not signed in, sign in to rate this product");
        }
    };

    const handleDislike = () => {
        if (session?.user) {
            if (disliked) {
                setDisliked(false);
                setDislikeCount(prev => prev - 1);
                current_rating = null;
            } else {
                setDisliked(true);
                setDislikeCount(prev => liked ? prev + 2 : prev + 1);
                setLiked(false);
                setLikeCount(prev => liked ? prev - 1 : prev);
                current_rating = dislike_state;
            }

            updateRating(product_id, current_rating);
        } else {
            toast.warning("You are not signed in, sign in to rate this product");
        }
    };

    return (
        <>
            <button
                onClick={handleLike}
                className={`flex items-center gap-1 rating-btn ${liked ? '!bg-blue-300 !text-black' : ''} hover:!bg-blue-100`}
            >
                <ThumbsUp color="green" /> {formatNumber(likeCount)}
            </button>

            <button
                onClick={handleDislike}
                className={`flex items-center gap-1 rating-btn ${disliked ? '!bg-red-300 !text-black' : ''} hover:!bg-red-100`}
            >
                <ThumbsDown color="red" /> {formatNumber(dislikeCount)}
            </button>
        </>
    );
}
