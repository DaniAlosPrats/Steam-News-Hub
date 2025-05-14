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
    likes:     boolean;
    users:     string;
    favoritos: boolean;
}
