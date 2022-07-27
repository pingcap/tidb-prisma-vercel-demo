-- CreateTable
CREATE TABLE `Post` (
    `id` BIGINT AUTO_RANDOM PRIMARY KEY,
    `content` TEXT,
    `title` TEXT NOT NULL,
    `authorId` BIGINT
);

-- CreateTable
CREATE TABLE `Profile` (
    `id` BIGINT AUTO_RANDOM PRIMARY KEY,
    `bio` TEXT,
    `userId` BIGINT NOT NULL
);

-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT AUTO_RANDOM PRIMARY KEY,
    `email` VARCHAR(150) NOT NULL,
    `name` TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
