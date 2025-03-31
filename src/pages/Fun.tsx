
import React, { useState } from 'react';
import { Image, Award, CheckCircle, Smile, Send } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import SectionHeading from '@/components/SectionHeading';
import MouseCharacter from '@/components/MouseCharacter';

const FunPage = () => {
  const [activeTab, setActiveTab] = useState('memes');
  
  const memes = [
    {
      title: "To The Moon!",
      imageUrl: "https://source.unsplash.com/random/300x300/?moon,1",
      author: "CosmicUser42"
    },
    {
      title: "Phooey vs Doge",
      imageUrl: "https://source.unsplash.com/random/300x300/?dog,1",
      author: "MoonWalker"
    },
    {
      title: "Space Mice Adventures",
      imageUrl: "https://source.unsplash.com/random/300x300/?space,1",
      author: "ApolloFan"
    },
    {
      title: "When PHOOEY Pumps",
      imageUrl: "https://source.unsplash.com/random/300x300/?rocket,1",
      author: "CryptoLover"
    },
    {
      title: "Phooey's Moonwalk",
      imageUrl: "https://source.unsplash.com/random/300x300/?astronaut,1",
      author: "TokenHolder"
    },
    {
      title: "Mice in Space",
      imageUrl: "https://source.unsplash.com/random/300x300/?stars,1",
      author: "SpaceExplorer"
    }
  ];
  
  const quizQuestions = [
    {
      question: "In what year did the Apollo 17 mission take place?",
      options: ["1969", "1970", "1972", "1975"],
      correctAnswer: 2
    },
    {
      question: "How many pocket mice traveled to the Moon on Apollo 17?",
      options: ["3", "5", "7", "10"],
      correctAnswer: 1
    },
    {
      question: "What was the name of the experiment involving the mice?",
      options: ["MOUSECAP", "RODENT", "BIOCORE", "SPACEMOUSE"],
      correctAnswer: 2
    },
    {
      question: "Which of these is NOT one of the mice's nicknames?",
      options: ["Fe", "Fi", "Fo", "Fuzz"],
      correctAnswer: 3
    },
    {
      question: "How many times did the mice orbit the Moon?",
      options: ["25", "50", "75", "100"],
      correctAnswer: 2
    }
  ];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
      }
    }, 1000);
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Fun with <span className="text-gradient">PHOOEY</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enjoy memes, games, and space trivia as we celebrate our favorite lunar mice!
            </p>
            <div className="space-divider mt-8 max-w-xs mx-auto"></div>
          </div>
        </div>
      </section>
      
      {/* Tabs Navigation */}
      <section className="pb-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-2 sm:space-x-6">
            <button 
              className={`px-4 py-3 text-sm sm:text-base rounded-lg transition-colors ${activeTab === 'memes' ? 'bg-space-blue text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
              onClick={() => setActiveTab('memes')}
            >
              <div className="flex items-center">
                <Image className="h-4 w-4 mr-2" />
                Meme Gallery
              </div>
            </button>
            
            <button 
              className={`px-4 py-3 text-sm sm:text-base rounded-lg transition-colors ${activeTab === 'quiz' ? 'bg-space-blue text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
              onClick={() => setActiveTab('quiz')}
            >
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Space Quiz
              </div>
            </button>
            
            <button 
              className={`px-4 py-3 text-sm sm:text-base rounded-lg transition-colors ${activeTab === 'submit' ? 'bg-space-blue text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
              onClick={() => setActiveTab('submit')}
            >
              <div className="flex items-center">
                <Send className="h-4 w-4 mr-2" />
                Submit Content
              </div>
            </button>
          </div>
        </div>
      </section>
      
      {/* Content Sections */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Meme Gallery */}
          {activeTab === 'memes' && (
            <div>
              <SectionHeading subtitle="Enjoy the creativity of our community with these PHOOEY-inspired memes.">
                Community Meme Gallery
              </SectionHeading>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {memes.map((meme, index) => (
                  <div key={index} className="glass-card p-4 hover:bg-white/10 transition-colors">
                    <div className="aspect-square rounded-lg overflow-hidden mb-4">
                      <img 
                        src={meme.imageUrl} 
                        alt={meme.title} 
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-white">{meme.title}</h3>
                    <p className="text-sm text-gray-400">Created by: {meme.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Space Quiz */}
          {activeTab === 'quiz' && (
            <div>
              <SectionHeading subtitle="Test your knowledge about the Apollo 17 mice and space exploration.">
                Apollo 17 Space Quiz
              </SectionHeading>
              
              <div className="glass-card p-8 max-w-3xl mx-auto">
                {!quizCompleted ? (
                  <div>
                    <div className="mb-8">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
                        <span>Score: {score}/{quizQuestions.length}</span>
                      </div>
                      <div className="w-full bg-space-purple rounded-full h-2">
                        <div 
                          className="bg-space-blue h-2 rounded-full transition-all" 
                          style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-6">
                      {quizQuestions[currentQuestion].question}
                    </h3>
                    
                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          className={`w-full text-left p-4 rounded-lg transition-colors ${
                            selectedAnswer === null 
                              ? 'bg-white/5 hover:bg-white/10 text-white' 
                              : selectedAnswer === index
                                ? index === quizQuestions[currentQuestion].correctAnswer
                                  ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                                  : 'bg-red-500/20 text-red-300 border border-red-500/50'
                                : index === quizQuestions[currentQuestion].correctAnswer && selectedAnswer !== null
                                  ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                                  : 'bg-white/5 text-white opacity-50'
                          }`}
                          onClick={() => selectedAnswer === null && handleAnswerClick(index)}
                          disabled={selectedAnswer !== null}
                        >
                          <div className="flex items-center">
                            <span className="mr-3">{String.fromCharCode(65 + index)}.</span>
                            <span>{option}</span>
                            {selectedAnswer !== null && index === quizQuestions[currentQuestion].correctAnswer && (
                              <CheckCircle className="ml-auto text-green-400 h-5 w-5" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Award className="h-16 w-16 text-space-blue mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h3>
                    <p className="text-xl text-gray-300 mb-6">
                      Your score: <span className="text-space-accent font-bold">{score}/{quizQuestions.length}</span>
                    </p>
                    
                    {score === quizQuestions.length ? (
                      <p className="text-green-400 mb-8">Perfect score! You're a true Apollo 17 expert!</p>
                    ) : score >= quizQuestions.length / 2 ? (
                      <p className="text-space-blue mb-8">Great job! You know your space mice history!</p>
                    ) : (
                      <p className="text-yellow-500 mb-8">Nice try! Learn more about the Apollo 17 mice and try again!</p>
                    )}
                    
                    <button 
                      className="bg-space-blue hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-lg transition-all"
                      onClick={resetQuiz}
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Submit Content */}
          {activeTab === 'submit' && (
            <div>
              <SectionHeading subtitle="Share your creativity with the PHOOEY community by submitting your own content.">
                Submit Your Content
              </SectionHeading>
              
              <div className="glass-card p-8 max-w-3xl mx-auto">
                <form className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Content Type</label>
                    <select className="w-full bg-space-purple border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-space-blue">
                      <option>Select content type</option>
                      <option>Meme</option>
                      <option>Artwork</option>
                      <option>Story</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Title</label>
                    <input 
                      type="text" 
                      placeholder="Give your creation a name"
                      className="w-full bg-space-purple border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-space-blue"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Upload File</label>
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                      <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-300 mb-2">Drag and drop your image here, or click to browse</p>
                      <p className="text-gray-400 text-sm mb-4">Max file size: 5MB (JPEG, PNG, GIF)</p>
                      <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded transition-colors">
                        Browse Files
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Your Name/Handle</label>
                    <input 
                      type="text" 
                      placeholder="How you want to be credited"
                      className="w-full bg-space-purple border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-space-blue"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Description (Optional)</label>
                    <textarea 
                      rows={4}
                      placeholder="Tell us about your creation"
                      className="w-full bg-space-purple border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-space-blue"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="terms" className="mr-3" />
                    <label htmlFor="terms" className="text-gray-300 text-sm">
                      I confirm this is my original content and I allow PHOOEY to display it on the website.
                    </label>
                  </div>
                  
                  <button className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-lg transition-all">
                    Submit Content
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Mouse Animations Section */}
      <section className="py-20 relative">
        <div className="absolute left-0 right-0 h-full bg-space-purple/5 transform -skew-y-6 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading subtitle="Play with our animated space mice characters and watch them float through space!">
            Interactive Space Mice
          </SectionHeading>
          
          <div className="h-80 relative glass-card p-6 overflow-hidden">
            <div className="stars absolute inset-0"></div>
            
            <div className="absolute bottom-10 left-1/4 transform -translate-x-1/2 animate-float" style={{ animationDelay: "0s" }}>
              <MouseCharacter name="Fe" id="A3305" className="scale-75" />
            </div>
            
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 animate-float" style={{ animationDelay: "1.2s" }}>
              <MouseCharacter name="Fi" id="A3326" className="scale-75" />
            </div>
            
            <div className="absolute bottom-20 right-1/4 transform translate-x-1/2 animate-float" style={{ animationDelay: "0.8s" }}>
              <MouseCharacter name="Fo" id="A3352" className="scale-75" />
            </div>
            
            <div className="absolute top-20 right-1/3 transform translate-x-1/2 animate-float" style={{ animationDelay: "2s" }}>
              <MouseCharacter name="Fum" id="A3356" className="scale-75" />
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
              <MouseCharacter name="Phooey" id="A3400" className="scale-100" />
            </div>
            
            <div className="absolute bottom-5 left-0 right-0 text-center">
              <p className="text-gray-400 text-sm">Hover over mice to interact</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-bold py-3 px-8 rounded-lg transition-all">
              <div className="flex items-center">
                <Smile className="mr-2 h-5 w-5" />
                More Fun Coming Soon!
              </div>
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FunPage;
