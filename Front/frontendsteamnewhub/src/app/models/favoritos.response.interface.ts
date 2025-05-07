export interface Favoritos {
    "@context": string;
    "@id":      string;
    "@type":    string;
    totalItems: number;
    member:     Member[];
}

export interface Member {
    gameId:    string;
    likes:     boolean;
    users:     string;
    favoritos: boolean;
}
