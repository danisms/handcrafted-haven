// This file contains placeholder data that we'll be replacing with real data

/****************************
*** CREATE TYPE STRUCTURE *** 
****************************/
type Image = {
    source: string,
    alt: string,
}

type HeroImage = Array<Image>

interface CollectionItem {
    id: string,
    title: string,
    about: string,
    image: Image,
    products: Array<Product>,
}

interface Product {
    id: string,
    owner_id: string,
    name: string,
    price: number,
    product_images: Array<Image>,
    rating: Rating,
    comments: Array<UserComment>,
    description: string,
}

type UserComment = {
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
    username: string;
    email: string;
    password: string;
}

type Users = Array<User>;


/******************************************
*** create collections placeholder data *** 
******************************************/
const drawingCollection: CollectionItem = {
    id: "1",
    title: "Drawing & Sketch",
    image: {
        source: "design/placeholders/drawing-2.jpg",
        alt: "Image of a drawn face illusion",
    },
    about: `<b>Drawings & Sketches</b><br>
            From pencil to ink, discover the raw essence of creativity.<br>
            This collection showcases hand-drawn works, including sketches, doodles, line art, and detailed illustrations that bring imagination to life on paper.`,
    products: [
        {
            id: "1",
            owner_id: "1",
            name: "The Old Wizard House",
            price: 10000,
            product_images: [
                {
                    source: "design/placeholders/drawing-3.jpg",
                    alt: "Drawing of the old wizard's house"
                },
                {
                    source: "design/placeholders/framed-house-drawing.png",
                    alt: "Framed Drawing of the old wizard's house"
                },
                {
                    source: "design/placeholders/handed-framed-house-drawing.png",
                    alt: "Framed Drawing of the old wizard's house, in a living room"
                },
                {
                    source: "design/placeholders/handed-framed-house-drawing-more-distanced.png",
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
                            <b>Perfect for:</b> Fantasy lovers, gothic art collectors, interior decorators, magic enthusiasts, and those drawn to the mystical and mysterious.`
        },
    ]
}

const paintingCollection: CollectionItem = {
    id: "2",
    title: "Painting",
    image: {
        source: "design/placeholders/painting-2.jpeg",
        alt: "An image of a woman painting",
    },
    about: `<b>Paintings</b><br>
            Colorful expressions that speak to the soul.<br>
            Explore original paintings created with mediums like watercolor, acrylic, oil, and mixed media — each stroke telling a unique story crafted by an artist’s hands.`,
    products: [
        {
            id: "1",
            owner_id: "1",
            name: "",
            price: 0,
            product_images: [
                {
                    source: "",
                    alt: ""
                }
            ],
            rating: {
                likes: 0,
                dislikes: 0,
            },
            comments: [],
            description: ""
        },
    ]
}

const sculpureCollection: CollectionItem = {
    id: "3",
    title: "Sculpure & Carving",
    image: {
        source: "design/placeholders/molding-2.jpg",
        alt: "An image of a molding clay pot",
    },
    about: `<b>Sculptures & Carvings</b><br>
            Crafted forms that shape emotion and meaning.<br>
            This collection includes 3D creations made from wood, clay, stone, or metal — hand-carved and sculpted to perfection, blending texture, form, and vision.`,
    products: [
        {
            id: "1",
            owner_id: "1",
            name: "",
            price: 0,
            product_images: [
                {
                    source: "",
                    alt: ""
                }
            ],
            rating: {
                likes: 0,
                dislikes: 0,
            },
            comments: [],
            description: ""
        },
    ]
}

const fiberArtCollection: CollectionItem = {
    id: "4",
    title: "Textile & Fiber Art",
    image: {
        source: "design/placeholders/textile.jpg",
        alt: "Textile making in progress",
    },
    about: `<b>Textiles & Fabric Crafts</b><br>
            Soft, intricate, and woven with care.<br>
            Celebrate the art of fiber through handmade embroidery, sewing, knitting, crocheting, quilting, and macramé — where each thread is a labor of love.`,
    products: [
        {
            id: "1",
            owner_id: "1",
            name: "",
            price: 0,
            product_images: [
                {
                    source: "",
                    alt: ""
                }
            ],
            rating: {
                likes: 0,
                dislikes: 0,
            },
            comments: [],
            description: ""
        },
    ]
}

const jewelriesCollection: CollectionItem = {
    id: "5",
    title: "Jewelry & Accessories",
    image: {
        source: "design/placeholders/jewelry-2.jpg",
        alt: "A photo of many hand made jewelries",
    },
    about: `<b>Jewelry & Accessories</b><br>
            Wearable artistry, handcrafted with heart.<br>
            Featuring unique earrings, necklaces, bracelets, bags, and more — this collection highlights artisan-crafted pieces that blend fashion with craftsmanship.`,
    products: [
        {
            id: "1",
            owner_id: "1",
            name: "",
            price: 0,
            product_images: [
                {
                    source: "",
                    alt: ""
                }
            ],
            rating: {
                likes: 0,
                dislikes: 0,
            },
            comments: [],
            description: ""
        },
    ]
}

const homeDecorCollection: CollectionItem = {
    id: "6",
    title: "Home & Decor",
    image: {
        source: "design/placeholders/home-decor-2.jpg",
        alt: "Interior home decor made with hands",
    },
    about: `<b>Home Decor</b><br>
            Warmth, charm, and personality for every space.<br>
            Find handmade items that transform spaces into sanctuaries — including wall hangings, pottery, candles, planters, furniture, and other decorative accents.`,
    products: [
        {
            id: "1",
            owner_id: "1",
            name: "",
            price: 0,
            product_images: [
                {
                    source: "",
                    alt: ""
                }
            ],
            rating: {
                likes: 0,
                dislikes: 0,
            },
            comments: [],
            description: ""
        },
    ]
}

const paperCraftCollection: CollectionItem = {
    id: "7",
    title: "Paper Craft",
    image: {
        source: "design/placeholders/paper-2.jpg",
        alt: "Craft made from paper",
    },
    about: `<b>Paper Crafts</b><br>
            Delicate details on every fold and flourish.<br>
            A celebration of creativity on paper — this collection includes handcrafted greeting cards, journals, origami, scrapbooks, calligraphy, and more.`,
    products: [
        {
            id: "1",
            owner_id: "1",
            name: "",
            price: 0,
            product_images: [
                {
                    source: "",
                    alt: ""
                }
            ],
            rating: {
                likes: 0,
                dislikes: 0,
            },
            comments: [],
            description: ""
        },
    ]
}

const othersCollection: CollectionItem = {
    id: "8",
    title: "Creative Finds",
    image: {
        source: "design/placeholders/others-2.jpg",
        alt: "Image of hand crafted baskets",
    },
    about: `<b>Creative Finds</b><br>
            Where imagination knows no boundaries.<br>
            Discover a curated collection of extraordinary handcrafted pieces that don’t fit into a single category — from experimental designs to unexpected treasures that showcase true artistic freedom.`,
    products: [
        {
            id: "1",
            owner_id: "1",
            name: "Colorful Baskets",
            price: 20000,  // in cent/kobo
            product_images: [
                {
                    source: "design/placeholders/others-2.jpg",
                    alt: "Image of hand made baskets"
                }
            ],
            rating: {
                likes: 0,
                dislikes: 0,
            },
            comments: [],
            description: "What a colorful basket made from palm tree leaves. The basket can hold a heavy load of 60kg for as long as 8 hours with the basket suspended on the air with the hand attached to handle."
        },
    ]
}


/************************
****** EXPORT DATA ******
************************/
// creating hero placeholder content data
export const heroImages: HeroImage = [
    {
        source: "design/placeholders/hero-1.jpg",
        alt: "Image of hands molding with clay"
    },
    {
        source: "design/placeholders/hero-2.jpg",
        alt: "Interior home decor made with hands"
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
        id: "1",
        display_name: "artistic giant",
        about: `<b>About Artistic Giant</b><br><br>
                    Welcome to the world of <b>Artistic Giant</b> — where imagination takes form, color finds purpose, and raw creativity is sculpted into timeless expressions. Artistic Giant is more than just an artisan name; it's a bold declaration of mastery in the visual arts, rooted in passion, precision, and storytelling.<br><br>
                    With hands that sketch the unseen, paint with emotion, and mold life into stillness, Artistic Giant brings a powerful blend of <b>drawing</b>, <b>painting</b>, and <b>sculpture</b> to life. Each piece—whether on canvas, paper, or carved from clay—tells a story that speaks to the soul, inviting viewers into realms of thought, wonder, and beauty.<br><br>
                    From detailed ink illustrations to vibrant acrylic paintings and expressive sculptural forms, Artistic Giant’s work bridges the traditional and the imaginative. Every creation is an exploration of mood, movement, and meaning—crafted to inspire, provoke, and endure.<br><br>
                    Whether you're an art lover, collector, or creative collaborator, Artistic Giant welcomes you into a space where art is not just made—but felt.<br><br>
                    <b>Art that stands tall. Vision that leaves a mark. Welcome to Artistic Giant.</b>`,
        profile_photo: "placeholders/default-avatar-profile-icon.png",
        banner: "design/placeholders/yin-yang.png",
        gender: 'm',
        user_id: "1"
    },
]

// creating user accounts
export const users: Users = [
    {
        id: "1",
        username: "artuser",
        email: "artuser@example.com",
        password: "123456@password"
    }
]
