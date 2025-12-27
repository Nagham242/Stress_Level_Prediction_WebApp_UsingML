# 🧠 Stress Level Prediction Web App Using Machine Learning

A full-stack web application that predicts a user’s **stress level (Low, Medium, High)** based on lifestyle, behavioral, and emotional factors.  
The system uses a **Multilayer Perceptron (MLP) classifier** achieving **76% accuracy**, with a smooth, therapeutic **React-based UI** and a **Flask backend** serving a trained model.

---

## 🚀 Project Overview

This project combines **machine learning**, **data preprocessing**, and **web development** to build an intelligent stress assessment platform.

Users fill out a **therapeutic self-check questionnaire**, and the model predicts their stress level along with probability percentages and tailored wellness tips.  
The design focuses on a **calming, supportive**, and **non-judgmental** user experience rather than a clinical diagnostic style.

---

## 🧩 Features

### 🌐 Frontend (React + Vite)
- Interactive 16-question stress assessment form.  
- Calming, responsive UI with a therapeutic color palette.  
- Smooth navigation: Home → Questionnaire → Result page.  
- Real-time progress tracking with a progress bar.  
- Form validation and loading state (“Analyzing…”).  
- Clear probability visualization for stress levels.  
- Personalized wellness suggestions per stress level.

### ⚙️ Backend (Flask + Python)
- Handles user input, feature encoding, and scaling.  
- Loads `mlpmodel.pkl` (trained MLPClassifier) and `scaler.pkl` for predictions.  
- Returns JSON responses with predicted class, label, and probability scores.  
- Statistically consistent preprocessing ensuring reproducible results.  
- Deployed-ready with environment variables and CORS restrictions.

### 🤖 Machine Learning Core
- Hybrid dataset: **70% real survey data** + **30% generated synthetic data**.  
- Extreme preprocessing to handle human errors and inconsistencies.  
- Tested five models:
  1. Logistic Regression  
  2. Random Forest  
  3. Support Vector Machine (SVM)  
  4. XGBoost  
  5. MLPClassifier – best model with **~76.7% accuracy**.  

---

## 📊 Dataset Overview

**Size:** 6,096 rows × 22 columns  
**Target:** `Stressscale` (0 = Low, 1 = Medium, 2 = High)  

**Key Features:**
- Demographics: Age, Gender, Current Status  
- Lifestyle: Sleep Hours, Work Hours, Hobby Hours, Commute Time  
- Psychological: Overthinking level, Work under pressure  
- Social: Social Hours, Social Interaction Quality  
- Environmental & Event-based: Home Environment, Stressful Events  

**Data Source:**  
- Real responses via a custom survey.  
- Synthetic augmentation mimicking real patterns with controlled noise.

---

## 🧠 Model Development and Evaluation

Five supervised learning models were trained and evaluated on the same preprocessed dataset (915 test samples, 3 classes: 0 = Low, 1 = Medium, 2 = High).  

### 📌 Summary of Test Accuracies

| Model                | Accuracy | Δ Accuracy from Best |
|----------------------|----------|----------------------|
| Logistic Regression  | 0.4885   | -0.2787              |
| Random Forest        | 0.7443   | -0.0229              |
| SVM                  | 0.6568   | -0.1104              |
| XGBoost              | 0.7027   | -0.0645              |
| **MLPClassifier**    | **0.7672** | **0.0000**          |

The **MLPClassifier** achieved the best overall performance and was selected as the final production model.

---

### 📊 Logistic Regression

**Accuracy:** 0.4885  

**Classification Report**

- Class 0: precision 0.37, recall 0.15, f1-score 0.22 (support 190)  
- Class 1: precision 0.53, recall 0.76, f1-score 0.63 (support 462)  
- Class 2: precision 0.38, recall 0.25, f1-score 0.31 (support 263)  

**Confusion Matrix**

\[
\begin{bmatrix}
 29 & 129 &  32 \\
 35 & 351 &  76 \\
 15 & 181 &  67 \\
\end{bmatrix}
\]

Logistic Regression worked reasonably for the majority **Medium** class but struggled to correctly separate **Low** and **High** stress levels, leading to many misclassifications.

---

### 🌲 Random Forest

**Accuracy:** 0.7443  

**Classification Report**

- Class 0: precision 0.78, recall 0.49, f1-score 0.60 (support 190)  
- Class 1: precision 0.77, recall 0.85, f1-score 0.81 (support 462)  
- Class 2: precision 0.68, recall 0.75, f1-score 0.71 (support 263)  

**Confusion Matrix**

\[
\begin{bmatrix}
 93 &  55 &  42 \\
 20 & 392 &  50 \\
  7 &  60 & 196 \\
\end{bmatrix}
\]

Random Forest provided a strong non-linear baseline, with good recall for **Medium** and **High** classes, but slightly lower performance for correctly identifying **Low** stress samples.

---

### 📉 Support Vector Machine (SVM)

**Accuracy:** 0.6568  

**Classification Report**

- Class 0: precision 0.62, recall 0.34, f1-score 0.44 (support 190)  
- Class 1: precision 0.68, recall 0.81, f1-score 0.74 (support 462)  
- Class 2: precision 0.63, recall 0.63, f1-score 0.63 (support 263)  

