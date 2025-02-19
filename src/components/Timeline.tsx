import React from 'react';
import { motion } from 'framer-motion';

// Define the shape of an experience object
interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

// Define the props for the Timeline component if needed
interface TimelineProps {
  experiences: Experience[];
}

export const Timeline: React.FC<TimelineProps> = ({ experiences }: TimelineProps) => {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-600"></div>

      {/* Timeline Items */}
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Content */}
            <div className="w-1/2 px-6">
              <motion.div 
                className={`bg-white p-6 rounded-lg shadow-md ${index % 2 === 0 ? 'mr-4' : 'ml-4'}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold">{exp.title}</h3>
                <p className="text-blue-600 font-medium">{exp.company}</p>
                <p className="text-gray-500 text-sm">{exp.period}</p>
                <p className="mt-2 text-gray-600">{exp.description}</p>
              </motion.div>
            </div>

            {/* Circle Marker */}
            <motion.div 
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.2 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Example usage of the Timeline component
const exampleExperiences: Experience[] = [
  {
    title: 'Software Engineer',
    company: 'Tech Corp',
    period: 'Jan 2020 - Present',
    description: 'Developing web applications using React and TypeScript.',
  },
  {
    title: 'Junior Developer',
    company: 'Web Solutions',
    period: 'Jun 2018 - Dec 2019',
    description: 'Worked on various client projects, focusing on front-end development.',
  },
];

// Render the Timeline component
const App: React.FC = () => (
  <Timeline experiences={exampleExperiences} />
);

export default App;