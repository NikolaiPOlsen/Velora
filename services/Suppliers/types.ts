export interface PartsSupplier {
    fetchParts: (query: string) => Promise<Device[]>;
    authenticate?: () => Promise<void>;
    fetchPartDetails?: (partId: string) => Promise<[Part]>;
    fetchPartPhotos?: (partId: string) => Promise<string[]>;
    addToCart?: (partId: string, quantity: number) => Promise<void>;
}

export type OperationResult = {
    IsSuccessful: boolean;
    ErrorMessage: string;
};

export type Device = {
    Geraeteid: string;
    Name: string;
    Price: number;
    Photos: string;
};

export type Part = {
    Artikelnummer: string;
    Name: string;
};