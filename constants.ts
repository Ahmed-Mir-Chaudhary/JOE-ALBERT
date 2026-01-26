
import { Photo, Service, Product, BlogPost } from './types';

export const PHOTOS: Photo[] = [
  { 
    id: '1', 
    url: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=1000', 
    category: 'Studio', 
    title: 'The Quiet Moment',
    description: 'A study of light and shadow, capturing the serene intensity of a fleeting moment in the studio.',
    metadata: { camera: 'Sony A7R IV', lens: '85mm f/1.4 G-Master', settings: '1/200s • f/2.0 • ISO 100' }
  },
  { 
    id: '2', 
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1000', 
    category: 'Headshots', 
    title: 'Executive Presence',
    description: 'Professional headshot focusing on confidence and clarity for high-level corporate identity.',
    metadata: { camera: 'Canon EOS R5', lens: '100mm f/2.8L Macro', settings: '1/160s • f/4.0 • ISO 200' }
  },
  { 
    id: '3', 
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000', 
    category: 'Corporate', 
    title: 'The Boardroom',
    description: 'Wide-angle perspective of architectural excellence in the modern corporate workplace.',
    metadata: { camera: 'Fujifilm GFX 100S', lens: '23mm f/4 R WR', settings: '1/60s • f/8.0 • ISO 400' }
  },
  { 
    id: '4', 
    url: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1000', 
    category: 'Location', 
    title: 'Urban Flow',
    description: 'Cinematic street photography capturing the vibrant energy of the golden hour in the city.',
    metadata: { camera: 'Leica Q2', lens: '28mm Summilux f/1.7', settings: '1/1000s • f/1.7 • ISO 100' }
  },
  { 
    id: '5', 
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000', 
    category: 'Real Estate', 
    title: 'Modern Living',
    description: 'Luxury interior photography emphasizing space, light, and architectural harmony.',
    metadata: { camera: 'Nikon Z9', lens: '14-24mm f/2.8S', settings: '1/15s • f/11 • ISO 100' }
  },
  { 
    id: '6', 
    url: 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&q=80&w=1000', 
    category: 'Studio', 
    title: 'Soft Light',
    description: 'Minimalist portraiture exploring the delicate texture of skin under diffused lighting.',
    metadata: { camera: 'Sony A7R IV', lens: '50mm f/1.2 G-Master', settings: '1/250s • f/1.2 • ISO 50' }
  },
  { 
    id: '7', 
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1000', 
    category: 'Headshots', 
    title: 'Confident Gaze',
    description: 'Engaging portraiture that breaks the fourth wall, establishing a direct connection with the viewer.',
    metadata: { camera: 'Canon EOS R5', lens: '85mm f/1.2L II', settings: '1/200s • f/1.8 • ISO 100' }
  },
  { 
    id: '8', 
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000', 
    category: 'Location', 
    title: 'Mountain Echo',
    description: 'Breathtaking landscape photography from the heart of the Rockies during blue hour.',
    metadata: { camera: 'Fujifilm GFX 100S', lens: '45-100mm f/4', settings: '30s • f/16 • ISO 100' }
  },
];

export const SERVICES: Service[] = [
  { id: 's1', title: 'Studio Session', price: '$275', description: 'One-hour session in our premium studio with 3 outfit changes.' },
  { id: 's2', title: 'Corporate Headshot', price: '$275', description: 'Professional lighting and posing for your business profile.' },
  { id: 's3', title: 'Digital Files', price: '$90', description: 'High-resolution digital negatives for personal or business use.' },
  { id: 's4', title: 'Location Fee', price: '$300', description: 'Bringing the studio to your preferred destination.' },
];

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Centennial Plaza 8×10', price: 40, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600' },
  { id: 'p2', name: 'Light-up Centennial Plaza', price: 70, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600' },
  { id: 'p3', name: 'HOF Lit for Damar', price: 275, image: 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=600' },
  { id: 'p4', name: 'Black Friday Gift Card', price: 100, originalPrice: 125, image: 'https://images.unsplash.com/photo-1549463599-242aa0dbb5c6?auto=format&fit=crop&q=80&w=600' },
];

export const BLOG_POSTS: BlogPost[] = [
  { id: 'b1', title: 'AI in Modern Portraits', category: 'AI', date: 'Oct 12, 2024', snippet: 'How we blend artificial intelligence with human touch.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800' },
  { id: 'b2', title: 'The Business of Vision', category: 'Business', date: 'Sep 28, 2024', snippet: 'Building a brand that speaks through the lens.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
  { id: 'b3', title: 'Life Behind the Shutter', category: 'Life', date: 'Sep 15, 2024', snippet: 'Daily inspirations and the pursuit of the perfect shot.', image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=800' },
];