SVM showed balanced performance on classes 1 and 2 but lower recall for class 0, making it less suitable than tree-based and neural network models.

---

### 🚀 XGBoost

**Accuracy:** 0.7027  

**Classification Report**

- Class 0: precision 0.63, recall 0.44, f1-score 0.52 (support 190)  
- Class 1: precision 0.73, recall 0.82, f1-score 0.77 (support 462)  
- Class 2: precision 0.69, recall 0.68, f1-score 0.69 (support 263)  

XGBoost improved over SVM and Logistic Regression, handling class imbalance better and capturing non-linear relationships, but still underperformed compared to the MLP.

---

### 🧬 Final Model – MLPClassifier

**Test Accuracy:** 0.7672  

**Classification Report**

- Class 0: precision 0.67, recall 0.62, f1-score 0.64 (support 190)  
- Class 1: precision 0.83, recall 0.84, f1-score 0.83 (support 462)  
- Class 2: precision 0.73, recall 0.75, f1-score 0.74 (support 263)  

**Confusion Matrix – MLPClassifier**

\[
\begin{bmatrix}
118 &  41 &  31 \\
 31 & 388 &  43 \\
 27 &  40 & 196 \\
\end{bmatrix}
\]

The MLPClassifier consistently outperformed all other models across all three classes, offering the best balance of precision and recall, and was therefore chosen as the **deployed model** for the web application.

---

## 🧪 Preprocessing Pipeline

1. **Data Cleaning** – handled typos, text ranges, and nonsense inputs.
2. **Text Standardization** – unified categorical values (e.g., “low negative” → “Low”).
3. **Encoding** – converted all categorical variables to numeric.  
4. **Scaling** – applied `StandardScaler` to normalize continuous variables.  
5. **Feature Engineering** – expanded multi-choice stressors into binary columns.
6. **Dataset Balancing** – merged real and synthetic samples.

---

## 🏗️ Project Structure

📦 Stress_Level_Prediction_WebApp_UsingMLWrite
├── backend/
│ ├── app.py # Flask API server
│ ├── preprocessing.py # Encoding and scaling logic
│ ├── mlpmodel.pkl # Trained MLPClassifier model
│ ├── scaler.pkl # Stored StandardScaler parameters
│ ├── requirements.txt # Python dependencies
│ └── .env.example # Environment variable template
│
├── frontend/
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Home, Questionnaire, Result pages
│ │ ├── App.jsx # Main app entry point
│ │ └── styles/
│ ├── package.json
│ ├── vite.config.js
│ └── .env.example
│
└── README.md

---

## ⚡ How It Works

1. User fills out the interactive questionnaire (React).  
2. Frontend sends a JSON payload to `/api/predict` (Flask).  
3. Backend preprocesses input using saved encoders and scaler.  
4. Model predicts probabilities for each stress category.  
5. Response displayed visually with probability bars and suggestions.

---

## 💻 Run Locally

### Prerequisites
- Python 3.9+
- Node.js + npm

### Backend Setup
cd backend
pip install -r requirements.txt
python app.py
Backend runs by default on: `http://localhost:5000`

### Frontend Setup 
npm install
npm run dev
Frontend runs on: `http://localhost:5173`

---

## ☁️ Deployment Guide

### Option A: Deploy Backend to Render / Railway
1. Push code to GitHub.  
2. On Render:  
   - New → Web Service → Connect repo.  
   - Root: `backend/`  
   - Build command: `pip install -r requirements.txt`  
   - Start command: `gunicorn app:app`  
3. Add environment variables: FLASK_DEBUG=false
ALLOWED_ORIGINS=https://your-frontend.vercel.app
### Option B: Deploy Frontend to Vercel / Netlify
1. Import repo.  
2. Framework: `Vite`  
3. Build command: `npm run build`  
4. Output directory: `dist`  
5. Add environment variable: VITE_API_URL=https://your-backend.onrender.com

---

## 🎨 UI Design Philosophy

- **Tone:** Calm, non-judgmental, and emotionally supportive.  
- **Color Palette:**  
- `#56021F` Deep Wine  
- `#7D1C4A` Dark Rose  
- `#D17D98` Muted Pink  
- `#F4CCE9` Light Blush  
- Rounded cards, soft shadows, gentle transitions.  
- No harsh alerts or sharp edges — a therapeutic “digital therapist” vibe.

---

## 🧬 Key Achievements

✅ Created hybrid dataset with real + synthetic data.  
✅ Built and preprocessed over 6,000 records.  
✅ Trained and tuned five models.  
✅ Deployed-ready Flask API with trained MLP model.  
✅ Designed and implemented modern React frontend.  
✅ Smooth frontend–backend integration via Flask API.  

---

## 🧑‍💻 Team Members

| Name | ID | Role |
|------|----|------|
| Mariam Cherif Elprince | 221001630 | Data Engineer / Preprocessing |
| Nagham Samir | 221000967 | Full-Stack Developer / Model Integration |

---

## 🏁 Final Outcome

An accurate, responsive, and visually calming **ML-powered stress assessment web app** that merges technical robustness with empathetic design — ready for deployment and real-world use.

⭐ *If you found this project helpful, don’t forget to give it a star!*

