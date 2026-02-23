import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, HealthMetrics } from '../types';
import { WORKOUT_LIBRARY } from '../constants';
import { FitnessGoal } from '../types';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  isTyping?: boolean;
}

interface ChatbotProps {
  profile: UserProfile;
  metrics: HealthMetrics;
}

const Chatbot: React.FC<ChatbotProps> = ({ profile, metrics }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: "Hi! I'm your FitNation AI Assistant. Ask me about your diet, workouts, or fitness profile - I'll use YOUR data to answer!"
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Enhanced keyword matching
  const classifyQuestion = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    // Check for diet keywords
    const dietKeywords = ['diet', 'food', 'eat', 'meal', 'nutrition', 'calories', 'protein', 'carbs', 'fat', 'macros', 'breakfast', 'lunch', 'dinner', 'snack', 'vegetarian', 'vegan', 'weight loss', 'weight gain', 'what should i eat', 'nutrition', 'carb', 'macro'];
    if (dietKeywords.some(k => lowerText.includes(k))) return 'diet';
    
    // Check for workout keywords
    const workoutKeywords = ['workout', 'exercise', 'training', 'gym', 'fitness', 'abs', 'muscle', 'strength', 'cardio', 'fat loss', 'burn', 'reps', 'sets', 'routine', 'exercise', 'train'];
    if (workoutKeywords.some(k => lowerText.includes(k))) return 'workout';
    
    // Check for profile/body keywords
    const profileKeywords = ['profile', 'me', 'my', 'weight', 'height', 'age', 'bmi', 'bmr', 'goal', 'activity', 'body', 'metric', 'information', 'stats'];
    if (profileKeywords.some(k => lowerText.includes(k))) return 'profile';
    
    return 'general';
  };

  const generateAnswer = (category: string): string => {
    const goal = profile.goal;
    const goalText = goal === FitnessGoal.SIX_PACK ? 'Six Pack Abs' : 
                     goal === FitnessGoal.FAT_LOSS ? 'Fat Loss' :
                     goal === FitnessGoal.MUSCLE_GAIN ? 'Muscle Gain' :
                     goal === FitnessGoal.STRENGTH ? 'Strength & Power' : 'General Fitness';

    const activityText = profile.activityLevel.replace(/ \(.+\)/, '');
    const dietPref = profile.dietPreference;

    switch (category) {
      case 'diet':
        return `YOUR DIET INFO:\n\n` +
          `Daily Calories: ${metrics.dailyCalories} kcal\n` +
          `Your Goal: ${goalText}\n` +
          `Diet Preference: ${dietPref}\n\n` +
          `Your Macros:\n` +
          `Protein: ${metrics.macros.protein}g\n` +
          `Carbs: ${metrics.macros.carbs}g\n` +
          `Fats: ${metrics.macros.fats}g\n\n` +
          `Diet Tips: Focus on ${dietPref.toLowerCase()} foods. Eat every 3-4 hours. Drink 3-4L water daily.`;
      case 'workout':
        const workoutData = WORKOUT_LIBRARY[goal];
        const mainExercises = workoutData?.main?.slice(0, 3).map(ex => `${ex.name} (${ex.sets} sets x ${ex.reps})`).join('\n') || '';
        
        return `YOUR WORKOUT:\n\n` +
          `Goal: ${goalText}\n\n` +
          `Recommended Exercises:\n${mainExercises}\n\n` +
          `Rest: ${activityText === 'Sedentary' ? '45-60 sec' : '30-45 sec'} between sets\n` +
          `Cardio: ${goalText === 'Fat Loss' ? '30-45 min, 3-4x/week' : '20-30 min, 2-3x/week'}\n\n` +
          `Train: ${activityText === 'Extra Active' ? '6-7 days/week' : 
                      activityText === 'Very Active' ? '5-6 days/week' : 
                      activityText === 'Moderately Active' ? '3-4 days/week' : '2-3 days/week'}`;
      case 'profile':
        return `YOUR PROFILE:\n\n` +
          `Name: ${profile.name}\n` +
          `Age: ${profile.age} years\n` +
          `Gender: ${profile.gender}\n` +
          `Height: ${profile.height} cm\n` +
          `Weight: ${profile.weight} kg\n\n` +
          `Health Metrics:\n` +
          `BMI: ${metrics.bmi} (${metrics.bmiCategory})\n` +
          `BMR: ${metrics.bmr} kcal/day\n` +
          `TDEE: ${metrics.tdee} kcal/day\n\n` +
          `Goal: ${goalText}\n` +
          `Activity: ${activityText}`;
      default:
        return `I can help you with:\n\n` +
          `Your diet & nutrition info\n` +
          `Your workout routine\n` +
          `Your profile & metrics\n\n` +
          `Just ask me anything!`;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Show typing indicator
    setMessages(prev => [...prev, { id: generateId(), role: 'bot', content: '...', isTyping: true }]);

    // Generate response after a short delay
    setTimeout(() => {
      const category = classifyQuestion(input);
      const answer = generateAnswer(category);
      
      setMessages(prev => {
        const withoutTyping = prev.filter(m => !m.isTyping);
        return [...withoutTyping, {
          id: generateId(),
          role: 'bot',
          content: answer
        }];
      });
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${
          isOpen ? 'bg-slate-600 rotate-90' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-bold">FitNation AI</h3>
              <p className="text-indigo-100 text-xs">Powered by YOUR data</p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white text-xs">Online</span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'bot' && !message.isTyping && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 mr-2">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-md'
                      : message.isTyping
                      ? 'bg-transparent text-transparent'
                      : 'bg-white text-slate-800 rounded-bl-md shadow-sm border border-slate-200'
                  }`}
                >
                  {message.isTyping ? (
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your diet, workouts..."
                className="flex-1 px-4 py-2.5 rounded-full border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm transition-all"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
