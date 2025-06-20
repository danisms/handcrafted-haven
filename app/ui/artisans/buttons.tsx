'use client';

import { deleteArtisan, deleteArtisanBanner, deleteArtisanPhoto } from "@/app/lib/action";
import { splitAndGetLast } from "@/app/lib/utils";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";

export function UpdateArtisanProfile({ id }: { id: string }) {
    return (
        <Link
            href={`/profile/${id}/edit`}
            className="cardTag cardBtn">
            Edit <PencilIcon className="w-5 inline-block" />
        </Link>
    );
}

export function DeleteArtisanProfile({ id }: { id: string }) {
    const deleteBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = deleteBtnRef.current;
        if (!button) return;

        const handleClick = async () => {
            const confirmDelete = confirm("All files and transactions associated with this profile will be lost, do you want to proceed?");
            if (confirmDelete) {
                const report = await deleteArtisan(id);
                // display report
                if (report.sucess) {
                    toast.success(report.message);
                    document.removeChild(button);
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
    }, [isDeleted, id, photo_url]); // Add isDeleted to dependencies

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
    }, [isDeleted, id, photo_url]); // Add isDeleted to dependency array

    if (isDeleted) {
        return null; // Return nothing if deleted
    }

    return (
        <button ref={deleteBtnRef} type="button" className="text-sm text-green-500 mt-1">
            <TrashIcon className="w-5 inline-block" />{splitAndGetLast(photo_url, '/')}
        </button>
    );
}