import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { StudentService } from '../services/studentService';
import { Student } from '../types';
import { Loader2, Palette, Trophy } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await StudentService.getAllStudents();
      setStudents(data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  // --- Data Processing ---

  // 1. Trending Skills
  const skillCounts: Record<string, number> = {};
  students.forEach(student => {
    student.skills.forEach(skill => {
      // Normalize skill names slightly
      const s = skill.trim();
      skillCounts[s] = (skillCounts[s] || 0) + 1;
    });
  });

  const skillData = Object.entries(skillCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // 2. Students by Year
  const yearCounts: Record<string, number> = {};
  students.forEach(student => {
    yearCounts[`Year ${student.year}`] = (yearCounts[`Year ${student.year}`] || 0) + 1;
  });
  const yearData = Object.entries(yearCounts).map(([name, value]) => ({ name, value }));

  // 3. Students by Branch
  const branchCounts: Record<string, number> = {};
  students.forEach(student => {
     // Shorten branch names for charts if needed
     const branchName = student.branch.replace('Engineering', 'Eng.').replace('and', '&');
     branchCounts[branchName] = (branchCounts[branchName] || 0) + 1;
  });
  const branchData = Object.entries(branchCounts).map(([name, value]) => ({ name, value }));

  // 4. Girls to Boys Ratio in Skills (Top 3 skills)
  const top3Skills = skillData.slice(0, 3).map(s => s.name);
  const genderSkillData = top3Skills.map(skill => {
    const maleCount = students.filter(s => s.skills.map(sk => sk.trim()).includes(skill) && s.gender === 'Male').length;
    const femaleCount = students.filter(s => s.skills.map(sk => sk.trim()).includes(skill) && s.gender === 'Female').length;
    // Mocking gender for sheets data if not present, usually sheets might not have gender, so we might see 0s
    // Fallback logic for visualization if gender is missing (often the case with simple forms)
    const otherCount = students.filter(s => s.skills.map(sk => sk.trim()).includes(skill) && s.gender !== 'Male' && s.gender !== 'Female').length;
    return { name: skill, Male: maleCount, Female: femaleCount, Other: otherCount };
  });

  // 5. Hobbies Analysis
  const hobbyCounts: Record<string, number> = {};
  students.forEach(s => {
    if (s.hobbies) {
        s.hobbies.forEach(h => {
            const clean = h.trim();
            if (clean) hobbyCounts[clean] = (hobbyCounts[clean] || 0) + 1;
        });
    }
  });
  const hobbyData = Object.entries(hobbyCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // 6. Sports Analysis
  const sportCounts: Record<string, number> = {};
  students.forEach(s => {
    if (s.sports) {
        s.sports.forEach(sp => {
            const clean = sp.trim();
            if (clean) sportCounts[clean] = (sportCounts[clean] || 0) + 1;
        });
    }
  });
  const sportData = Object.entries(sportCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);


  const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e', '#ec4899', '#f97316', '#eab308', '#22c55e'];
  const GENDER_COLORS = ['#3b82f6', '#ec4899', '#94a3b8']; 

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10 animate-fadeIn">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-heading font-bold text-white tracking-tight mb-2">Campus Insights</h1>
        <p className="font-ui text-textSecondary text-lg">Real-time data analysis of {students.length} students.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Top Skills Chart */}
        <div className="bg-panel border border-white/5 p-6 rounded-[24px] shadow-elev-1 hover:border-primary/30 transition-all lg:col-span-2">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
             <span className="w-2 h-6 bg-primary rounded-full"></span> Trending Skills
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '12px' }}
                />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={40}>
                    {skillData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Distribution */}
        <div className="bg-panel border border-white/5 p-6 rounded-[24px] shadow-elev-1 hover:border-secondary/30 transition-all">
          <h3 className="text-lg font-bold text-white mb-6">Branch Distribution</h3>
          <div className="h-64 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={branchData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {branchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '12px' }} />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" iconSize={8} wrapperStyle={{fontSize: '10px', color: '#cbd5e1'}} />
                </PieChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Hobbies Chart */}
        <div className="bg-panel border border-white/5 p-6 rounded-[24px] shadow-elev-1 hover:border-pink-500/30 transition-all">
           <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
             <Palette className="w-5 h-5 text-pink-500" /> Top Interests
           </h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={hobbyData} layout="vertical" margin={{ left: 40 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#1e293b" />
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} tickLine={false} />
                 <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '12px' }} />
                 <Bar dataKey="count" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={20} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Sports Chart */}
        <div className="bg-panel border border-white/5 p-6 rounded-[24px] shadow-elev-1 hover:border-emerald-500/30 transition-all">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
             <Trophy className="w-5 h-5 text-emerald-500" /> Sports Popularity
          </h3>
          <div className="h-64 flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sportData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                    label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {sportData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#10b981', '#34d399', '#6ee7b7', '#059669', '#047857'][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '12px' }} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" iconSize={8} wrapperStyle={{fontSize: '11px', color: '#cbd5e1'}} />
                </PieChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Gender Ratio by Skill */}
        <div className="bg-panel border border-white/5 p-6 rounded-[24px] shadow-elev-1 hover:border-cyan-400/30 transition-all lg:col-span-1">
           <h3 className="text-lg font-bold text-white mb-6">Skill Diversity</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={genderSkillData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                 <XAxis dataKey="name" tick={{fontSize: 11, fill: '#94a3b8'}} axisLine={false} />
                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', borderRadius: '12px' }} />
                 <Bar dataKey="Male" stackId="a" fill={GENDER_COLORS[0]} />
                 <Bar dataKey="Female" stackId="a" fill={GENDER_COLORS[1]} radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

      </div>
      
      <div className="mt-12 bg-gradient-to-r from-blue-900/40 to-violet-900/40 rounded-[24px] p-8 text-center text-white border border-white/10 backdrop-blur-md">
         <h2 className="text-2xl font-heading font-bold mb-2">Want to improve these stats?</h2>
         <p className="text-slate-300 mb-6 font-ui">Host a workshop or mentor a junior student to boost the campus skill rating.</p>
         <button className="bg-gradient-to-r from-green-400 to-pink-500 text-white px-8 py-3 rounded-[16px] font-bold hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all shadow-lg hover:-translate-y-1">
            Create Campus Event
         </button>
      </div>
    </div>
  );
};