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
}

export type Products = Array<Product>;

export type UserComment = {
    id: string,
    name: string;
    photo: Image;
    comment: string;
}

interface Rating {
    likes: number,
    dislikes: number
}

export type Artisan = {
    id: string;
    display_name: string;
    gender: "m" | "f";
    about: string;
    profile_photo: string;
    banner: string;
    user_id: string;
    artisan_collections?: { title?: string }[];
    products?: number;
}

export type Artisans = Array<Artisan>

export type User = {
    id: string;
    firstname: string;
    lastname: string;
    user_photo: string;
    username: string;
    email: string;
    password: string;
    access: "read-only" | "admin" | "full-control"
}

// type Users = Array<User>;
