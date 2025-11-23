
import React, { useState } from 'react';
import Button from './Button';
import LoadingSpinner from './LoadingSpinner';
import ResultCard from './ResultCard';
import { generateExercisePlan } from '../services/geminiService';
import type { ExerciseDay } from '../types';

interface ExercisePlanGeneratorProps {
  age: number | null;
}

const ExercisePlanGenerator: React.FC<ExercisePlanGeneratorProps> = ({ age }) => {
  const [plan, setPlan] = useState<ExerciseDay[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = async () => {
    if (!age) return;

    setIsLoading(true);
    setError(null);
    setPlan(null);

    try {
      const generatedPlan = await generateExercisePlan(age);
      setPlan(generatedPlan);
    } catch (err) {
      setError('สร้างแผนการออกกำลังกายไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!age) {
     return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-4">เครื่องมือสร้างแผนการออกกำลังกาย</h2>
        <p className="text-slate-400">กรุณากรอกอายุของคุณในแท็บ 'แคลอรี่' ก่อน</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-white mb-2">สร้างแผนการออกกำลังกายรายสัปดาห์</h2>
      <p className="text-center text-slate-400 mb-6">แผนที่ปรับให้เหมาะกับคนอายุ {age} ปี ที่มีระดับความฟิตปานกลาง</p>
      <Button onClick={handleGeneratePlan} disabled={isLoading}>
        {isLoading ? 'กำลังสร้าง...' : 'สร้างแผน'}
      </Button>

      {isLoading && <LoadingSpinner />}
      {error && <p className="text-red-400 text-center mt-4">{error}</p>}

      {plan && (
        <ResultCard title="แผนการออกกำลังกาย 5 วันของคุณ">
          <div className="space-y-6">
            {plan.map((day, index) => (
              <div key={index} className="bg-slate-900/50 p-4 rounded-lg">
                <h4 className="text-lg font-bold text-teal-300">{day.day}: <span className="text-white">{day.focus}</span></h4>
                <ul className="mt-2 space-y-4 text-slate-300">
                  {day.exercises.map((ex, i) => (
                    <li key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-2 rounded-md hover:bg-slate-800/50 transition-colors">
                      <div className="w-full sm:w-36 h-24 flex-shrink-0 bg-slate-700 rounded-md flex items-center justify-center overflow-hidden">
                        {ex.imageUrl ? (
                          <img
                            src={ex.imageUrl}
                            alt={`ภาพประกอบท่า ${ex.name}`}
                            className="w-full h-full object-cover"
                            width="150"
                            height="100"
                          />
                        ) : (
                          <span className="text-xs text-slate-400">ไม่มีภาพ</span>
                        )}
                      </div>
                      <div className="flex-grow">
                        {ex.name}: <span className="font-semibold text-white">{ex.sets} เซ็ต เซ็ตละ {ex.reps}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ResultCard>
      )}
    </div>
  );
};

export default ExercisePlanGenerator;