
export interface PhotoMetadata {
  camera: string;
  lens: string;
  settings: string;
}

export interface Photo {
  id: string;
  url: string;
  category: 'Headshots' | 'Corporate' | 'Studio' | 'Location' | 'Real Estate';
  title: string;
  description?: string;
  metadata?: PhotoMetadata;
}

export interface Service {
  id: string;
  title: string;
  price: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  snippet: string;
  image: string;
}
