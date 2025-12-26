# 🧠 Stress Level Prediction Web App

A full-stack web application that predicts stress levels using Machine Learning.

## ✅ What's Done

### Frontend (React + Vite)
- ✅ Landing page with app introduction
- ✅ 16-question lifestyle assessment questionnaire
- ✅ Progress bar showing completion status
- ✅ Form validation with error highlighting
- ✅ Loading state during prediction
- ✅ Result page with probability bars (Low 🟢, Medium 🟡, High 🔴)
- ✅ 4 personalized wellness suggestions per stress level

### Backend (Flask + Python)
- ✅ REST API with `/api/predict` endpoint
- ✅ Feature preprocessing pipeline (21 features)
- ✅ StandardScaler with real training data values
- ✅ MLP Neural Network model integration
- ✅ Probability prediction for all 3 classes

### Deployment Ready
- ✅ Environment variables configured
- ✅ CORS restricted to allowed origins
- ✅ Debug mode disabled for production
- ✅ `.env.example` templates created

## 🚀 Run Locally

```bash
# Backend
cd backend
pip install -r requirements.txt
python app.py

# Frontend (new terminal)
npm install
npm run dev
```

Open `http://localhost:5173`

## 📁 Tech Stack
- **Frontend:** React, Vite, CSS Modules
- **Backend:** Flask, Flask-CORS
- **ML:** scikit-learn MLPClassifier, joblib

## ⏳ TODO
- [ ] Deploy backend (Render/Railway)
- [ ] Deploy frontend (Vercel/Netlify)
- [ ] Configure production environment variables
