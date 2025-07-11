

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import os
import glob

app = Flask(__name__)
# Enhanced CORS configuration
CORS(app, resources={
    r"/*": {
        "origins":"http://172.20.10.4:8082",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True,
        "max_age": 86400
    }
})

# Debugging: Print directory structure
print("Files in current directory:")
for file in os.listdir('.'):
    print(f"  {file}")

if os.path.exists('webApi'):
    print("Files in webApi directory:")
    for file in os.listdir('webApi'):
        print(f"  {file}")

def find_model_file():
    possible_locations = [
        'webApi/rice_disease_model_final_20250422-213930.h5',
        'webApi/rice_disease_model_final_20250422-213930.keras',
        'rice_disease_model_final_20250422-213930.h5',
        'rice_disease_model_final_20250422-213930.keras'
    ]
    
    for location in possible_locations:
        if os.path.exists(location):
            print(f"Found model at: {location}")
            return location
    
    # Fallback to pattern matching
    patterns = [
        'webApi/.h5', 'webApi/.keras',
        '.h5', '.keras',
        'webApi/model.', 'model.'
    ]
    
    for pattern in patterns:
        files = glob.glob(pattern)
        if files:
            print(f"Found model matching pattern {pattern}: {files[0]}")
            return files[0]
    
    return None

# Model loading with enhanced error handling
model_file = find_model_file()
print(f"Attempting to load model from: {model_file}")

model = None
if model_file:
    try:
        # Configure TensorFlow to use CPU if needed
        tf.config.set_visible_devices([], 'GPU')  # Disable GPU if not needed
        print("Loading model...")
        model = tf.keras.models.load_model(model_file)
        print("Model loaded successfully!")
        print(f"Model input shape: {model.input_shape}")
        print(f"Model output shape: {model.output_shape}")
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        model = None
else:
    print("No model file found!")

class_names = [
    'bacterial_leaf_blight', 'brown_spot', 'healthy', 'leaf_blast', 'leaf_scald',
    'narrow_brown_spot', 'neck_blast', 'rice_hispa', 'sheath_blight', 'tungro'
]

@app.after_request
def after_request(response):
    # Add additional CORS headers to every response
    response.headers.add('Access-Control-Allow-Origin', 'http://172.20.10.4:8082')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route('/')
def index():
    return jsonify({
        "message": "Rice Disease Prediction API",
        "status": "running",
        "cors_allowed_origins": [
            "http://localhost:8082",
            "http://127.0.0.1:8082"
        ]
    })
@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    if request.method == 'OPTIONS':
        response = jsonify({'status': 'preflight'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        return response

    if model is None:
        return jsonify({
            'error': 'Model not loaded',
            'solution': 'Check server logs for model loading errors'
        }), 503

    if 'image' not in request.files:
        return jsonify({
            'error': 'No image provided',
            'expected_format': 'multipart/form-data with image file'
        }), 400

    try:
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'Empty file provided'}), 400

        img = Image.open(io.BytesIO(file.read()))
        if img.format not in ['JPEG', 'PNG']:
            return jsonify({'error': 'Unsupported image format'}), 400

        img = img.convert('RGB').resize((256, 256))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_array)
        predicted_class_index = int(np.argmax(predictions[0]))  # Convert to native Python int
        
        if predicted_class_index >= len(class_names):
            return jsonify({
                'error': 'Model prediction out of range',
                'predicted_index': predicted_class_index,
                'max_index': len(class_names) - 1
            }), 500

        predicted_class = class_names[predicted_class_index]
        confidence = float(predictions[0][predicted_class_index] * 100)

        # Convert all numpy types to native Python types
        all_predictions = {
            name: float(pred)  # Convert numpy float to Python float
            for name, pred in zip(class_names, predictions[0])
        }

        return jsonify({
            'disease': predicted_class,
            'confidence': round(confidence, 2),
            'class_index': predicted_class_index,  # Now a Python int
            'all_predictions': all_predictions
        })

    except Exception as e:
        app.logger.error(f"Prediction error: {str(e)}", exc_info=True)
        return jsonify({
            'error': 'Prediction failed',
            'details': str(e)
        }), 500

@app.route('/model-status', methods=['GET'])
def model_status():
    status = {
        'status': 'loaded' if model else 'not_loaded',
        'model_file': model_file,
        'class_names': class_names,
        'input_shape': model.input_shape if model else None,
        'output_shape': model.output_shape if model else None
    }
    
    if model:
        try:
            import io
            from contextlib import redirect_stdout
            f = io.StringIO()
            with redirect_stdout(f):
                model.summary()
            status['summary'] = f.getvalue()
        except Exception as e:
            status['summary_error'] = str(e)
    
    return jsonify(status)

@app.route('/test-connection', methods=['GET'])
def test_connection():
    return jsonify({
        'success': True,
        'client_ip': request.remote_addr,
        'headers': dict(request.headers),
        'cors_status': 'configured'
    })
@app.route('/test', methods=['GET'])
def test():
    return jsonify({
        'message': 'Hello, World'
    })
   

if __name__ == '__main__':
    # Configuration for development
    app.config.update(
        JSONIFY_PRETTYPRINT_REGULAR=True,
        MAX_CONTENT_LENGTH=16 * 1024 * 1024,  # 16MB upload limit
        PROPAGATE_EXCEPTIONS=True
    )
    
    # Run with better error reporting
    try:
        app.run(
            host='0.0.0.0',
            port=5000,
            debug=True,
            threaded=True,
           
        )
    except Exception as e:
        print(f"Failed to start server: {str(e)}")
        raise