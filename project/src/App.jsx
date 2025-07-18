import React, { useState, useEffect } from 'react';
import { Code, Zap, Moon, Sun, Copy, Download, Play, Sparkles, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import CodeZapOutlineLogo from './img/codeZapOutlineLogo.png';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [optimizationStep, setOptimizationStep] = useState('');

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const optimizeCode = async () => {
    if (!inputCode.trim()) return;

    setIsOptimizing(true);
    setOutputCode('');
    setOptimizationStep('Sending code to server...');

    // Build the prompt for the backend
   const prompt = `Optimize this JavaScript code:\n\n${inputCode}\n\nRespond with only the optimized code. Do not include any explanations, comments, or formatting such as code blocks or markdown. Output only the raw code with easy way to read it and good format.`;

    try {
      const response = await fetch('http://localhost:5000/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: prompt }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      setOutputCode(data.output || 'No output received.');
    } catch (error) {
      setOutputCode('Error: ' + error.message);
    } finally {
      setIsOptimizing(false);
      setOptimizationStep('');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([outputCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codezap-optimized.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  const sampleCodes = [
    `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`,
    `var users = [];
function addUser(name, email) {
  users.push({name: name, email: email});
}`,
    `function fetchData() {
  fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data));
}`
  ];

  const loadSample = (code) => {
    setInputCode(code);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark bg-gradient-to-br from-ooredoo-darkbg via-gray-900 to-ooredoo-darkbg' : 'bg-gradient-to-br from-white via-gray-50 to-ooredoo-lightgrey'}`}>
      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 left-10 w-72 h-72 rounded-full opacity-10 animate-pulse-slow ${darkMode ? 'bg-ooredoo-coral' : 'bg-ooredoo-red'}`}></div>
          <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-5 animate-pulse-slow ${darkMode ? 'bg-ooredoo-teal' : 'bg-ooredoo-coral'}`} style={{animationDelay: '1s'}}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 animate-pulse-slow ${darkMode ? 'bg-ooredoo-red' : 'bg-ooredoo-teal'}`} style={{animationDelay: '2s'}}></div>
        </div>

        {/* Header */}
        <header className={`backdrop-blur-md border-b transition-all duration-300 ${darkMode ? 'border-ooredoo-darkcard/50 bg-ooredoo-darkbg/80' : 'border-white/50 bg-white/80'} sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-ooredoo-red via-ooredoo-coral to-ooredoo-teal rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-ooredoo-red via-ooredoo-coral to-ooredoo-teal rounded-2xl">
                    <img src={CodeZapOutlineLogo} alt="CodeZap Outline Logo" className="w-8 h-8 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h1 className={`text-2xl font-bold bg-gradient-to-r from-ooredoo-red to-ooredoo-coral bg-clip-text text-transparent`}>
                    codeZap
                  </h1>
                  <p className={`text-sm font-medium ${darkMode ? 'text-ooredoo-teal' : 'text-ooredoo-teal'}`}>
                    by Ooredoo Tunisia
                  </p>
                </div>
              </div>
              
              <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${darkMode ? 'bg-ooredoo-darkcard hover:bg-gray-600 text-ooredoo-darktext shadow-lg' : 'bg-white hover:bg-gray-50 text-ooredoo-charcoal shadow-md'}`}
              >
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-ooredoo-red via-ooredoo-coral to-ooredoo-teal rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-slow"></div>
                <div className="relative w-28 h-28 bg-gradient-to-br from-ooredoo-red via-ooredoo-coral to-ooredoo-teal rounded-3xl flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                  <Code className="w-14 h-14 text-white" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-ooredoo-teal rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <h2 className={`text-5xl md:text-7xl font-bold mb-6 ${darkMode ? 'text-ooredoo-darktext' : 'text-ooredoo-charcoal'}`}>
              AI Code
              <span className="bg-gradient-to-r from-ooredoo-red via-ooredoo-coral to-ooredoo-teal bg-clip-text text-transparent"> Optimization</span>
            </h2>
            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Transform your JavaScript code with intelligent AI optimization. 
              <span className="font-semibold text-ooredoo-coral"> Boost performance</span>, 
              <span className="font-semibold text-ooredoo-teal"> enhance readability</span>, and 
              <span className="font-semibold text-ooredoo-red"> improve maintainability</span> instantly.
            </p>
            
            {/* Sample Code Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Try samples:</span>
              {sampleCodes.map((code, index) => (
                <button
                  key={index}
                  onClick={() => loadSample(code)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${darkMode ? 'bg-ooredoo-darkcard hover:bg-gray-600 text-ooredoo-darktext' : 'bg-white hover:bg-gray-50 text-ooredoo-charcoal'} shadow-md hover:shadow-lg`}
                >
                  Sample {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
            {/* Input Section */}
            <div className="animate-slide-up">
              <div className={`rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm ${darkMode ? 'bg-ooredoo-darkcard/90 border border-gray-600/50' : 'bg-white/90 border border-white/50'}`}>
                <div className={`px-8 py-6 border-b ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-ooredoo-darkcard to-gray-800' : 'border-gray-200/50 bg-gradient-to-r from-gray-50 to-white'}`}>
                  <h3 className={`text-xl font-bold flex items-center ${darkMode ? 'text-ooredoo-darktext' : 'text-ooredoo-charcoal'}`}>
                    <div className="w-3 h-3 bg-ooredoo-red rounded-full mr-3 animate-pulse"></div>
                    Input Code
                  </h3>
                  <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Paste your JavaScript code here for AI optimization
                  </p>
                </div>
                <div className="p-8">
                  <textarea
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="// Enter your JavaScript code here
function example() {
  var message = 'Hello World';
  console.log(message);
  return message;
}"
                    className={`w-full h-80 md:h-96 p-6 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-4 focus:ring-ooredoo-red/30 transition-all duration-300 ${darkMode ? 'bg-ooredoo-darkbg/50 text-ooredoo-darktext border-2 border-gray-600/50 focus:border-ooredoo-red/50' : 'bg-gray-50/50 text-ooredoo-charcoal border-2 border-gray-200/50 focus:border-ooredoo-red/50'}`}
                  />
                  <div className="flex justify-between items-center mt-6">
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {inputCode.length} characters
                    </div>
                    <button
                      onClick={optimizeCode}
                      disabled={!inputCode.trim() || isOptimizing}
                      className="group relative px-8 py-4 bg-gradient-to-r from-ooredoo-red via-ooredoo-coral to-ooredoo-teal text-white rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-ooredoo-teal via-ooredoo-coral to-ooredoo-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center space-x-3">
                        {isOptimizing ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            <span>Optimizing...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-6 h-6" />
                            <span>Optimize Code</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                  
                  {/* Optimization Progress */}
                  {isOptimizing && (
                    <div className={`mt-6 p-4 rounded-xl ${darkMode ? 'bg-ooredoo-darkbg/50' : 'bg-gray-50/50'} border-l-4 border-ooredoo-coral`}>
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-ooredoo-coral"></div>
                        <span className={`text-sm font-medium ${darkMode ? 'text-ooredoo-darktext' : 'text-ooredoo-charcoal'}`}>
                          {optimizationStep}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Output Section */}
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className={`rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm ${darkMode ? 'bg-ooredoo-darkcard/90 border border-gray-600/50' : 'bg-white/90 border border-white/50'}`}>
                <div className={`px-8 py-6 border-b ${darkMode ? 'border-gray-600/50 bg-gradient-to-r from-ooredoo-darkcard to-gray-800' : 'border-gray-200/50 bg-gradient-to-r from-gray-50 to-white'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-xl font-bold flex items-center ${darkMode ? 'text-ooredoo-darktext' : 'text-ooredoo-charcoal'}`}>
                        <div className="w-3 h-3 bg-ooredoo-teal rounded-full mr-3 animate-pulse"></div>
                        Optimized Code
                      </h3>
                      <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        AI-enhanced version with performance improvements
                      </p>
                    </div>
                    {outputCode && (
                      <div className="flex space-x-3">
                        <button
                          onClick={copyToClipboard}
                          className={`p-3 rounded-xl transition-all duration-200 transform hover:scale-110 ${darkMode ? 'bg-ooredoo-darkbg hover:bg-gray-600 text-ooredoo-darktext' : 'bg-gray-100 hover:bg-gray-200 text-ooredoo-charcoal'} shadow-md hover:shadow-lg`}
                          title="Copy to clipboard"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                        <button
                          onClick={downloadCode}
                          className={`p-3 rounded-xl transition-all duration-200 transform hover:scale-110 ${darkMode ? 'bg-ooredoo-darkbg hover:bg-gray-600 text-ooredoo-darktext' : 'bg-gray-100 hover:bg-gray-200 text-ooredoo-charcoal'} shadow-md hover:shadow-lg`}
                          title="Download code"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-8">
                  <div className={`w-full h-80 md:h-96 p-6 rounded-2xl font-mono text-sm overflow-auto ${darkMode ? 'bg-ooredoo-darkbg/50 text-ooredoo-darktext border-2 border-gray-600/50' : 'bg-gray-50/50 text-ooredoo-charcoal border-2 border-gray-200/50'}`}>
                    {outputCode ? (
                      <pre className="whitespace-pre-wrap leading-relaxed">{outputCode}</pre>
                    ) : (
                      <div className={`flex items-center justify-center h-full ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        <div className="text-center">
                          <Sparkles className="w-16 h-16 mx-auto mb-6 opacity-50 animate-pulse" />
                          <p className="text-lg font-medium mb-2">Ready for optimization</p>
                          <p className="text-sm">Your optimized code will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Success Message */}
                  {copied && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-ooredoo-teal/20 border border-green-500/30 text-green-700 dark:text-green-300 rounded-xl text-sm flex items-center space-x-3 animate-fade-in">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Code copied to clipboard successfully!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Features Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h3 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-ooredoo-darktext' : 'text-ooredoo-charcoal'}`}>
                Why Choose <span className="bg-gradient-to-r from-ooredoo-red to-ooredoo-coral bg-clip-text text-transparent">codeZap</span>?
              </h3>
              <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
                Experience the future of code optimization with our advanced AI technology
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "AI-Powered Intelligence",
                  description: "Advanced machine learning algorithms analyze your code patterns and suggest optimal improvements with 95% accuracy.",
                  gradient: "from-ooredoo-red to-ooredoo-coral",
                  delay: "0s"
                },
                {
                  icon: Code,
                  title: "Multi-Language Support",
                  description: "Supports JavaScript, React, TypeScript, and other popular web development technologies with continuous updates.",
                  gradient: "from-ooredoo-coral to-ooredoo-teal",
                  delay: "0.1s"
                },
                {
                  icon: Zap,
                  title: "Lightning Fast Results",
                  description: "Get optimized code in seconds with detailed explanations of improvements and performance metrics.",
                  gradient: "from-ooredoo-teal to-ooredoo-red",
                  delay: "0.2s"
                },
                {
                  icon: CheckCircle,
                  title: "Quality Assurance",
                  description: "Every optimization is tested for functionality and performance to ensure your code works perfectly.",
                  gradient: "from-ooredoo-red to-ooredoo-teal",
                  delay: "0.3s"
                },
                {
                  icon: AlertCircle,
                  title: "Error Detection",
                  description: "Automatically identifies potential bugs, security issues, and performance bottlenecks in your code.",
                  gradient: "from-ooredoo-coral to-ooredoo-red",
                  delay: "0.4s"
                },
                {
                  icon: ArrowRight,
                  title: "Continuous Learning",
                  description: "Our AI model continuously learns from millions of code samples to provide better optimizations.",
                  gradient: "from-ooredoo-teal to-ooredoo-coral",
                  delay: "0.5s"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className={`group p-8 rounded-3xl ${darkMode ? 'bg-ooredoo-darkcard/50 hover:bg-ooredoo-darkcard/70' : 'bg-white/50 hover:bg-white/70'} backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-slide-up border ${darkMode ? 'border-gray-600/30 hover:border-gray-500/50' : 'border-white/30 hover:border-gray-200/50'}`}
                  style={{animationDelay: feature.delay}}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className={`text-xl font-bold mb-4 ${darkMode ? 'text-ooredoo-darktext' : 'text-ooredoo-charcoal'} group-hover:text-ooredoo-red transition-colors duration-300`}>
                    {feature.title}
                  </h4>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Enhanced Footer */}
        <footer className={`border-t backdrop-blur-md ${darkMode ? 'border-ooredoo-darkcard/50 bg-ooredoo-darkbg/80' : 'border-white/50 bg-white/80'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex justify-center items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-ooredoo-red to-ooredoo-coral rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className={`text-lg font-bold ${darkMode ? 'text-ooredoo-darktext' : 'text-ooredoo-charcoal'}`}>
                  codeZap
                </span>
              </div>
              <p className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                © 2024 codeZap - Powered by <span className="font-semibold text-ooredoo-red">Ooredoo Tunisia</span>
              </p>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Built with ❤️ for developers worldwide
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;