import { ProjectItem } from '../types';
import { PROJECT_URLS } from '../utils/urls';

export const projects: ProjectItem[] = [
  {
    title: "BoxDrop - A place to upload your files",
    details:
      "A sleek, production-ready image upload platform with real-time file management, Clerk authentication, and serverless ImageKit storage. Designed for performance, simplicity, and modern UX.",
    image: "./boxdrop.png",
    techUsed:
      "Next.js, TypeScript, Clerk, ImageKit, Tailwind CSS, HeroUI, PostgreSQL, Drizzle ORM, Neondb",
    problem:
      "Users needed a privacy-focused, cloud-based image manager with analytics and fast uploads without compromising on design or performance.",
    solution:
      "Built a responsive, authenticated file manager with drag-and-drop uploads, profile handling, and folder support using serverless storage.",
    features: [
      "Clerk-powered authentication and user session management",
      "Drag-and-drop image uploads with real-time previews",
      "Secure file storage and optimization via ImageKit",
      "User profile settings and avatar syncing",
      "Modern UI/UX with HeroUI components and responsive layout"
    ],
    github: PROJECT_URLS.BOX_DROP.GITHUB,
    live: PROJECT_URLS.BOX_DROP.LIVE,
  },
  {
    title: "URL Shortener",
    details:
      "A production-ready full-stack URL shortener built with the MERN stack. Includes real-time analytics like location and device stats, along with QR code support.",
    image: "./url_shor.webp",
    techUsed: "MongoDB, Express, React, Node.js, Tailwind CSS, Vite, Recharts",
    problem: "No centralized, analytic-rich tool for sharing branded links easily.",
    solution:
      "Built a clean, responsive dashboard with dynamic redirects, device/geolocation analytics, and QR codes.",
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
    details:
      "Architected 5+ containerized microservices using Docker, improving deployment efficiency by 50%. Configured NGINX reverse proxy to manage 100 concurrent requests, achieving 99.9% uptime on AWS EC2.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    techUsed: "Docker, NGINX, AWS EC2, Node.js, Redis",
    problem: "High deployment time and low uptime in a monolithic architecture.",
    solution:
      "Implemented containerized microservices with load balancing and caching.",
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
    title: "Tourism in Rajasthan",
    details:
      "Developed an online platform with HTML, CSS, and JavaScript for tourists visiting Rajasthan to locate popular tourist spots, with map integration and optimized backend via Django and SQLite.",
    image: "./tourism_in_raj.webp",
    techUsed: "HTML, CSS, JavaScript, SQLite, Django",
    problem: "Difficulty in locating and accessing tourist information efficiently.",
    solution:
      "Created an interactive platform with optimized data storage and retrieval.",
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
    title: "Video Editor Backend",
    details:
      "Modular backend system to handle video uploads, processing, and editing queues using microservices and BullMQ. Optimized with Redis queues and future-ready for features like watermarking and compression.",
    image: "./video_editor.webp",
    techUsed: "Node.js, Express, Redis, BullMQ, FFmpeg, Docker",
    problem:
      "Needed an efficient queue-based architecture to manage resource-heavy video operations in parallel.",
    solution:
      "Designed a queue-driven system using Redis and BullMQ to orchestrate editing jobs, improving responsiveness and scalability.",
    features: [
      "Queue-based video processing pipeline",
      "Multiple job types: trimming, merging, adding audio",
      "Redis + BullMQ for job queueing and retries",
      "Dockerized backend architecture for portability",
      "Clear modular separation of controllers and services"
    ],
    github: PROJECT_URLS.VIDEO_EDITOR.GITHUB,
  },
  {
    title: "L4 TCP Load Balancer",
    details:
      "Custom-built Layer 4 TCP load balancer in Node.js that distributes raw TCP connections between multiple backend servers, simulating real-world proxy scenarios.",
    image: "./load_balancer.webp",
    techUsed: "Node.js, Net module, TCP, Sockets, Multithreading",
    problem: "Wanted to understand low-level networking and build a load balancer from scratch.",
    solution:
      "Developed a TCP proxy server using Node.js `net` module, capable of handling basic load balancing based on round-robin.",
    features: [
      "Pure TCP socket management",
      "Dynamic backend registration",
      "Round-robin load distribution",
      "Connection logging and client metadata capture",
      "Foundation for Layer 7 HTTP upgrade"
    ],
    github: PROJECT_URLS.LOAD_BALANCER.GITHUB,
  },
 
  {
    title: "Memories",
    details:
      "A full stack MERN application where users can add, edit, delete and view memories. It is a platform where users can share their memories with each other.",
    image: "./memories.webp",
    techUsed: "MongoDB, Express, React, Node.js",
    problem: "Managing token-based authentication and secure CRUD operations.",
    solution: "Used JWT for authentication and built protected memory routes.",
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
