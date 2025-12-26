"""
Test Pipeline for Stress Level Prediction
Tests the complete flow: raw input -> preprocessing -> scaling -> MLP prediction
"""

import joblib
import numpy as np
from Raw_input_preprocessing import (
    preprocess_raw_input,
    scale_features,
    get_scaled_ordered_features,
    Feature_order
)

# Load the pretrained MLP model
def load_model(model_path="mlp_model.pkl"):
    """Load the trained MLP model from joblib file."""
    model = joblib.load(model_path)
    print(f"  Model loaded: {type(model).__name__}")
    return model


def predict_stress_level(model, scaled_features):
    """
    Make prediction using the MLP model.
    
    Args:
        model: Trained MLP classifier
        scaled_features: List of scaled feature values
        
    Returns:
        tuple: (predicted_class, prediction_probabilities)
    """
    # Convert to numpy array and reshape for single prediction
    features_array = np.array(scaled_features).reshape(1, -1)
    
    # Get prediction
    prediction = model.predict(features_array)[0]
    
    # Get prediction probabilities if available
    try:
        probabilities = model.predict_proba(features_array)[0]
    except AttributeError:
        probabilities = None
    
    return prediction, probabilities


def decode_stress_level(prediction):
    """
    Decode numeric prediction to stress level label.
    0 = Low, 1 = Medium, 2 = High
    """
    stress_labels = {0: "Low", 1: "Medium", 2: "High"}
    return stress_labels.get(prediction, "Unknown")


def run_test():
    """Run the complete test pipeline with dummy data."""
    
    print("\n" + "="*70)
    print("🧪 STRESS PREDICTION PIPELINE TEST")
    print("="*70)
    
    # ============================================
    # STEP 1: Define dummy unprocessed data
    # ============================================
    dummy_raw_input = {
        "Age": "18-24",
        "Gender": "Female",
        "Current_status": "Student",
        "Sleep_hours": 5,              # Low sleep
        "Work_hours": 10,              # High work hours
        "Hobby_hours": 0.5,            # Little hobby time
        "Commute_time": "60",          # 1 hour commute
        "Number_of_tasks": 8,          # Many tasks
        "Task_difficulty": "Hard",     # Difficult tasks
        "Work_under_pressure": "Highly stressed",
        "Social_hours": 1,             # Low social time
        "Social_quality": "Low (negative or draining)",
        "Home_environment": "Dissatisfied",
        "Stressful_event": "Yes",
        "Stress_types": ["Financial stress", "Academic/work failure or poor performance", "Health-related stress"],
        "Overthinking": "Almost always",
    }
    
    print("\n📥 STEP 1: RAW INPUT (Unprocessed)")
    print("-"*50)
    for key, value in dummy_raw_input.items():
        print(f"  {key}: {value}")
    
    # ============================================
    # STEP 2: Preprocess (encode) the data
    # ============================================
    processed_data = preprocess_raw_input(dummy_raw_input)
    
    print("\n🔄 STEP 2: PROCESSED DATA (Encoded)")
    print("-"*50)
    for key, value in processed_data.items():
        print(f"  {key}: {value}")
    
    # ============================================
    # STEP 3: Scale the features using StandardScaler
    # ============================================
    scaled_data = scale_features(processed_data)
    scaled_features = get_scaled_ordered_features(processed_data)
    
    print("\n📏 STEP 3: SCALED DATA (StandardScaler)")
    print("-"*50)
    for i, feature in enumerate(Feature_order):
        print(f"  {feature}: {scaled_features[i]:.4f}")
    
    print("\n📊 SCALED FEATURES ARRAY:")
    print(f"  {[round(f, 4) for f in scaled_features]}")
    
    # ============================================
    # STEP 4: Load model and make prediction
    # ============================================
    print("\n🤖 STEP 4: LOADING MLP MODEL...")
    print("-"*50)
    
    try:
        model = load_model("mlp_model.pkl")
        print("  ✅ Model loaded successfully!")
        print(f"  Model type: {type(model).__name__}")
        
        # Make prediction
        prediction, probabilities = predict_stress_level(model, scaled_features)
        stress_label = decode_stress_level(prediction)
        
        # ============================================
        # STEP 5: Display prediction results
        # ============================================
        print("\n" + "="*70)
        print("🎯 PREDICTION RESULT")
        print("="*70)
        print(f"\n  Predicted Class: {prediction}")
        print(f"  Stress Level: {stress_label}")
        
        if probabilities is not None:
            print(f"\n  Prediction Probabilities:")
            print(f"    Low (0):    {probabilities[0]*100:.2f}%")
            print(f"    Medium (1): {probabilities[1]*100:.2f}%")
            print(f"    High (2):   {probabilities[2]*100:.2f}%")
        
        print("\n" + "="*70)
        
        # Color-coded result
        if stress_label == "Low":
            emoji = "🟢"
        elif stress_label == "Medium":
            emoji = "🟡"
        else:
            emoji = "🔴"
        
        print(f"\n  {emoji} STRESS LEVEL: {stress_label.upper()} {emoji}")
        print("\n" + "="*70 + "\n")
        
        return prediction, stress_label, probabilities
        
    except FileNotFoundError:
        print("  ❌ ERROR: mlp_model.pkl not found!")
        print("  Make sure the model file is in the backend folder.")
        return None, None, None
    except Exception as e:
        print(f"  ❌ ERROR: {str(e)}")
        return None, None, None


