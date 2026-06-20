export interface Industry {
  id: string;
  name: string;
  description: string;
  demoPrompt: string;
  demoOutput: string;
  suggestions: string[];
}

export interface KeyFeature {
  id: string;
  name: string;
  description: string;
  gradient: string;
  icon: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  iconName: string;
}

export interface Integration {
  name: string;
  category: string;
  logo: string;
}

export interface Testimonial {
  text: string;
  author: string;
  handle: string;
  avatar: string;
  verified: boolean;
  size: 'small' | 'medium' | 'large';
}
