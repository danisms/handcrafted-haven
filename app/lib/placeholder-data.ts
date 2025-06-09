// This file contains placeholder data that we'll be replacing with real data

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

type ProductImage = {
    product_id: string;
    title?: string,
    source: string,
    alt: string,
    link?: ButtonLink,
}

interface ButtonLink {
    url: string | LinkProps,
    ancor_text: string,
}

type HeroImage = Array<Image>

interface CollectionItem {
    id: string,
    title: string,
    about: string,
    image: Image,
    products?: Array<Product>,
}

type Product = {
    id: string;
    owner_id: string;
    name: string;
    price: number;
    product_images: Array<ProductImage>;
    rating: Rating;
    comments: Array<UserComment>;
    description: string;
    collection_id: string;
}

type UserComment = {
    id: string,
    name: string;
    photo: Image;
    comment: string;
}

interface Rating {
    likes: number,
    dislikes: number
}

type Artisan = {
    id: string;
    display_name: string;
    gender: "m" | "f";
    about: string;
    profile_photo: string;
    banner: string;
    user_id: string;
}

type Artisans = Array<Artisan>

type User = {
    id: string;
    firstname: string;
    lastname: string;
    user_photo: string;
    username: string;
    email: string;
    password: string;
    access: "read-only" | "admin" | "full-control"
}

type Users = Array<User>;


/******************************************
*** create collections placeholder data *** 
******************************************/
const drawingCollection: CollectionItem = {
    id: "4f8c4611-f42c-4a5d-81a0-fe2e6bb972a0",
    title: "Drawing & Sketch",
    image: {
        source: "placeholders/collection_images/drawing-2.jpg",
        alt: "Image of a drawn face illusion",
    },
    about: `<b>Drawings & Sketches</b><br>
            From pencil to ink, discover the raw essence of creativity.<br>
            This collection showcases hand-drawn works, including sketches, doodles, line art, and detailed illustrations that bring imagination to life on paper.`,
    products: [
        {
            id: "edf00379-fa68-46e0-9cd5-ae5fa7a05293",
            owner_id: "7b9b48d6-10ec-45dd-b36b-54710868d5d4",
            name: "The Old Wizard House",
            price: 10000,
            product_images: [
                {
                    product_id: "edf00379-fa68-46e0-9cd5-ae5fa7a05293",
                    source: "placeholders/product_images/drawing-3.jpg",
                    alt: "Drawing of the old wizard's house"
                },
                {
                    product_id: "edf00379-fa68-46e0-9cd5-ae5fa7a05293",
                    source: "placeholders/product_images/framed-house-drawing.png",
                    alt: "Framed Drawing of the old wizard's house"
                },
                {
                    product_id: "edf00379-fa68-46e0-9cd5-ae5fa7a05293",
                    source: "placeholders/product_images/handed-framed-house-drawing.png",
                    alt: "Framed Drawing of the old wizard's house, in a living room"
                },
                {
                    product_id: "edf00379-fa68-46e0-9cd5-ae5fa7a05293",
                    source: "placeholders/product_images/handed-framed-house-drawing-more-distanced.png",
                    alt: "Framed Drawing of the old wizard's house, in a living room from distance"
                }
            ],
            rating: {
                likes: 0,
                dislikes: 0,
            },
            comments: [],
            description: `<i>The Old Wizard House</i> is a hauntingly beautiful hand-drawn ink piece that transports viewers into a forgotten realm of magic and mystery. With every line etched in rich, deliberate detail, this artwork captures the eerie charm of an abandoned wizard's dwelling—weathered by time, yet alive with whispered secrets.<br><br>
                            The crooked structure stands solemnly under a pale sky, its arched doors and steep gables guarded by barren trees and a colony of bats in flight. A raven perches ominously on a twisted branch, as though awaiting the return of the wizard who once practiced ancient rituals within these walls. From the cracked steps to the sagging roof and skeletal picket fence, every stroke tells a story of enchantment, solitude, and lingering power.<br><br>
                            This artwork is a must-have for collectors of gothic, fantasy, or Halloween-themed pieces. Its fine craftsmanship and evocative narrative invite curiosity, contemplation, and admiration. Whether displayed in a cozy study, gallery wall, or curated collection, <i>The Old Wizard House</i> is more than a drawing—it’s a portal to another world.<br><br>
                            <b>Perfect for:</b> Fantasy lovers, gothic art collectors, interior decorators, magic enthusiasts, and those drawn to the mystical and mysterious.`,
            collection_id: "4f8c4611-f42c-4a5d-81a0-fe2e6bb972a0"
        },
    ]
}

