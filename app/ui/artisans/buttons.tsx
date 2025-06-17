'use client';

import { deleteArtisan } from "@/app/lib/action";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useRef } from 'react';
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