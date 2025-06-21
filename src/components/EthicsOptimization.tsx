
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, Bug, Zap, BarChart3 } from "lucide-react";

export const EthicsOptimization = () => {
  const [debuggingProgress, setDebuggingProgress] = useState(0);
  const [isDebugging, setIsDebugging] = useState(false);
  const [debugCompleted, setDebugCompleted] = useState(false);

  const biasAnalysis = {
    mnist: {
      overallAccuracy: 98.34,
      digitAccuracy: {
        "0": 99.1, "1": 99.4, "2": 97.8, "3": 98.1, "4": 97.2,
        "5": 96.9, "6": 98.7, "7": 97.5, "8": 96.8, "9": 97.3
      },
      identifiedBiases: [
        "Lower accuracy on digits 4, 5, and 8 due to similar stroke patterns",
        "Potential bias against handwriting styles not well-represented in training data",
        "Model may favor cleaner, more standardized digit writing"
      ]
    },
    sentiment: {
      overallAccuracy: 87.5,
      categoryBias: {
        "Electronics": 91.2,
        "Books": 89.8,
        "Clothing": 85.3,
        "Home & Garden": 84.1
      },
      identifiedBiases: [
        "Higher accuracy on electronics reviews (technical vocabulary)",
        "Lower performance on subjective categories like clothing",
        "Potential bias toward formal review language"
      ]
    }
  };

  const handleDebugging = async ()=> {
    setIsDebugging(true);
    setDebuggingProgress(0);
    
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDebuggingProgress(i);
    }
    
    setIsDebugging(false);
    setDebugCompleted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-400" />
            Task 4: Ethics & Optimization Analysis
          </CardTitle>
          <CardDescription className="text-gray-300">
            Bias Detection, Fairness Analysis, and Model Optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="font-medium text-red-300">Bias Detection</span>
              </div>
              <p className="text-sm text-gray-300">
                Identify performance disparities across different groups and categories
              </p>
            </div>
            <div className="bg-yellow-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bug className="h-4 w-4 text-yellow-400" />
                <span className="font-medium text-yellow-300">Debug Challenge</span>
              </div>
              <p className="text-sm text-gray-300">
                Fix common issues in TensorFlow/PyTorch implementations
              </p>
            </div>
            <div className="bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-green-400" />
                <span className="font-medium text-green-300">Optimization</span>
              </div>
              <p className="text-sm text-gray-300">
                Improve model performance and reduce computational costs
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="bias" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="bias" className="text-white data-[state=active]:bg-red-600">
            Bias Analysis
          </TabsTrigger>
          <TabsTrigger value="debug" className="text-white data-[state=active]:bg-yellow-600">
            Debug Challenge
          </TabsTrigger>
          <TabsTrigger value="optimization" className="text-white data-[state=active]:bg-green-600">
            Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bias" className="space-y-6">
          {/* MNIST Bias Analysis */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                MNIST Model Bias Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-5 gap-3">
                {Object.entries(biasAnalysis.mnist.digitAccuracy).map(([digit, accuracy]) => (
                  <div key={digit} className="bg-black/30 p-3 rounded text-center">
                    <div className="text-2xl font-bold mb-1">{digit}</div>
                    <div className={`text-sm font-medium ${
                      accuracy >= 98 ? 'text-green-400' : 
                      accuracy >= 97 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {accuracy}%
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="bg-white/20" />
              
              <div className="space-y-3">
                <h4 className="font-semibold text-red-300">Identified Biases:</h4>
                {biasAnalysis.mnist.identifiedBiases.map((bias, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{bias}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-900/20 p-4 rounded">
                <h4 className="font-semibold text-blue-300 mb-2">Mitigation Strategies:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Data augmentation with more diverse handwriting styles</li>
                  <li>• Balanced sampling across digit classes</li>
                  <li>• Regular monitoring with fairness metrics</li>
                  <li>• Cross-validation on demographic subgroups</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Analysis Bias */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-400" />
                Sentiment Analysis Bias Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(biasAnalysis.sentiment.categoryBias).map(([category, accuracy]) => (
                  <div key={category} className="bg-black/30 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-purple-300">{category}</span>
                      <Badge className={
                        accuracy >= 90 ? 'bg-green-600' : 
                        accuracy >= 85 ? 'bg-yellow-600' : 'bg-red-600'
                      }>
                        {accuracy}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-3">
                <h4 className="font-semibold text-red-300">Category Biases:</h4>
                {biasAnalysis.sentiment.identifiedBiases.map((bias, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{bias}</span>
                  </div>
                ))}
              </div>

              <div className="bg-purple-900/20 p-4 rounded">
                <h4 className="font-semibold text-purple-300 mb-2">spaCy Fairness Tools:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Rule-based systems reduce ML bias</li>
                  <li>• Domain-specific vocabulary expansion</li>
                  <li>• Multi-language model support</li>
                  <li>• Custom entity recognition training</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debug" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-yellow-400" />
                TensorFlow Debugging Challenge
              </CardTitle>
              <CardDescription className="text-gray-300">
                Fix the buggy neural network implementation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                <h4 className="font-semibold text-red-300 mb-3">Buggy Code:</h4>
                <div className="bg-black/50 p-3 rounded text-sm font-mono">
                  <pre className="text-gray-300">
{`# Buggy TensorFlow Model
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10, activation='sigmoid')  # BUG 1
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',  # BUG 2
    metrics=['accuracy']
)

# BUG 3: Wrong input shape
X_train = X_train.reshape(-1, 28*28)
model.fit(X_train, y_train, epochs=10)`}
                  </pre>
                </div>
              </div>

              <Button
                onClick={handleDebugging}
                disabled={isDebugging}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                {isDebugging ? "Analyzing Bugs..." : "Start Debugging"}
              </Button>

              {isDebugging && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Debug Progress</span>
                    <span>{debuggingProgress}%</span>
                  </div>
                  <Progress value={debuggingProgress} className="w-full" />
                </div>
              )}

              {debugCompleted && (
                <div className="space-y-4">
                  <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                    <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Fixed Code:
                    </h4>
                    <div className="bg-black/50 p-3 rounded text-sm font-mono">
                      <pre className="text-gray-300">
{`# Fixed TensorFlow Model
import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    tf.keras.layers.Dense(10, activation='softmax')  # FIX 1: softmax for multiclass
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',  # FIX 2: sparse for integer labels
    metrics=['accuracy']
)

# FIX 3: Normalize input data
X_train = X_train.reshape(-1, 28*28) / 255.0
model.fit(X_train, y_train, epochs=10, validation_split=0.2)`}
                      </pre>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-black/30 border-green-500/30">
                      <CardContent className="p-4">
                        <h5 className="font-semibold text-green-300 mb-2">Bug 1: Activation Function</h5>
                        <p className="text-sm text-gray-300">
                          Changed sigmoid to softmax for multiclass classification
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-black/30 border-blue-500/30">
                      <CardContent className="p-4">
                        <h5 className="font-semibold text-blue-300 mb-2">Bug 2: Loss Function</h5>
                        <p className="text-sm text-gray-300">
                          Used sparse_categorical_crossentropy for integer labels
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-black/30 border-purple-500/30">
                      <CardContent className="p-4">
                        <h5 className="font-semibold text-purple-300 mb-2">Bug 3: Data Preprocessing</h5>
                        <p className="text-sm text-gray-300">
                          Added input shape and data normalization
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-green-400" />
                Model Optimization Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-300">Performance Optimization</h4>
                  <div className="space-y-3">
                    <div className="bg-black/30 p-3 rounded">
                      <div className="font-medium text-blue-300 mb-1">Model Pruning</div>
                      <div className="text-sm text-gray-300">Remove 40% of weights with minimal accuracy loss</div>
                      <div className="text-xs text-green-400 mt-1">Size reduction: 60%</div>
                    </div>
                    <div className="bg-black/30 p-3 rounded">
                      <div className="font-medium text-purple-300 mb-1">Quantization</div>
                      <div className="text-sm text-gray-300">Convert float32 to int8 for faster inference</div>
                      <div className="text-xs text-green-400 mt-1">Speed increase: 4x</div>
                    </div>
                    <div className="bg-black/30 p-3 rounded">
                      <div className="font-medium text-yellow-300 mb-1">Knowledge Distillation</div>
                      <div className="text-sm text-gray-300">Train smaller student model from teacher</div>
                      <div className="text-xs text-green-400 mt-1">Accuracy maintained: 97%</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-red-300">Fairness Optimization</h4>
                  <div className="space-y-3">
                    <div className="bg-black/30 p-3 rounded">
                      <div className="font-medium text-red-300 mb-1">Adversarial Debiasing</div>
                      <div className="text-sm text-gray-300">Train adversarial network to remove bias signals</div>
                    </div>
                    <div className="bg-black/30 p-3 rounded">
                      <div className="font-medium text-orange-300 mb-1">Fairness Constraints</div>
                      <div className="text-sm text-gray-300">Add fairness metrics to loss function</div>
                    </div>
                    <div className="bg-black/30 p-3 rounded">
                      <div className="font-medium text-pink-300 mb-1">Data Augmentation</div>
                      <div className="text-sm text-gray-300">Synthesize underrepresented samples</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-4 rounded border border-green-500/30">
                <h4 className="font-semibold text-green-300 mb-3">TensorFlow/PyTorch Tools:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-blue-300">TensorFlow:</strong>
                    <ul className="text-gray-300 mt-1 space-y-1">
                      <li>• TensorFlow Lite for mobile deployment</li>
                      <li>• TF-Agents for reinforcement learning</li>
                      <li>• Fairness Indicators for bias detection</li>
                      <li>• Model Optimization Toolkit</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-purple-300">PyTorch:</strong>
                    <ul className="text-gray-300 mt-1 space-y-1">
                      <li>• TorchScript for production deployment</li>
                      <li>• PyTorch Mobile for edge devices</li>
                      <li>• Captum for model interpretability</li>
                      <li>• FairScale for large model training</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-900/20 p-4 rounded">
                <h4 className="font-semibold text-blue-300 mb-2">Best Practices:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Regular monitoring of model performance across demographics</li>
                  <li>• A/B testing for fairness-performance tradeoffs</li>
                  <li>• Documentation of model limitations and biases</li>
                  <li>• Continuous retraining with updated, diverse data</li>
                  <li>• Stakeholder involvement in defining fairness metrics</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
