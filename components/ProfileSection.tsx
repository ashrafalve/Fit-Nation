
import React, { useState } from 'react';
import { UserProfile, HealthMetrics, ActivityLevel, FitnessGoal, DietPreference } from '../types';
import { ALLOWED_COUNTRIES } from '../constants';

interface ProfileSectionProps {
  profile: UserProfile;
  metrics: HealthMetrics;
  onUpdate: (data: UserProfile) => void;
  onReset: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile, metrics, onUpdate, onReset }) => {
  const [editing, setEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState<UserProfile>(profile);

  const save = () => {
    onUpdate(localProfile);
    setEditing(false);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-indigo-100 mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
          <span className="text-5xl font-black text-white">{profile.name?.[0] || 'U'}</span>
        </div>
        
        {editing ? (
          <div className="w-full space-y-4 text-left">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-1">Display Name</label>
              <input 
                className="w-full text-center text-2xl font-black text-slate-800 bg-slate-50 border-b-2 border-indigo-500 py-2 outline-none rounded-t-xl"
                value={localProfile.name}
                onChange={(e) => setLocalProfile({...localProfile, name: e.target.value})}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1 ml-1">Your Country</label>
               <select 
                className="w-full text-center text-sm font-bold text-slate-500 bg-slate-50 border-b border-slate-200 py-2 outline-none rounded-t-lg"
                value={localProfile.country}
                onChange={(e) => setLocalProfile({...localProfile, country: e.target.value})}
              >
                {ALLOWED_COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{profile.name || 'Anonymous User'}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-indigo-600 font-black uppercase text-[10px] tracking-[0.2em]">{profile.country}</p>
            </div>
          </>
        )}
      </div>

      <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-50 pb-4">
          <h3 className="font-black text-slate-400 uppercase text-[10px] tracking-widest">Profile Details</h3>
          <button 
            onClick={() => editing ? save() : setEditing(true)}
            className="text-xs font-black text-indigo-600 uppercase tracking-widest px-5 py-2.5 bg-indigo-50 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all duration-300 active:scale-95"
          >
            {editing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatBox label="Age" value={`${profile.age} yrs`} />
          <StatBox label="Weight" value={`${profile.weight} kg`} />
          <StatBox label="Height" value={`${profile.height} cm`} />
          <StatBox label="Sex" value={profile.gender} />
        </div>

        <div className="space-y-4 pt-4">
          <ProfileItem label="Current Goal" value={profile.goal} />
          <ProfileItem label="Lifestyle" value={profile.activityLevel.split('(')[0]} />
          <ProfileItem label="Preference" value={profile.dietPreference} />
          <div className="flex justify-between items-center py-3 bg-indigo-600 px-6 rounded-[1.5rem] shadow-lg shadow-indigo-100">
             <span className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Daily Burn Target</span>
             <span className="text-lg font-black text-white">{metrics.dailyCalories} <span className="text-[10px] opacity-70 uppercase tracking-tighter">kcal</span></span>
          </div>
        </div>

        {/* Danger Zone Section */}
        <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
            <h3 className="font-black text-rose-500 uppercase text-[10px] tracking-widest">Danger Zone</h3>
          </div>
          
          <div className="bg-rose-50/50 p-6 rounded-[2rem] border border-rose-100 space-y-4">
            <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
              Clearing all data will permanently delete your profile, workout history, and saved diet plans. You will be logged out and returned to the onboarding screen.
            </p>
            <button 
              onClick={onReset}
              className="w-full py-4 text-[10px] font-black text-white bg-rose-500 rounded-2xl hover:bg-rose-600 transition-all active:scale-95 shadow-lg shadow-rose-200 uppercase tracking-widest"
            >
              Clear All My Data
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 bg-slate-900 text-slate-500 text-[10px] leading-relaxed rounded-[2.5rem] shadow-2xl">
        <div className="flex items-center gap-2 mb-4">
           <div className="w-8 h-8 bg-rose-500/10 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
           </div>
           <p className="font-black text-white tracking-widest uppercase">Medical Advisory</p>
        </div>
        The information in FitNation is intended for educational purposes. We recommend consulting a healthcare professional before starting any new fitness program or diet.
      </div>
    </div>
  );
};

const StatBox: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="bg-slate-50 p-4 rounded-[1.2rem] border border-slate-100/50 hover:bg-white hover:shadow-md transition-all duration-300">
    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">{label}</span>
    <span className="text-sm font-black text-slate-800">{value}</span>
  </div>
);

const ProfileItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 px-4 hover:bg-slate-50 rounded-xl transition-colors">
    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    <span className="text-xs font-black text-slate-700">{value}</span>
  </div>
);

export default ProfileSection;
