
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Code, Zap, Users, Cpu, Globe } from "lucide-react";

export const TheorySection = () => {
  return (
    <div className="space-y-6">
      {/* Framework Comparison */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-purple-400" />
            TensorFlow vs PyTorch: Deep Dive Analysis
          </CardTitle>
          <CardDescription className="text-gray-300">
            Comprehensive comparison of the two leading deep learning frameworks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-400 flex items-center gap-2">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FF6F00'%3E%3Cpath d='M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.153 3.564z'/%3E%3Cpath d='M22.708 5.856L12.46 0v24l4.095-2.378V7.603l6.153 3.564z'/%3E%3C/svg%3E" alt="TensorFlow" className="w-5 h-5" />
                TensorFlow
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-blue-300">Architecture:</strong>
                  <p className="text-gray-300 mt-1">Static computation graph (define-and-run). More predictable and optimizable for production.</p>
                </div>
                <div>
                  <strong className="text-blue-300">Performance:</strong>
                  <p className="text-gray-300 mt-1">Excellent for large-scale deployment. TensorFlow Serving and TFLite for mobile.</p>
                </div>
                <div>
                  <strong className="text-blue-300">Use Cases:</strong>
                  <p className="text-gray-300 mt-1">Production systems, mobile deployment, large enterprise applications.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-600/50">Production Ready</Badge>
                  <Badge className="bg-green-600/50">Scalable</Badge>
                  <Badge className="bg-purple-600/50">Enterprise</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-400 flex items-center gap-2">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23EE4C2C'%3E%3Cpath d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 7.568l-2.121 2.121c-.586-.586-1.536-.586-2.122 0l-2.121-2.121c.586-.586.586-1.536 0-2.122l2.121-2.121c.586.586 1.536.586 2.122 0l2.121 2.121c-.586.586-.586 1.536 0 2.122z'/%3E%3C/svg%3E" alt="PyTorch" className="w-5 h-5" />
                PyTorch
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <strong className="text-orange-300">Architecture:</strong>
                  <p className="text-gray-300 mt-1">Dynamic computation graph (define-by-run). More flexible and intuitive for research.</p>
                </div>
                <div>
                  <strong className="text-orange-300">Performance:</strong>
                  <p className="text-gray-300 mt-1">Faster iteration cycles, better debugging. PyTorch Lightning for scaling.</p>
                </div>
                <div>
                  <strong className="text-orange-300">Use Cases:</strong>
                  <p className="text-gray-300 mt-1">Research, prototyping, academic projects, computer vision tasks.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-orange-600/50">Research First</Badge>
                  <Badge className="bg-red-600/50">Flexible</Badge>
                  <Badge className="bg-yellow-600/50">Academic</Badge>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-white/20" />

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-3 text-purple-300">Aspect</th>
                  <th className="text-left p-3 text-blue-300">TensorFlow</th>
                  <th className="text-left p-3 text-orange-300">PyTorch</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="p-3 font-medium">Learning Curve</td>
                  <td className="p-3">Steeper, more complex APIs</td>
                  <td className="p-3">Gentler, Pythonic approach</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-3 font-medium">Community</td>
                  <td className="p-3">Very large, Google backing</td>
                  <td className="p-3">Growing rapidly, Facebook/Meta</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-3 font-medium">Deployment</td>
                  <td className="p-3">TF Serving, TF Lite, TF.js</td>
                  <td className="p-3">TorchServe, ONNX export</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Debugging</td>
                  <td className="p-3">TensorBoard, complex setup</td>
                  <td className="p-3">Standard Python debuggers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Jupyter Notebooks */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-orange-400" />
            Jupyter Notebooks in AI Development
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-orange-300 flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                Use Case 1: Exploratory Data Analysis (EDA)
              </h4>
              <p className="text-gray-300 text-sm">
                Interactive visualization of datasets, statistical summaries, and pattern discovery. 
                Perfect for understanding data distributions, identifying outliers, and creating 
                compelling visualizations that inform model design decisions.
              </p>
              <div className="bg-black/30 p-3 rounded text-xs font-mono">
                <span className="text-green-400"># Interactive EDA Example</span><br/>
                <span className="text-blue-400">import</span> pandas <span className="text-blue-400">as</span> pd<br/>
                <span className="text-blue-400">import</span> matplotlib.pyplot <span className="text-blue-400">as</span> plt<br/>
                <span className="text-yellow-400">df.describe()</span> <span className="text-gray-400"># Instant insights</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-orange-300 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Use Case 2: Iterative Model Development
              </h4>
              <p className="text-gray-300 text-sm">
                Rapid prototyping and experimentation with different algorithms, hyperparameters, 
                and preprocessing techniques. Cell-by-cell execution allows for quick testing 
                without re-running entire scripts.
              </p>
              <div className="bg-black/30 p-3 rounded text-xs font-mono">
                <span className="text-green-400"># Quick model iteration</span><br/>
                <span className="text-yellow-400">model.fit</span>(X_train, y_train)<br/>
                <span className="text-yellow-400">accuracy_score</span>(y_test, predictions)<br/>
                <span className="text-gray-400"># Immediate feedback loop</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scikit-learn vs TensorFlow */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-400" />
            Scikit-learn vs TensorFlow: Framework Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-4 text-purple-300">Aspect</th>
                  <th className="text-left p-4 text-green-300">Scikit-learn</th>
                  <th className="text-left p-4 text-blue-300">TensorFlow</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-white/10">
                  <td className="p-4 font-medium">Target Application</td>
                  <td className="p-4">
                    <Badge className="bg-green-600/50 mb-1">Classical ML</Badge>
                    <p className="text-xs">Regression, classification, clustering</p>
                  </td>
                  <td className="p-4">
                    <Badge className="bg-blue-600/50 mb-1">Deep Learning</Badge>
                    <p className="text-xs">Neural networks, complex patterns</p>
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-medium">Beginner Friendliness</td>
                  <td className="p-4">
                    <Badge className="bg-green-600">Very High</Badge>
                    <p className="text-xs mt-1">Simple API, minimal setup required</p>
                  </td>
                  <td className="p-4">
                    <Badge className="bg-yellow-600">Medium</Badge>
                    <p className="text-xs mt-1">Steeper learning curve, more concepts</p>
                   </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-medium">Community Support</td>
                  <td className="p-4">
                    <Badge className="bg-green-600">High</Badge>
                    <p className="text-xs mt-1">Mature, stable, extensive documentation</p>
                  </td>
                  <td className="p-4">
                    <Badge className="bg-blue-600">Very High</Badge>
                    <p className="text-xs mt-1">Google backing, rapid development</p>
                  </td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4 font-medium">Performance</td>
                  <td className="p-4">Optimized for traditional ML algorithms</td>
                  <td className="p-4">GPU acceleration, large-scale data</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Best For</td>
                  <td className="p-4">Structured data, quick prototypes, education</td>
                  <td className="p-4">Unstructured data, production systems</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* spaCy Advantages */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-yellow-400" />
            spaCy: Advanced NLP vs Basic String Processing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-red-300">Basic Python String Functions</h4>
              <div className="bg-red-950/30 p-4 rounded text-sm">
                <ul className="space-y-2 text-gray-300">
                  <li>• Simple splitting and joining</li>
                  <li>• Basic pattern matching</li>
                  <li>• No linguistic understanding</li>
                  <li>• Manual tokenization rules</li>
                  <li>• No context awareness</li>
                </ul>
              </div>
              <div className="bg-black/30 p-3 rounded text-xs font-mono">
                <span className="text-green-400"># Basic approach</span><br/>
                <span className="text-yellow-400">words</span> = text.<span className="text-blue-400">split</span>()<br/>
                <span className="text-gray-400"># Limited capabilities</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-green-300">spaCy NLP Pipeline</h4>
              <div className="bg-green-950/30 p-4 rounded text-sm">
                <ul className="space-y-2 text-gray-300">
                  <li>• Intelligent tokenization</li>
                  <li>• Named Entity Recognition (NER)</li>
                  <li>• Part-of-speech tagging</li>
                  <li>• Dependency parsing</li>
                  <li>• Word vectors and similarity</li>
                  <li>• Multi-language support</li>
                </ul>
              </div>
              <div className="bg-black/30 p-3 rounded text-xs font-mono">
                <span className="text-green-400"># spaCy approach</span><br/>
                <span className="text-yellow-400">doc</span> = nlp(text)<br/>
                <span className="text-blue-400">for</span> ent <span className="text-blue-400">in</span> doc.ents:<br/>
                &nbsp;&nbsp;<span className="text-yellow-400">print</span>(ent.text, ent.label_)
              </div>
            </div>
          </div>

          <Separator className="bg-white/20" />

          <div className="space-y-3">
            <h4 className="font-semibold text-yellow-300">Key spaCy Advantages</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-yellow-950/30 p-4 rounded">
                <h5 className="font-medium text-yellow-200 mb-2">Named Entity Recognition</h5>
                <p className="text-xs text-gray-300">
                  Automatically identifies people, organizations, locations, dates, and more with high accuracy.
                </p>
              </div>
              <div className="bg-blue-950/30 p-4 rounded">
                <h5 className="font-medium text-blue-200 mb-2">Linguistic Features</h5>
                <p className="text-xs text-gray-300">
                  POS tagging, dependency parsing, and morphological analysis for deep text understanding.
                </p>
              </div>
              <div className="bg-purple-950/30 p-4 rounded">
                <h5 className="font-medium text-purple-200 mb-2">Production Ready</h5>
                <p className="text-xs text-gray-300">
                  Fast, memory-efficient, and designed for real-world applications with pre-trained models.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
