import postgres from "postgres";
import { HeroContent, Collections, Artisans, Products, Artisan, Product, ProductImage, Rating, UserComment } from "./definitions";
import { placeholders } from "./placeholder-data";
import { getSession } from "./auth";
import { cache } from "react";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// HOME QUERIES
export async function fetchHeroContent() {
    try {
        const data = await sql<HeroContent>`SELECT * FROM hero_content`;
        data.forEach(result => result['link'] = JSON.parse(typeof result['link'] != "string" ? JSON?.stringify(result['link']) : result['link']));
        return data;
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error('Failded to fetch hero content data.');
    }
}

const topCollectionLimit = 5;
export async function fetchTopCollections() {
    // note: collection is fetched and sorted with the number of products attached to it in an decrementing order
    try {
        const data = await sql<Collections>`SELECT collection.*, COUNT(product.collection_id) as products FROM collection JOIN product ON collection.id = product.collection_id GROUP BY collection.id ORDER BY products DESC LIMIT ${topCollectionLimit};`;
        data.forEach(result => result['image'] = JSON.parse(typeof result['image'] != "string" ? JSON?.stringify(result['image']) : result['image']));
        return data;
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error('Failded to fetch collections data.');
    }
}

const topArtisansLimit = 5;
export async function fetchTopArtisans() {
    // note: artisans is fetched and sorted with the number of products attached to it in an decrementing order
    try {
        const data = await sql<Artisans>`SELECT artisan.*, COUNT(product.owner_id) as products FROM artisan JOIN product ON artisan.id = product.owner_id GROUP BY artisan.id ORDER BY products DESC LIMIT ${topArtisansLimit};`;
        for (const result of data) {
            // include placeholder profile photo when profile photo isn't available
            const gender = result['gender'];
            if (!result['profile_photo']) {
                if (gender == "m") {
                    result['profile_photo'] = placeholders.male_profile_picture;
                } else {
                    result['profile_photo'] = placeholders.female_profile_picture;
                }
            }

            // include artisan collection titles to 
            const artisan_id = result['id'];
            const collectionLimit = 5;
            const artisan_collections = await sql`SELECT collection.title FROM collection JOIN product ON collection.id = product.collection_id WHERE product.owner_id = ${artisan_id} LIMIT ${collectionLimit}`;
            // console.log("ARTISAN COLLECTION: ", artisan_collections);  // for testing purpose
            result['artisan_collections'] = artisan_collections;
        };

        return data;
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error('Failded to fetch collections data.');
    }
}

const mostRatedProductsLimit = 5;
export async function fetchMostRatedProducts() {
    // note: product is fetched and sorted with the number of likes attached to it in an decrementing order
    try {
        const data = await sql<Products>`SELECT product.*, COUNT(product_rating.id) as likes FROM product JOIN product_rating ON product.id = product_rating.product_id WHERE product_rating.rate = 'like' GROUP BY product.id ORDER BY likes DESC LIMIT ${mostRatedProductsLimit};`;
        // get product image
        for (const result of data) {
            const product_id = result['id'];
            const productImage = await sql`SELECT * FROM product_image WHERE product_id = ${product_id} LIMIT 1;`;
            result['product_images'] = productImage;
        }
        return data;
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error('Failded to fetch most reated products data.');
    }
}


// PROFILE QUERIES
export const fetchMyArtisanProfiles = cache(async () => {
    // note: artisans is fetched and sorted with the number of products attached to it in an decrementing order
    try {
        // get user id
        const session = await getSession();  // get session
        const userId = session?.user?.id;

        if (!userId) throw new Error('Unauthorized');

        const data = await sql<Artisans>`SELECT artisan.* FROM artisan WHERE artisan.user_id = ${userId} ORDER BY artisan.created_at DESC;`;
        for (const result of data) {
            // include placeholder profile photo when profile photo isn't available
            const gender = result['gender'];
            if (!result['profile_photo']) {
                if (gender == "m") {
                    result['profile_photo'] = placeholders.male_profile_picture;
                } else {
                    result['profile_photo'] = placeholders.female_profile_picture;
                }
            }

            // include artisan collection titles to 
            const artisan_id = result['id'];
            const collectionLimit = 5;
            const artisan_collections = await sql`SELECT collection.title FROM collection JOIN product ON collection.id = product.collection_id WHERE product.owner_id = ${artisan_id} LIMIT ${collectionLimit};`;
            // console.log("ARTISAN COLLECTION: ", artisan_collections);  // for testing purpose
            result['artisan_collections'] = artisan_collections;

            // include artisan number of product
            const artisan_no_of_products = await sql`SELECT COUNT(product.id) as no_of_products FROM product WHERE owner_id = ${artisan_id};`;
            result['products'] = parseInt(artisan_no_of_products[0]['no_of_products']);
            // console.log("PRODUCTS NUMBER: ", artisan_no_of_products);  // for debugging purpose
        };

        return data;
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error('Failded to fetch collections data.');
    }
});

