export interface PartsSupplier {
    fetchParts: (query: string) => Promise<Device[]>;
    authenticate?: () => Promise<void>;
    fetchPartDetails?: (partId: string) => Promise<[Part]>;
    addToCart?: (partId: string, quantity: number) => Promise<void>;
}

export type OperationResult = {
    IsSuccessful: boolean;
    ErrorMessage: string;
};

export type Device = {
    Artikelnummer: string;
    Hersteller: string;
    Artikelbezeichnung: string;
    Bruttopreis: number;
    Artikelthumbnail: string;
    Lagerbestand: number;
};
export type Part = {
    Artikelnummer: string;
    Name: string;
};