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

## 🧠 Model Performance

| Model | Accuracy | Notes |
|--------|-----------|-------|
| Logistic Regression | ~65% | Baseline model |
| Random Forest | ~70% | Good interpretability |
| SVM | ~72% | Performs well on small datasets |
| XGBoost | ~74% | Strong tree-based model |
| **MLPClassifier** | **~76.7%** | **Selected Final Model** |

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

