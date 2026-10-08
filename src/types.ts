export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  tags: string[];
  duration: string;
  stipend: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

export interface Application {
  internshipId: string;
  name: string;
  email: string;
  coverNote: string;
}

export interface Filters {
  query: string;
  location: string;
  category: string;
}

export const ALL = "all";
