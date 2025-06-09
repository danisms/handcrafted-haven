-- UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ENUM Types
CREATE TYPE access_level AS ENUM ('read-only', 'admin', 'full-control');
CREATE TYPE gender_enum AS ENUM ('m', 'f');
CREATE TYPE rating_enum AS ENUM ('like', 'dislike');

-- Table: user
DROP TABLE IF EXISTS "user" CASCADE;
CREATE TABLE "user" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(45) NOT NULL UNIQUE,
    firstname VARCHAR(45) NOT NULL,
    lastname VARCHAR(45) NOT NULL,
    email VARCHAR(100) UNIQUE,
    user_photo TEXT,
    password VARCHAR(100) NOT NULL,
    access_level access_level NOT NULL DEFAULT 'read-only',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: artisan
DROP TABLE IF EXISTS artisan CASCADE;
CREATE TABLE artisan (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    display_name VARCHAR(100) NOT NULL,
    gender gender_enum NOT NULL,
    about TEXT,
    profile_photo TEXT,
    banner TEXT,
    user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: collection
DROP TABLE IF EXISTS collection CASCADE;
CREATE TABLE collection (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL UNIQUE,
    about TEXT,
    image JSON,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON COLUMN collection.image IS 'An object of this form: { source: "", alt: "" }';

-- Table: product
DROP TABLE IF EXISTS product CASCADE;
CREATE TABLE product (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    price DOUBLE PRECISION,
    description TEXT,
    owner_id UUID NOT NULL REFERENCES artisan(id) ON DELETE CASCADE,
    collection_id UUID NOT NULL REFERENCES collection(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: hero_content
DROP TABLE IF EXISTS hero_content CASCADE;
CREATE TABLE hero_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    source TEXT NOT NULL,
    alt VARCHAR(100) NOT NULL,
    description TEXT,
    link JSON,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON COLUMN hero_content.source IS 'Source is a link to a video or image file. The type is determined by the program using the extension in the source link.';
COMMENT ON COLUMN hero_content.description IS 'Description of the content or any other information about the content.';
COMMENT ON COLUMN hero_content.link IS 'An object containing the url and anchor_text, e.g., { url: "", anchor_text: "" }';

-- Table: product_image
DROP TABLE IF EXISTS product_image CASCADE;
CREATE TABLE product_image (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source TEXT NOT NULL,
    alt VARCHAR(100) NOT NULL,
    product_id UUID NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Table: product_comment
DROP TABLE IF EXISTS product_comment CASCADE;
CREATE TABLE product_comment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES product_comment(id) ON DELETE CASCADE,
    comments JSON NOT NULL,
    product_id UUID NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    user_id UUID REFERENCES "user"(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON COLUMN product_comment.parent_id IS 'For replies to comments';
COMMENT ON COLUMN product_comment.comments IS 'A list of comment objects made, where each edit is stored. The latest is displayed, but history is available. Example: [ { comment: "", timestamp: "" } ]';

-- Table: product_rating
DROP TABLE IF EXISTS product_rating CASCADE;
CREATE TABLE product_rating (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    rate rating_enum NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updates JSON,
    UNIQUE (product_id, user_id)
);
COMMENT ON COLUMN product_rating.updates IS 'A list of timestamp updates made in rating';
