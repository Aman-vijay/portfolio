import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Award, Target } from 'lucide-react';

interface LeetCodeGraphProps {
  darkMode: boolean;
}

interface SubmissionData {
  date: string;
  count: number;
}

const LeetCodeGraph: React.FC<LeetCodeGraphProps> = ({ darkMode }) => {
  const [submissionData, setSubmissionData] = useState<SubmissionData[]>([]);
  const [stats, setStats] = useState({
    totalSolved: 245,
    currentStreak: 12,
    maxStreak: 28,
    activeDays: 89
  });

  // Generate mock data for the last 365 days
  useEffect(() => {
    const generateMockData = () => {
      const data: SubmissionData[] = [];
      const today = new Date();
      
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Generate random submission count (0-5) with higher probability for recent dates
        const randomFactor = Math.random();
        let count = 0;
        
        if (randomFactor > 0.7) count = Math.floor(Math.random() * 3) + 1;
        if (randomFactor > 0.85) count = Math.floor(Math.random() * 2) + 3;
        if (randomFactor > 0.95) count = 5;
        
        data.push({
          date: date.toISOString().split('T')[0],
          count
        });
      }
      
      setSubmissionData(data);
    };

    generateMockData();
  }, []);

  const getIntensityColor = (count: number) => {
    if (count === 0) return darkMode ? '#1f2937' : '#f3f4f6';
    if (count === 1) return '#0d4f3c';
    if (count === 2) return '#00d084';
    if (count === 3) return '#26a641';
    if (count === 4) return '#39d353';
    return '#00ff88';
  };

  const getWeekData = () => {
    const weeks: SubmissionData[][] = [];
    let currentWeek: SubmissionData[] = [];
    
    submissionData.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === submissionData.length - 1) {
        weeks.push([...currentWeek]);
        currentWeek = [];
      }
    });
    
    return weeks;
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <section className={`py-16 relative ${
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
        : 'bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900'
    }`}>
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%2300f3ff' stroke-width='0.5' stroke-opacity='0.4'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3Ccircle cx='20' cy='20' r='1' fill='%2300f3ff'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className={`text-3xl font-bold font-mono text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-200'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400">{'>'}</span> LeetCode_Journey
        </motion.h2>

        <div className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { icon: Target, label: 'Total Solved', value: stats.totalSolved, color: 'text-green-400' },
              { icon: TrendingUp, label: 'Current Streak', value: `${stats.currentStreak} days`, color: 'text-orange-400' },
              { icon: Award, label: 'Max Streak', value: `${stats.maxStreak} days`, color: 'text-purple-400' },
              { icon: Calendar, label: 'Active Days', value: stats.activeDays, color: 'text-blue-400' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-xl border border-cyan-400/20 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300`}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="flex items-center space-x-3">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  <div>
                    <p className="text-xs font-mono text-gray-400">{stat.label}</p>
                    <p className="text-lg font-bold font-mono text-white">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Contribution Graph */}
          <motion.div
            className="p-6 rounded-xl border border-cyan-400/20 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mb-4">
              <h3 className="text-lg font-bold font-mono text-white mb-2">Daily Coding Activity</h3>
              <p className="text-sm font-mono text-gray-400">
                {stats.activeDays} contributions in the last year
              </p>
            </div>

            {/* Graph Container */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Month Labels */}
                <div className="flex mb-2">
                  {months.map((month, index) => (
                    <div key={index} className="flex-1 text-xs font-mono text-gray-400 text-center">
                      {month}
                    </div>
                  ))}
                </div>

                {/* Weekday Labels and Graph */}
                <div className="flex">
                  {/* Weekday Labels */}
                  <div className="flex flex-col mr-3">
                    {weekdays.map((day, index) => (
                      <div key={index} className="h-3 mb-1 text-xs font-mono text-gray-400 flex items-center">
                        {index % 2 === 1 ? day : ''}
                      </div>
                    ))}
                  </div>

                  {/* Contribution Grid */}
                  <div className="flex space-x-1">
                    {getWeekData().map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col space-y-1">
                        {week.map((day, dayIndex) => (
                          <motion.div
                            key={`${weekIndex}-${dayIndex}`}
                            className="w-3 h-3 rounded-sm cursor-pointer hover:ring-2 hover:ring-cyan-400/50 transition-all duration-200"
                            style={{ backgroundColor: getIntensityColor(day.count) }}
                            whileHover={{ scale: 1.2 }}
                            title={`${day.date}: ${day.count} submissions`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-gray-400">Less</span>
                    {[0, 1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: getIntensityColor(level) }}
                      />
                    ))}
                    <span className="text-xs font-mono text-gray-400">More</span>
                  </div>
                  <a
                    href={`https://leetcode.com/amanvijay04`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    View on LeetCode →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeetCodeGraph;