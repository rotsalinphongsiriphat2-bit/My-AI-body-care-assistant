
import React, { useState } from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import ResultCard from './ResultCard';
import { Gender, ActivityLevel, activityLevelLabels } from '../types';

interface CalorieCalculatorProps {
    onCaloriesCalculated: (calories: number) => void;
    age: string;
    setAge: (age: string) => void;
    gender: Gender;
    setGender: (gender: Gender) => void;
    weight: string;
    setWeight: (weight: string) => void;
    height: string;
    setHeight: (height: string) => void;
    activityLevel: ActivityLevel;
    setActivityLevel: (level: ActivityLevel) => void;
}

const CalorieCalculator: React.FC<CalorieCalculatorProps> = ({ 
    onCaloriesCalculated, age, setAge, gender, setGender, weight, setWeight, height, setHeight, activityLevel, setActivityLevel
}) => {
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);

  const calculateCalories = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age, 10);
    const weightNum = parseInt(weight, 10);
    const heightNum = parseInt(height, 10);

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum)) {
      return;
    }
    
    let calculatedBmr = 0;
    if (gender === Gender.MALE) {
      calculatedBmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      calculatedBmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }
    
    const calculatedTdee = calculatedBmr * activityLevel;

    setBmr(Math.round(calculatedBmr));
    setTdee(Math.round(calculatedTdee));
    onCaloriesCalculated(Math.round(calculatedTdee));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-white mb-6">คำนวณแคลอรี่ที่ต้องการต่อวัน</h2>
      <form onSubmit={calculateCalories} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="อายุ" type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
          <Select label="เพศ" id="gender" value={gender} onChange={(e) => setGender(e.target.value as Gender)} required>
            <option value={Gender.MALE}>ชาย</option>
            <option value={Gender.FEMALE}>หญิง</option>
          </Select>
          <Input label="น้ำหนัก (กก.)" type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} required />
          <Input label="ส่วนสูง (ซม.)" type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} required />
        </div>
        <Select label="ระดับกิจกรรม" id="activityLevel" value={activityLevel} onChange={(e) => setActivityLevel(parseFloat(e.target.value) as ActivityLevel)} required>
          {Object.entries(activityLevelLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
        <Button type="submit">คำนวณ</Button>
      </form>

      {tdee && bmr && (
        <ResultCard title="ผลลัพธ์ของคุณ">
          <div className="space-y-3 text-lg">
              <p className="flex justify-between">
                  <span className="text-slate-400">อัตราการเผาผลาญพื้นฐาน (BMR):</span>
                  <span className="font-bold text-white">{bmr} แคลอรี่/วัน</span>
              </p>
              <p className="flex justify-between text-teal-300">
                  <span className="font-semibold">ความต้องการแคลอรี่ต่อวัน (TDEE):</span>
                  <span className="font-extrabold text-2xl">{tdee}</span>
              </p>
              <p className="text-sm text-slate-500 pt-2">
                BMR คือจำนวนแคลอรี่ที่ร่างกายต้องการเพื่อการทำงานพื้นฐานในขณะพัก TDEE คือการใช้พลังงานทั้งหมดต่อวันของคุณ ซึ่งรวมกิจกรรมทางกายด้วย นี่คือเป้าหมายแคลอรี่ต่อวันที่คุณควรได้รับเพื่อรักษาน้ำหนักปัจจุบัน
              </p>
          </div>
        </ResultCard>
      )}
    </div>
  );
};

export default CalorieCalculator;