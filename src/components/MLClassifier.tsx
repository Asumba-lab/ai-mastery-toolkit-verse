import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Play, BarChart3, Database, Settings } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const MLClassifier = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);

  // Simulated training results
  const results = {
    accuracy: 0.967,
    precision: { setosa: 1.0, versicolor: 0.92, virginica: 0.95 },
    recall: { setosa: 1.0, versicolor: 0.96, virginica: 0.90 },
    f1Score: { setosa: 1.0, versicolor: 0.94, virginica: 0.92 }
  };

  const handleTraining = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setTrainingProgress(i);
    }
    
    setIsTraining(false);
    setIsCompleted(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg sm:text-xl">
            <Database className="h-5 w-5 text-blue-400" />
            Task 1: Classical Machine Learning with Scikit-learn
          </CardTitle>
          <CardDescription className="text-gray-300 text-sm sm:text-base">
            Iris Species Classification using Decision Tree Classifier
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-300 text-sm sm:text-base">Dataset Overview</h4>
              <div className="bg-black/30 p-3 sm:p-4 rounded text-xs sm:text-sm">
                <ul className="space-y-1 text-gray-300">
                  <li>• <strong>Dataset:</strong> Fisher's Iris Dataset (1936)</li>
                  <li>• <strong>Samples:</strong> 150 flowers</li>
                  <li>• <strong>Features:</strong> 4 (sepal length/width, petal length/width)</li>
                  <li>• <strong>Classes:</strong> 3 species (setosa, versicolor, virginica)</li>
                  <li>• <strong>Split:</strong> 80% training, 20% testing</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-300 text-sm sm:text-base">Implementation Steps</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600/50 hover:bg-green-600/70 transition-colors duration-200">✓</Badge>
                  <span className="text-xs sm:text-sm">Load and explore dataset</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600/50 hover:bg-green-600/70 transition-colors duration-200">✓</Badge>
                  <span className="text-xs sm:text-sm">Handle missing values</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600/50 hover:bg-green-600/70 transition-colors duration-200">✓</Badge>
                  <span className="text-xs sm:text-sm">Encode categorical labels</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600/50 hover:bg-green-600/70 transition-colors duration-200">✓</Badge>
                  <span className="text-xs sm:text-sm">Train Decision Tree</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600/50 hover:bg-blue-600/70 transition-colors duration-200">⏳</Badge>
                  <span className="text-xs sm:text-sm">Evaluate performance</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Implementation */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Settings className="h-5 w-5 text-purple-400" />
            Code Implementation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="bg-black/50 p-3 sm:p-4 rounded-lg text-xs sm:text-sm font-mono overflow-x-auto">
            <pre className="text-gray-300">
{`# Import required libraries
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, precision_recall_fscore_support
import pandas as pd
import numpy as np

# Load the Iris dataset
iris = load_iris()
X, y = iris.data, iris.target

# Create DataFrame for better visualization
df = pd.DataFrame(X, columns=iris.feature_names)
df['species'] = [iris.target_names[i] for i in y]

# Check for missing values (Iris dataset is clean)
print(f"Missing values: {df.isnull().sum().sum()}")

# Split the dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Initialize and train Decision Tree Classifier
clf = DecisionTreeClassifier(
    max_depth=3,           # Prevent overfitting
    min_samples_split=5,   # Minimum samples to split
    random_state=42        # Reproducible results
)

clf.fit(X_train, y_train)

# Make predictions
y_pred = clf.predict(X_test)

# Calculate metrics
accuracy = accuracy_score(y_test, y_pred)
precision, recall, f1, _ = precision_recall_fscore_support(y_test, y_pred)

print(f"Accuracy: {accuracy:.3f}")
for i, species in enumerate(iris.target_names):
    print(f"{species} - Precision: {precision[i]:.3f}, Recall: {recall[i]:.3f}, F1: {f1[i]:.3f}")`}
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Training Section */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Play className="h-5 w-5 text-green-400" />
            Model Training & Evaluation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6">
          {!isCompleted && (
            <Button
              onClick={handleTraining}
              disabled={isTraining}
              className="w-full bg-green-600 hover:bg-green-700 transition-all duration-200 py-2 sm:py-3 text-sm sm:text-base"
            >
              {isTraining ? "Training Model..." : "Start Training"}
            </Button>
          )}

          {isTraining && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Training Progress</span>
                <span>{trainingProgress}%</span>
              </div>
              <Progress value={trainingProgress} className="w-full" />
            </div>
          )}

          {isCompleted && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <Badge className="bg-green-600 text-sm sm:text-lg px-3 sm:px-4 py-2 hover:bg-green-700 transition-colors duration-200">
                  Training Complete! ✨
                </Badge>
              </div>

              <Separator className="bg-white/20" />

              {/* Results */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <Card className="bg-black/30 border-white/10 hover:bg-black/40 transition-all duration-300">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-blue-400" />
                      Overall Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm sm:text-base">Accuracy</span>
                        <Badge className="bg-green-600 hover:bg-green-700 transition-colors duration-200">
                          {(results.accuracy * 100).toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">
                        Model correctly classified {Math.round(results.accuracy * 30)} out of 30 test samples
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-white/10 hover:bg-black/40 transition-all duration-300">
                  <CardHeader className="p-4">
                    <CardTitle className="text-base sm:text-lg">Per-Class Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3 text-xs sm:text-sm">
                      {Object.keys(results.precision).map((species) => (
                        <div key={species} className="space-y-1">
                          <div className="font-medium text-purple-300 capitalize">{species}</div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <span className="text-gray-400">P:</span> {(results.precision[species as keyof typeof results.precision] * 100).toFixed(0)}%
                            </div>
                            <div>
                              <span className="text-gray-400">R:</span> {(results.recall[species as keyof typeof results.recall] * 100).toFixed(0)}%
                            </div>
                            <div>
                              <span className="text-gray-400">F1:</span> {(results.f1Score[species as keyof typeof results.f1Score] * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Feature Importance */}
              <Card className="bg-black/30 border-white/10 hover:bg-black/40 transition-all duration-300">
                <CardHeader className="p-4">
                  <CardTitle className="text-base sm:text-lg">Feature Importance Analysis</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-gray-300 text-sm">Petal Length</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 sm:w-32 bg-gray-700 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-xs sm:text-sm">0.85</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-gray-300 text-sm">Petal Width</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 sm:w-32 bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{width: '72%'}}></div>
                        </div>
                        <span className="text-xs sm:text-sm">0.72</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-gray-300 text-sm">Sepal Length</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 sm:w-32 bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{width: '28%'}}></div>
                        </div>
                        <span className="text-xs sm:text-sm">0.28</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-gray-300 text-sm">Sepal Width</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 sm:w-32 bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full transition-all duration-500" style={{width: '15%'}}></div>
                        </div>
                        <span className="text-xs sm:text-sm">0.15</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs sm:text-sm text-gray-400">
                    The Decision Tree relies heavily on petal measurements for classification, 
                    which aligns with botanical knowledge about iris species differentiation.
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
