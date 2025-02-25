import { Experience } from '../types';

export const timeline: Experience[] = [
  
    {
      title: 'Full Stack Developer',
      company: 'INNOVATEWISE SOLUTIONS',
      period: 'Jan 2024 – Sep 2024',
      description: 'Developed a MERN stack application for AdviceBytes, optimizing user experience and reducing load time by 40% through React lazy loading, memoization, and Context API for efficient state management.',
      type: 'work' as const,
    },
    {
      title: 'Front End Developer Intern',
      company: 'KS VENTURES',
      period: 'June 2022 – Aug 2022',
      description: 'Redesigned company website using React and Bootstrap, achieving 25% faster page rendering. Streamlined CI/CD workflows using Git, reducing merge conflicts by 20%.',
      type: 'work' as const,
    },
    {
      title: 'Bachelor of Technology in Computer Science',
      company: 'JK LAKSHMIPAT UNIVERSITY',
      period: 'Aug 2020 – July 2024',
      description: 'Graduated with B.Tech in Computer Science, focusing on software engineering and cloud computing.',
      type: 'education' as const,
    },
  
]; 