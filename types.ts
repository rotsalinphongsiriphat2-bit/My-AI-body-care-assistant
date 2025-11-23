
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum ActivityLevel {
  SEDENTARY = 1.2,
  LIGHTLY_ACTIVE = 1.375,
  MODERATELY_ACTIVE = 1.55,
  VERY_ACTIVE = 1.725,
  EXTRA_ACTIVE = 1.9,
}

export const activityLevelLabels: { [key in ActivityLevel]: string } = {
  [ActivityLevel.SEDENTARY]: 'นั่งทำงานเป็นส่วนใหญ่ (ออกกำลังกายน้อยหรือไม่ออกเลย)',
  [ActivityLevel.LIGHTLY_ACTIVE]: 'เคลื่อนไหวเล็กน้อย (ออกกำลังกายเบาๆ/เล่นกีฬา 1-3 วัน/สัปดาห์)',
  [ActivityLevel.MODERATELY_ACTIVE]: 'เคลื่อนไหวปานกลาง (ออกกำลังกายปานกลาง/เล่นกีฬา 3-5 วัน/สัปดาห์)',
  [ActivityLevel.VERY_ACTIVE]: 'เคลื่อนไหวมาก (ออกกำลังกายหนัก/เล่นกีฬา 6-7 วัน/สัปดาห์)',
  [ActivityLevel.EXTRA_ACTIVE]: 'เคลื่อนไหวหนักมาก (ออกกำลังกายหนักมาก/เล่นกีฬาและทำงานที่ต้องใช้แรง)',
};

export interface Macros {
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  mealName: string;
  description: string;
  calories: number;
  macros: Macros;
}

export interface DailyMealPlan {
  totalCalories: number;
  meals: Meal[];
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  imageUrl: string;
}
export interface ExerciseDay {
    day: string;
    focus: string;
    exercises: Exercise[];
}