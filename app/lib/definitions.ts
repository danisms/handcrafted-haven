// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// NOTE: types are generated automatically if you're using an ORM such as Prisma.

import { LinkProps } from "next/link";


/****************************
*** CREATE TYPE STRUCTURE *** 
****************************/
interface Image {
    title?: string,
    source: string,
    alt: string,
    link?: ButtonLink,
    description?: string
}

export type ProductImage = {
    product_id?: string;
    title?: string,
    source?: string,
    alt?: string,
    link?: ButtonLink,
}

export interface ButtonLink {
    url: string | LinkProps,
    ancor_text: string,
}

export type HeroContent = Array<Image>

interface CollectionItem {
    id: string;
    title: string;
    about: string;
    image: Image;
    products: number;
}
export type Collections = Array<CollectionItem>;

export type Product = {
    id: string;
    owner_id: string;
    name: string;
    price: number;
    product_images?: Array<ProductImage>;
    rating?: Rating;
    likes?: number;
    dislikes?: number;
    comments?: Array<UserComment>;
    description: string;
    collection_id: string;
    owner?: Artisan;
}

export type Products = Array<Product>;

export type ProductFormState = {
    success: boolean;
    error?: string;
    fieldErrors?: Record<string, string>;
    message?: string;
    warning?: string;
    product?: Product;
};

export type UserComment = {
    id: string;
    parent_id: string;
    name: string;
    photo: Image;
    comments: comment[];
    product_id?: string;
}

interface comment {
    comment: string,
    timestamp: string
}

export type Rating = {
    likes: number,
    dislikes: number
}

export type Artisan = {
    id?: string;
    display_name?: string;
    gender?: "m" | "f";
    about?: string;
    profile_photo?: string;
    banner?: string;
    user_id?: string;
    artisan_collections?: { title?: string }[];
    products?: number;
}

export type ArtisanFormState = {
    success: boolean;
    error?: string;
    fieldErrors?: Record<string, string>;
    message?: string;
    warning?: string;
    artisan?: Artisan;
};

export type Artisans = Array<Artisan>

export type User = {
    id?: string;
    firstname: string;
    lastname: string;
    user_photo?: string;
    username: string;
    email: string;
    password?: string;
    access?: "read-only" | "admin" | "full-control"
}

export type ArtisanProfile = {
    artisan: Artisan;
    products?: Products;
}


// type Users = Array<User>;

// FILE MIME TYPES
export const fileMimeTypes = {
    // general file formats
    imageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
    videoTypes: ['video/mp4', 'video/mpeg', 'video/3gpp', 'video/webm'],
    audioTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/midi', 'audio/3gpp'],
    docTypes: ['application/pdf', 'application/msword'],
}

// FILE SIZES
export const fileSizes = {
    // allowed file sizes
    image: {
        large_image_max_size: 5000000, // 5mb
        medium_image_max_size: 3000000,  // 3mb
        small_image_max_size: 1000000,  // 1mb
    },
    video: {
        large_video_max_size: 25000000,  // 25mb
        medium_video_max_size: 15000000,   // 15mb
        small_video_max_size: 10000000,  // 10mb
    },
    audio: {
        large_audio_max_size: 25000000,  // 25mb
        medium_audio_max_size: 15000000,   // 15mb
        small_audio_max_size: 10000000,  // 10mb
    },
    document: {
        large_document_file_max_size: 10000000,  // 10mb
        medium_document_file_max_size: 5000000,  // 5mb
        small_document_file_max_size: 1000000,  // 1mb
    }
}