def test_multiple_scenarios():
    """Test with multiple scenarios to see different predictions."""
    
    print("\n" + "="*70)
    print("🧪 TESTING MULTIPLE SCENARIOS")
    print("="*70)
    
    # Load model once
    try:
        model = load_model("mlp_model.pkl")
    except:
        print("❌ Could not load model")
        return
    
    scenarios = [
        {
            "name": "Relaxed Student",
            "data": {
                "Age": "18-24",
                "Gender": "Male",
                "Current_status": "Student",
                "Sleep_hours": 8,
                "Work_hours": 4,
                "Hobby_hours": 3,
                "Commute_time": "15",
                "Number_of_tasks": 2,
                "Task_difficulty": "Easy",
                "Work_under_pressure": "Not stressed",
                "Social_hours": 4,
                "Social_quality": "High (positive, supportive)",
                "Home_environment": "Satisfied",
                "Stressful_event": "No",
                "Stress_types": [],
                "Overthinking": "Never",
            }
        },
        {
            "name": "Moderate Worker",
            "data": {
                "Age": "25-35",
                "Gender": "Female",
                "Current_status": "Employed",
                "Sleep_hours": 6,
                "Work_hours": 8,
                "Hobby_hours": 1,
                "Commute_time": "45",
                "Number_of_tasks": 5,
                "Task_difficulty": "Moderate",
                "Work_under_pressure": "Slightly stressed",
                "Social_hours": 2,
                "Social_quality": "Medium (neutral)",
                "Home_environment": "Satisfied",
                "Stressful_event": "No",
                "Stress_types": [],
                "Overthinking": "Often",
            }
        },
        {
            "name": "Overwhelmed Both",
            "data": {
                "Age": "25-35",
                "Gender": "Female",
                "Current_status": "Both",
                "Sleep_hours": 4,
                "Work_hours": 12,
                "Hobby_hours": 0,
                "Commute_time": "150",
                "Number_of_tasks": 10,
                "Task_difficulty": "Hard",
                "Work_under_pressure": "Highly stressed",
                "Social_hours": 0,
                "Social_quality": "Low (negative or draining)",
                "Home_environment": "Dissatisfied",
                "Stressful_event": "Yes",
                "Stress_types": ["Financial stress", "Academic/work failure or poor performance", "Arguing/conflict with someone"],
                "Overthinking": "Almost always",
            }
        },
    ]
    
    for scenario in scenarios:
        print(f"\n📋 Scenario: {scenario['name']}")
        print("-"*50)
        
        # Process and predict
        processed = preprocess_raw_input(scenario['data'])
        scaled_features = get_scaled_ordered_features(processed)
        prediction, probabilities = predict_stress_level(model, scaled_features)
        stress_label = decode_stress_level(prediction)
        
        # Display result
        emoji = "🟢" if stress_label == "Low" else "🟡" if stress_label == "Medium" else "🔴"
        print(f"  {emoji} Prediction: {stress_label}")
        if probabilities is not None:
            print(f"  Probabilities: Low={probabilities[0]*100:.1f}%, Med={probabilities[1]*100:.1f}%, High={probabilities[2]*100:.1f}%")
    
    print("\n" + "="*70 + "\n")


if __name__ == "__main__":
    # Run single detailed test
    run_test()
    
    # Run multiple scenario tests
    test_multiple_scenarios()
