<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250515084533 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE favoritos DROP FOREIGN KEY FK_1E86887F67B3B43D
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE favoritos ADD CONSTRAINT FK_1E86887F67B3B43D FOREIGN KEY (users_id) REFERENCES usuario (id) ON DELETE CASCADE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE favoritos DROP FOREIGN KEY FK_1E86887F67B3B43D
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE favoritos ADD CONSTRAINT FK_1E86887F67B3B43D FOREIGN KEY (users_id) REFERENCES usuario (id)
        SQL);
    }
}
