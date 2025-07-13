// Common types for the consulting/legal/financial website

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  shortBio: string;
  profileImage: string;
  expertise: string[];
  education: string[];
  career: string[];
  email: string;
  phone?: string;
  linkedin?: string;
}

export interface Strength {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  clientName: string;
  clientLogo?: string;
  year: number;
  category: string;
  value?: string;
  duration?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  message: string;
  serviceType: string;
  preferredContact: 'email' | 'phone';
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  businessHours: string;
  mapUrl?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  children?: NavigationItem[];
}

export interface SEOMeta {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaText: string;
  ctaLink: string;
}

export interface SectionData {
  id: string;
  title: string;
  subtitle?: string;
  content: unknown;
  order: number;
  visible: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form states
export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  error?: string;
}

// Animation types
export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
}

// Modal types
export interface ModalState {
  isOpen: boolean;
  type?: string;
  data?: unknown;
} 