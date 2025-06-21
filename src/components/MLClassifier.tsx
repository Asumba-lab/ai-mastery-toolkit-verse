
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
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-400" />
            Task 1: Classical Machine Learning with Scikit-learn
          </CardTitle>
          <CardDescription className="text-gray-300">
            Iris Species Classification using Decision Tree Classifier
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-300">Dataset Overview</h4>
              <div className="bg-black/30 p-4 rounded text-sm">
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
              <h4 className="font-semibold text-green-300">Implementation Steps</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600/50">✓</Badge>
                  <span className="text-sm">Load and explore dataset</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600/50">✓</Badge>
                  <span className="text-sm">Handle missing values</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600/50">✓</Badge>
                  <span className="text-sm">Encode categorical labels</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600/50">✓</Badge>
                  <span className="text-sm">Train Decision Tree</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600/50">⏳</Badge>
                  <span className="text-sm">Evaluate performance</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Implementation */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-400" />
            Code Implementation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black/50 p-4 rounded-lg text-sm font-mono overflow-x-auto">
            <pre className="text-gray-300">
<span className="text-green-400"># Import required libraries</span>
<span className="text-blue-400">from</span> sklearn.datasets <span className="text-blue-400">import</span> load_iris
<span className="text-blue-400">from</span> sklearn.model_selection <span className="text-blue-400">import</span> train_test_split
<span className="text-blue-400">from</span> sklearn.tree <span className="text-blue-400">import</span> DecisionTreeClassifier
<span className="text-blue-400">from</span> sklearn.metrics <span className="text-blue-400">import</span> accuracy_score, precision_recall_fscore_support
<span className="text-blue-400">import</span> pandas <span className="text-blue-400">as</span> pd
<span className="text-blue-400">import</span> numpy <span className="text-blue-400">as</span> np

<span className="text-green-400"># Load the Iris dataset</span>
<span className="text-yellow-400">iris</span> = load_iris()
<span className="text-yellow-400">X</span>, <span className="text-yellow-400">y</span> = iris.data, iris.target

<span className="text-green-400"># Create DataFrame for better visualization</span>
<span className="text-yellow-400">df</span> = pd.DataFrame(X, columns=iris.feature_names)
<span className="text-yellow-400">df</span>[<span className="text-red-400">'species'</span>] = [iris.target_names[i] <span className="text-blue-400">for</span> i <span className="text-blue-400">in</span> y]

<span className="text-green-400"># Check for missing values (Iris dataset is clean)</span>
<span className="text-blue-400">print</span>(<span className="text-red-400">f"Missing values: </span>{df.isnull().sum().sum()}<span className="text-red-400">"</span>)

<span className="text-green-400"># Split the dataset</span>
<span className="text-yellow-400">X_train</span>, <span className="text-yellow-400">X_test</span>, <span className="text-yellow-400">y_train</span>, <span className="text-yellow-400">y_test</span> = train_test_split(
    X, y, test_size=<span className="text-purple-400">0.2</span>, random_state=<span className="text-purple-400">42</span>, stratify=y
)

<span className="text-green-400"># Initialize and train Decision Tree Classifier</span>
<span className="text-yellow-400">clf</span> = DecisionTreeClassifier(
    max_depth=<span className="text-purple-400">3</span>,           <span className="text-green-400"># Prevent overfitting</span>
    min_samples_split=<span className="text-purple-400">5</span>,  <span className="text-green-400"># Minimum samples to split</span>
    random_state=<span className="text-purple-400">42</span>       <span className="text-green-400"># Reproducible results</span>
)

<span className="text-yellow-400">clf</span>.fit(X_train, y_train)

<span className="text-green-400"># Make predictions</span>
<span className="text-yellow-400">y_pred</span> = clf.predict(X_test)

<span className="text-green-400"># Calculate metrics</span>
<span className="text-yellow-400">accuracy</span> = accuracy_score(y_test, y_pred)
<span className="text-yellow-400">precision</span>, <span className="text-yellow-400">recall</span>, <span className="text-yellow-400">f1</span>, _ = precision_recall_fscore_support(y_test, y_pred)

<span className="text-blue-400">print</span>(<span className="text-red-400">f"Accuracy: </span>{accuracy:<span className="text-purple-400">.3f</span>}<span className="text-red-400">"</span>)
<span className="text-blue-400">for</span> i, species <span className="text-blue-400">in</span> <span className="text-blue-400">enumerate</span>(iris.target_names):
    <span className="text-blue-400">print</span>(<span className="text-red-400">f"</span>{species}<span className="text-red-400"> - Precision: </span>{precision[i]:<span className="text-purple-400">.3f</span>}<span className="text-red-400">, Recall: </span>{recall[i]:<span className="text-purple-400">.3f</span>}<span className="text-red-400">, F1: </span>{f1[i]:<span className="text-purple-400">.3f</span>}<span className="text-red-400">"</span>)
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Training Section */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-green-400" />
            Model Training & Evaluation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isCompleted && (
            <Button
              onClick={handleTraining}
              disabled={isTraining}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isTraining ? "Training Model..." : "Start Training"}
            </Button>
          )}

          {isTraining && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Training Progress</span>
                <span>{trainingProgress}%</span>
              </div>
              <Progress value={trainingProgress} className="w-full" />
            </div>
          )}

          {isCompleted && (
            <div className="space-y-6">
              <div className="text-center">
                <Badge className="bg-green-600 text-lg px-4 py-2">
                  Training Complete! ✨
                </Badge>
              </div>

              <Separator className="bg-white/20" />

              {/* Results */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-black/30 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-blue-400" />
                      Overall Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Accuracy</span>
                        <Badge className="bg-green-600">
                          {(results.accuracy * 100).toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400">
                        Model correctly classified {Math.round(results.accuracy * 30)} out of 30 test samples
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/30 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-lg">Per-Class Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      {Object.keys(results.precision).map((species) => (
                        <div key={species} className="space-y-1">
                          <div className="font-medium text-purple-300 capitalize">{species}</div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <span className="text-gray-400">P:</span> {(results.precision[species] * 100).toFixed(0)}%
                            </div>
                            <div>
                              <span className="text-gray-400">R:</span> {(results.recall[species] * 100).toFixed(0)}%
                            </div>
                            <div>
                              <span className="text-gray-400">F1:</span> {(results.f1Score[species] * 100).toFixed(0)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Feature Importance */}
              <Card className="bg-black/30 border-white/10">
                <CardHeader>
                  <CardTitle className="text-lg">Feature Importance Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Petal Length</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                        <span className="text-sm">0.85</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Petal Width</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: '72%'}}></div>
                        </div>
                        <span className="text-sm">0.72</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Sepal Length</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '28%'}}></div>
                        </div>
                        <span className="text-sm">0.28</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Sepal Width</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{width: '15%'}}></div>
                        </div>
                        <span className="text-sm">0.15</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-400">
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
