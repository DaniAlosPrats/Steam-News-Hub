<?php

namespace App\Entity;

use App\Repository\FavoritosRepository;
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

    #[ORM\Column(length: 255)]
    private ?string $Game_Id = null;

    #[ORM\Column]
    private ?bool $Me_gusta = null;

    #[ORM\ManyToOne(inversedBy: 'favoritos')]
    private ?Usuario $User = null;

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
        return $this->Game_Id;
    }

    public function setGameId(string $Game_Id): static
    {
        $this->Game_Id = $Game_Id;

        return $this;
    }

    public function isMeGusta(): ?bool
    {
        return $this->Me_gusta;
    }

    public function setMeGusta(bool $Me_gusta): static
    {
        $this->Me_gusta = $Me_gusta;

        return $this;
    }

    public function getUser(): ?Usuario
    {
        return $this->User;
    }

    public function setUser(?Usuario $User): static
    {
        $this->User = $User;

        return $this;
    }
}
