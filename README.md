<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My AI Body Care Assistant</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #e8d5ff 0%, #d4e8ff 50%, #ffe0f0 100%);
            min-height: 100vh;
            padding: 20px;
            color: #5a4b6b;
        }

        .container {
            max-width: 480px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 30px;
            padding: 30px 25px;
            box-shadow: 0 10px 40px rgba(180, 160, 255, 0.3);
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            color: #a78bfa;
            font-size: 26px;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(167, 139, 250, 0.3);
        }

        .emoji {
            font-size: 50px;
            margin: 15px 0;
        }

        .section {
            background: linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #fef2f9 100%);
            padding: 20px;
            border-radius: 20px;
            margin-bottom: 20px;
            border: 2px solid #ddd6fe;
        }

        .section-title {
            color: #a78bfa;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .input-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #6b5b8e;
            font-weight: 500;
            font-size: 14px;
        }

        input, select {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #ddd6fe;
            border-radius: 15px;
            font-size: 15px;
            background: white;
            color: #5a4b6b;
            transition: all 0.3s;
        }

        input:focus, select:focus {
            outline: none;
            border-color: #a78bfa;
            box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1);
        }

        .btn {
            width: 100%;
            padding: 15px;
            border: none;
            border-radius: 20px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 10px;
        }

        .btn-primary {
            background: linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%);
            color: white;
            box-shadow: 0 5px 15px rgba(167, 139, 250, 0.4);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 7px 20px rgba(167, 139, 250, 0.5);
        }

        .btn-secondary {
            background: linear-gradient(135deg, #93c5fd 0%, #bfdbfe 100%);
            color: white;
        }

        .btn-secondary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(147, 197, 253, 0.4);
        }

        .result-card {
            background: white;
            padding: 20px;
            border-radius: 15px;
            margin-top: 15px;
            border: 2px solid #ddd6fe;
        }

        .result-value {
            font-size: 32px;
            color: #a78bfa;
            font-weight: bold;
            text-align: center;
            margin: 10px 0;
        }

        .result-label {
            text-align: center;
            color: #6b5b8e;
            font-size: 14px;
        }

        .menu-card {
            background: white;
            padding: 15px;
            border-radius: 15px;
            margin-top: 10px;
            border-left: 4px solid #f9a8d4;
        }

        .menu-card h4 {
            color: #f9a8d4;
            margin-bottom: 8px;
        }

        .menu-card p {
            color: #5a4b6b;
            font-size: 14px;
            line-height: 1.6;
        }

        .exercise-card {
            background: white;
            padding: 15px;
            border-radius: 15px;
            margin-top: 10px;
            border-left: 4px solid #93c5fd;
        }

        .exercise-card h4 {
            color: #93c5fd;
            margin-bottom: 8px;
        }

        .hidden {
            display: none;
        }

        .chat-container {
            background: white;
            border-radius: 15px;
            padding: 15px;
            margin-top: 15px;
            max-height: 300px;
            overflow-y: auto;
            border: 2px solid #ddd6fe;
        }

        .chat-message {
            margin-bottom: 12px;
            padding: 10px 15px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.5;
        }

        .user-message {
            background: #e0e7ff;
            color: #5a4b6b;
            margin-left: 20px;
        }

        .ai-message {
            background: #fce7f3;
            color: #5a4b6b;
            margin-right: 20px;
            border-left: 3px solid #a78bfa;
        }

        .chat-input-group {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }

        .chat-input-group input {
            flex: 1;
        }

        .chat-input-group button {
            width: auto;
            padding: 12px 20px;
            margin-top: 0;
        }

        .summary-grid {
            display: grid;
            gap: 15px;
            margin-top: 15px;
        }

        .summary-item {
            background: white;
            padding: 15px;
            border-radius: 12px;
            border: 2px solid #ddd6fe;
        }

        .summary-item strong {
            color: #a78bfa;
            display: block;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💖 My AI Body Care Assistant 💖</h1>
            <div class="emoji">💗</div>
            <p style="color: #6b5b8e;">ดูแลสุขภาพคุณด้วยใจ</p>
        </div>

        <!-- ส่วนกรอกข้อมูล -->
        <div class="section" id="inputSection">
            <div class="section-title">📝 ข้อมูลของคุณ</div>
            
            <div class="input-group">
                <label>ชื่อ</label>
                <input type="text" id="name" placeholder="ชื่อของคุณ">
            </div>

            <div class="input-group">
                <label>อายุ (ปี)</label>
                <input type="number" id="age" placeholder="25">
            </div>

            <div class="input-group">
                <label>เพศ</label>
                <select id="gender">
                    <option value="">เลือกเพศ</option>
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                </select>
            </div>

            <div class="input-group">
                <label>น้ำหนัก (กก.)</label>
                <input type="number" id="weight" placeholder="60">
            </div>

            <div class="input-group">
                <label>ส่วนสูง (ซม.)</label>
                <input type="number" id="height" placeholder="165">
            </div>

            <div class="input-group">
                <label>ระดับกิจกรรม</label>
                <select id="activity">
                    <option value="">เลือกระดับกิจกรรม</option>
                    <option value="1.2">นั่งทำงานตลอดวัน ไม่ค่อยเคลื่อนไหว</option>
                    <option value="1.375">ออกกำลังกายเบาๆ 1-3 วัน/สัปดาห์</option>
                    <option value="1.55">ออกกำลังกายปานกลาง 3-5 วัน/สัปดาห์</option>
                    <option value="1.725">ออกกำลังกายหนัก 6-7 วัน/สัปดาห์</option>
                    <option value="1.9">ออกกำลังกายหนักมาก หรือทำงานหนัก</option>
                </select>
            </div>

            <button class="btn btn-primary" onclick="calculateCalories()">คำนวณและแนะนำ 🌟</button>
        </div>

        <!-- ส่วนแสดงผล -->
        <div id="resultSection" class="hidden">
            <!-- พลังงานที่ควรได้รับ -->
            <div class="section">
                <div class="section-title">⚡ พลังงานที่ควรได้รับ</div>
                <div class="result-card">
                    <div class="result-value" id="calorieResult">-</div>
                    <div class="result-label">แคลอรี่/วัน</div>
                </div>
            </div>

            <!-- เมนูอาหาร -->
            <div class="section">
                <div class="section-title">🍱 เมนูอาหารแนะนำวันนี้</div>
                <button class="btn btn-secondary" onclick="randomMenu()">🎲 สุ่มเมนูใหม่</button>
                <div id="menuContainer"></div>
            </div>

            <!-- ท่าออกกำลังกาย -->
            <div class="section">
                <div class="section-title">🏃‍♀️ ท่าออกกำลังกายแนะนำ</div>
                <div id="exerciseContainer"></div>
            </div>

            <!-- AI Chatbot -->
            <div class="section">
                <div class="section-title">💬 คุยกับ AI ผู้ช่วย</div>
                <div class="chat-container" id="chatContainer">
                    <div class="chat-message ai-message">
                        สวัสดีค่ะ! ฉันคือผู้ช่วยดูแลสุขภาพ 💕 มีอะไรอยากถามเกี่ยวกับสุขภาพหรือโภชนาการไหมคะ?
                    </div>
                </div>
                <div class="chat-input-group">
                    <input type="text" id="chatInput" placeholder="พิมพ์คำถามที่นี่...">
                    <button class="btn btn-primary" onclick="sendMessage()">ส่ง</button>
                </div>
            </div>

            <!-- สรุป -->
            <div class="section">
                <div class="section-title">📊 สรุปข้อมูลของคุณ</div>
                <div class="summary-grid" id="summaryContainer"></div>
                <button class="btn btn-primary" onclick="saveAsImage()" style="margin-top: 15px;">
                    📸 บันทึกเป็นรูปภาพ
                </button>
            </div>
        </div>
    </div>

    <script>
        const menuDatabase = [
            {
                name: "ข้าวกล้องผัดผักรวม + ไข่ต้มสองฟอง",
                recipe: "ผัดข้าวกล้องกับผักคะน้า แครอท พริกหวาน ใส่น้ำมันนิดหน่อย ปรุงรสด้วยซอสหอยนางรม เสิร์ฟพร้อมไข่ต้ม",
                calories: 450
            },
            {
                name: "สลัดไก่ย่าง + ผลไม้",
                recipe: "ไก่อกย่างหั่นชิ้น ผสมกับผักสลัด มะเขือเทศ แตงกวา ราดน้ำสลัดโยเกิร์ต เสิร์ฟพร้อมแอปเปิ้ลหั่นชิ้น",
                calories: 380
            },
            {
                name: "ก๋วยเตี๋ยวต้มยำน้ำใส",
                recipe: "ต้มน้ำซุปให้เดือด ใส่เส้นก๋วยเตี๋ยว เนื้อปลา เห็ด มะเขือเทศ ปรุงรสด้วยน้ำปลา มะนาว พริก",
                calories: 420
            },
            {
                name: "ข้าวหน้าปลาแซลมอนย่าง",
                recipe: "ปลาแซลมอนย่างโรยพริกไทย กระเทียม เสิร์ฟบนข้าวกล้อง ผักต้มพร้อมซอสโชยุ",
                calories: 520
            },
            {
                name: "แกงจืดเต้าหู้หมูสับ + ข้าวกล้อง",
                recipe: "ต้มน้ำซุป ใส่หมูสับ เต้าหู้ ผักกาดขาว ปรุงรสเบาๆ เสิร์ฟพร้อมข้าวกล้อง",
                calories: 400
            }
        ];

        const exerciseDatabase = [
            {
                name: "Plank",
                description: "ท่ากระดานไม้ เสริมสร้างกล้ามเนื้อแกนกลาง ทำ 3 เซ็ต เซ็ตละ 30 วินาที"
            },
            {
                name: "Squat",
                description: "นั่งยองๆ ลุกยืดเข่า เสริมสร้างกล้ามเนื้อขา ทำ 3 เซ็ต เซ็ตละ 15 ครั้ง"
            },
            {
                name: "Walking",
                description: "เดินเร็วๆ หรือเดินธรรมดา 30-45 นาที ช่วยเผาผลาญไขมัน"
            },
            {
                name: "Yoga",
                description: "โยคะท่าง่ายๆ เช่น ท่าแมว-วัว, ท่าสุนัขก้มหัว ช่วยผ่อนคลายและยืดกล้ามเนื้อ"
            },
            {
                name: "Jumping Jacks",
                description: "กระโดดแยกขา-แตะมือเหนือศีรษะ ทำ 3 เซ็ต เซ็ตละ 20 ครั้ง เพิ่มการไหลเวียนเลือด"
            }
        ];

        let userData = {};

        function calculateCalories() {
            const name = document.getElementById('name').value;
            const age = parseInt(document.getElementById('age').value);
            const gender = document.getElementById('gender').value;
            const weight = parseFloat(document.getElementById('weight').value);
            const height = parseFloat(document.getElementById('height').value);
            const activity = parseFloat(document.getElementById('activity').value);

            if (!name || !age || !gender || !weight || !height || !activity) {
                alert('กรุณากรอกข้อมูลให้ครบถ้วนค่ะ 💕');
                return;
            }

            // คำนวณ BMR (Basal Metabolic Rate)
            let bmr;
            if (gender === 'male') {
                bmr = 10 * weight + 6.25 * height - 5 * age + 5;
            } else {
                bmr = 10 * weight + 6.25 * height - 5 * age - 161;
            }

            // คำนวณ TDEE (Total Daily Energy Expenditure)
            const tdee = Math.round(bmr * activity);

            userData = {
                name: name,
                age: age,
                gender: gender === 'male' ? 'ชาย' : 'หญิง',
                weight: weight,
                height: height,
                activity: activity,
                calories: tdee,
                bmi: (weight / ((height/100) ** 2)).toFixed(1)
            };

            document.getElementById('calorieResult').textContent = tdee;
            document.getElementById('resultSection').classList.remove('hidden');
            
            randomMenu();
            randomExercise();
            showSummary();

            window.scrollTo({
                top: document.getElementById('resultSection').offsetTop - 20,
                behavior: 'smooth'
            });
        }

        function randomMenu() {
            const container = document.getElementById('menuContainer');
            container.innerHTML = '';
            
            const shuffled = [...menuDatabase].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);

            selected.forEach((menu, index) => {
                const mealTime = ['มื้อเช้า', 'มื้อกลางวัน', 'มื้อเย็น'][index];
                container.innerHTML += `
                    <div class="menu-card">
                        <h4>🍽️ ${mealTime}: ${menu.name}</h4>
                        <p><strong>วิธีทำ:</strong> ${menu.recipe}</p>
                        <p><strong>พลังงาน:</strong> ~${menu.calories} แคลอรี่</p>
                    </div>
                `;
            });
        }

        function randomExercise() {
            const container = document.getElementById('exerciseContainer');
            const shuffled = [...exerciseDatabase].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);

            container.innerHTML = '';
            selected.forEach(exercise => {
                container.innerHTML += `
                    <div class="exercise-card">
                        <h4>💪 ${exercise.name}</h4>
                        <p>${exercise.description}</p>
                    </div>
                `;
            });
        }

        function showSummary() {
            const container = document.getElementById('summaryContainer');
            let bmiStatus = '';
            const bmi = parseFloat(userData.bmi);
            
            if (bmi < 18.5) bmiStatus = 'น้ำหนักน้อย';
            else if (bmi < 23) bmiStatus = 'สมส่วน';
            else if (bmi < 25) bmiStatus = 'น้ำหนักเกิน';
            else bmiStatus = 'อ้วน';

            container.innerHTML = `
                <div class="summary-item">
                    <strong>👤 ชื่อ:</strong> ${userData.name}
                </div>
                <div class="summary-item">
                    <strong>🎂 อายุ:</strong> ${userData.age} ปี
                </div>
                <div class="summary-item">
                    <strong>⚧ เพศ:</strong> ${userData.gender}
                </div>
                <div class="summary-item">
                    <strong>⚖️ น้ำหนัก:</strong> ${userData.weight} กก.
                </div>
                <div class="summary-item">
                    <strong>📏 ส่วนสูง:</strong> ${userData.height} ซม.
                </div>
                <div class="summary-item">
                    <strong>📊 BMI:</strong> ${userData.bmi} (${bmiStatus})
                </div>
                <div class="summary-item">
                    <strong>⚡ พลังงานต่อวัน:</strong> ${userData.calories} แคลอรี่
                </div>
            `;
        }

        async function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value.trim();
            
            if (!message) return;

            const container = document.getElementById('chatContainer');
            
            container.innerHTML += `
                <div class="chat-message user-message">${message}</div>
            `;

            input.value = '';

            // ข้อความตอบกลับอัตโนมัติ
            const responses = {
                'ลดน้ำหนัก': 'การลดน้ำหนักที่ดีควรลดสัปดาห์ละ 0.5-1 กก. ด้วยการกินอาหารที่มีแคลอรี่ต่ำกว่าที่ต้องการประมาณ 500 แคลอรี่/วัน พร้อมออกกำลังกายสม่ำเสมอค่ะ 💪',
                'ออกกำลังกาย': 'แนะนำให้ออกกำลังกายอย่างน้อย 150 นาทีต่อสัปดาห์ หรือประมาณวันละ 30 นาที 5 วันต่อสัปดาห์ค่ะ เริ่มจากเบาๆ ก่อนนะคะ 🏃‍♀️',
                'น้ำ': 'ควรดื่มน้ำวันละ 8-10 แก้ว หรือประมาณ 2-2.5 ลิตร ช่วยให้การเผาผลาญดีและผิวพรรณสวยใสค่ะ 💧',
                'นอน': 'การนอนหลับที่เพียงพอ 7-8 ชั่วโมงต่อคืนสำคัญมากค่ะ ช่วยให้ร่างกายฟื้นฟูและควบคุมฮอร์โมนที่เกี่ยวกับความหิวได้ดีขึ้น 😴',
                'default': 'ขอบคุณสำหรับคำถามค่ะ 💕 ถ้ามีคำถามเฉพาะเจาะจงเกี่ยวกับโภชนาการ การออกกำลังกาย หรือการดูแลสุขภาพ สามารถถามเพิ่มเติมได้เลยนะคะ'
            };

            let reply = responses.default;
            for (let key in responses) {
                if (message.includes(key)) {
                    reply = responses[key];
                    break;
                }
            }

            setTimeout(() => {
                container.innerHTML += `
                    <div class="chat-message ai-message">${reply}</div>
                `;
                container.scrollTop = container.scrollHeight;
            }, 500);

            container.scrollTop = container.scrollHeight;
        }

        document.getElementById('chatInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        async function saveAsImage() {
            const summarySection = document.getElementById('summaryContainer').parentElement;
            
            try {
                // สร้าง canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // ตั้งค่าขนาด canvas
                canvas.width = 800;
                canvas.height = 1000;
                
                // พื้นหลัง gradient
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, '#e8d5ff');
                gradient.addColorStop(0.5, '#d4e8ff');
                gradient.addColorStop(1, '#ffe0f0');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // วาดกรอบ
                ctx.strokeStyle = '#ddd6fe';
                ctx.lineWidth = 4;
                ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
                
                // หัวข้อ
                ctx.fillStyle = '#a78bfa';
                ctx.font = 'bold 36px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('💗 My AI Body Care Assistant 💗', canvas.width / 2, 80);
                
                ctx.font = '28px Arial';
                ctx.fillText('📊 สรุปข้อมูลของคุณ', canvas.width / 2, 140);
                
                // ข้อมูล
                const data = [
                    `👤 ชื่อ: ${userData.name}`,
                    `🎂 อายุ: ${userData.age} ปี`,
                    `⚧ เพศ: ${userData.gender}`,
                    `⚖️ น้ำหนัก: ${userData.weight} กก.`,
                    `📏 ส่วนสูง: ${userData.height} ซม.`,
                    `📊 BMI: ${userData.bmi}`,
                    `⚡ พลังงานต่อวัน: ${userData.calories} แคลอรี่`
                ];
                
                ctx.fillStyle = '#5a4b6b';
                ctx.font = '24px Arial';
                ctx.textAlign = 'left';
                
                let yPos = 220;
                data.forEach((text, index) => {
                    // พื้นหลังแต่ละรายการ
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(60, yPos - 30, canvas.width - 120, 60);
                    
                    ctx.strokeStyle = '#ddd6fe';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(60, yPos - 30, canvas.width - 120, 60);
                    
                    // ข้อความ
                    ctx.fillStyle = '#5a4b6b';
                    ctx.fillText(text, 80, yPos);
                    
                    yPos += 90;
                });
                
                // วันที่
                ctx.fillStyle = '#6b5b8e';
                ctx.font = '18px Arial';
                ctx.textAlign = 'center';
                const today = new Date().toLocaleDateString('th-TH');
                ctx.fillText(`สร้างเมื่อ: ${today}`, canvas.width / 2, canvas.height - 40);
                
                // แปลง canvas เป็น blob แล้วดาวน์โหลด
                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `body-care-summary-${userData.name}.png`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    alert('บันทึกรูปภาพเรียบร้อยแล้วค่ะ! 💕');
                });
                
            } catch (error) {
                alert('ขออภัยค่ะ เกิดข้อผิดพลาดในการบันทึกรูปภาพ กรุณาลองใหม่อีกครั้ง');
                console.error(error);
            }
        }
    </script>
</body>
</html>
