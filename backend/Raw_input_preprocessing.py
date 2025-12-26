"""
Raw Input Preprocessing Module for Stress Level Prediction
This module handles the preprocessing of raw form inputs to match the model's expected format.
"""

# Feature order expected by the model (21 features - Stress_scale is the target, not input)
Feature_order = [
    "Age",
    "Gender",
    "Current_status",
    "Sleep_hours",
    "Work_hours",
    "Hobby_hours",
    "Commute_time",
    "Number_of_tasks",
    "Task_difficulty",
    "Work_under_pressure",
    "Social_hours",
    "Social_quality",
    "Home_environment",
    "Stressful_event",
    "Arguing/conflict with someone",
    "Academic/work failure or poor performance",
    "Transportation problem / car issue",
    "Financial stress",
    "Health-related stress",
    "Bad weather",
    "Overthinking"
]

# Feature scaling ranges for StandardScaler (mean, std) - from trained scaler.pkl
FEATURE_SCALING_PARAMS = {
    "Age": {"mean": 1.04569955, "std": 1.06964953},
    "Gender": {"mean": 0.47668151, "std": 0.49945595},
    "Current_status": {"mean": 1.56644012, "std": 0.91288131},
    "Sleep_hours": {"mean": 6.24003488, "std": 2.10615835},
    "Work_hours": {"mean": 4.92024824, "std": 3.36650644},
    "Hobby_hours": {"mean": 3.42145075, "std": 1.96339558},
    "Commute_time": {"mean": 52.77243965, "std": 41.28204429},
    "Number_of_tasks": {"mean": 5.93102802, "std": 3.27210002},
    "Task_difficulty": {"mean": 1.01593625, "std": 0.87392726},
    "Work_under_pressure": {"mean": 1.07311929, "std": 0.72570191},
    "Social_hours": {"mean": 5.23416809, "std": 2.88210155},
    "Social_quality": {"mean": 1.12819311, "std": 0.8590464},
    "Home_environment": {"mean": 0.65268338, "std": 0.47611741},
    "Stressful_event": {"mean": 0.58073588, "std": 0.49343867},
    "Arguing/conflict with someone": {"mean": 0.27349426, "std": 0.44575234},
    "Academic/work failure or poor performance": {"mean": 0.28825873, "std": 0.45295213},
    "Transportation problem / car issue": {"mean": 0.26201078, "std": 0.43972847},
    "Financial stress": {"mean": 0.2765409, "std": 0.44728741},
    "Health-related stress": {"mean": 0.27349426, "std": 0.44575234},
    "Bad weather": {"mean": 0.28872744, "std": 0.45317095},
    "Overthinking": {"mean": 1.6217483, "std": 0.99087727}
}

# Stressor types list
STRESSOR_TYPES = [
    "Arguing/conflict with someone",
    "Academic/work failure or poor performance",
    "Transportation problem / car issue",
    "Financial stress",
    "Health-related stress",
    "Bad weather"
]