"""
###Results:  
 python test_pipeline.py

======================================================================
🧪 STRESS PREDICTION PIPELINE TEST
======================================================================

📥 STEP 1: RAW INPUT (Unprocessed)
--------------------------------------------------
  Age: 18-24
  Gender: Female
  Current_status: Student
  Sleep_hours: 5
  Work_hours: 10
  Hobby_hours: 0.5
  Commute_time: 60
  Number_of_tasks: 8
  Task_difficulty: Hard
  Work_under_pressure: Highly stressed
  Social_hours: 1
  Social_quality: Low (negative or draining)
  Home_environment: Dissatisfied
  Stressful_event: Yes
  Stress_types: ['Financial stress', 'Academic/work failure or poor performance', 'Health-related stress']
  Overthinking: Almost always

🔄 STEP 2: PROCESSED DATA (Encoded)
--------------------------------------------------
  Age: 1
  Gender: 0
  Current_status: 1
  Sleep_hours: 5.0
  Work_hours: 10.0
  Hobby_hours: 0.5
  Commute_time: 60
  Number_of_tasks: 8
  Task_difficulty: 2
  Work_under_pressure: 2
  Social_hours: 1.0
  Social_quality: 0
  Home_environment: 0
  Stressful_event: 1
  Arguing/conflict with someone: 0
  Academic/work failure or poor performance: 1
  Transportation problem / car issue: 0
  Financial stress: 1
  Health-related stress: 1
  Bad weather: 0
  Overthinking: 3

📏 STEP 3: SCALED DATA (StandardScaler)
--------------------------------------------------
  Age: -0.5000
  Gender: -1.0000
  Current_status: -0.5000
  Sleep_hours: -1.0000
  Work_hours: 1.3333
  Hobby_hours: -1.0000
  Commute_time: 0.0000
  Number_of_tasks: 1.0000
  Task_difficulty: 1.2500
  Work_under_pressure: 1.2500
  Social_hours: -1.0000
  Social_quality: -1.2500
  Home_environment: -1.0000
  Stressful_event: 1.0000
  Arguing/conflict with someone: -0.5000
  Academic/work failure or poor performance: 2.0000
  Transportation problem / car issue: -0.3333
  Financial stress: 2.0000
  Health-related stress: 2.4286
  Bad weather: -0.3333
  Overthinking: 1.5000

📊 SCALED FEATURES ARRAY:
  [-0.5, -1.0, -0.5, -1.0, 1.3333, -1.0, 0.0, 1.0, 1.25, 1.25, -1.0, -1.25, -1.0, 1.0, -0.5, 2.0, -0.3333, 2.0, 2.4286, -0.3333, 1.5]

🤖 STEP 4: LOADING MLP MODEL...
--------------------------------------------------
C:\Users\DELL\AppData\Local\Programs\Python\Python310\lib\site-packages\sklearn\base.py:442: InconsistentVersionWarning: Trying to unpickle estimator LabelBinarizer from version 1.6.1 when using version 1.7.1. This might lead to breaking code or invalid results. Use at your own risk. For more info please refer to:
https://scikit-learn.org/stable/model_persistence.html#security-maintainability-limitations      
  warnings.warn(
C:\Users\DELL\AppData\Local\Programs\Python\Python310\lib\site-packages\sklearn\base.py:442: InconsistentVersionWarning: Trying to unpickle estimator MLPClassifier from version 1.6.1 when using version 1.7.1. This might lead to breaking code or invalid results. Use at your own risk. For more info please refer to:
https://scikit-learn.org/stable/model_persistence.html#security-maintainability-limitations      
  warnings.warn(
  Model loaded: MLPClassifier
  ✅ Model loaded successfully!
  Model type: MLPClassifier

======================================================================
🎯 PREDICTION RESULT
======================================================================

  Predicted Class: 2
  Stress Level: High

  Prediction Probabilities:
    Low (0):    4.13%
    Medium (1): 8.62%
    High (2):   87.26%

======================================================================

  🔴 STRESS LEVEL: HIGH 🔴

======================================================================


======================================================================
🧪 TESTING MULTIPLE SCENARIOS
======================================================================
C:\Users\DELL\AppData\Local\Programs\Python\Python310\lib\site-packages\sklearn\base.py:442: InconsistentVersionWarning: Trying to unpickle estimator LabelBinarizer from version 1.6.1 when using version 1.7.1. This might lead to breaking code or invalid results. Use at your own risk. For more info please refer to:
https://scikit-learn.org/stable/model_persistence.html#security-maintainability-limitations      
  warnings.warn(
C:\Users\DELL\AppData\Local\Programs\Python\Python310\lib\site-packages\sklearn\base.py:442: InconsistentVersionWarning: Trying to unpickle estimator MLPClassifier from version 1.6.1 when using version 1.7.1. This might lead to breaking code or invalid results. Use at your own risk. For more info please refer to:
https://scikit-learn.org/stable/model_persistence.html#security-maintainability-limitations      
  warnings.warn(
  Model loaded: MLPClassifier

📋 Scenario: Relaxed Student
--------------------------------------------------
  🟢 Prediction: Low
  Probabilities: Low=93.2%, Med=6.8%, High=0.0%

📋 Scenario: Moderate Worker
--------------------------------------------------
  🟡 Prediction: Medium
  Probabilities: Low=0.0%, Med=100.0%, High=0.0%

📋 Scenario: Overwhelmed Both
--------------------------------------------------
  🔴 Prediction: High
  Probabilities: Low=5.4%, Med=0.0%, High=94.6%

======================================================================
"""