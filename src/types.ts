export interface Lesson {
  titleAr: string;
  titleFr: string;
  durationAr: string;
  durationFr: string;
}

export interface Course {
  id: string;
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  category: 'crafts' | 'tech' | 'hse';
  durationAr: string;
  durationFr: string;
  price: number;
  currencyAr: string;
  currencyFr: string;
  instructorId: string;
  image: string;
  bannerImage: string;
  lecturesCount: number;
  levelAr: string;
  levelFr: string;
  lessons: Lesson[];
  detailsAr: string;
  detailsFr: string;
  tagsAr: string[];
  tagsFr: string[];
  accentColor: string;
}

export interface Instructor {
  id: string;
  nameAr: string;
  nameFr: string;
  roleAr: string;
  roleFr: string;
  bioAr: string;
  bioFr: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  certificationsAr?: string[];
  certificationsFr?: string[];
  linkedin?: string;
}

export interface Testimonial {
  id: string;
  authorAr: string;
  authorFr: string;
  roleAr: string;
  roleFr: string;
  rating: number;
  contentAr: string;
  contentFr: string;
  avatar: string;
}

export interface RegistrationInput {
  fullName: string;
  email: string;
  phone: string;
  courseId: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredSchedule: 'morning' | 'evening' | 'weekend';
}
