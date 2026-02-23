
import React, { useState, useEffect, useMemo } from 'react';
import { UserProfile, HealthMetrics, Gender, ActivityLevel, FitnessGoal, DietPreference } from './types';
import { calculateMetrics } from './services/calculations';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Navigation from './components/Navigation';
import DietSection from './components/DietSection';
import WorkoutSection from './components/WorkoutSection';
import ProfileSection from './components/ProfileSection';
import Chatbot from './components/Chatbot';

export type View = 'dashboard' | 'diet' | 'workout' | 'profile';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('fitnation_profile');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [activeView, setActiveView] = useState<View>('dashboard');

  const metrics = useMemo(() => {
    return profile ? calculateMetrics(profile) : null;
  }, [profile]);

  const handleOnboardingComplete = (data: UserProfile) => {
    setProfile(data);
    localStorage.setItem('fitnation_profile', JSON.stringify(data));
    setActiveView('dashboard');
  };

  const handleUpdateProfile = (data: UserProfile) => {
    setProfile(data);
    localStorage.setItem('fitnation_profile', JSON.stringify(data));
    // Clear cached diet when profile changes to trigger fresh AI generation
    localStorage.removeItem('fitnation_cached_diet');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to start over? All your progress and data will be permanently deleted.')) {
      localStorage.clear(); // Comprehensive reset
      setProfile(null);
      // Forcing a reload ensures all React states are wiped and we land fresh on step 1 of onboarding
      window.location.reload();
    }
  };

  if (!profile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-28">
      <header className="bg-white border-b border-slate-200 px-4 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">FitNation</h1>
        </div>
        <div className="text-[10px] bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-black uppercase tracking-widest border border-indigo-100">
          {profile.goal}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {activeView === 'dashboard' && metrics && (
          <Dashboard 
            profile={profile} 
            metrics={metrics} 
            onNavigate={(view) => setActiveView(view as View)} 
          />
        )}
        {activeView === 'diet' && metrics && (
          <DietSection profile={profile} metrics={metrics} />
        )}
        {activeView === 'workout' && (
          <WorkoutSection profile={profile} />
        )}
        {activeView === 'profile' && metrics && (
          <ProfileSection 
            profile={profile} 
            metrics={metrics} 
            onUpdate={handleUpdateProfile} 
            onReset={handleReset} 
          />
        )}
      </main>

      <Navigation activeView={activeView} onViewChange={(view) => setActiveView(view as View)} />
      
      {metrics && (
        <Chatbot profile={profile} metrics={metrics} />
      )}
    </div>
  );
};

export default App;
