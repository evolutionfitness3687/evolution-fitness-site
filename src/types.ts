export interface HeroContent {
  headline: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

export interface AboutContent {
  title: string;
  philosophy: string;
  story: string;
  pillars: {
    title: string;
    description: string;
  }[];
}

export interface Modality {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  isActive: boolean;
  order: number;
  isReturningSoon?: boolean; // For "Jump" (previsto para retornar)
}

export interface GalleryPhoto {
  id: string;
  title: string;
  description?: string;
  altText: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export type VideoType = 'upload' | 'youtube' | 'instagram';

export interface VideoItem {
  id: string;
  title: string;
  description?: string;
  type: VideoType;
  url: string;
  coverImage?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  studentName: string;
  text: string;
  photoUrl?: string;
  date?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export interface OperatingHours {
  id: string;
  dayKey: string;
  dayLabel: string;
  hours: string;
  isOpen: boolean;
  order: number;
}

export interface ContactInfo {
  studioName: string;
  address: string;
  cityState: string;
  zipCode: string;
  phoneDisplay: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  googleMapsUrl: string;
}

export interface SiteData {
  hero: HeroContent;
  about: AboutContent;
  modalities: Modality[];
  gallery: GalleryPhoto[];
  videos: VideoItem[];
  testimonials: Testimonial[];
  hours: OperatingHours[];
  contact: ContactInfo;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: 'admin';
}
