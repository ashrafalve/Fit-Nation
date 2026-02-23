
import { FitnessGoal, ActivityLevel, FoodItem, WorkoutExercise } from './types';

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHT]: 1.375,
  [ActivityLevel.MODERATE]: 1.55,
  [ActivityLevel.VERY_ACTIVE]: 1.725,
  [ActivityLevel.EXTRA_ACTIVE]: 1.9,
};

export const ALLOWED_COUNTRIES = [
  'Bangladesh', 'India', 'Pakistan', 'USA', 'China', 'Sri Lanka', 'Germany'
];

export const WORKOUT_LIBRARY: Record<FitnessGoal, { warmup: WorkoutExercise[], main: WorkoutExercise[], cooldown: WorkoutExercise[] }> = {
  [FitnessGoal.SIX_PACK]: {
    warmup: [
      { name: 'Jumping Jacks', sets: 2, reps: '30 sec', rest: '15 sec', image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Cat-Cow Stretch', sets: 1, reps: '10 reps', rest: '0 sec', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200&h=200' }
    ],
    main: [
      { name: 'Bicycle Crunches', sets: 4, reps: '20 reps', rest: '30 sec', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '12-15 reps', rest: '45 sec', image: 'https://images.unsplash.com/photo-1598266663336-227bbdb99903?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Plank', sets: 3, reps: '60 sec', rest: '45 sec', image: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Russian Twists', sets: 3, reps: '30 reps', rest: '30 sec', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=200&h=200' }
    ],
    cooldown: [
      { name: 'Cobra Stretch', sets: 1, reps: '30 sec', rest: '0 sec', image: 'https://images.unsplash.com/photo-1552196564-972d3993b46e?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Child\'s Pose', sets: 1, reps: '30 sec', rest: '0 sec', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=200&h=200' }
    ]
  },
  [FitnessGoal.FAT_LOSS]: {
    warmup: [{ name: 'Light Jog', sets: 1, reps: '5 min', rest: '0 sec', image: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&q=80&w=200&h=200' }],
    main: [
      { name: 'Burpees', sets: 4, reps: '15 reps', rest: '60 sec', image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Bodyweight Squats', sets: 4, reps: '20 reps', rest: '45 sec', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Mountain Climbers', sets: 3, reps: '45 sec', rest: '30 sec', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Pushups', sets: 3, reps: 'Max effort', rest: '60 sec', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=200&h=200' }
    ],
    cooldown: [{ name: 'Static Stretch', sets: 1, reps: '5 min', rest: '0 sec', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200&h=200' }]
  },
  [FitnessGoal.MUSCLE_GAIN]: {
    warmup: [{ name: 'Arm Circles', sets: 2, reps: '15 reps', rest: '15 sec', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=200&h=200' }],
    main: [
      { name: 'Bench Press', sets: 4, reps: '8-12 reps', rest: '90 sec', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Barbell Squat', sets: 4, reps: '8-12 reps', rest: '90 sec', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Deadlift', sets: 3, reps: '5-8 reps', rest: '120 sec', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Pull-ups', sets: 3, reps: 'To failure', rest: '90 sec', image: 'https://images.unsplash.com/photo-1598266663336-227bbdb99903?auto=format&fit=crop&q=80&w=200&h=200' }
    ],
    cooldown: [{ name: 'Foam Rolling', sets: 1, reps: '5 min', rest: '0 sec', image: 'https://images.unsplash.com/photo-1600881333168-2ed49ca24a42?auto=format&fit=crop&q=80&w=200&h=200' }]
  },
  [FitnessGoal.STRENGTH]: {
    warmup: [{ name: 'Joint Mobility', sets: 1, reps: '5 min', rest: '0 sec', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=200&h=200' }],
    main: [
      { name: 'Heavy Bench Press', sets: 5, reps: '5 reps', rest: '180 sec', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Heavy Squat', sets: 5, reps: '5 reps', rest: '180 sec', image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Overhead Press', sets: 5, reps: '5 reps', rest: '120 sec', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=200&h=200' }
    ],
    cooldown: [{ name: 'Deep Breathing', sets: 1, reps: '3 min', rest: '0 sec', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=200&h=200' }]
  },
  [FitnessGoal.GENERAL_FITNESS]: {
    warmup: [{ name: 'Brisk Walk', sets: 1, reps: '10 min', rest: '0 sec', image: 'https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?auto=format&fit=crop&q=80&w=200&h=200' }],
    main: [
      { name: 'Cycling', sets: 1, reps: '30 min', rest: '0 sec', image: 'https://images.unsplash.com/photo-1534151303200-f4637d759398?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Lunges', sets: 3, reps: '12 reps', rest: '30 sec', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=200&h=200' },
      { name: 'Pushups', sets: 3, reps: '15 reps', rest: '30 sec', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=200&h=200' }
    ],
    cooldown: [{ name: 'Yoga Stretch', sets: 1, reps: '10 min', rest: '0 sec', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=200&h=200' }]
  }
};