def preprocess_raw_input(raw_input: dict) -> dict:
    """
    Preprocesses raw form input values into model-ready format.
    
    Args:
        raw_input (dict): Dictionary containing raw form values
        
    Returns:
        dict: Preprocessed values ready for model prediction
    """
    processed = {}
    
    # 1. Age encoding: <18=0, 18-24=1, 25-35=2, 36+=3
    processed["Age"] = encode_age(raw_input.get("Age", "18-24"))
    
    # 2. Gender encoding: Female=0, Male=1
    processed["Gender"] = encode_gender(raw_input.get("Gender", "Female"))
    
    # 3. Current status encoding: Neither=0, Student=1, Employed=2, Both=3
    processed["Current_status"] = encode_current_status(raw_input.get("Current_status", "Neither"))
    
    # 4. Sleep hours - numeric (int or float)
    processed["Sleep_hours"] = convert_to_numeric(raw_input.get("Sleep_hours", 0))
    
    # 5. Work hours - numeric (int or float)
    processed["Work_hours"] = convert_to_numeric(raw_input.get("Work_hours", 0))
    
    # 6. Hobby hours - numeric (int or float)
    processed["Hobby_hours"] = convert_to_numeric(raw_input.get("Hobby_hours", 0))
    
    # 7. Commute time - convert to standard values (15, 45, 60, 150)
    processed["Commute_time"] = convert_commute_time(raw_input.get("Commute_time", "< 30 minutes"))
    
    # 8. Number of tasks - integer only
    processed["Number_of_tasks"] = int(convert_to_numeric(raw_input.get("Number_of_tasks", 0)))
    
    # 9. Task difficulty encoding: Easy=0, Moderate=1, Hard=2
    processed["Task_difficulty"] = encode_task_difficulty(raw_input.get("Task_difficulty", "Moderate"))
    
    # 10. Work under pressure encoding: Not stressed=0, Slightly stressed=1, Highly stressed=2
    processed["Work_under_pressure"] = encode_stress_under_pressure(raw_input.get("Work_under_pressure", "Not stressed"))
    
    # 11. Social interaction hours - numeric (int or float)
    processed["Social_hours"] = convert_to_numeric(raw_input.get("Social_hours", 0))
    
    # 12. Social interaction quality encoding: Low=0, Medium=1, High=2
    processed["Social_quality"] = encode_social_quality(raw_input.get("Social_quality", "Medium"))
    
    # 13. Home environment encoding: Dissatisfied=0, Satisfied=1
    processed["Home_environment"] = encode_home_environment(raw_input.get("Home_environment", "Satisfied"))
    
    # 14. Stressful event encoding: No=0, Yes=1
    stressful_event = raw_input.get("Stressful_event", "No")
    processed["Stressful_event"] = 1 if stressful_event == "Yes" else 0
    
    # 15. Process stressor types - only active if stressful_event is Yes
    selected_stressors = raw_input.get("Stress_types", [])
    if isinstance(selected_stressors, str):
        # Handle comma or semicolon separated string
        selected_stressors = [s.strip() for s in selected_stressors.replace(";", ",").split(",")]
    
    for stressor in STRESSOR_TYPES:
        if processed["Stressful_event"] == 1 and stressor in selected_stressors:
            processed[stressor] = 1
        else:
            processed[stressor] = 0
    
    # 16. Overthinking frequency encoding: Never=0, Rarely=1, Often=2, Almost always=3
    processed["Overthinking"] = encode_overthinking(raw_input.get("Overthinking", "Never"))
    
    return processed


def encode_age(age_value):
    """
    Encode age range to numeric value.
    <18=0, 18-24=1, 25-35=2, 36+=3
    """
    age_map = {
        "<18": 0,
        "18-24": 1,
        "25-35": 2,
        "36+": 3,
    }
    # Handle string input
    if isinstance(age_value, str):
        return age_map.get(age_value, 1)  # Default to 18-24
    # Handle numeric input
    if isinstance(age_value, (int, float)):
        if age_value < 18:
            return 0
        elif age_value <= 24:
            return 1
        elif age_value <= 35:
            return 2
        else:
            return 3
    return 1  # Default


def encode_gender(gender_value):
    """
    Encode gender to numeric value.
    Female=1, Male=0
    """
    gender_map = {
        "Female": 0,
        "female": 0,
        "Male": 1,
        "male": 1
    }
    return gender_map.get(gender_value, 0)


def encode_current_status(status_value):
    """
    Encode current status to numeric value.
    Neither=0, Student=1, Employed=2, Both=3
    """
    status_map = {
        "Neither": 0,
        "neither": 0,
        "Student": 1,
        "student": 1,
        "Employed": 2,
        "employed": 2,
        "Both": 3,
        "both": 3
    }
    return status_map.get(status_value, 0)


def encode_task_difficulty(difficulty_value):
    """
    Encode task difficulty to numeric value.
    Easy=0, Moderate=1, Hard=2
    """
    difficulty_map = {
        "Easy": 0,
        "easy": 0,
        "Moderate": 1,
        "moderate": 1,
        "Hard": 2,
        "hard": 2,
    }
    return difficulty_map.get(difficulty_value, 1)


def encode_stress_under_pressure(pressure_value):
    """
    Encode stress under pressure to numeric value.
    Not stressed=0, Slightly stressed=1, Highly stressed=2
    """
    pressure_map = {
        "Not stressed": 0,
        "not stressed": 0,
        "Slightly stressed": 1,
        "slightly stressed": 1,
        "Highly stressed": 2,
        "highly stressed": 2
    }
    return pressure_map.get(pressure_value, 0)


