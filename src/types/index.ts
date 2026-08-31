export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  instructor: string;
  duration: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  rating: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  featured?: boolean;
}

export type CourseCategory =
  | 'Foundation & AI'
  | 'Comprehensive Development'
  | 'Advanced Web';

export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface Registration {
  id: string;
  data: RegistrationData;
  courses: Course[];
  totalPrice: number;
  createdAt: string;
}
