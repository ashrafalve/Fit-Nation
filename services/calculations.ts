
// Import ACTIVITY_MULTIPLIERS from the correct constants file
import { UserProfile, HealthMetrics, Gender, FitnessGoal, DietPreference } from '../types';
import { ACTIVITY_MULTIPLIERS } from '../constants';

export const calculateMetrics = (profile: UserProfile): HealthMetrics => {
  const { weight, height, age, gender, activityLevel, goal, dietPreference } = profile;

  // BMI
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let bmiCategory = '';
  if (bmi < 18.5) bmiCategory = 'Underweight';
  else if (bmi < 25) bmiCategory = 'Normal';
  else if (bmi < 30) bmiCategory = 'Overweight';
  else bmiCategory = 'Obese';

  // BMR (Mifflin-St Jeor)
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = gender === Gender.MALE ? bmr + 5 : bmr - 161;

  // TDEE
  const tdee = bmr * ACTIVITY_MULTIPLIERS[activityLevel];

  // Daily Calories based on Goal
  let dailyCalories = tdee;
  if (goal === FitnessGoal.FAT_LOSS || goal === FitnessGoal.SIX_PACK) {
    dailyCalories -= 500; // Deficit
  } else if (goal === FitnessGoal.MUSCLE_GAIN || goal === FitnessGoal.STRENGTH) {
    dailyCalories += 300; // Surplus
  }

  // Macro Distribution
  let pRatio = 0.25, cRatio = 0.50, fRatio = 0.25;

  if (goal === FitnessGoal.SIX_PACK || goal === FitnessGoal.MUSCLE_GAIN) {
    pRatio = 0.35; cRatio = 0.40; fRatio = 0.25;
  }
  if (dietPreference === DietPreference.LOW_CARB) {
    pRatio = 0.35; cRatio = 0.25; fRatio = 0.40;
  }
  if (dietPreference === DietPreference.HIGH_PROTEIN) {
    pRatio = 0.40; cRatio = 0.40; fRatio = 0.20;
  }

  return {
    bmi: Math.round(bmi * 10) / 10,
    bmiCategory,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    dailyCalories: Math.round(dailyCalories),
    macros: {
      protein: Math.round((dailyCalories * pRatio) / 4),
      carbs: Math.round((dailyCalories * cRatio) / 4),
      fats: Math.round((dailyCalories * fRatio) / 9),
    }
  };
};