const paintingCollection: CollectionItem = {
    id: "0216fc0f-7ecc-4230-b986-4f176a509b26",
    title: "Painting",
    image: {
        source: "placeholders/collection_images/painting-2.jpeg",
        alt: "An image of a woman painting",
    },
    about: `<b>Paintings</b><br>
            Colorful expressions that speak to the soul.<br>
            Explore original paintings created with mediums like watercolor, acrylic, oil, and mixed media — each stroke telling a unique story crafted by an artist’s hands.`,
}

const sculpureCollection: CollectionItem = {
    id: "c0e8aaf5-75ee-49b8-a2be-409bdd8f66d1",
    title: "Sculpure & Carving",
    image: {
        source: "placeholders/collection_images/molding-2.jpg",
        alt: "An image of a molding clay pot",
    },
    about: `<b>Sculptures & Carvings</b><br>
            Crafted forms that shape emotion and meaning.<br>
            This collection includes 3D creations made from wood, clay, stone, or metal — hand-carved and sculpted to perfection, blending texture, form, and vision.`,
}

const fiberArtCollection: CollectionItem = {
    id: "58256eca-03c6-4f9b-9eb0-550f1a0cda97",
    title: "Textile & Fiber Art",
    image: {
        source: "placeholders/collection_images/textile.jpg",
        alt: "Textile making in progress",
    },
    about: `<b>Textiles & Fabric Crafts</b><br>
            Soft, intricate, and woven with care.<br>
            Celebrate the art of fiber through handmade embroidery, sewing, knitting, crocheting, quilting, and macramé — where each thread is a labor of love.`,
}

const jewelriesCollection: CollectionItem = {
    id: "70d86b07-91ba-47b1-bf3f-6aee05db845a",
    title: "Jewelry & Accessories",
    image: {
        source: "placeholders/collection_images/jewelry-2.jpg",
        alt: "A photo of many hand made jewelries",
    },
    about: `<b>Jewelry & Accessories</b><br>
            Wearable artistry, handcrafted with heart.<br>
            Featuring unique earrings, necklaces, bracelets, bags, and more — this collection highlights artisan-crafted pieces that blend fashion with craftsmanship.`,
}

const homeDecorCollection: CollectionItem = {
    id: "091e7deb-d50f-499e-bd23-3bfe7eb118c3",
    title: "Home & Decor",
    image: {
        source: "placeholders/collection_images/home-decor-2.jpg",
        alt: "Interior home decor made with hands",
    },
    about: `<b>Home Decor</b><br>
            Warmth, charm, and personality for every space.<br>
            Find handmade items that transform spaces into sanctuaries — including wall hangings, pottery, candles, planters, furniture, and other decorative accents.`,
}

const paperCraftCollection: CollectionItem = {
    id: "1c7f518e-65bd-4dc2-bf98-826bd3ada99b",
    title: "Paper Craft",
    image: {
        source: "placeholders/collection_images/paper-2.jpg",
        alt: "Craft made from paper",
    },
    about: `<b>Paper Crafts</b><br>
            Delicate details on every fold and flourish.<br>
            A celebration of creativity on paper — this collection includes handcrafted greeting cards, journals, origami, scrapbooks, calligraphy, and more.`,
}

