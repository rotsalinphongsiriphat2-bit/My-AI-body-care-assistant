
import React, { useState, useEffect } from 'react';
import Button from './Button';
import ResultCard from './ResultCard';
import type { Macros } from '../types';

interface MacroCalculatorProps {
  calories: number | null;
  onMacrosCalculated: (macros: Macros) => void;
}

type MacroSplit = 'balanced' | 'low-carb' | 'high-protein';

const PRESETS: Record<MacroSplit, { p: number; c: number; f: number; label: string }> = {
  'balanced': { p: 0.30, c: 0.40, f: 0.30, label: 'สมดุล' },
  'low-carb': { p: 0.40, c: 0.20, f: 0.40, label: 'คาร์โบไฮเดรตต่ำ' },
  'high-protein': { p: 0.45, c: 0.30, f: 0.25, label: 'โปรตีนสูง' },
};

const MacroCalculator: React.FC<MacroCalculatorProps> = ({ calories, onMacrosCalculated }) => {
  const [split, setSplit] = useState<MacroSplit>('balanced');
  const [macros, setMacros] = useState<Macros | null>(null);

  const calculateMacros = () => {
    if (!calories) return;

    const preset = PRESETS[split];
    const protein = Math.round((calories * preset.p) / 4);
    const carbs = Math.round((calories * preset.c) / 4);
    const fat = Math.round((calories * preset.f) / 9);
    
    const calculatedMacros = { protein, carbs, fat };
    setMacros(calculatedMacros);
    onMacrosCalculated(calculatedMacros);
  };
  
  useEffect(() => {
    if (calories) {
      calculateMacros();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calories, split]);

  if (!calories) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-4">คำนวณมาโครนูเทรียนท์</h2>
        <p className="text-slate-400">กรุณาคำนวณแคลอรี่ที่ต้องการต่อวันในแท็บ 'แคลอรี่' ก่อน</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-white mb-2">สัดส่วนมาโครนูเทรียนท์</h2>
      <p className="text-center text-slate-400 mb-6">อ้างอิงจากความต้องการ <span className="font-bold text-teal-300">{calories}</span> แคลอรี่ต่อวันของคุณ</p>
      
      <div className="flex justify-center gap-4 mb-6">
        {(Object.keys(PRESETS) as MacroSplit[]).map(key => (
          <Button 
            key={key}
            onClick={() => setSplit(key)}
            className={`capitalize ${split === key ? 'bg-teal-500' : 'bg-slate-600 hover:bg-slate-500'}`}
          >
            {PRESETS[key].label}
          </Button>
        ))}
      </div>

      {macros && (
        <ResultCard title={`สัดส่วนแบบ${PRESETS[split].label}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="text-lg text-blue-300 font-bold">โปรตีน</p>
                    <p className="text-3xl font-extrabold text-white">{macros.protein}g</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="text-lg text-green-300 font-bold">คาร์โบไฮเดรต</p>
                    <p className="text-3xl font-extrabold text-white">{macros.carbs}g</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                    <p className="text-lg text-yellow-300 font-bold">ไขมัน</p>
                    <p className="text-3xl font-extrabold text-white">{macros.fat}g</p>
                </div>
            </div>
        </ResultCard>
      )}
    </div>
  );
};

export default MacroCalculator;