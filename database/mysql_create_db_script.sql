-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema handcrafted_haven
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema handcrafted_haven
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `handcrafted_haven` DEFAULT CHARACTER SET utf8 ;
USE `handcrafted_haven` ;

-- -----------------------------------------------------
-- Table `handcrafted_haven`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handcrafted_haven`.`user` ;

CREATE TABLE IF NOT EXISTS `handcrafted_haven`.`user` (
  `id` CHAR(36) NOT NULL DEFAULT 'UUID()',
  `username` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NULL,
  `user_photo` TEXT NULL,
  `password` VARCHAR(100) NOT NULL,
  `access` ENUM("read-only", "admin", "full-control") NOT NULL DEFAULT 'read-only',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `handcrafted_haven`.`artisan`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handcrafted_haven`.`artisan` ;

CREATE TABLE IF NOT EXISTS `handcrafted_haven`.`artisan` (
  `id` CHAR(36) NOT NULL DEFAULT 'UUID()',
  `display_name` VARCHAR(100) NOT NULL,
  `gender` ENUM("m", "f") NOT NULL,
  `about` TEXT NULL,
  `profile_photo` TEXT NULL,
  `banner` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `user_id` CHAR(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_artisan_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_artisan_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `handcrafted_haven`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `handcrafted_haven`.`collection`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handcrafted_haven`.`collection` ;

CREATE TABLE IF NOT EXISTS `handcrafted_haven`.`collection` (
  `id` CHAR(36) NOT NULL DEFAULT 'UUID()',
  `title` VARCHAR(500) NOT NULL,
  `about` TEXT NULL,
  `image` TEXT NULL COMMENT 'An object of this form\n{\n        source: \"\",\n        alt: \"\"\n }',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `title_UNIQUE` (`title` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `handcrafted_haven`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handcrafted_haven`.`product` ;

CREATE TABLE IF NOT EXISTS `handcrafted_haven`.`product` (
  `id` CHAR(36) NOT NULL DEFAULT 'UUID()',
  `name` VARCHAR(100) NOT NULL,
  `price` DOUBLE NULL,
  `description` TEXT NULL,
  `owner_id` CHAR(36) NOT NULL,
  `collection_id` CHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_product_artisan1_idx` (`owner_id` ASC) VISIBLE,
  INDEX `fk_product_collection1_idx` (`collection_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_artisan1`
    FOREIGN KEY (`owner_id`)
    REFERENCES `handcrafted_haven`.`artisan` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_collection1`
    FOREIGN KEY (`collection_id`)
    REFERENCES `handcrafted_haven`.`collection` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `handcrafted_haven`.`hero_content`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handcrafted_haven`.`hero_content` ;

CREATE TABLE IF NOT EXISTS `handcrafted_haven`.`hero_content` (
  `id` CHAR(36) NOT NULL DEFAULT 'UUID()',
  `title` TEXT NULL,
  `source` TEXT NOT NULL COMMENT 'source is a link to a video or image file. The type is determined by the program using the extension in the source link.',
  `alt` VARCHAR(100) NOT NULL,
  `description` TEXT NULL COMMENT 'description of the content or anyother information about the content.',
  `link` TEXT NULL COMMENT 'An object container the url and anchor_text i.e\n{\n    url: \"\",\n    ancor_text: \"\"\n}',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `handcrafted_haven`.`product_image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handcrafted_haven`.`product_image` ;

CREATE TABLE IF NOT EXISTS `handcrafted_haven`.`product_image` (
  `id` CHAR(36) NOT NULL DEFAULT 'UUID()',
  `source` TEXT NOT NULL,
  `alt` VARCHAR(100) NOT NULL,
  `product_id` CHAR(36) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_product_image_product1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_image_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `handcrafted_haven`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `handcrafted_haven`.`product_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handcrafted_haven`.`product_comment` ;

CREATE TABLE IF NOT EXISTS `handcrafted_haven`.`product_comment` (
  `id` CHAR(36) NOT NULL DEFAULT 'UUID()',
  `parent_id` CHAR(36) NULL COMMENT 'For replies to comments',
  `comments` TEXT NOT NULL COMMENT 'a list of comment objects made, i.e if comment is edited, it will be added to the list but only the last added will be displayed. viewers can decide to view history of comments edit that was made to a comment.\nSTRUCTURAL EXAMPLE\n[\n    {\n        comment: \"\",\n        timestamp: \"\"\n    }\n]',
  `product_id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_product_comment_product1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_product_comment_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_comment_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `handcrafted_haven`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `handcrafted_haven`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `handcrafted_haven`.`product_rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `handcrafted_haven`.`product_rating` ;

CREATE TABLE IF NOT EXISTS `handcrafted_haven`.`product_rating` (
  `id` CHAR(36) NOT NULL DEFAULT 'UUID()',
  `product_id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,
  `rate` ENUM("like", "dislike") NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updates` TEXT NULL COMMENT 'A list of timestamp updates made in ratting',
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_product_rating_product1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_product_rating_user1_idx` (`user_id` ASC) VISIBLE,
  PRIMARY KEY (`product_id`, `user_id`),
  CONSTRAINT `fk_product_rating_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `handcrafted_haven`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_rating_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `handcrafted_haven`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
