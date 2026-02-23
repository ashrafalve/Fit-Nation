
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female'
}

export enum ActivityLevel {
  SEDENTARY = 'Sedentary (Office job, little exercise)',
  LIGHT = 'Lightly Active (1-3 days/week)',
  MODERATE = 'Moderately Active (3-5 days/week)',
  VERY_ACTIVE = 'Very Active (6-7 days/week)',
  EXTRA_ACTIVE = 'Extra Active (Physical job + 2x training)'
}

export enum FitnessGoal {
  SIX_PACK = 'Six Pack Abs',
  FAT_LOSS = 'Fat Loss',
  MUSCLE_GAIN = 'Muscle Gain',
  STRENGTH = 'Strength & Power',
  GENERAL_FITNESS = 'General Fitness'
}

export enum DietPreference {
  STANDARD = 'Standard',
  VEGETARIAN = 'Vegetarian',
  HIGH_PROTEIN = 'High Protein',
  LOW_CARB = 'Low Carb'
}

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  country: string;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  dietPreference: DietPreference;
}

export interface HealthMetrics {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  tdee: number;
  dailyCalories: number;
  // Added 'fats' property to fix type errors across services
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export type FoodCategory = 'protein' | 'carb' | 'veg' | 'fruit' | 'dairy' | 'fat';

export interface FoodItem {
  id: string;
  name: string;
  serving: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  category: FoodCategory;
  regions: string[];
}

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  image: string; // URL for the exercise picture
  description?: string;
}

export interface DietPlan {
  breakfast: FoodItem[];
  lunch: FoodItem[];
  snacks: FoodItem[];
  dinner: FoodItem[];
}
