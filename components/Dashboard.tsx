
import React, { useEffect, useState } from 'react';
import { UserProfile, HealthMetrics } from '../types';
import { getHealthSummary } from '../services/preCodedDietService';

interface DashboardProps {
  profile: UserProfile;
  metrics: HealthMetrics;
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ profile, metrics, onNavigate }) => {
  const [summary, setSummary] = useState<string>("Analyzing your metrics...");

  useEffect(() => {
    const fetchSummary = async () => {
      setSummary("Analyzing your metrics...");
      const res = await getHealthSummary(profile, metrics);
      setSummary(res || "Consistency is the bridge between goals and accomplishment. Let's start today!");
    };
    fetchSummary();
  }, [profile.goal, profile.weight, profile.height]);

  const getBmiColor = (cat: string) => {
    if (cat === 'Normal') return 'text-green-500';
    if (cat === 'Underweight') return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Current BMI</span>
          <span className={`text-3xl font-black ${getBmiColor(metrics.bmiCategory)}`}>{metrics.bmi}</span>
          <span className="text-slate-500 text-[10px] mt-1 font-bold uppercase tracking-tighter">{metrics.bmiCategory}</span>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Target Calories</span>
          <span className="text-3xl font-black text-indigo-600">{metrics.dailyCalories}</span>
          <span className="text-slate-500 text-[10px] mt-1 font-bold uppercase tracking-tighter">kcal per day</span>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <svg className="w-5 h-5 text-indigo-100" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
            </svg>
          </div>
          <h3 className="text-xs font-black tracking-widest uppercase text-indigo-100">Health Summary</h3>
        </div>
        <p className="text-sm leading-relaxed opacity-95 font-medium italic">
          "{summary}"
        </p>
      </div>

      {/* Macros */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-slate-800 font-black uppercase text-xs tracking-widest">Daily Macro Targets</h3>
          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg uppercase tracking-widest">Precision</span>
        </div>
        <div className="space-y-5">
          <MacroBar label="Protein" value={metrics.macros.protein} max={250} color="bg-rose-500" unit="g" />
          <MacroBar label="Carbs" value={metrics.macros.carbs} max={400} color="bg-emerald-500" unit="g" />
          <MacroBar label="Fats" value={metrics.macros.fats} max={150} color="bg-amber-500" unit="g" />
        </div>
      </div>

      {/* Quick Status */}
      <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100 flex items-center justify-between group hover:bg-indigo-100/50 transition-colors">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600 group-hover:rotate-12 transition-transform">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-indigo-900 font-black text-sm uppercase tracking-tight">Today's Schedule</h4>
            <p className="text-indigo-600 text-[10px] font-black uppercase tracking-widest opacity-70">{profile.goal} Routine</p>
          </div>
        </div>
        <button 
          onClick={() => onNavigate('workout')}
          className="bg-indigo-600 text-white text-[10px] px-6 py-3 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-100 active:scale-95 transition-all hover:bg-indigo-700"
        >
          Start
        </button>
      </div>
    </div>
  );
};

const MacroBar: React.FC<{ label: string, value: number, max: number, color: string, unit: string }> = ({ label, value, max, color, unit }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        <span className="text-sm font-black text-slate-800">{value}<span className="text-[10px] text-slate-400 ml-0.5">{unit}</span></span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <div className={`h-full ${color} rounded-full transition-all duration-1000 ease-out shadow-sm`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default Dashboard;