const othersCollection: CollectionItem = {
    id: "c5989af1-ebf7-4546-9ce4-03d55198b9ea",
    title: "Creative Finds",
    image: {
        source: "placeholders/collection_images/others-2.jpg",
        alt: "Image of hand crafted baskets",
    },
    about: `<b>Creative Finds</b><br>
            Where imagination knows no boundaries.<br>
            Discover a curated collection of extraordinary handcrafted pieces that don’t fit into a single category — from experimental designs to unexpected treasures that showcase true artistic freedom.`,
    products: [
        {
            id: "1672723a-6ea8-457f-8082-8ccc99dc2d70",
            owner_id: "7b9b48d6-10ec-45dd-b36b-54710868d5d4",
            name: "Colorful Baskets",
            price: 20000,  // in cent/kobo
            product_images: [
                {
                    product_id: "1672723a-6ea8-457f-8082-8ccc99dc2d70",
                    source: "placeholders/product_images/others-2.jpg",
                    alt: "Image of hand made baskets"
                }
            ],
            rating: {
                likes: 0,
                dislikes: 0,
            },
            comments: [],
            description: "What a colorful basket made from palm tree leaves. The basket can hold a heavy load of 60kg for as long as 8 hours with the basket suspended on the air with the hand attached to handle.",
            collection_id: "c5989af1-ebf7-4546-9ce4-03d55198b9ea"
        },
    ]
}


/************************
****** EXPORT DATA ******
************************/
// creating hero placeholder content data
export const heroImages: HeroImage = [
    {
        title: "enjoy the awesome feel of hand made crafts",
        source: "design/placeholders/hero-1.jpg",
        alt: "Image of hands molding with clay",
        description: "",
        link: {
            url: "",
            ancor_text: "browse collection"
        }
    },
    {
        title: "",
        source: "design/placeholders/hero-2.jpg",
        alt: "Interior home decor made with hands",
        description: "Here is life at it's fullest! Transform your home into a heaven on earth, this is posible with awesome crafts.",
        link: {
            url: "",
            ancor_text: "view crafts"
        }
    }
]

// getting & exporting collection data
export const collections = {
    drawing: drawingCollection,
    painting: paintingCollection,
    sculpure: sculpureCollection,
    fiber_art: fiberArtCollection,
    jewelries: jewelriesCollection,
    home_decor: homeDecorCollection,
    paper_craft: paperCraftCollection,
    others: othersCollection
}

// creating artisans
export const artisans: Artisans = [
    {
        id: "7b9b48d6-10ec-45dd-b36b-54710868d5d4",
        display_name: "artistic giant",
        about: `<b>About Artistic Giant</b><br><br>
                    Welcome to the world of <b>Artistic Giant</b> — where imagination takes form, color finds purpose, and raw creativity is sculpted into timeless expressions. Artistic Giant is more than just an artisan name; it's a bold declaration of mastery in the visual arts, rooted in passion, precision, and storytelling.<br><br>
                    With hands that sketch the unseen, paint with emotion, and mold life into stillness, Artistic Giant brings a powerful blend of <b>drawing</b>, <b>painting</b>, and <b>sculpture</b> to life. Each piece—whether on canvas, paper, or carved from clay—tells a story that speaks to the soul, inviting viewers into realms of thought, wonder, and beauty.<br><br>
                    From detailed ink illustrations to vibrant acrylic paintings and expressive sculptural forms, Artistic Giant’s work bridges the traditional and the imaginative. Every creation is an exploration of mood, movement, and meaning—crafted to inspire, provoke, and endure.<br><br>
                    Whether you're an art lover, collector, or creative collaborator, Artistic Giant welcomes you into a space where art is not just made—but felt.<br><br>
                    <b>Art that stands tall. Vision that leaves a mark. Welcome to Artistic Giant.</b>`,
        profile_photo: "",
        banner: "",
        gender: 'm',
        user_id: "2f5b0c63-f734-485a-8ef5-6a2c69470066"
    },
]

// creating user accounts
export const users: Users = [
    {
        id: "4653284b-a127-492f-819f-43b52b72b6d6",
        username: "admin",
        firstname: "full",
        lastname: "control",
        user_photo: "",
        email: "danielcopute@gmail.com",
        password: "admin",
        access: "full-control"
    },
    {
        id: "4e16c70b-ea18-43f3-9e89-6a6f9af30c39",
        username: "art-admin",
        firstname: "art",
        lastname: "admin",
        user_photo: "",
        email: "",
        password: "admin",
        access: "admin"
    },
    {
        id: "2f5b0c63-f734-485a-8ef5-6a2c69470066",
        username: "art-user",
        firstname: "art",
        lastname: "user",
        user_photo: "",
        email: "",
        password: "admin",
        access: "read-only"
    }
]
