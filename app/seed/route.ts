// add initial working place holder data to db

import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { artisans, collections, heroImages, users } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function createExtensions() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
}

async function createTypesEnums() {
    await sql`CREATE TYPE access_level AS ENUM ('read-only', 'admin', 'full-control');`;
    await sql`CREATE TYPE gender_enum AS ENUM ('m', 'f');`;
    await sql`CREATE TYPE rating_enum AS ENUM ('like', 'dislike');`;
}

async function seedUsers() {
    await sql`DROP TABLE IF EXISTS users CASCADE;`;
    await sql`
        CREATE TABLE users (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            username VARCHAR(45) NOT NULL UNIQUE,
            firstname VARCHAR(45) NOT NULL,
            lastname VARCHAR(45) NOT NULL,
            email VARCHAR(100),
            user_photo TEXT,
            password VARCHAR(100) NOT NULL,
            access_level access_level NOT NULL DEFAULT 'read-only',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const insertUsers = await Promise.all(
        users.map(async (user) => {
            const hasedPassword = await bcrypt.hash(user.password, 10);
            return sql`
                INSERT INTO users (id, username, firstname, lastname, email, password, access_level)
                VALUES (${user.id}, ${user.username}, ${user.firstname}, ${user.lastname}, ${user.email}, ${hasedPassword}, ${user.access})
                ON CONFLICT (id) DO NOTHING;
            `;
        })
    );

    return insertUsers;
}

async function seedArtisan() {
    await sql`DROP TABLE IF EXISTS artisan CASCADE;`;
    await sql`
        CREATE TABLE artisan (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            display_name VARCHAR(100) NOT NULL,
            gender gender_enum NOT NULL,
            about TEXT,
            profile_photo TEXT,
            banner TEXT,
            user_id UUID NOT NULL REFERENCES users(id),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const insertArtisans = await Promise.all(
        artisans.map(async (artisan) => {
            return sql`
                INSERT INTO artisan (id, display_name, gender, about, user_id)
                VALUES (${artisan.id}, ${artisan.display_name}, ${artisan.gender}, ${artisan.about}, ${artisan.user_id})
                ON CONFLICT (id) DO NOTHING;
            `;
        })
    )

    return insertArtisans;
}

async function seedCollection() {
    await sql`DROP TABLE IF EXISTS collection CASCADE;`;
    await sql`
        CREATE TABLE collection (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title VARCHAR(500) NOT NULL UNIQUE,
            about TEXT,
            image JSON,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;
    await sql`COMMENT ON COLUMN collection.image IS 'An object of this form: { source: "", alt: "" }';`;

    // convert collections into an array of collections values
    const collectionsArray = Object.values(collections);
    const insertCollections = await Promise.all(
        collectionsArray.map(async (collection) => {
            return sql`
                INSERT INTO collection (id, title, about, image)
                VALUES (${collection.id}, ${collection.title}, ${collection.about}, ${JSON.stringify(collection.image)})
                ON CONFLICT (id) DO NOTHING;
            `;
        })
    );

    return insertCollections;
}

async function seedProduct() {
    await sql`DROP TABLE IF EXISTS product CASCADE;`;
    await sql`
        CREATE TABLE product (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price DOUBLE PRECISION,
            description TEXT,
            owner_id UUID NOT NULL REFERENCES artisan(id),
            collection_id UUID NOT NULL REFERENCES collection(id),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;

    // get products
    const collectionsArray = Object.values(collections);
    const products = collectionsArray.flatMap(collection => Array.isArray(collection.products) ? collection.products : []);

    // products.flat();  // reduce to a single array

    console.log("products: ", products);  // for debugging purpose

    const insertProducts = await Promise.all(
        products.map((product) => {
            return sql`
                INSERT INTO product (id, name, price, description, owner_id, collection_id)
                VALUES (${product.id}, ${product.name}, ${product.price}, ${product.description}, ${product.owner_id}, ${product.collection_id})
                ON CONFLICT (id) DO NOTHING;
            `;
        })
    )

    return insertProducts;
}

async function seedProductImage() {
    await sql`DROP TABLE IF EXISTS product_image CASCADE;`;
    await sql`
        CREATE TABLE product_image (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            source TEXT NOT NULL,
            alt VARCHAR(100) NOT NULL,
            product_id UUID NOT NULL REFERENCES product(id),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;

    // get product images from products
    const collectionsArray = Object.values(collections);
    const products = collectionsArray.flatMap(collection => Array.isArray(collection.products) ? collection.products : []);

    const productImages = products.flatMap(product => Array.isArray(product.product_images) ? product.product_images : []);

    console.log("Product Images: ", productImages);  // for debugging purpose

    const insertProductImages = await Promise.all(
        productImages.map((image) => {
            return sql`
                INSERT INTO product_image (source, alt, product_id)
                VALUES (${image.source}, ${image.alt}, ${image.product_id});
            `;
        })
    )

    return insertProductImages;
}

async function seedProductComment() {
    await sql`DROP TABLE IF EXISTS product_comment CASCADE;`;
    await sql`
        CREATE TABLE product_comment (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            parent_id UUID,
            comments JSON NOT NULL,
            product_id UUID NOT NULL REFERENCES product(id),
            user_id UUID REFERENCES users(id),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;
    await sql`COMMENT ON COLUMN product_comment.parent_id IS 'For replies to comments';`;
    await sql`COMMENT ON COLUMN product_comment.comments IS 'A list of comment objects made, where each edit is stored. The latest is displayed, but history is available. Example: [ { comment: "", timestamp: "" } ]';`;
}

async function seedProductRating() {
    await sql`DROP TABLE IF EXISTS product_rating CASCADE;`;
    await sql`
        CREATE TABLE product_rating (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            product_id UUID NOT NULL REFERENCES product(id),
            user_id UUID NOT NULL REFERENCES users(id),
            rate rating_enum NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updates JSON,
            UNIQUE (product_id, user_id)
        );
    `;
    await sql`COMMENT ON COLUMN product_rating.updates IS 'A list of timestamp updates made in rating';`;
}

async function seedHeroContent() {
    await sql`DROP TABLE IF EXISTS hero_content CASCADE;`;
    await sql`
        CREATE TABLE hero_content (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            title TEXT,
            source TEXT NOT NULL,
            alt VARCHAR(100) NOT NULL,
            description TEXT,
            link JSON,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;
    await sql`COMMENT ON COLUMN hero_content.source IS 'Source is a link to a video or image file. The type is determined by the program using the extension in the source link.';`;
    await sql`COMMENT ON COLUMN hero_content.description IS 'Description of the content or any other information about the content.';`;
    await sql`COMMENT ON COLUMN hero_content.link IS 'An object containing the url and anchor_text, e.g., { url: "", anchor_text: "" }';`;

    const insertHeroContent = await Promise.all(
        heroImages.map((heroImage) => {
            return sql`
                INSERT INTO hero_content (title, source, alt, description, link)
                VALUES (${heroImage.title}, ${heroImage.source}, ${heroImage.alt}, ${heroImage.description}, ${JSON.stringify(heroImage.link)});
            `;
        })
    )

    return insertHeroContent;
}


export async function GET() {
    try {
        const result = await sql.begin(async () => {
            // await createExtensions();
            // await createTypesEnums();
            // await seedUsers();
            // await seedArtisan();
            // await seedCollection();
            // await seedProduct();
            // await seedProductImage();
            // await seedProductComment();
            // await seedProductRating();
            // await seedHeroContent();
        });

        console.log(result);

        return Response.json({ message: 'Database successfully seeded!' });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
