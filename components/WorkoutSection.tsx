
import React, { useState, useEffect } from 'react';
import { UserProfile, WorkoutExercise, FitnessGoal } from '../types';
import { WORKOUT_LIBRARY } from '../constants';

interface WorkoutSectionProps {
  profile: UserProfile;
}

const WorkoutSection: React.FC<WorkoutSectionProps> = ({ profile }) => {
  const routine = WORKOUT_LIBRARY[profile.goal];
  const storageKey = `fitnation_workout_progress_${profile.goal}`;

  const [completed, setCompleted] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify([...completed]));
  }, [completed, storageKey]);

  const toggleComplete = (name: string) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const totalExercises = routine.warmup.length + routine.main.length + routine.cooldown.length;
  const progress = Math.round((completed.size / totalExercises) * 100);



  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-700">
          <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L6.28 3.43L4.86 2L3.43 3.43L2 2L2 22L3.43 20.57L4.86 22L6.28 20.57L7.71 22L9.14 20.57L10.57 22L12 18.57L8.43 15L17 6.43L20.57 10L22 8.57L20.57 7.14L22 5.71L20.57 4.29L22 2.86L20.57 1.43" /></svg>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-black tracking-tight">{profile.goal} Routine</h2>
            <p className="text-[10px] text-indigo-400 font-black tracking-[0.3em] uppercase mt-1">Daily Schedule</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-indigo-400">{progress}%</span>
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Completed</p>
          </div>
        </div>
        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-indigo-500 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(79,70,229,0.5)]" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="space-y-10">
        <WorkoutPhase
          title="Warm-up"
          exercises={routine.warmup}
          completed={completed}
          onToggle={toggleComplete}
        />
        <WorkoutPhase
          title="Main Workout"
          exercises={routine.main}
          completed={completed}
          onToggle={toggleComplete}
        />
        <WorkoutPhase
          title="Cool-down"
          exercises={routine.cooldown}
          completed={completed}
          onToggle={toggleComplete}
        />
      </div>

      <div className="flex justify-center pt-8">
        <button
          onClick={() => setShowResetConfirm(true)}
          className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-all active:scale-95"
        >
          Reset Session Progress
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] p-6 w-full max-w-sm shadow-2xl scale-100 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-black text-slate-800 mb-2">Reset Progress?</h3>
              <p className="text-sm text-slate-500 font-medium">This will uncheck all completed exercises for today. This action cannot be undone.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="py-3.5 px-4 rounded-xl font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setCompleted(new Set());
                  setShowResetConfirm(false);
                }}
                className="py-3.5 px-4 rounded-xl font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all active:scale-95"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const WorkoutPhase: React.FC<{ title: string, exercises: WorkoutExercise[], completed: Set<string>, onToggle: (n: string) => void }> = ({ title, exercises, completed, onToggle }) => (
  <div>
    <div className="flex items-center gap-3 mb-5 ml-2">
      <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.25em]">{title}</h3>
      <div className="h-px bg-slate-100 flex-1"></div>
    </div>
    <div className="space-y-4">
      {exercises.map((ex) => (
        <div
          key={ex.name}
          onClick={() => onToggle(ex.name)}
          className={`bg-white p-4 rounded-[2rem] border border-slate-100 flex items-center gap-4 transition-all cursor-pointer ${completed.has(ex.name) ? 'opacity-50 bg-slate-50' : 'shadow-sm hover:shadow-md active:scale-[0.98]'
            }`}
        >
          {/* Exercise Image Thumbnail */}
          <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden shadow-sm">
            <img
              src={ex.image}
              alt={ex.name}
              className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all"
            />
            {completed.has(ex.name) && (
              <div className="absolute inset-0 bg-indigo-600/60 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <p className={`text-base font-black truncate ${completed.has(ex.name) ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                  {ex.name}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{ex.sets} SETS</span>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{ex.reps}</span>
                  <span className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">{ex.rest} REST</span>
                </div>
              </div>
              <div className={`p-2 rounded-xl transition-colors ${completed.has(ex.name) ? 'bg-slate-100' : 'bg-indigo-50 text-indigo-600'}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default WorkoutSection;
