
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, Bug, Users, Scale } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const EthicsOptimization = () => {
  const [debugFixed, setDebugFixed] = useState(false);

  const biasAnalysis = {
    mnist: {
      biases: [
        "Handwriting style bias - trained primarily on Western handwriting styles",
        "Age bias - may perform poorly on children's or elderly handwriting",
        "Cultural bias - digits written in different cultural contexts may be misclassified",
        "Digital vs analog bias - performs better on clean digital inputs than real handwritten samples"
      ],
      impacts: [
        "Lower accuracy for non-Western handwriting styles",
        "Demographic performance gaps",
        "Reduced accessibility for diverse user groups"
      ],
      mitigations: [
        "Diverse training data collection across cultures",
        "Age-stratified validation sets",
        "Fairness metrics integration using TensorFlow Fairness Indicators",
        "Data augmentation with various handwriting styles"
      ]
    },
    reviews: {
      biases: [
        "Language bias - primarily trained on English reviews",
        "Product category bias - may favor certain product types",
        "Demographic bias - sentiment patterns may vary by age/culture",
        "Temporal bias - sentiment expressions change over time"
      ],
      impacts: [
        "Misclassification of culturally-specific expressions",
        "Unfair product recommendations",
        "Biased business intelligence insights"
      ],
      mitigations: [
        "Multi-language training data",
        "Demographic-aware evaluation metrics",
        "Regular model retraining with fresh data",
        "Cultural sensitivity in rule-based sentiment analysis"
      ]
    }
  };

  const debugChallenge = {
    original: `import tensorflow as tf
from tensorflow import keras

# Buggy MNIST model
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu', input_shape=(784)),
    keras.layers.Dense(10, activation='relu')  # BUG: Should be softmax
])

# BUG: Wrong loss function for multi-class classification
model.compile(optimizer='adam',
              loss='binary_crossentropy',  # Should be sparse_categorical_crossentropy
              metrics=['accuracy'])

# Load data
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# BUG: Forgot to normalize pixel values
# x_train = x_train / 255.0
# x_test = x_test / 255.0

# BUG: Wrong input shape - MNIST is 28x28, not flattened
x_train = x_train.reshape(60000, 784)
x_test = x_test.reshape(10000, 784)

model.fit(x_train, y_train, epochs=5)`,
    fixed: `import tensorflow as tf
from tensorflow import keras

# Fixed MNIST model
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    keras.layers.Dense(10, activation='softmax')  # FIXED: Use softmax for multi-class
])

# FIXED: Correct loss function for multi-class classification
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',  # FIXED: Correct loss
              metrics=['accuracy'])

# Load data
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# FIXED: Normalize pixel values to [0, 1] range
x_train = x_train.astype('float32') / 255.0
x_test = x_test.astype('float32') / 255.0

# FIXED: Properly reshape for dense layers
x_train = x_train.reshape(60000, 784)
x_test = x_test.reshape(10000, 784)

model.fit(x_train, y_train, epochs=5, validation_split=0.1)`
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-400" />
            Ethics & Optimization in AI Systems
          </CardTitle>
          <CardDescription className="text-gray-300">
            Bias Analysis, Fairness Considerations, and Debugging Challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-red-950/30 p-4 rounded">
              <h4 className="font-semibold text-red-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Bias Identification
              </h4>
              <p className="text-sm text-gray-300">
                Systematic analysis of potential biases in ML models and their societal impacts.
              </p>
            </div>
            <div className="bg-blue-950/30 p-4 rounded">
              <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <Scale className="h-4 w-4" />
                Fairness Metrics
              </h4>
              <p className="text-sm text-gray-300">
                Implementation of fairness indicators and demographic parity assessments.
              </p>
            </div>
            <div className="bg-green-950/30 p-4 rounded">
              <h4 className="font-semibold text-green-300 mb-2 flex items-center gap-2">
                <Bug className="h-4 w-4" />
                Debug & Optimize
              </h4>
              <p className="text-sm text-gray-300">
                Identifying and fixing common issues in deep learning implementations.
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
          <TabsTrigger value="fairness" className="text-white data-[state=active]:bg-blue-600">
            Fairness Tools
          </TabsTrigger>
          <TabsTrigger value="debug" className="text-white data-[state=active]:bg-green-600">
            Debug Challenge
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bias" className="space-y-6">
          {/* MNIST Bias Analysis */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-400" />
                MNIST Model Bias Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-red-950/30 border-red-500/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-red-200">
                  <strong>Critical Bias Identified:</strong> The MNIST dataset and model exhibit significant cultural and demographic biases that can lead to unfair outcomes.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-300">Identified Biases</h4>
                  <ul className="space-y-2 text-sm">
                    {biasAnalysis.mnist.biases.map((bias, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <AlertTriangle className="h-3 w-3 text-red-400 mt-1 flex-shrink-0" />
                        {bias}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-orange-300">Potential Impacts</h4>
                  <ul className="space-y-2 text-sm">
                    {biasAnalysis.mnist.impacts.map((impact, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <Shield className="h-3 w-3 text-orange-400 mt-1 flex-shrink-0" />
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-3">
                <h4 className="font-semibold text-green-300 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Proposed Mitigation Strategies
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {biasAnalysis.mnist.mitigations.map((mitigation, index) => (
                    <div key={index} className="bg-green-950/20 p-3 rounded border border-green-500/30">
                      <p className="text-sm text-gray-300">{mitigation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews Bias Analysis */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-yellow-400" />
                Amazon Reviews NLP Bias Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-yellow-950/30 border-yellow-500/50">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-yellow-200">
                  <strong>Language & Cultural Bias:</strong> Rule-based sentiment analysis may misinterpret cultural expressions and non-native English patterns.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-yellow-300">Identified Biases</h4>
                  <ul className="space-y-2 text-sm">
                    {biasAnalysis.reviews.biases.map((bias, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <AlertTriangle className="h-3 w-3 text-yellow-400 mt-1 flex-shrink-0" />
                        {bias}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-orange-300">Business Impacts</h4>
                  <ul className="space-y-2 text-sm">
                    {biasAnalysis.reviews.impacts.map((impact, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <Shield className="h-3 w-3 text-orange-400 mt-1 flex-shrink-0" />
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-3">
                <h4 className="font-semibold text-green-300 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  spaCy-Based Mitigation Approaches
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {biasAnalysis.reviews.mitigations.map((mitigation, index) => (
                    <div key={index} className="bg-green-950/20 p-3 rounded border border-green-500/30">
                      <p className="text-sm text-gray-300">{mitigation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fairness" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-blue-400" />
                Fairness Indicators & Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-blue-300">TensorFlow Fairness Indicators</h4>
                  <div className="bg-black/30 p-4 rounded text-sm font-mono">
                    <pre className="text-gray-300">
<span className="text-green-400"># Install TensorFlow Fairness Indicators</span>
<span className="text-blue-400">!pip install</span> fairness-indicators

<span className="text-blue-400">import</span> tensorflow <span className="text-blue-400">as</span> tf
<span className="text-blue-400">from</span> fairness_indicators.remediation <span className="text-blue-400">import</span> min_diff

<span className="text-green-400"># Create fairness-aware model</span>
<span className="text-yellow-400">model</span> = min_diff.keras.MinDiffModel(
    original_model,
    loss=min_diff.losses.MMDLoss(),
    loss_weight=<span className="text-purple-400">1.0</span>
)

<span className="text-green-400"># Evaluate across demographics</span>
<span className="text-yellow-400">tfma.run_model_analysis</span>(
    model_location=model_path,
    data_location=eval_data_path,
    slice_spec=slice_specs
)
                    </pre>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-green-300">spaCy Fairness Extensions</h4>
                  <div className="bg-black/30 p-4 rounded text-sm font-mono">
                    <pre className="text-gray-300">
<span className="text-green-400"># Multi-language fairness check</span>
<span className="text-blue-400">import</span> spacy

<span className="text-yellow-400">nlp_en</span> = spacy.load(<span className="text-red-400">'en_core_web_sm'</span>)
<span className="text-yellow-400">nlp_es</span> = spacy.load(<span className="text-red-400">'es_core_news_sm'</span>)

<span className="text-blue-400">def</span> <span className="text-yellow-400">fair_sentiment_analysis</span>(text, lang=<span className="text-red-400">'en'</span>):
    <span className="text-yellow-400">nlp</span> = nlp_en <span className="text-blue-400">if</span> lang == <span className="text-red-400">'en'</span> <span className="text-blue-400">else</span> nlp_es
    <span className="text-yellow-400">doc</span> = nlp(text)
    
    <span className="text-green-400"># Language-specific sentiment rules</span>
    <span className="text-blue-400">return</span> analyze_with_cultural_context(doc, lang)
                    </pre>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-4">
                <h4 className="font-semibold text-purple-300">Fairness Metrics Dashboard</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-950/30 p-4 rounded text-center">
                    <div className="text-2xl font-bold text-blue-300">0.89</div>
                    <div className="text-xs text-gray-400">Demographic Parity</div>
                  </div>
                  <div className="bg-green-950/30 p-4 rounded text-center">
                    <div className="text-2xl font-bold text-green-300">0.92</div>
                    <div className="text-xs text-gray-400">Equal Opportunity</div>
                  </div>
                  <div className="bg-yellow-950/30 p-4 rounded text-center">
                    <div className="text-2xl font-bold text-yellow-300">0.87</div>
                    <div className="text-xs text-gray-400">Calibration</div>
                  </div>
                  <div className="bg-red-950/30 p-4 rounded text-center">
                    <div className="text-2xl font-bold text-red-300">0.78</div>
                    <div className="text-xs text-gray-400">Disparate Impact</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debug" className="space-y-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-green-400" />
                Debugging Challenge: Fix the TensorFlow Script
              </CardTitle>
              <CardDescription className="text-gray-300">
                Identify and fix the bugs in this MNIST classification script
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-red-300">🐛 Buggy Code</h4>
                <div className="bg-red-950/20 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-red-500/30">
                  <pre className="text-gray-300 whitespace-pre-wrap">{debugChallenge.original}</pre>
                </div>
              </div>

              {!debugFixed && (
                <Button
                  onClick={() => setDebugFixed(true)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  🔧 Show Fixed Version & Analysis
                </Button>
              )}

              {debugFixed && (
                <div className="space-y-6">
                  <Separator className="bg-white/20" />
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-300 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      ✅ Fixed Code
                    </h4>
                    <div className="bg-green-950/20 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-green-500/30">
                      <pre className="text-gray-300 whitespace-pre-wrap">{debugChallenge.fixed}</pre>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-yellow-300">🔍 Bug Analysis & Fixes</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="bg-red-950/20 border-red-500/30">
                        <CardHeader>
                          <CardTitle className="text-lg text-red-300">Bugs Identified</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                          <div className="flex items-start gap-2">
                            <Badge className="bg-red-600 mt-1">1</Badge>
                            <div>
                              <strong>Activation Function:</strong> Output layer used 'relu' instead of 'softmax' for multi-class classification
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Badge className="bg-red-600 mt-1">2</Badge>
                            <div>
                              <strong>Loss Function:</strong> Used 'binary_crossentropy' instead of 'sparse_categorical_crossentropy'
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Badge className="bg-red-600 mt-1">3</Badge>
                            <div>
                              <strong>Data Normalization:</strong> Forgot to normalize pixel values from [0,255] to [0,1]
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Badge className="bg-red-600 mt-1">4</Badge>
                            <div>
                              <strong>Validation:</strong> No validation split for monitoring overfitting
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-green-950/20 border-green-500/30">
                        <CardHeader>
                          <CardTitle className="text-lg text-green-300">Applied Fixes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                          <div className="flex items-start gap-2">
                            <Badge className="bg-green-600 mt-1">✓</Badge>
                            <div>
                              <strong>Softmax Activation:</strong> Changed output layer to use softmax for probability distribution
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Badge className="bg-green-600 mt-1">✓</Badge>
                            <div>
                              <strong>Correct Loss:</strong> Updated to sparse_categorical_crossentropy for integer labels
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Badge className="bg-green-600 mt-1">✓</Badge>
                            <div>
                              <strong>Data Preprocessing:</strong> Added normalization and proper data type conversion
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Badge className="bg-green-600 mt-1">✓</Badge>
                            <div>
                              <strong>Validation Split:</strong> Added 10% validation split for better training monitoring
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <Alert className="bg-blue-950/30 border-blue-500/50">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription className="text-blue-200">
                      <strong>Expected Improvement:</strong> These fixes should improve model accuracy from ~10% (random guessing) to >95% on MNIST test data, while also providing proper training monitoring and preventing common classification errors.
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
