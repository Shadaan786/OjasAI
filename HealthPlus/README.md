# OjasAI 🚑🤖

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Shadaan786/OjasAI?style=social)](https://github.com/Shadaan786/OjasAI/stargazers)
[![Version](https://img.shields.io/badge/version-1.0.0-green)](https://github.com/Shadaan786/OjasAI)

OjasAI is an AI-powered telemedicine platform designed to improve healthcare access in rural areas. It connects patients with healthcare providers, leveraging AI to assist in diagnosis, recommendations, and consultations.

---

## 🏥 Features

- **User Authentication:** Secure sign-up and login for patients and doctors  
- **Telemedicine Access:** Video/audio consultations with healthcare providers  
- **AI Assistance:** Smart suggestions, health insights, and AI-powered analysis  
- **Health Records:** Secure storage and retrieval of patient history  
- **Chat System:** Real-time communication between patients and doctors  
- **Medicine Ordering:** Order medicines directly through prescriptions  
- **Lab Reports:** Request lab tests and receive results digitally  
- **AI Lab & Prescription Analysis:** AI reviews lab reports and prescriptions for insights  
- **Emergency Services:** Request ambulance and other SOS services in emergencies  
- **AI Symptom Checker:** Provides guidance based on symptoms entered by the patient  
- **Secure Payment Gateway:** Safe and encrypted transactions for services and medicines  
- **Rural Healthcare Focus:** Designed to improve access in remote areas

---

## 💻 Tech Stack

**Frontend:** HTML, CSS, JavaScript (or React)  
**Backend/BaaS:** Firebase (Authentication, Firestore, Cloud Functions)  
**Database:** Firebase Firestore (NoSQL database)  
**AI Services:**  
- **Perplexity** – For analyzing lab reports and prescriptions  
- **Google MedGemma-4B-IT** – For image classification to analyze infected areas  

**Other:** Firebase Cloud Storage, Firebase Hosting, REST APIs

---

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- Firebase CLI
- Git

### Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/Shadaan786/OjasAI.git
```

2. **Navigate to the project folder:**
```bash
cd OjasAI
```

3. **Install dependencies:**
```bash
npm install
```

4. **Set up Firebase:**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore, and Cloud Storage
   - Copy your Firebase config to `src/config/firebase.js`

5. **Configure environment variables:**
```bash
cp .env.example .env
# Add your API keys and Firebase config
```

6. **Run the development server:**
```bash
npm start
```

7. **Open your browser and visit:** `http://localhost:3000`

---

## 📱 Usage

1. **For Patients:**
   - Sign up with your details
   - Book consultations with doctors
   - Use AI symptom checker for initial guidance
   - Order medicines and request lab tests
   - Access emergency services when needed

2. **For Healthcare Providers:**
   - Register as a healthcare professional
   - Manage patient consultations
   - Review AI-analyzed lab reports and prescriptions
   - Provide telemedicine services

---

Hosting

healthplus07.web.app
---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **[Shadaan786](https://github.com/Shadaan786)** - Project Lead & Developer
- **[Devyansh Arya](devyansh0044@gmail.com)** - Member
- **[Vartika Patel](vartikapatel773@gmail.com)** - Member
- **[Lalit Bhardwaj](lalitbhardwaj285@gmail.com)** - Member
- **[Sparsh Jaiswal](www.spa6055@gmail.com)** - Member
- **[Aviral Saraswat](abhisaraswattt@gmail.com)** - Member

---

## 📞 Contact

For questions or support, please reach out:
- GitHub: [@Shadaan786](https://github.com/Shadaan786)
- Email: (Shadaan0019vstar@gmail.com)

---

## 🙏 Acknowledgments

- Thanks to all healthcare workers who inspired this project
- Firebase for providing excellent backend services
- Google for the MedGemma AI model
- Perplexity for AI analysis capabilities

---

*Made with ❤️ for better healthcare access in rural communities*

