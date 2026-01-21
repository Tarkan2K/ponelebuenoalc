import React, { useState, useEffect } from 'react';
import { lessons } from './data/lessons';
import { BookOpen, CheckCircle, Code, Terminal, ChevronRight, Menu } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-cpp';

function App() {
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentLesson = lessons.find(l => l.id === currentLessonId);

  useEffect(() => {
    Prism.highlightAll();
  }, [currentLessonId]);

  const markComplete = (id) => {
    if (!completedLessons.includes(id)) {
      setCompletedLessons([...completedLessons, id]);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className={`bg-gray-800 border-r border-gray-700 transition-all duration-300 ${isSidebarOpen ? 'w-80' : 'w-0'} flex flex-col`}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            C++ Mastery
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {['Fase 1: Fundamentos', 'Fase 2: C++ Moderno'].map(phase => (
            <div key={phase}>
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-3 tracking-wider">{phase}</h3>
              <div className="space-y-2">
                {lessons.filter(l => l.phase === phase).map(lesson => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLessonId(lesson.id)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-all flex items-center justify-between group ${currentLessonId === lesson.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                        : 'hover:bg-gray-700 text-gray-300'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-md ${completedLessons.includes(lesson.id) ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                        {completedLessons.includes(lesson.id) ? <CheckCircle size={14} /> : <BookOpen size={14} />}
                      </div>
                      <span>{lesson.id}. {lesson.title}</span>
                    </div>
                    {currentLessonId === lesson.id && <ChevronRight size={16} />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 left-4 z-10 p-2 bg-gray-800 rounded-md hover:bg-gray-700 text-gray-400"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 overflow-y-auto p-8 lg:p-12 max-w-5xl mx-auto w-full">
          {currentLesson ? (
            <LessonView
              lesson={currentLesson}
              onComplete={() => markComplete(currentLesson.id)}
              isCompleted={completedLessons.includes(currentLesson.id)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Selecciona una lección para comenzar
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LessonView({ lesson, onComplete, isCompleted }) {
  const [quizSelected, setQuizSelected] = useState(null);
  const [code, setCode] = useState(lesson.codeChallenge.initialCode);
  const [feedback, setFeedback] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset state when lesson changes
  useEffect(() => {
    setQuizSelected(null);
    setCode(lesson.codeChallenge.initialCode);
    setFeedback(null);
    setShowSuccess(false);
  }, [lesson.id]);

  useEffect(() => {
    Prism.highlightAll();
  }, [lesson.id, feedback]); // Re-highlight when feedback changes (e.g. showing success message)

  const handleQuizSubmit = (index) => {
    setQuizSelected(index);
    if (index === lesson.quiz.correctAnswer) {
      // Correct
    }
  };

  const runCode = () => {
    if (lesson.codeChallenge.expectedRegex.test(code)) {
      setFeedback({ type: 'success', msg: '¡Código Correcto! Has dominado este concepto.' });
      setShowSuccess(true);
      onComplete();
    } else {
      setFeedback({ type: 'error', msg: 'Mmm, algo no cuadra. Revisa la sintaxis e inténtalo de nuevo.' });
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="space-y-4 border-b border-gray-800 pb-8">
        <div className="flex items-center gap-2 text-blue-400 text-sm font-medium uppercase tracking-wider">
          <Terminal size={16} />
          {lesson.phase}
        </div>
        <h1 className="text-4xl font-bold text-white">{lesson.title}</h1>
        <p className="text-xl text-gray-400 leading-relaxed">{lesson.description}</p>
      </div>

      {/* Theory Content */}
      <div className="prose prose-invert prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{
          __html: lesson.content
            .replace(/# (.*)/g, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">$1</h2>')
            .replace(/## (.*)/g, '<h3 class="text-xl font-semibold text-blue-300 mt-6 mb-3">$1</h3>')
            .replace(/```cpp([\s\S]*?)```/g, '<pre class="rounded-lg bg-[#1e1e1e] p-4 border border-gray-700 overflow-x-auto"><code class="language-cpp">$1</code></pre>')
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-200">$1</strong>')
            .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-1.5 py-0.5 rounded text-blue-300 text-sm font-mono">$1</code>')
        }} />
      </div>

      {/* Interactive Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

        {/* Quiz */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="text-purple-400" size={20} />
            Comprobación de Conocimientos
          </h3>
          <p className="text-gray-300 mb-6">{lesson.quiz.question}</p>
          <div className="space-y-3">
            {lesson.quiz.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleQuizSubmit(idx)}
                className={`w-full text-left p-4 rounded-lg transition-all border ${quizSelected === idx
                    ? idx === lesson.quiz.correctAnswer
                      ? 'bg-green-500/20 border-green-500 text-green-300'
                      : 'bg-red-500/20 border-red-500 text-red-300'
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600'
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Code Challenge */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm flex flex-col">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Code className="text-blue-400" size={20} />
            Desafío de Código
          </h3>
          <p className="text-sm text-gray-400 mb-4">{lesson.codeChallenge.instruction}</p>

          <div className="flex-1 relative group">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-48 bg-[#1e1e1e] text-gray-300 font-mono text-sm p-4 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
              spellCheck="false"
            />
          </div>

          {feedback && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${feedback.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {feedback.msg}
            </div>
          )}

          <button
            onClick={runCode}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/30"
          >
            Ejecutar Código
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl animate-bounce flex items-center gap-3">
          <CheckCircle size={24} />
          <div>
            <p className="font-bold">¡Lección Completada!</p>
            <p className="text-sm text-green-100">Continúa con la siguiente.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
