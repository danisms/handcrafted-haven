
-- ENUM Types
CREATE TYPE access_level AS ENUM ('read-only', 'admin', 'full-control');
CREATE TYPE gender_enum AS ENUM ('m', 'f');
CREATE TYPE rating_enum AS ENUM ('like', 'dislike');

-- Table: user
DROP TABLE IF EXISTS "user" CASCADE;
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(45) NOT NULL UNIQUE,
    firstname VARCHAR(45) NOT NULL,
    lastname VARCHAR(45) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100) NOT NULL,
    access access_level NOT NULL DEFAULT 'read-only',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: artisan
DROP TABLE IF EXISTS artisan CASCADE;
CREATE TABLE artisan (
    id SERIAL PRIMARY KEY,
    display_name VARCHAR(100) NOT NULL,
    gender gender_enum NOT NULL,
    about TEXT,
    profile_photo TEXT,
    banner TEXT,
    user_id INT NOT NULL REFERENCES "user"(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: collection
DROP TABLE IF EXISTS collection CASCADE;
CREATE TABLE collection (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL UNIQUE,
    about TEXT,
    image TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON COLUMN collection.image IS 'An object of this form: { source: "", alt: "" }';

-- Table: product
DROP TABLE IF EXISTS product CASCADE;
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DOUBLE PRECISION,
    description TEXT,
    owner_id INT NOT NULL REFERENCES artisan(id),
    collection_id INT NOT NULL REFERENCES collection(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: hero_content
DROP TABLE IF EXISTS hero_content CASCADE;
CREATE TABLE hero_content (
    id SERIAL PRIMARY KEY,
    title TEXT,
    source TEXT NOT NULL,
    alt VARCHAR(100) NOT NULL,
    description TEXT,
    link TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON COLUMN hero_content.source IS 'Source is a link to a video or image file. The type is determined by the program using the extension in the source link.';
COMMENT ON COLUMN hero_content.description IS 'Description of the content or any other information about the content.';
COMMENT ON COLUMN hero_content.link IS 'An object containing the url and anchor_text, e.g., { url: "", anchor_text: "" }';

-- Table: product_image
DROP TABLE IF EXISTS product_image CASCADE;
CREATE TABLE product_image (
    id SERIAL PRIMARY KEY,
    source TEXT NOT NULL,
    alt VARCHAR(100) NOT NULL,
    product_id INT NOT NULL REFERENCES product(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: product_comment
DROP TABLE IF EXISTS product_comment CASCADE;
CREATE TABLE product_comment (
    id SERIAL PRIMARY KEY,
    parent_id INT,
    comments TEXT NOT NULL,
    product_id INT NOT NULL REFERENCES product(id),
    user_id INT REFERENCES "user"(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON COLUMN product_comment.parent_id IS 'For replies to comments';
COMMENT ON COLUMN product_comment.comments IS 'A list of comment objects made, where each edit is stored. The latest is displayed, but history is available. Example: [ { comment: "", timestamp: "" } ]';

-- Table: product_rating
DROP TABLE IF EXISTS product_rating CASCADE;
CREATE TABLE product_rating (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES product(id),
    user_id INT NOT NULL REFERENCES "user"(id),
    rate rating_enum NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updates TEXT
);
COMMENT ON COLUMN product_rating.updates IS 'A list of timestamp updates made in rating';
