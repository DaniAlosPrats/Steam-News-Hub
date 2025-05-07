export interface Usuario {
    "@context": string;
    "@id":      string;
    "@type":    string;
    totalItems: number;
    member:     Member[];
}

export interface Member {
    nombre:             string;
    contrseña:          string;
    correo_electronico: string;
    favoritos:          string[];
    correoElectronico:  string;
}
