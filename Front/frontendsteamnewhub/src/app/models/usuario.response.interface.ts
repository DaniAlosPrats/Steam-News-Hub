export interface Usuario {
    "@context": string;
    "@id":      string;
    "@type":    string;
    totalItems: number;
    member:     Member[];
}

export interface Member {
     id:                 number;
    nombre:             string;
    contraseña:          string;
    favoritos:          string[];
    correoElectronico:  string;
}
