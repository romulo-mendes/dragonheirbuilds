-- CreateTable
CREATE TABLE `equipamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atributo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `valor` VARCHAR(191) NOT NULL,
    `equipamentoId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `atributo` ADD CONSTRAINT `atributo_equipamentoId_fkey` FOREIGN KEY (`equipamentoId`) REFERENCES `equipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
