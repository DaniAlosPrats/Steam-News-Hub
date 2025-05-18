export interface Favoritos {
    "@context": string;
    "@id":      string;
    "@type":    string;
    totalItems: number;
    member:     Member[];
}

export interface Member {
     id:                 number;
    gameId:    string;
    users:     string;
    favoritos: boolean;
}
