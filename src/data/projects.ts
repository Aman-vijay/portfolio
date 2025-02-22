import { ProjectItem } from '../types';

export const projects: ProjectItem[] = [
  {
    title: "FOODFLOW MICROSERVICES",
    details: "Architected 5+ containerized microservices using Docker, improving deployment efficiency by 50%. Configured NGINX reverse proxy to manage 100 concurrent requests, achieving 99.9% uptime on AWS EC2.",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    techUsed: "Docker, NGINX, AWS EC2, Node.js, Redis",
    problem: "High deployment time and low uptime in a monolithic architecture.",
    solution: "Implemented containerized microservices with load balancing and caching.",
    features: [
      "Containerized microservices for scalable deployment",
      "NGINX reverse proxy for load balancing",
      "Redis caching for improved performance",
      "Auto-scaling configuration on AWS EC2",
      "Centralized logging and monitoring"
    ],
    github: "https://github.com/yourusername/foodflow",
    live: "https://foodflow-demo.com"
  },
  {
    title: "TOURISM IN RAJASTHAN",
    details: "Developed an online platform with HTML, CSS, and JavaScript for tourists visiting Rajasthan to locate popular tourist spots. Created a database in SQLite to reduce loading static file reducing 10% compile time provided by Django to store the locations along with the maps and general information.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    techUsed: "HTML, CSS, JavaScript, SQLite, Django",
    problem: "Difficulty in locating and accessing tourist information efficiently.",
    solution: "Created an interactive platform with optimized data storage and retrieval.",
    features: [
      "Interactive maps with location markers",
      "Optimized database queries for fast loading",
      "Responsive design for mobile devices",
      "Offline data caching",
      "Multi-language support"
    ],
    github: "https://github.com/yourusername/rajasthan-tourism",
    live: "https://rajasthan-tourism-demo.com"
  }
]; 