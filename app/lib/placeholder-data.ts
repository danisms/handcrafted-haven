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
        source: "/placeholders/collection_images/drawing-2.jpg",
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
                    source: "/placeholders/product_images/drawing-3.jpg",
                    alt: "Drawing of the old wizard's house"
                },
                {
                    product_id: "edf00379-fa68-46e0-9cd5-ae5fa7a05293",
                    source: "/placeholders/product_images/framed-house-drawing.png",
                    alt: "Framed Drawing of the old wizard's house"
                },
                {
                    product_id: "edf00379-fa68-46e0-9cd5-ae5fa7a05293",
                    source: "/placeholders/product_images/handed-framed-house-drawing.png",
                    alt: "Framed Drawing of the old wizard's house, in a living room"
                },
                {
                    product_id: "edf00379-fa68-46e0-9cd5-ae5fa7a05293",
                    source: "/placeholders/product_images/handed-framed-house-drawing-more-distanced.png",
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
        source: "/placeholders/collection_images/painting-2.jpeg",
        alt: "An image of a woman painting",
    },
    about: `<b>Paintings</b><br>
            Colorful expressions that speak to the soul.<br>
            Explore original paintings created with mediums like watercolor, acrylic, oil, and mixed media — each stroke telling a unique story crafted by an artist’s hands.`,
    products: [
        {
            id: "ecf00579-fb68-43e0-9cd5-ac5fa7a03593",
            owner_id: "7b9b48d6-10ec-45dd-b36b-54710868d5d4",
            name: "Pure Landscaped Winter Painting",
            price: 30000,
            product_images: [
                {
                    product_id: "ecf00579-fb68-43e0-9cd5-ac5fa7a03593",
                    source: "/placeholders/product_images/painting.jpg",
                    alt: "Painting of a pure landscaped winter"
                },
                {
                    product_id: "ecf00579-fb68-43e0-9cd5-ac5fa7a03593",
                    source: "/placeholders/product_images/painting-framed.png",
                    alt: "Framed Painting of a pure landscaped winter"
                },
                {
                    product_id: "ecf00579-fb68-43e0-9cd5-ac5fa7a03593",
                    source: "/placeholders/product_images/painting-framed-in-living-room.png",
                    alt: "Framed Painting of a pure landscaped winter in a living room"
                }
            ],
            rating: {
                likes: 0,
                dislikes: 0,
            },
            comments: [],
            description: `<i>Whispers of the Alpine Valley</i> is a breathtaking digital landscape masterpiece that blends serene beauty with storybook charm. Rendered in a vibrant, semi-realistic style, this artwork captures the tranquil majesty of a snow-dusted mountain range overlooking a peaceful lake, framed by evergreen forests and meadows dotted with wild red blooms.
                            The towering peaks, cloaked in icy whites and deep shadows, command awe, while the mirrored reflection in the still waters below creates a soothing sense of symmetry and calm. Pine trees with bold, stylized forms rise from the rolling hillsides, drawing the viewer’s gaze into the lush depth of the valley. Splashes of sunlight and playful cloud formations add warmth and motion, suggesting a world untouched by time—inviting viewers to breathe, wander, and imagine.
                            Whether displayed above a mantle, in a creative workspace, or as the centerpiece of a living room, <i>Whispers of the Alpine Valley</i> offers a daily escape into nature’s quiet grandeur. It’s a celebration of the wilderness—vivid, pure, and alive.
                            <br><br>
                            <b>Perfect for:</b> Nature lovers, digital art collectors, mountain adventurers, interior designers seeking a bold yet calming piece, and anyone drawn to tranquil landscapes with a magical twist.`,
            collection_id: "0216fc0f-7ecc-4230-b986-4f176a509b26"
        },
    ]
}

