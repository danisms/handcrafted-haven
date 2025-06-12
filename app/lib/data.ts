import postgres from "postgres";
import { HeroContent, Collections, Artisans, Products } from "./definitions";
import { formatCurrency } from "./utils";
import { placeholders } from "./placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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