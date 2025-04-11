import { ProjectItem } from '../types';
import { PROJECT_URLS } from '../utils/urls';

export const projects: ProjectItem[] = [

   {
    title: "URL Shortener",
    details: "A production-ready full-stack URL shortener built with the MERN stack. Includes real-time analytics like location and device stats, along with QR code support.",
    image: "./url_shor.webp",
    techUsed: "MongoDB, Express, React, Node.js, Tailwind CSS, Vite, Recharts",
    problem: "No centralized, analytic-rich tool for sharing branded links easily.",
    solution: "Built a clean, responsive dashboard with dynamic redirects, device/geolocation analytics, and QR codes.",
    features: [
      "User authentication and dashboard",
      "Location and device analytics",
      "QR code generation",
      "Link shortening and redirection",
      "Vercel + Render deployment with CORS configuration"
    ],
    github: PROJECT_URLS.URL_SHORTNER.GITHUB,
    live: PROJECT_URLS.URL_SHORTNER.LIVE
  },
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
    github: PROJECT_URLS.FOODFLOW.GITHUB,

  },
  {
    title: "TOURISM IN RAJASTHAN",
    details: "Developed an online platform with HTML, CSS, and JavaScript for tourists visiting Rajasthan to locate popular tourist spots. Created a database in SQLite to reduce loading static file reducing 10% compile time provided by Django to store the locations along with the maps and general information.",
    image: "./tourism_in_raj.webp",
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
    github: PROJECT_URLS.RAJASTHAN_TOURISM.GITHUB,

  },
  {
    title: "Memories",
    details: " A full stack MERN application where users can add, edit, delete and view memories. It is a platform where users can share their memories with each other.",
    image: "./memories.webp",
    techUsed: "MongoDB, Express, React, Node.js",
    problem: "Managing token based authentication",
    solution: "Using JWT tokens for authentication",
    features: [
      "User authentication with JWT tokens",
      "CRUD operations for memories",
      "Responsive design for mobile devices",
      "Offline data caching",
      "Multi-language support"
    ],
    github: PROJECT_URLS.MEMORIES.GITHUB,
    
  },

 
];
