<?php

namespace App\Entity;

use App\Repository\UsuarioRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: UsuarioRepository::class)]
#[ApiResource]
class Usuario
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    private ?string $contrseña = null;

    #[ORM\Column(length: 255)]
    private ?string $correo_electronico = null;

    /**
     * @var Collection<int, Favoritos>
     */
    #[ORM\OneToMany(targetEntity: Favoritos::class, mappedBy: 'users')]
    private Collection $favoritos;

    public function __construct()
    {
        $this->favoritos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): static
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getContrseña(): ?string
    {
        return $this->contrseña;
    }

    public function setContrseña(string $contrseña): static
    {
        $this->contrseña = $contrseña;

        return $this;
    }

    public function getCorreoElectronico(): ?string
    {
        return $this->correo_electronico;
    }

    public function setCorreoElectronico(string $correo_electronico): static
    {
        $this->correo_electronico = $correo_electronico;

        return $this;
    }

    /**
     * @return Collection<int, Favoritos>
     */
    public function getFavoritos(): Collection
    {
        return $this->favoritos;
    }

    public function addFavorito(Favoritos $favorito): static
    {
        if (!$this->favoritos->contains($favorito)) {
            $this->favoritos->add($favorito);
            $favorito->setUsers($this);
        }

        return $this;
    }

    public function removeFavorito(Favoritos $favorito): static
    {
        if ($this->favoritos->removeElement($favorito)) {
            // set the owning side to null (unless already changed)
            if ($favorito->getUsers() === $this) {
                $favorito->setUsers(null);
            }
        }

        return $this;
    }
}
