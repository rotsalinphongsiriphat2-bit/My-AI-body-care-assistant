
import { GoogleGenAI, Type, Chat, Modality } from "@google/genai";
import type { Macros, DailyMealPlan, ExerciseDay, Exercise } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateDailyMenu = async (calories: number, macros: Macros, allergies: string): Promise<DailyMealPlan> => {
  const prompt = `
    สร้างแผนอาหาร 1 วัน สำหรับผู้ที่ต้องการพลังงานประมาณ ${calories} แคลอรี่
    โดยมีสัดส่วนมาโครนูเทรียนท์ประมาณ โปรตีน ${macros.protein} กรัม, คาร์โบไฮเดรต ${macros.carbs} กรัม, และไขมัน ${macros.fat} กรัม
    ผู้ใช้มีข้อจำกัดด้านอาหารหรืออาการแพ้ดังนี้: ${allergies || 'ไม่มี'}
    กรุณาจัดเตรียมอาหาร 3 มื้อหลัก (เช้า, กลางวัน, เย็น) และ 1 มื้อว่าง
    สำหรับแต่ละมื้อ ขอชื่ออาหาร, คำอธิบายสั้นๆ, ปริมาณแคลอรี่โดยประมาณ, และรายละเอียดมาโคร (โปรตีน, คาร์โบไฮเดรต, ไขมัน เป็นกรัม)
    ผลรวมแคลอรี่ของทุกมื้อควรรวมกันได้ใกล้เคียงกับเป้าหมาย ${calories} แคลอรี่
    กรุณาตอบกลับในรูปแบบ JSON ที่กำหนดเท่านั้น
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: { parts: [{ text: prompt }] },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
            totalCalories: { type: Type.NUMBER },
            meals: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        mealName: { type: Type.STRING },
                        description: { type: Type.STRING },
                        calories: { type: Type.NUMBER },
                        macros: {
                            type: Type.OBJECT,
                            properties: {
                                protein: { type: Type.NUMBER },
                                carbs: { type: Type.NUMBER },
                                fat: { type: Type.NUMBER }
                            },
                            required: ["protein", "carbs", "fat"]
                        }
                    },
                    required: ["mealName", "description", "calories", "macros"]
                }
            }
        },
        required: ["totalCalories", "meals"]
      },
    },
  });
  
  const jsonText = response.text.trim();
  return JSON.parse(jsonText) as DailyMealPlan;
};

export const generateExercisePlan = async (age: number): Promise<ExerciseDay[]> => {
    const prompt = `
        สร้างแผนการออกกำลังกายรายสัปดาห์ 5 วัน สำหรับคนอายุ ${age} ปี ที่มีระดับความฟิตปานกลาง แผนการออกกำลังกายต้องเป็นภาษาไทย
        แผนควรประกอบด้วยการฝึกความแข็งแรง (strength training) และการออกกำลังกายแบบคาร์ดิโอ (cardiovascular exercise) ผสมกัน
        สำหรับแต่ละวันใน 5 วันนั้น ให้ระบุว่าเป็นวันที่เท่าไหร่ (เช่น 'วันที่ 1'), โฟกัสหลักของวัน (เช่น 'สร้างความแข็งแรงส่วนบน', 'คาร์ดิโอและแกนกลางลำตัว'), และรายการท่าออกกำลังกาย 3-4 ท่า
        สำหรับแต่ละท่าออกกำลังกาย ให้ระบุ:
        1. name: ชื่อท่า (ภาษาไทย)
        2. sets: จำนวนเซ็ต
        3. reps: จำนวนครั้ง (หรือระยะเวลาสำหรับคาร์ดิโอ)
        กรุณาตอบกลับในรูปแบบ JSON ที่กำหนดเท่านั้น
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: { parts: [{ text: prompt }] },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        day: { type: Type.STRING },
                        focus: { type: Type.STRING },
                        exercises: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    name: { type: Type.STRING },
                                    sets: { type: Type.STRING },
                                    reps: { type: Type.STRING },
                                },
                                required: ["name", "sets", "reps"],
                            },
                        },
                    },
                    required: ["day", "focus", "exercises"],
                },
            },
        },
    });

    const jsonText = response.text.trim();
    // FIX: Added parentheses to correctly type `planWithoutImages` as an array of objects.
    const planWithoutImages = JSON.parse(jsonText) as (Omit<ExerciseDay, 'exercises'> & { exercises: Omit<Exercise, 'imageUrl'>[] })[];

    // Generate images for each exercise
    const planWithImages = await Promise.all(
        planWithoutImages.map(async (day) => {
            const exercisesWithImages = await Promise.all(
                day.exercises.map(async (exercise) => {
                    const imagePrompt = `A clear, fitness diagram showing how to do a ${exercise.name}. Minimalist, white background, no text.`;
                    const imageResponse = await ai.models.generateContent({
                        model: 'gemini-2.5-flash-image',
                        contents: { parts: [{ text: imagePrompt }] },
                        config: {
                            responseModalities: [Modality.IMAGE],
                        },
                    });

                    const base64Image = imageResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
                    const imageUrl = base64Image ? `data:image/png;base64,${base64Image}` : '';

                    return { ...exercise, imageUrl };
                })
            );
            return { ...day, exercises: exercisesWithImages };
        })
    );

    return planWithImages;
};


let chat: Chat | null = null;

const initializeChat = (): Chat => {
    if (!chat) {
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `คุณคือผู้ช่วย AI ด้านสุขภาพและฟิตเนสที่เป็นมิตรและมีความรู้
                โปรดให้คำแนะนำที่เป็นประโยชน์ ปลอดภัย และให้กำลังใจ
                คำเตือน: คุณเป็นเพียงผู้ช่วย AI ข้อมูลที่คุณให้ไม่สามารถใช้แทนคำแนะนำทางการแพทย์จากผู้เชี่ยวชาญได้
                ควรปรึกษาบุคลากรทางการแพทย์ทุกครั้งก่อนทำการเปลี่ยนแปลงใดๆ เกี่ยวกับอาหารหรือโปรแกรมการออกกำลังกายของคุณ`
            },
        });
    }
    return chat;
};

export const chatWithAI = async (userPrompt: string): Promise<string> => {
    const chatInstance = initializeChat();
    const response = await chatInstance.sendMessage({ message: userPrompt });
    return response.text;
};
