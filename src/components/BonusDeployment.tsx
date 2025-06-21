
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Rocket, Globe, Code, Monitor, Smartphone, Cloud } from "lucide-react";

export const BonusDeployment = () => {
  const [deploymentType, setDeploymentType] = useState<'streamlit' | 'flask' | null>(null);
  
  const streamlitCode = `import streamlit as st
import tensorflow as tf
import numpy as np
from PIL import Image
import cv2

# Load the trained MNIST model
@st.cache_resource
def load_model():
    return tf.keras.models.load_model('mnist_model.h5')

model = load_model()

st.title("🧠 MNIST Digit Classifier")
st.write("Upload a handwritten digit image or draw one to get predictions!")

# Create two columns for different input methods
col1, col2 = st.columns(2)

with col1:
    st.subheader("📁 Upload Image")
    uploaded_file = st.file_uploader("Choose an image...", type=['png', 'jpg', 'jpeg'])
    
    if uploaded_file is not None:
        # Process uploaded image
        image = Image.open(uploaded_file)
        st.image(image, caption='Uploaded Image', width=200)
        
        # Preprocess for model
        img_array = np.array(image.convert('L'))  # Convert to grayscale
        img_array = cv2.resize(img_array, (28, 28))  # Resize to 28x28
        img_array = img_array.reshape(1, 28, 28, 1) / 255.0  # Normalize
        
        # Make prediction
        predictions = model.predict(img_array)
        predicted_digit = np.argmax(predictions[0])
        confidence = np.max(predictions[0]) * 100
        
        st.success(f"Predicted Digit: **{predicted_digit}**")
        st.info(f"Confidence: **{confidence:.1f}%**")
        
        # Show prediction probabilities
        st.subheader("📊 Prediction Probabilities")
        for i, prob in enumerate(predictions[0]):
            st.write(f"Digit {i}: {prob*100:.2f}%")

with col2:
    st.subheader("✏️ Draw a Digit")
    # Note: This would require additional libraries like streamlit-drawable-canvas
    st.write("Feature coming soon! Upload an image for now.")

# Model information
st.sidebar.subheader("🔧 Model Info")
st.sidebar.write("**Architecture:** CNN with 2 Conv layers")
st.sidebar.write("**Training Accuracy:** 99.1%")
st.sidebar.write("**Test Accuracy:** 98.3%")
st.sidebar.write("**Framework:** TensorFlow/Keras")`;

  const flaskCode = `from flask import Flask, request, render_template, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import base64
import io

app = Flask(__name__)

# Load model
model = tf.keras.models.load_model('mnist_model.h5')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get image data from request
        if 'file' in request.files:
            file = request.files['file']
            image = Image.open(file.stream)
        else:
            # Handle base64 image data (from canvas)
            image_data = request.json['image']
            image_data = image_data.replace('data:image/png;base64,', '')
            image = Image.open(io.BytesIO(base64.b64decode(image_data)))
        
        # Preprocess image
        img_array = np.array(image.convert('L'))
        img_array = np.resize(img_array, (28, 28))
        img_array = img_array.reshape(1, 28, 28, 1) / 255.0
        
        # Make prediction
        predictions = model.predict(img_array)
        predicted_digit = int(np.argmax(predictions[0]))
        confidence = float(np.max(predictions[0]))
        
        # Get all probabilities
        probabilities = [float(p) for p in predictions[0]]
        
        return jsonify({
            'prediction': predicted_digit,
            'confidence': confidence,
            'probabilities': probabilities,
            'success': True
        })
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)`;

  const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MNIST Digit Classifier</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold text-center mb-8">🧠 AI Digit Classifier</h1>
        
        <div class="max-w-2xl mx-auto">
            <div class="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 class="text-2xl font-semibold mb-4">Upload or Draw a Digit</h2>
                
                <!-- File Upload -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">Upload Image</label>
                    <input type="file" id="fileInput" accept="image/*" 
                           class="w-full p-2 bg-gray-700 rounded border">
                </div>
                
                <!-- Drawing Canvas -->
                <div class="mb-6">
                    <label class="block text-sm font-medium mb-2">Or Draw Here</label>
                    <canvas id="drawingCanvas" width="280" height="280" 
                            class="border-2 border-gray-600 bg-black cursor-crosshair"></canvas>
                    <button id="clearCanvas" class="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700">
                        Clear Canvas
                    </button>
                </div>
                
                <button id="predictBtn" class="w-full py-3 bg-blue-600 rounded hover:bg-blue-700 font-semibold">
                    🔮 Predict Digit
                </button>
            </div>
            
            <!-- Results -->
            <div id="results" class="bg-gray-800 rounded-lg p-6 hidden">
                <h3 class="text-xl font-semibold mb-4">Prediction Results</h3>
                <div id="prediction" class="text-3xl font-bold text-center mb-4"></div>
                <div id="confidence" class="text-center mb-6"></div>
                <div id="probabilities" class="space-y-2"></div>
            </div>
        </div>
    </div>
    
    <script src="static/app.js"></script>
</body>
</html>`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-purple-400" />
            Bonus Task: Model Deployment (Extra 10%)
          </CardTitle>
          <CardDescription className="text-gray-300">
            Deploy your MNIST classifier as a web application using Streamlit or Flask
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className={`bg-black/30 border-white/10 cursor-pointer transition-all hover:border-blue-400/50 ${
                deploymentType === 'streamlit' ? 'border-blue-400 bg-blue-950/20' : ''
              }`}
              onClick={() => setDeploymentType('streamlit')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-300">
                  <Monitor className="h-5 w-5" />
                  Streamlit Deployment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-600/50">Rapid Prototyping</Badge>
                    <Badge className="bg-green-600/50">No HTML/CSS</Badge>
                    <Badge className="bg-purple-600/50">Python-First</Badge>
                  </div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Quick deployment with minimal code</li>
                    <li>• Built-in widgets and components</li>
                    <li>• Automatic reactive updates</li>
                    <li>• Perfect for ML demos</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card 
              className={`bg-black/30 border-white/10 cursor-pointer transition-all hover:border-green-400/50 ${
                deploymentType === 'flask' ? 'border-green-400 bg-green-950/20' : ''
              }`}
              onClick={() => setDeploymentType('flask')}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-300">
                  <Globe className="h-5 w-5" />
                  Flask Deployment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-600/50">Full Control</Badge>
                    <Badge className="bg-blue-600/50">REST API</Badge>
                    <Badge className="bg-yellow-600/50">Custom UI</Badge>
                  </div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Complete customization freedom</li>
                    <li>• RESTful API endpoints</li>
                    <li>• Production-ready scaling</li>
                    <li>• Advanced web features</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Deployment Instructions */}
      {deploymentType && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-yellow-400" />
              {deploymentType === 'streamlit' ? 'Streamlit' : 'Flask'} Implementation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {deploymentType === 'streamlit' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-300">1. Install Dependencies</h4>
                  <div className="bg-black/50 p-3 rounded text-sm font-mono">
                    <pre className="text-gray-300">
pip install streamlit tensorflow pillow opencv-python
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-300">2. Create app.py</h4>
                  <div className="bg-black/50 p-4 rounded-lg text-sm font-mono overflow-x-auto max-h-96">
                    <pre className="text-gray-300 whitespace-pre-wrap">{streamlitCode}</pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-300">3. Run the Application</h4>
                  <div className="bg-black/50 p-3 rounded text-sm font-mono">
                    <pre className="text-gray-300">
streamlit run app.py
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {deploymentType === 'flask' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-300">1. Install Dependencies</h4>
                  <div className="bg-black/50 p-3 rounded text-sm font-mono">
                    <pre className="text-gray-300">
pip install flask tensorflow pillow numpy
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-green-300">2. Create app.py</h4>
                  <div className="bg-black/50 p-4 rounded-lg text-sm font-mono overflow-x-auto max-h-64">
                    <pre className="text-gray-300 whitespace-pre-wrap">{flaskCode}</pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-green-300">3. Create templates/index.html</h4>
                  <div className="bg-black/50 p-4 rounded-lg text-sm font-mono overflow-x-auto max-h-64">
                    <pre className="text-gray-300 whitespace-pre-wrap">{htmlTemplate}</pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-green-300">4. Run the Application</h4>
                  <div className="bg-black/50 p-3 rounded text-sm font-mono">
                    <pre className="text-gray-300">
python app.py
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Deployment Platforms */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-purple-400" />
            Deployment Platforms
          </CardTitle>
          <CardDescription className="text-gray-300">
            Choose a platform to host your AI application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-purple-950/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-lg text-purple-300 flex items-center gap-2">
                  <Rocket className="h-4 w-4" />
                  Streamlit Cloud
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className="bg-purple-600">Free Tier</Badge>
                <p className="text-sm text-gray-300">
                  Perfect for Streamlit apps. Connect your GitHub repo and deploy automatically.
                </p>
                <div className="text-xs text-gray-400">
                  <strong>Pros:</strong> Zero config, automatic updates<br/>
                  <strong>Cons:</strong> Streamlit apps only
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-950/30 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-lg text-blue-300 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Render
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className="bg-blue-600">Free Tier</Badge>
                <p className="text-sm text-gray-300">
                  Great for Flask apps. Supports Docker, automatic scaling, and SSL certificates.
                </p>
                <div className="text-xs text-gray-400">
                  <strong>Pros:</strong> Full control, Docker support<br/>
                  <strong>Cons:</strong> Cold starts on free tier
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-950/30 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-lg text-green-300 flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  Hugging Face Spaces
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className="bg-green-600">AI-Focused</Badge>
                <p className="text-sm text-gray-300">
                  Designed for ML demos. Supports Streamlit, Gradio, and static sites.
                </p>
                <div className="text-xs text-gray-400">
                  <strong>Pros:</strong> ML community, easy sharing<br/>
                  <strong>Cons:</strong> Limited compute resources
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Deployment Checklist */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-yellow-400" />
            Deployment Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-300">Before Deployment</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">✓</Badge>
                  <span>Model is trained and saved (.h5 or .pkl format)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">✓</Badge>
                  <span>Dependencies listed in requirements.txt</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">✓</Badge>
                  <span>Error handling implemented</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-600">⏳</Badge>
                  <span>Input validation and preprocessing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-600">⏳</Badge>
                  <span>UI/UX design completed</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-green-300">After Deployment</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">📝</Badge>
                  <span>Take screenshots of the live application</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">🔗</Badge>
                  <span>Share the live demo URL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">📊</Badge>
                  <span>Test with various input images</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">📚</Badge>
                  <span>Document the deployment process</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-600">🎯</Badge>
                  <span>Submit for bonus points!</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
