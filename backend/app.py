"""
Flask API for Stress Level Prediction
Receives form data, preprocesses it, scales it, and returns ML prediction
"""

import os
import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from Raw_input_preprocessing import (
    preprocess_raw_input, 
    get_ordered_features, 
    scale_features,
    get_scaled_ordered_features,
    Feature_order
)

app = Flask(__name__)

# Configure CORS - restrict to allowed origins
ALLOWED_ORIGINS = os.environ.get('ALLOWED_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173').split(',')
CORS(app, origins=ALLOWED_ORIGINS)

# Load ML model at startup
print("Loading MLP model...")
model = joblib.load('mlp_model.pkl')
print(f"✅ Model loaded: {type(model).__name__}")


def map_frontend_to_backend(frontend_data):
    """
    Maps frontend field names to backend expected field names.
    
    Args:
        frontend_data (dict): Data from React frontend
        
    Returns:
        dict: Mapped data for preprocessing
    """
    # Map frontend keys to backend keys
    mapped = {
        "Age": frontend_data.get("ageRange"),
        "Gender": frontend_data.get("gender"),
        "Current_status": frontend_data.get("currentStatus"),
        "Sleep_hours": frontend_data.get("sleepHours"),
        "Work_hours": frontend_data.get("workStudyHours"),
        "Hobby_hours": frontend_data.get("hobbiesHours"),
        "Commute_time": frontend_data.get("commuteTime"),
        "Number_of_tasks": frontend_data.get("tasksToComplete"),
        "Task_difficulty": frontend_data.get("taskDifficulty"),
        "Work_under_pressure": frontend_data.get("feelingUnderPressure"),
        "Social_hours": frontend_data.get("socialInteractionHours"),
        "Social_quality": frontend_data.get("interactionQuality"),
        "Home_environment": frontend_data.get("homeEnvironment"),
        "Stressful_event": "Yes" if frontend_data.get("stressfulEvents") else "No",
        "Stress_types": frontend_data.get("stressTriggers", []),
        "Overthinking": frontend_data.get("overthinkingFrequency"),
    }
    
    return mapped


def predict_stress(scaled_features):
    """
    Make prediction using the MLP model.
    
    Args:
        scaled_features: List of scaled feature values
        
    Returns:
        dict: Prediction results with class and probabilities
    """
    # Convert to numpy array and reshape for single prediction
    features_array = np.array(scaled_features).reshape(1, -1)
    
    # Get prediction
    prediction = int(model.predict(features_array)[0])
    
    # Get prediction probabilities
    probabilities = model.predict_proba(features_array)[0]
    
    # Map to labels
    stress_labels = {0: "low", 1: "medium", 2: "high"}
    predicted_label = stress_labels.get(prediction, "unknown")
    
    return {
        "predicted_class": prediction,
        "predicted_label": predicted_label,
        "probabilities": {
            "low": round(float(probabilities[0]) * 100, 2),
            "medium": round(float(probabilities[1]) * 100, 2),
            "high": round(float(probabilities[2]) * 100, 2)
        }
    }


@app.route('/api/predict', methods=['POST'])
def predict():
    """
    Main endpoint to receive form data and return stress prediction.
    """
    try:
        # Get JSON data from request
        frontend_data = request.get_json()
        
        print("\n" + "="*60)
        print("📥 RAW INPUT FROM FRONTEND:")
        print("="*60)
        for key, value in frontend_data.items():
            print(f"  {key}: {value}")
        
        # Map frontend fields to backend fields
        mapped_data = map_frontend_to_backend(frontend_data)
        
        print("\n" + "="*60)
        print("🔄 MAPPED DATA (Frontend → Backend):")
        print("="*60)
        for key, value in mapped_data.items():
            print(f"  {key}: {value}")
        
        # Preprocess the data (encode categorical values)
        processed_data = preprocess_raw_input(mapped_data)
        
        print("\n" + "="*60)
        print("✅ PROCESSED DATA (Encoded):")
        print("="*60)
        for key, value in processed_data.items():
            print(f"  {key}: {value}")
        
        # Get scaled ordered features for MLP model
        scaled_ordered_features = get_scaled_ordered_features(processed_data)
        
        print("\n" + "="*60)
        print("📏 SCALED FEATURES (StandardScaler):")
        print("="*60)
        print(f"  {[round(f, 4) for f in scaled_ordered_features]}")
        
        # Make prediction
        prediction_result = predict_stress(scaled_ordered_features)
        
        print("\n" + "="*60)
        print("🎯 PREDICTION RESULT:")
        print("="*60)
        print(f"  Predicted Class: {prediction_result['predicted_class']}")
        print(f"  Stress Level: {prediction_result['predicted_label'].upper()}")
        print(f"  Probabilities:")
        print(f"    Low:    {prediction_result['probabilities']['low']}%")
        print(f"    Medium: {prediction_result['probabilities']['medium']}%")
        print(f"    High:   {prediction_result['probabilities']['high']}%")
        print("="*60 + "\n")
        
        return jsonify({
            "success": True,
            "prediction": prediction_result
        })
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}\n")
        import traceback
        traceback.print_exc()
        return jsonify({
            "success": False,
            "error": str(e)
        }), 400


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "Backend is running", "model_loaded": True})


if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 5000))
    DEBUG = os.environ.get('FLASK_DEBUG', 'false').lower() == 'true'
    
    print("\n" + "="*60)
    print("🚀 Stress Prediction Backend Server Started")
    print("="*60)
    print(f"  Prediction API: http://localhost:{PORT}/api/predict")
    print(f"  Health Check:   http://localhost:{PORT}/api/health")
    print(f"  Debug Mode:     {DEBUG}")
    print("="*60 + "\n")
    
    app.run(debug=DEBUG, host='0.0.0.0', port=PORT)