const sculpureCollection: CollectionItem = {
    id: "c0e8aaf5-75ee-49b8-a2be-409bdd8f66d1",
    title: "Sculpure & Carving",
    image: {
        source: "/placeholders/collection_images/molding-2.jpg",
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
        source: "/placeholders/collection_images/textile.jpg",
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
        source: "/placeholders/collection_images/jewelry-2.jpg",
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
        source: "/placeholders/collection_images/home-decor-2.jpg",
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
        source: "/placeholders/collection_images/paper-2.jpg",
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
        source: "/placeholders/collection_images/others-2.jpg",
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
                    source: "/placeholders/product_images/others-2.jpg",
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
        source: "/design/placeholders/hero-1.jpg",
        alt: "Image of hands molding with clay",
        description: "",
        link: {
            url: "",
            ancor_text: "browse collection"
        }
    },
    {
        title: "",
        source: "/design/placeholders/hero-2.jpg",
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
        about: `Welcome to the world of <b>Artistic Giant</b> — where imagination takes form, color finds purpose, and raw creativity is sculpted into timeless expressions. Artistic Giant is more than just an artisan name; it's a bold declaration of mastery in the visual arts, rooted in passion, precision, and storytelling.<br><br>
                With hands that sketch the unseen, paint with emotion, and mold life into stillness, Artistic Giant brings a powerful blend of <b>drawing</b>, <b>painting</b>, and <b>sculpture</b> to life. Each piece—whether on canvas, paper, or carved from clay—tells a story that speaks to the soul, inviting viewers into realms of thought, wonder, and beauty.<br><br>
                From detailed ink illustrations to vibrant acrylic paintings and expressive sculptural forms, Artistic Giant’s work bridges the traditional and the imaginative. Every creation is an exploration of mood, movement, and meaning—crafted to inspire, provoke, and endure.<br><br>
                Whether you're an art lover, collector, or creative collaborator, Artistic Giant welcomes you into a space where art is not just made—but felt.<br><br>
                <b>Art that stands tall. Vision that leaves a mark. Welcome to Artistic Giant.</b>`,
        profile_photo: "",
        banner: "",
        gender: 'm',
        user_id: "2f5b0c63-f734-485a-8ef5-6a2c69470066"
    },
    {
        id: "fa024314-9b48-4be0-a9e3-8d8a2e41e9cb",
        display_name: "Mystic Thread",
        about: `Welcome to the realm of <b>Mystic Thread</b> — where fiber meets fantasy, and every stitch whispers a story. Mystic Thread is more than a name; it's a tapestry of tradition and innovation woven with care, culture, and creativity.<br><br>
                Through the rhythmic art of <b>textile weaving</b>, <b>embroidery</b>, and <b>fabric dyeing</b>, Mystic Thread breathes life into threads, turning raw materials into wearable art and decorative heirlooms. Whether it’s the meditative patterns of hand-woven cloth or the delicate intricacy of hand-stitched designs, each creation carries the energy of ancestral skill fused with modern soul.<br><br>
                From flowing garments rich in meaning to vibrant wall hangings that sing with symbolism, Mystic Thread's work draws on heritage, mythology, and personal narrative. Every piece invites touch, reflection, and connection—stitched not just for the eye, but for the heart.<br><br>
                Whether you're drawn to fashion, folklore, or fine craft, Mystic Thread welcomes you to a world where stories are sewn and beauty is bound by thread.<br><br>
                <b>Woven with purpose. Embellished with spirit. This is Mystic Thread.</b>`,
        profile_photo: "",
        banner: "",
        gender: 'f',
        user_id: "4e16c70b-ea18-43f3-9e89-6a6f9af30c39"
    },
    {
        id: "b68a5e7a-1291-4f1f-9fc3-3ed7e7c8fbd2",
        display_name: "Echo Forge",
        about: `Step into the vivid world of <b>Echo Forge</b> — where color carries memory, brushstrokes echo emotion, and canvas becomes a battleground of light and shadow. Echo Forge is more than a name; it’s a declaration of passion, resilience, and visual storytelling through the timeless craft of painting.<br><br>
                Specializing in <b>oil</b>, <b>acrylic</b>, and <b>mixed media</b>, Echo Forge channels raw emotion into layered textures and bold compositions. Each painting strikes a balance between chaos and control—infused with movement, energy, and meaning. Whether abstract or representational, every piece is born from a place of reflection and fire.<br><br>
                Inspired by urban grit, human expression, and elemental forces, Echo Forge’s work often features dynamic contrasts, metallic pigments, and intentional imperfections that draw viewers in. Each canvas becomes a mirror for the soul—capturing echoes of moments, thoughts, and truths.<br><br>
                Whether you're a collector, gallery curator, or creative spirit, Echo Forge welcomes you to a studio where art is forged not in flames, but in feeling.<br><br>
                <b>Bold color. Deep thought. Painted echoes that endure. Welcome to Echo Forge.</b>`,
        profile_photo: "/artisans/generated-artisan-image.png",
        banner: "",
        gender: 'm',
        user_id: "4e16c70b-ea18-43f3-9e89-6a6f9af30c39"
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


/***********************
*** PLACEHOLDER DATA ***
***********************/
export const placeholders = {
    male_profile_picture: "/placeholders/male-profile-placeholder-image.png",
    female_profile_picture: "/placeholders/female-profile-placeholder-image.png",
    unisex_profile_picture: "/placeholders/default-avatar-profile-icon.png",
}
