import React, { useState, useEffect, useCallback } from 'react';
import { UserProfile, HealthMetrics, DietPlan, FoodItem, FoodCategory } from '../types';
import { generateDietPlan, getFoodSwaps, findBestSwap, getAlternativePlan, getBangladeshDietPlan, getAvailableBangladeshPlans } from '../services/preCodedDietService';

interface DietSectionProps {
  profile: UserProfile;
  metrics: HealthMetrics;
}

const DietSection: React.FC<DietSectionProps> = ({ profile, metrics }) => {
  const [plan, setPlan] = useState<DietPlan | null>(null);
  const [useAlternative, setUseAlternative] = useState(false);
  const [selectedBangladeshPlan, setSelectedBangladeshPlan] = useState<string>("Standard");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState("Loading diet plan...");
  const [showSwapOptions, setShowSwapOptions] = useState<string | null>(null);
  const [swapNotification, setSwapNotification] = useState<{ show: boolean, message: string }>({ show: false, message: '' });

  const fetchDietPlan = useCallback(async (force: boolean = false) => {
    const cacheKey = `fitnation_diet_${profile.country}_${profile.goal}_${profile.dietPreference}_${useAlternative ? 'alt' : 'standard'}_${profile.country === 'Bangladesh' ? selectedBangladeshPlan : 'default'}`;
    const cached = localStorage.getItem('fitnation_cached_diet');
    const cachedData = cached ? JSON.parse(cached) : null;

    if (!force && cachedData && cachedData.key === cacheKey) {
      setPlan(cachedData.plan);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setStatusText("Loading " + profile.country + " diet plan...");

    try {
      let dietPlan: DietPlan | null = null;

      if (profile.country === 'Bangladesh') {
        dietPlan = getBangladeshDietPlan(selectedBangladeshPlan);
      } else if (useAlternative && (profile.country === 'India')) {
        dietPlan = getAlternativePlan(profile.country);
      } else {
        dietPlan = await generateDietPlan(profile, metrics);
      }

      if (dietPlan) {
        setPlan(dietPlan);
        localStorage.setItem('fitnation_cached_diet', JSON.stringify({
          key: cacheKey,
          plan: dietPlan,
          timestamp: Date.now()
        }));
      } else {
        throw new Error("Failed to load diet plan");
      }
    } catch (err) {
      console.error(err);
      setError("We couldn't load your diet plan right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [profile, metrics, useAlternative, selectedBangladeshPlan]);

  useEffect(() => {
    fetchDietPlan();
  }, [fetchDietPlan]);

  useEffect(() => {
    if (loading) {
      const statuses = [
        "Loading diet plan...",
        "Preparing " + profile.country + " meals...",
        "Calculating macros for " + profile.goal + "...",
        "Finalizing meal portions...",
        "Applying " + profile.dietPreference + " preferences..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        setStatusText(statuses[i % statuses.length]);
        i++;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading, profile]);

  useEffect(() => {
    if (plan) {
      console.log('Plan updated:', plan);
    }
  }, [plan]);

  const calculateMealMacros = (items: FoodItem[]) => {
    return items.reduce((acc, item) => ({
      p: acc.p + item.protein,
      c: acc.c + item.carbs,
      f: acc.f + item.fats,
      cal: acc.cal + item.calories
    }), { p: 0, c: 0, f: 0, cal: 0 });
  };

  const handleSwapFood = (mealKey: keyof DietPlan, itemIndex: number, currentItem: FoodItem, selectedSwapItem: FoodItem) => {
    if (!plan) return;

    // Create deep copy and properly update the specific item
    const newPlan = JSON.parse(JSON.stringify(plan));
    newPlan[mealKey][itemIndex] = selectedSwapItem;

    setPlan(newPlan);

    // Save to cache
    setTimeout(() => {
      const cacheKey = `fitnation_diet_${profile.country}_${profile.goal}_${profile.dietPreference}_${useAlternative ? 'alt' : 'standard'}`;
      localStorage.setItem('fitnation_cached_diet', JSON.stringify({
        key: cacheKey,
        plan: newPlan,
        timestamp: Date.now()
      }));
    }, 0);

    // Close swap options and show notification
    setShowSwapOptions(null);

    // Show success notification
    setSwapNotification({
      show: true,
      message: `Replaced ${currentItem.name} with ${selectedSwapItem.name}`
    });

    setTimeout(() => {
      setSwapNotification({ show: false, message: '' });
    }, 3000);

    // Log detailed swap information
    const beforeCalories = currentItem.calories;
    const afterCalories = selectedSwapItem.calories;
    const mealTotalBefore = calculateMealMacros([...plan[mealKey]]).cal;
    const mealTotalAfter = calculateMealMacros(newPlan[mealKey]).cal;
    const calorieDiff = afterCalories - beforeCalories;
    const dailyTargetPercentage = ((afterCalories / metrics.dailyCalories) * 100).toFixed(1);

    console.log('🔄 Food Item Swap:');
    console.log(`   Removed: ${currentItem.name} (${beforeCalories} kcal)`);
    console.log(`   Added: ${selectedSwapItem.name} (${afterCalories} kcal)`);
    console.log(`   Difference: ${calorieDiff > 0 ? '+' : ''}${calorieDiff} kcal`);
    console.log(`📊 Meal Calories Before: ${mealTotalBefore} kcal`);
    console.log(`📊 Meal Calories After: ${mealTotalAfter} kcal`);
    console.log(`🎯 Target Achievement: ${dailyTargetPercentage}% of daily calorie goal`);

    // Visual feedback
    if (calorieDiff > 10) {
      console.log('⚠️ Large calorie increase - may affect diet goals');
    } else if (calorieDiff < -20) {
      console.log('⚠️ Large calorie decrease - ensure adequate nutrition');
    }
  };

  const handlePlanChange = () => {
    setUseAlternative(!useAlternative);
    setShowSwapOptions(null);
  };

  const handleBangladeshPlanChange = (planType: string) => {
    setSelectedBangladeshPlan(planType);
    setShowSwapOptions(null);
    fetchDietPlan(true);
  };

  const handleResetSwap = () => {
    setShowSwapOptions(null);
    fetchDietPlan(true);
  };

  const currentPlanLabel = useAlternative ? 'Affordable Plan' : 'Standard Plan';
  const hasAlternativeOption = (profile.country === 'Bangladesh' || profile.country === 'India');
  const hasBangladeshOptions = profile.country === 'Bangladesh';

  const currentTotalCalories = plan ? (Object.keys(plan) as Array<keyof DietPlan>).reduce((sum, meal) => {
    return sum + calculateMealMacros(plan[meal]).cal;
  }, 0) : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <div className="w-24 h-24 bg-indigo-100 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-xl shadow-indigo-50">
          <svg className="w-12 h-12 text-indigo-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2">Preparing Your Diet Plan...</h3>
        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">{statusText}</p>
        <div className="w-48 h-1.5 bg-indigo-50 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-indigo-600 animate-progress"></div>
        </div>
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-black text-slate-800 mb-2">Oops! Something went wrong</h3>
        <p className="text-sm text-slate-500 mb-6">{error}</p>
        <button
          onClick={() => fetchDietPlan(true)}
          className="px-8 py-4 bg-indigo-600 text-white font-black rounded-3xl shadow-lg shadow-indigo-100 active:scale-95 transition-all"
        >
          RETRY
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700 pb-10">
      <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-100 flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100" stroke="white" fill="transparent" />
          </svg>
        </div>
        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black mb-1">{profile.country} {hasBangladeshOptions ? selectedBangladeshPlan + ' Plan' : currentPlanLabel}</h2>
        <p className="text-[11px] opacity-80 font-black uppercase tracking-[0.25em]">Optimized for {profile.name}</p>

        {hasBangladeshOptions ? (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">Diet Options:</span>
            {['Budget', 'Standard', 'Premium', 'Vegetarian', 'Regional'].map((planType) => (
              <button
                key={planType}
                onClick={() => handleBangladeshPlanChange(planType)}
                className={`px-3 py-2 rounded-xl font-bold transition-all text-xs ${selectedBangladeshPlan === planType
                  ? 'bg-white text-indigo-600 shadow-lg'
                  : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                  }`}
              >
                {planType}
              </button>
            ))}
          </div>
        ) : hasAlternativeOption && (
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-bold">Available Plans:</span>
            <button
              onClick={handlePlanChange}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${!useAlternative
                ? 'bg-white text-indigo-600 shadow-lg'
                : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                }`}
            >
              Standard
            </button>
            <button
              onClick={handlePlanChange}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${useAlternative
                ? 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                : 'bg-white text-indigo-600 shadow-lg'
                }`}
            >
              Affordable
            </button>
          </div>
        )}
      </div>

      <div className="bg-green-50 border border-green-200 p-5 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4 w-full">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-green-600 shadow-sm shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4-4m-4 4l4 4" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-black text-green-800 uppercase tracking-wide">Customize Your Diet</h3>
            <p className="text-xs font-bold text-green-600/80">Tap any food item to see local alternatives</p>
          </div>
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-6 bg-white/60 p-3 pl-5 pr-5 rounded-2xl border border-green-100">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Current Total</p>
            <div className="flex items-baseline gap-1 justify-end">
              <span className={`text-xl font-black ${currentTotalCalories > metrics.dailyCalories + 50 ? 'text-rose-500' : 'text-green-600'}`}>
                {currentTotalCalories}
              </span>
              <span className="text-xs font-bold text-slate-400">/ {metrics.dailyCalories} kcal</span>
            </div>
          </div>

          {showSwapOptions && (
            <button
              onClick={() => setShowSwapOptions(null)}
              className="px-4 py-2 bg-rose-100 text-rose-600 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-rose-200 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {plan && (Object.keys(plan) as Array<keyof DietPlan>).map((mealKey) => {
          const items = plan[mealKey];
          const mealMacros = calculateMealMacros(items);
          const icons: Record<string, string> = { breakfast: '🍳', lunch: '🍛', snacks: '🍌', dinner: '🍗' };

          return (
            <div key={mealKey} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl hover:scale-[1.01] duration-300">
              <div className="flex justify-between items-center mb-6 border-b border-slate-50 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:bg-indigo-50 transition-colors">
                    {icons[mealKey]}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">{mealKey}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Nutrition Focus: {items[0]?.category}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-black text-slate-800">{mealMacros.cal} <span className="text-[10px] text-slate-400">kcal</span></span>
                  <div className="flex gap-1.5 mt-1">
                    <MacroBadge label="P" value={mealMacros.p} color="bg-rose-50 text-rose-600" />
                    <MacroBadge label="C" value={mealMacros.c} color="bg-emerald-50 text-emerald-600" />
                    <MacroBadge label="F" value={mealMacros.f} color="bg-amber-50 text-amber-600" />
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                {items.map((item, idx) => {
                  const swapOptions = getFoodSwaps(item.category).filter(swapItem => swapItem.id !== item.id);

                  // Helper for Bengali translations
                  const getDisplayName = (originalName: string) => {
                    if (profile.country !== 'Bangladesh' || originalName.includes('(')) return originalName;

                    const translations: Record<string, string> = {
                      "Eggs": "Dim",
                      "Tofu": "Tofu",
                      "Lentils": "Dal",
                      "Greek Yogurt": "Doi",
                      "White Rice": "Sada Bhat",
                      "Whole Wheat Bread": "Lal Attar Ruti",
                      "Potatoes": "Alu",
                      "Pasta": "Pasta",
                      "Mixed Vegetables": "Sobji",
                      "Broccoli": "Broccoli",
                      "Spinach": "Palong Shak",
                      "Carrots": "Gajor",
                      "Apple": "Apel",
                      "Banana": "Kola",
                      "Orange": "Komola",
                      "Mixed Berries": "Jam",
                      "Milk": "Dudh",
                      "Cheese": "Ponir",
                      "Cottage Cheese": "Chana",
                      "Olive Oil": "Jolpai Tel",
                      "Almonds": "Kathbadam",
                      "Avocado": "Avocado",
                      "Peanut Butter": "Badam Makhon",
                      "Oatmeal": "Oats",
                      "Chicken Breast": "Murgir Mangsho",
                      "Brown Rice": "Lal Chal",
                      "Salmon": "Salmon Mach",
                      "Sweet Potato": "Mishti Alu",
                      "Mixed Green Salad": "Sobji Salad"
                    };

                    return translations[originalName] ? `${originalName} (${translations[originalName]})` : originalName;
                  };

                  return (
                    <div
                      key={`${mealKey}-${item.id || idx}-${useAlternative ? 'alt' : 'std'}`}
                      className={`flex flex-col group/item cursor-pointer rounded-xl p-3 hover:bg-slate-50 transition-colors ${showSwapOptions === item.id ? 'ring-2 ring-green-500 bg-green-50' : ''
                        }`}
                      onClick={() => setShowSwapOptions(showSwapOptions === item.id ? null : item.id)}
                    >
                      {/* Top Row: Main Item Info */}
                      <div className="flex justify-between items-center w-full">
                        <div className="flex items-center gap-5">
                          {showSwapOptions === item.id ? (
                            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4-4m-4 4l4 4" />
                            </svg>
                          ) : (
                            <svg className="w-2.5 h-2.5 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)] group-hover/item:scale-125 transition-transform"></svg>
                          )}
                          <div>
                            <p className="text-base font-black text-slate-700 leading-tight">{getDisplayName(item.name)}</p>
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">
                              {item.serving} • <span className="text-indigo-600">{item.calories} KCAL</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex gap-2 mb-1">
                            <MacroBadge label="P" value={item.protein} color="bg-rose-50 text-rose-600" />
                            <MacroBadge label="C" value={item.carbs} color="bg-emerald-50 text-emerald-600" />
                            <MacroBadge label="F" value={item.fats} color="bg-amber-50 text-amber-600" />
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row: Swap Options (Full Width) */}
                      {showSwapOptions === item.id && (
                        <div className="w-full mt-4 pt-4 border-t border-slate-200 animate-in slide-in-from-top-2 duration-300 cursor-default" onClick={(e) => e.stopPropagation()}>

                          {/* Context Header: Current Item being swapped */}
                          <div className="mb-4 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-0.5">Currently Selected</p>
                                <p className="text-sm font-black text-slate-700 leading-tight">{getDisplayName(item.name)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-bold text-slate-400">{item.serving}</p>
                              <p className="text-xs font-black text-indigo-600">{item.calories} Kcal</p>
                            </div>
                          </div>

                          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-1">Select Replacement</h4>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {swapOptions.map((swapItem, swapIdx) => {
                              const calorieDiff = swapItem.calories - item.calories;
                              const isSignificantDiff = Math.abs(calorieDiff) > 50;
                              const displayName = getDisplayName(swapItem.name);

                              return (
                                <div
                                  key={swapIdx}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isSignificantDiff) {
                                      handleSwapFood(mealKey, idx, item, swapItem);
                                    }
                                  }}
                                  className={`p-3 border rounded-xl flex flex-col justify-between transition-all relative overflow-hidden min-h-[140px] ${isSignificantDiff
                                    ? 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed grayscale'
                                    : 'bg-white border-slate-200 active:scale-95 active:border-indigo-500 cursor-pointer shadow-sm'
                                    }`}
                                >
                                  {/* Card Content */}
                                  <div>
                                    <p className="text-xs font-black text-slate-700 line-clamp-2 leading-tight mb-1 h-8" title={displayName}>{displayName}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mb-2 truncate">{swapItem.serving}</p>

                                    <div className="text-[10px] font-bold mb-2">
                                      {/* Diff Indicators */}
                                      {Math.abs(calorieDiff) <= 20 ? (
                                        <span className="text-green-600 flex items-center gap-1 bg-green-50 px-1.5 py-1 rounded w-fit">
                                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                          </svg>
                                          Perfect Match
                                        </span>
                                      ) : isSignificantDiff ? (
                                        <span className="text-rose-500 flex items-center gap-1 bg-rose-50 px-1.5 py-1 rounded w-fit">
                                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                          {calorieDiff > 0 ? `+${calorieDiff}` : calorieDiff} (Avoid)
                                        </span>
                                      ) : (
                                        <span className="text-amber-600 bg-amber-50 px-1.5 py-1 rounded w-fit block">
                                          {calorieDiff > 0 ? `+${calorieDiff}` : calorieDiff} kcal
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Macros and Calories Footer */}
                                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
                                    <div className="flex gap-1">
                                      <span className="text-[9px] font-black text-slate-400">P<span className="text-slate-600">{swapItem.protein}</span></span>
                                      <span className="text-[9px] font-black text-slate-400">C<span className="text-slate-600">{swapItem.carbs}</span></span>
                                      <span className="text-[9px] font-black text-slate-400">F<span className="text-slate-600">{swapItem.fats}</span></span>
                                    </div>
                                    <span className="text-[10px] font-black text-indigo-600">{swapItem.calories}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.3em] mb-4 text-center">Daily Nutrition Summary</p>
        <div className="flex justify-around items-center">
          <div className="text-center">
            <p className="text-2xl font-black text-white">{metrics.macros.protein}g</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Target Protein</p>
          </div>
          <div className="w-px h-10 bg-slate-800"></div>
          <div className="text-center">
            <p className="text-2xl font-black text-indigo-400">{metrics.dailyCalories}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Kcal Goal</p>
          </div>
          <div className="w-px h-10 bg-slate-800"></div>
          <div className="text-center">
            <p className="text-2xl font-black text-white">{metrics.macros.carbs}g</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Target Carbs</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-4 pb-8">
        <button
          onClick={() => fetchDietPlan(true)}
          className="group relative px-6 py-3 bg-white text-slate-700 font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-indigo-50 border-2 border-indigo-100 hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Diet Plan
          </span>
        </button>
        {showSwapOptions && (
          <button
            onClick={handleResetSwap}
            className="text-[10px] font-black text-green-600 uppercase tracking-widest hover:text-green-700 transition-colors py-2 px-4 border border-green-200 rounded-xl bg-green-50"
          >
            Reset Swaps
          </button>
        )}
      </div>

      {/* Swap Notification */}
      {swapNotification.show && (
        <div className="fixed top-4 right-4 bg-green-600 text-white p-4 rounded-xl shadow-lg z-50 animate-in slide-in-from-right-2 duration-300 max-w-xs">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L2 19l4 4-4m0 0-4 1.5-1.5M9 17l3-3 3-3m0 0-4.5 1.5" />
            </svg>
            <span className="text-sm font-bold">{swapNotification.message}</span>
          </div>
          <button
            onClick={() => setSwapNotification({ show: false, message: '' })}
            className="ml-3 text-white hover:bg-green-700 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          width: 200%;
          animation: progress 2s linear infinite;
        }
      `}} />
    </div>
  );
};

const MacroBadge: React.FC<{ label: string, value: number, color: string }> = ({ label, value, color }) => (
  <div className={`px-2 py-0.5 rounded-lg text-[9px] font-black flex items-center gap-1 ${color} border border-current border-opacity-10`}>
    <span>{label}</span>
    <span>{Math.round(value)}g</span>
  </div>
);

export default DietSection;