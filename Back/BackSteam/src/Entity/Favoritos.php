<?php

namespace App\Entity;

use App\Repository\FavoritosRepository;
use App\Entity\Usuario;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
#[ORM\Entity(repositoryClass: FavoritosRepository::class)]
#[ApiResource]
class Favoritos
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $gameId = null;



    #[ORM\ManyToOne(inversedBy: 'favoritos')]
    #[ORM\JoinColumn(onDelete: "CASCADE")]
    private ?Usuario $users = null;

    #[ORM\Column]
    private ?bool $favoritos = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getGameId(): ?string
    {
        return $this->gameId;
    }

    public function setGameId(string $gameId): static
    {
        $this->gameId = $gameId;

        return $this;
    }



    public function getUsers(): ?Usuario
    {
        return $this->users;
    }

    public function setUsers(?Usuario $users): static
    {
        $this->users = $users;

        return $this;
    }

    public function isFavoritos(): ?bool
    {
        return $this->favoritos;
    }

    public function setFavoritos(bool $favoritos): static
    {
        $this->favoritos = $favoritos;

        return $this;
    }
}