def encode_social_quality(quality_value):
    """
    Encode social interaction quality to numeric value.
    Low (negative, draining)=0, Medium (neutral)=1, High (positive, supportive)=2
    """
    quality_value_lower = str(quality_value).lower()
    
    if "low" in quality_value_lower or "negative" in quality_value_lower or "draining" in quality_value_lower:
        return 0
    elif "high" in quality_value_lower or "positive" in quality_value_lower or "supportive" in quality_value_lower:
        return 2
    else:
        return 1  # Medium/neutral


def encode_home_environment(environment_value):
    """
    Encode home environment to numeric value.
    Dissatisfied=0, Satisfied=1
    """
    environment_map = {
        "Dissatisfied": 0,
        "dissatisfied": 0,
        "Satisfied": 1,
        "satisfied": 1
    }
    return environment_map.get(environment_value, 1)


def encode_overthinking(overthinking_value):
    """
    Encode overthinking frequency to numeric value.
    Never=0, Rarely=1, Often=2, Almost always=3
    """
    overthinking_map = {
        "Never": 0,
        "never": 0,
        "Rarely": 1,
        "rarely": 1,
        "Often": 2,
        "often": 2,
        "Almost always": 3,
        "almost always": 3,
    }
    return overthinking_map.get(overthinking_value, 0)


def convert_to_numeric(value):
    """
    Convert a value to numeric (float).
    Handles various input formats including strings with text.
    """
    import re
    
    if value is None:
        return 0.0
    
    if isinstance(value, (int, float)):
        return max(0, float(value))
    
    s = str(value).strip().lower()
    
    # Handle text representations of zero
    zero_texts = ["none", "zero", "no", "didn't", "didnt", "n/a", ""]
    if any(t in s for t in zero_texts):
        return 0.0
    
    # Handle text representations of high values
    high_texts = ["all day", "most of the day"]
    if any(t in s for t in high_texts):
        return 10.0
    
    # Extract numbers from the string
    nums = re.findall(r'\d+(?:\.\d+)?', s)
    
    if len(nums) > 1:
        nums = list(map(float, nums))
        # If it's a range like "2-3" or "2 to 3", return average
        if re.search(r'(\d+)\s*[-~/]\s*(\d+)', s) or "to" in s:
            return sum(nums) / len(nums)
        # Otherwise sum them (e.g., "1 hour calling, 1 hour chatting")
        return sum(nums)
    
    if len(nums) == 1:
        return float(nums[0])
    
    return 0.0


def convert_commute_time(value):
    """
    Convert commute time to standard numeric values.
    Valid values: 15, 45, 60, 150. Default: 45
    """
    valid_values = [15, 45, 60, 150]
    
    try:
        val = int(value)
        return val if val in valid_values else 45
    except (ValueError, TypeError):
        return 45


def get_ordered_features(processed_data: dict) -> list:
    """
    Returns the processed features in the correct order for model input.
    
    Args:
        processed_data (dict): Dictionary of preprocessed values
        
    Returns:
        list: Features in the correct order
    """
    return [processed_data.get(feature, 0) for feature in Feature_order]


def scale_features(processed_data: dict) -> dict:
    """
    Scales all features using StandardScaler formula: (x - mean) / std
    
    Args:
        processed_data (dict): Dictionary of preprocessed (encoded) values
        
    Returns:
        dict: Scaled feature values
    """
    scaled = {}
    
    for feature in Feature_order:
        value = processed_data.get(feature, 0)
        params = FEATURE_SCALING_PARAMS.get(feature, {"mean": 0, "std": 1})
        
        # StandardScaler formula: (x - mean) / std
        # Avoid division by zero
        std = params["std"] if params["std"] != 0 else 1
        scaled[feature] = (value - params["mean"]) / std
    
    return scaled


def get_scaled_ordered_features(processed_data: dict) -> list:
    """
    Returns scaled features in the correct order for MLP model input.
    
    Args:
        processed_data (dict): Dictionary of preprocessed values
        
    Returns:
        list: Scaled features in the correct order for model
    """
    scaled_data = scale_features(processed_data)
    return [scaled_data.get(feature, 0) for feature in Feature_order]


def preprocess_and_scale(raw_input: dict) -> tuple:
    """
    Complete preprocessing pipeline: encode and scale features.
    
    Args:
        raw_input (dict): Dictionary containing raw form values
        
    Returns:
        tuple: (processed_dict, scaled_dict, scaled_features_list)
    """
    processed = preprocess_raw_input(raw_input)
    scaled = scale_features(processed)
    scaled_features = [scaled.get(feature, 0) for feature in Feature_order]
    
    return processed, scaled, scaled_features
