export interface ProjectItem {
    title: string;
    details: string;
    image: string;
    techUsed: string;
    problem: string;
    solution: string;
    features: string[];
    github?: string; // Optional
    live?: string; // Optional
  } 

  export interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
    type: 'work' | 'education';
  }
  

