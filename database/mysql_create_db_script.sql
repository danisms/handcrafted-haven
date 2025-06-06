-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NULL,
  `password` VARCHAR(100) NOT NULL,
  `access` ENUM("read-only", "admin", "full-control") NOT NULL DEFAULT 'read-only',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`artisan`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`artisan` ;

CREATE TABLE IF NOT EXISTS `mydb`.`artisan` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `display_name` VARCHAR(100) NOT NULL,
  `gender` ENUM("m", "f") NOT NULL,
  `about` TEXT NULL,
  `profile_photo` TEXT NULL,
  `banner` TEXT NULL,
  `user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_artisan_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_artisan_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`collection`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`collection` ;

CREATE TABLE IF NOT EXISTS `mydb`.`collection` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(500) NOT NULL,
  `about` TEXT NULL,
  `image` TEXT NULL COMMENT 'An object of this form\n{\n        source: \"\",\n        alt: \"\"\n }',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `title_UNIQUE` (`title` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`product` ;

CREATE TABLE IF NOT EXISTS `mydb`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `price` DOUBLE NULL,
  `description` TEXT NULL,
  `owner_id` INT NOT NULL,
  `collection_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_product_artisan1_idx` (`owner_id` ASC) VISIBLE,
  INDEX `fk_product_collection1_idx` (`collection_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_artisan1`
    FOREIGN KEY (`owner_id`)
    REFERENCES `mydb`.`artisan` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_collection1`
    FOREIGN KEY (`collection_id`)
    REFERENCES `mydb`.`collection` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`hero_content`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`hero_content` ;

CREATE TABLE IF NOT EXISTS `mydb`.`hero_content` (
  `id` INT NOT NULL AUTO_INCREMENT,
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
-- Table `mydb`.`product_image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`product_image` ;

CREATE TABLE IF NOT EXISTS `mydb`.`product_image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `source` TEXT NOT NULL,
  `alt` VARCHAR(100) NOT NULL,
  `product_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_product_image_product1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_image_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`product_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`product_comment` ;

CREATE TABLE IF NOT EXISTS `mydb`.`product_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `parent_id` INT NULL COMMENT 'For replies to comments',
  `comments` TEXT NOT NULL COMMENT 'a list of comment objects made, i.e if comment is edited, it will be added to the list but only the last added will be displayed. viewers can decide to view history of comments edit that was made to a comment.\nSTRUCTURAL EXAMPLE\n[\n    {\n        comment: \"\",\n        timestamp: \"\"\n    }\n]',
  `product_id` INT NOT NULL,
  `user_id` INT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_product_comment_product1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_product_comment_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_comment_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`product_rating`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`product_rating` ;

CREATE TABLE IF NOT EXISTS `mydb`.`product_rating` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `rate` ENUM("like", "dislike") NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updates` TEXT NULL COMMENT 'A list of timestamp updates made in ratting',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_product_rating_product1_idx` (`product_id` ASC) VISIBLE,
  INDEX `fk_product_rating_user1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_rating_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_rating_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
