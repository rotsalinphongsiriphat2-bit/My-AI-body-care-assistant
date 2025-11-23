
import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import LoadingSpinner from './LoadingSpinner';
import ResultCard from './ResultCard';
import { generateDailyMenu } from '../services/geminiService';
import type { Macros, DailyMealPlan } from '../types';

interface MealPlanGeneratorProps {
  calories: number | null;
  macros: Macros | null;
}

const MealPlanGenerator: React.FC<MealPlanGeneratorProps> = ({ calories, macros }) => {
  const [allergies, setAllergies] = useState('');
  const [mealPlan, setMealPlan] = useState<DailyMealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = async () => {
    if (!calories || !macros) return;

    setIsLoading(true);
    setError(null);
    setMealPlan(null);

    try {
      const plan = await generateDailyMenu(calories, macros, allergies);
      setMealPlan(plan);
    } catch (err) {
      setError('สร้างแผนอาหารไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!calories || !macros) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-4">เครื่องมือสร้างแผนอาหาร</h2>
        <p className="text-slate-400">กรุณาคำนวณแคลอรี่และมาโครของคุณก่อน</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-white mb-6">สร้างแผนอาหารประจำวันของคุณ</h2>
      <div className="space-y-4">
        <Input
          label="อาหารที่แพ้หรือข้อจำกัดด้านอาหาร (เช่น แพ้ถั่ว, มังสวิรัติ, ไม่มี)"
          type="text"
          id="allergies"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="เช่น แพ้ถั่ว, แพ้นมวัว, วีแกน"
        />
        <Button onClick={handleGeneratePlan} disabled={isLoading}>
          {isLoading ? 'กำลังสร้าง...' : 'สร้างแผนอาหาร'}
        </Button>
      </div>

      {isLoading && <LoadingSpinner />}
      {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      
      {mealPlan && (
        <ResultCard title={`แผนอาหารของคุณ (~${mealPlan.totalCalories} แคลอรี่)`}>
          <div className="space-y-6">
            {mealPlan.meals.map((meal, index) => (
              <div key={index} className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="text-lg font-bold text-teal-300">{meal.mealName}</h4>
                <p className="text-slate-300 mt-1 mb-3">{meal.description}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                  <span><span className="font-semibold text-white">{meal.calories}</span> แคล</span>
                  <span><span className="font-semibold text-blue-300">{meal.macros.protein}g</span> โปรตีน</span>
                  <span><span className="font-semibold text-green-300">{meal.macros.carbs}g</span> คาร์บ</span>
                  <span><span className="font-semibold text-yellow-300">{meal.macros.fat}g</span> ไขมัน</span>
                </div>
              </div>
            ))}
          </div>
        </ResultCard>
      )}
    </div>
  );
};

export default MealPlanGenerator;