export async function fetchArtisanById(id: string) {
    const data = await sql`SELECT * FROM artisan WHERE id = ${id}`;
    const artisan: Artisan = data[0];
    return artisan;
}

export async function fetchArtisanProfileById(id: string) {
    try {
        // get artisan
        const artisans = await sql<Artisan[]>`SELECT * FROM artisan WHERE id = ${id}`;
        // get products
        const products = await sql<Product[]>`SELECT * FROM product WHERE owner_id = ${id}`;

        const data = await Promise.all([
            artisans,
            products
        ]);

        // add to products
        for (const product of data[1]) {
            const product_id = product.id;
            // get and add product images
            const product_images = await sql<ProductImage[]>`SELECT * FROM product_image WHERE product_id = ${product_id}`;
            product['product_images'] = product_images;
            // get and add product rating
            const no_of_likes = await sql`SELECT COUNT(rate) as likes FROM product_rating WHERE rate = 'like' AND product_id = ${product_id};`;
            const no_of_dislikes = await sql`SELECT COUNT(rate) as dislikes FROM product_rating WHERE rate = 'dislike' AND product_id = ${product_id};`;
            const rating: Rating = {
                likes: parseInt(no_of_likes[0]['likes']) || 0,
                dislikes: parseInt(no_of_dislikes[0]['dislikes']) || 0
            }
            product['rating'] = rating;
            product['likes'] = rating.likes;
            product['dislikes'] = rating.dislikes;
            // get and add product comments
            const comments = await sql<UserComment[]>`SELECT product_comment.id, product_comment.parent_id, product_comment.comments, product_comment.product_id, CONCAT(users.firstname, ' ', users.lastname) AS name, users.user_photo FROM product_comment JOIN users ON product_comment.user_id = users.id WHERE product_comment.product_id = ${product_id};`;
            product['comments'] = comments;
        }

        const artisan = data[0][0];

        return {
            artisan,
            products
        };
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error("Failed to fetch artisan profile data");
    }

}

// PRODUCT QUERIES
export async function fetchProductDetailById(id: string) {
    const product_detail = await sql<Product[]>`SELECT * from product WHERE id = ${id};`;
    return product_detail[0];
}

export const fetchArtisanProductById = cache(async (artisanId: string, productId: string) => {
    try {
        // get artisan
        const artisans = await sql<Artisan[]>`SELECT * FROM artisan WHERE id = ${artisanId}`;
        // get products
        const products = await sql<Product[]>`SELECT * FROM product WHERE id = ${productId} AND owner_id = ${artisanId}`;

        const data = await Promise.all([
            artisans,
            products
        ]);

        // get and add to products
        const product = data[1][0];
        const product_id = product.id;
        // get and add product images
        const product_images = await sql<ProductImage[]>`SELECT * FROM product_image WHERE product_id = ${product_id}`;
        product['product_images'] = product_images;
        // get and add product rating
        const no_of_likes = await sql`SELECT COUNT(rate) as likes FROM product_rating WHERE rate = 'like' AND product_id = ${product_id};`;
        const no_of_dislikes = await sql`SELECT COUNT(rate) as dislikes FROM product_rating WHERE rate = 'dislike' AND product_id = ${product_id};`;
        const rating: Rating = {
            likes: parseInt(no_of_likes[0]?.likes) || 0,
            dislikes: parseInt(no_of_dislikes[0]?.dislikes) || 0
        }
        product['rating'] = rating;
        product['likes'] = rating.likes;
        product['dislikes'] = rating.dislikes;
        const session = await getSession();
        if (session.user) {
            const user_id = session.user.id;
            const my_rate = await sql`SELECT rate FROM product_rating WHERE product_id = ${product_id} AND user_id = ${user_id}`;
            product['my_rating'] = my_rate[0]?.rate || null;
        }
        // get and add product comments
        const comments = await sql<UserComment[]>`SELECT product_comment.id, product_comment.parent_id, product_comment.comments, product_comment.product_id, CONCAT(users.firstname, ' ', users.lastname) AS name, users.user_photo FROM product_comment JOIN users ON product_comment.user_id = users.id WHERE product_comment.product_id = ${product_id};`;

        product['comments'] = comments;

        // add artisan to product as owner
        const artisan = data[0][0];
        product['owner'] = artisan;

        return product
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error("Failed to fetch product data");
    }
})


// GENERAL QUERIES
export const fetchCollectionTitles = cache(async () => {
    try {
        const data = await sql<[{ id: string, title: string }]>`SELECT id, title FROM collection;`;
        return data;
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error('Failded to fetch collection titles.');
    }
})
