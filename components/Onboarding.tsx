
import React, { useState } from 'react';
import { UserProfile, Gender, ActivityLevel, FitnessGoal, DietPreference } from '../types';
import { ALLOWED_COUNTRIES } from '../constants';

interface OnboardingProps {
  onComplete: (data: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    gender: Gender.MALE,
    activityLevel: ActivityLevel.MODERATE,
    goal: FitnessGoal.GENERAL_FITNESS,
    dietPreference: DietPreference.STANDARD,
    country: 'Bangladesh'
  });

  const updateForm = (key: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const isFormValid = () => {
    if (step === 1) return formData.name && formData.age && formData.height && formData.weight;
    if (step === 3) return formData.country;
    return true;
  };

  const handleSubmit = () => {
    onComplete(formData as UserProfile);
  };

  return (
    <div className="min-h-screen bg-indigo-600 flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 text-slate-900 shadow-2xl transition-all duration-300">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-black text-slate-800">FitNation</h2>
          <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Step {step} of 3</span>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => updateForm('name', e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Age</label>
              <input
                type="number"
                value={formData.age || ''}
                onChange={(e) => updateForm('age', parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Years"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height || ''}
                  onChange={(e) => updateForm('height', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="cm"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) => updateForm('weight', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="kg"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Gender</label>
              <div className="flex gap-2">
                {[Gender.MALE, Gender.FEMALE].map((g) => (
                  <button
                    key={g}
                    onClick={() => updateForm('gender', g)}
                    className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${
                      formData.gender === g ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Activity Level</label>
              <select
                value={formData.activityLevel}
                onChange={(e) => updateForm('activityLevel', e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
              >
                {Object.values(ActivityLevel).map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Primary Goal</label>
              <div className="grid grid-cols-1 gap-2">
                {Object.values(FitnessGoal).map(goal => (
                  <button
                    key={goal}
                    onClick={() => updateForm('goal', goal)}
                    className={`text-left px-4 py-3 rounded-xl border-2 font-bold transition-all text-sm ${
                      formData.goal === goal ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-100'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Country</label>
              <select
                value={formData.country || ''}
                onChange={(e) => updateForm('country', e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
              >
                <option value="" disabled>Select your country</option>
                {ALLOWED_COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Diet plans are optimized for major world regions.</p>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Diet Preference</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(DietPreference).map(pref => (
                  <button
                    key={pref}
                    onClick={() => updateForm('dietPreference', pref)}
                    className={`px-4 py-3 rounded-xl border-2 font-bold transition-all text-sm ${
                      formData.dietPreference === pref ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-100'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-yellow-800 text-[10px] font-medium leading-relaxed uppercase tracking-tighter">
              <strong>Legal Disclaimer:</strong> FitNation provides fitness guidance only. Consult a doctor before starting new programs.
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 py-4 text-slate-600 font-bold bg-slate-100 rounded-2xl active:scale-95 transition-all"
            >
              Back
            </button>
          )}
          <button
            onClick={step === 3 ? handleSubmit : nextStep}
            disabled={!isFormValid()}
            className={`flex-[2] py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 transition-all active:scale-95 ${
              isFormValid() ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {step === 3 ? 'Get Started' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
