

import React, { useState } from 'react';
import CalorieCalculator from './components/CalorieCalculator';
import MacroCalculator from './components/MacroCalculator';
import MealPlanGenerator from './components/MealPlanGenerator';
import ExercisePlanGenerator from './components/ExercisePlanGenerator';
import AIChat from './components/AIChat';
import TabButton from './components/TabButton';
import type { Macros } from './types';
import { ActivityLevel, Gender } from './types';

type Tab = 'calories' | 'macros' | 'meal' | 'exercise' | 'chat';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('calories');
  const [calories, setCalories] = useState<number | null>(null);
  const [macros, setMacros] = useState<Macros | null>(null);

  // User details state, can be shared across components
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('175');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(ActivityLevel.MODERATELY_ACTIVE);

  const renderContent = () => {
    switch (activeTab) {
      case 'calories':
        return <CalorieCalculator 
                  onCaloriesCalculated={setCalories} 
                  age={age} setAge={setAge}
                  gender={gender} setGender={setGender}
                  weight={weight} setWeight={setWeight}
                  height={height} setHeight={setHeight}
                  activityLevel={activityLevel} setActivityLevel={setActivityLevel}
                />;
      case 'macros':
        return <MacroCalculator calories={calories} onMacrosCalculated={setMacros} />;
      case 'meal':
        return <MealPlanGenerator calories={calories} macros={macros} />;
      case 'exercise':
        return <ExercisePlanGenerator age={age ? parseInt(age, 10) : null} />;
      case 'chat':
        return <AIChat />;
      default:
        return null;
    }
  };
  
  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'calories', label: 'แคลอรี่', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM15.364 4.636a.75.75 0 011.06 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06zM18 10a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0118 10zm-2.636 4.364a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 011.06-1.06l1.06 1.06zM12 15.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM8.464 15.364a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 1.06l-1.06 1.06zM4.636 12.364a.75.75 0 011.06-1.06l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06zM2.25 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zM10 5a5 5 0 100 10 5 5 0 000-10z" clipRule="evenodd" /></svg> },
    { id: 'macros', label: 'มาโคร', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg> },
    { id: 'meal', label: 'แผนอาหาร', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h4a1 1 0 100-2H7zm0 4a1 1 0 100 2h4a1 1 0 100-2H7z" clipRule="evenodd" /></svg> },
    { id: 'exercise', label: 'ออกกำลังกาย', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" /></svg> },
    { id: 'chat', label: 'แชทกับ AI', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg> },
  ];

  return (
    <div className="min-h-screen text-white font-sans flex flex-col items-center p-4 bg-slate-900">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center my-6">
          <h1 className="text-4xl md:text-5xl font-bold text-teal-300">My AI body care assistant</h1>
          <p className="text-slate-400 mt-2">คู่มือส่วนตัวของคุณสู่วิถีชีวิตที่มีสุขภาพดีขึ้น</p>
        </header>

        <nav className="mb-8 p-1.5 bg-slate-800 rounded-xl flex flex-wrap justify-center gap-2">
          {TABS.map(tab => (
            <TabButton key={tab.id} onClick={() => setActiveTab(tab.id)} isActive={activeTab === tab.id}>
              {tab.icon}
              {tab.label}
            </TabButton>
          ))}
        </nav>

        <main className="bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl shadow-teal-500/10">
          {renderContent()}
        </main>
        
        <footer className="text-center text-slate-500 mt-8 text-sm">
            <p>ขับเคลื่อนโดย Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;