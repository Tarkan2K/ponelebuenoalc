import React, { useState, useEffect } from 'react';
import { longExams } from '../data/longExams';
import { Clock, CheckCircle, AlertCircle, Play, ChevronRight, BookOpen, Code, MessageSquare } from 'lucide-react';
import Prism from 'prismjs';

export default function LongExamPage() {
    const [selectedExam, setSelectedExam] = useState(null);
    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [examState, setExamState] = useState('selection'); // selection, taking, review
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (examState === 'taking' && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [examState, timeLeft]);

    useEffect(() => {
        if (examState === 'review' && typeof Prism !== 'undefined') {
            setTimeout(() => Prism.highlightAll(), 0);
        }
    }, [examState, currentPartIndex]);

    const startExam = (exam) => {
        setSelectedExam(exam);
        setAnswers({});
        setCurrentPartIndex(0);
        setExamState('taking');
        // Parse duration "20 min" -> seconds
        const minutes = parseInt(exam.duration.split(' ')[0]);
        setTimeLeft(minutes * 60);
    };

    const handleAnswerChange = (val) => {
        setAnswers({
            ...answers,
            [currentPartIndex]: val
        });
    };

    const finishExam = () => {
        setExamState('review');
        setCurrentPartIndex(0);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (examState === 'selection') {
        return (
            <div className="space-y-8 animate-in fade-in">
                <h1 className="text-3xl font-bold text-white mb-8">Exámenes Completos</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {longExams.map(exam => (
                        <div key={exam.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-all group">
                            <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${exam.difficulty === 'Easy' ? 'text-green-400' :
                                    exam.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                                }`}>
                                {exam.difficulty}
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{exam.title}</h2>
                            <p className="text-gray-400 text-sm mb-4 h-12">{exam.description}</p>
                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-6">
                                <Clock size={14} />
                                {exam.duration}
                            </div>
                            <button
                                onClick={() => startExam(exam)}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                            >
                                <Play size={16} />
                                Comenzar Examen
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const currentPart = selectedExam.parts[currentPartIndex];
    const isLastPart = currentPartIndex === selectedExam.parts.length - 1;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">{selectedExam.title}</h2>
                    <div className="text-gray-400 text-sm mt-1">
                        Pregunta {currentPartIndex + 1} de {selectedExam.parts.length}
                    </div>
                </div>
                {examState === 'taking' && (
                    <div className="text-xl font-mono font-bold text-blue-400 bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-900/50">
                        {formatTime(timeLeft)}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 backdrop-blur-sm min-h-[400px] flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    {currentPart.type === 'theory' && <BookOpen className="text-purple-400" />}
                    {currentPart.type === 'code' && <Code className="text-blue-400" />}
                    {currentPart.type === 'open' && <MessageSquare className="text-green-400" />}
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                        {currentPart.type === 'theory' ? 'Teoría' : currentPart.type === 'code' ? 'Práctica de Código' : 'Pregunta Abierta'}
                    </span>
                </div>

                <h3 className="text-xl text-white font-medium mb-6 leading-relaxed">
                    {currentPart.question}
                </h3>

                <div className="flex-1">
                    {examState === 'taking' ? (
                        // TAKING MODE
                        <>
                            {currentPart.type === 'theory' && (
                                <div className="space-y-3">
                                    {currentPart.options.map((opt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswerChange(idx)}
                                            className={`w-full text-left p-4 rounded-lg border transition-all ${answers[currentPartIndex] === idx
                                                    ? 'bg-blue-600/20 border-blue-500 text-blue-100'
                                                    : 'bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-gray-800'
                                                }`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {(currentPart.type === 'code' || currentPart.type === 'open') && (
                                <textarea
                                    value={answers[currentPartIndex] || (currentPart.type === 'code' ? currentPart.starterCode : '')}
                                    onChange={(e) => handleAnswerChange(e.target.value)}
                                    className="w-full h-64 bg-[#1e1e1e] text-gray-300 font-mono p-4 rounded-lg border border-gray-700 focus:border-blue-500 outline-none resize-none"
                                    placeholder={currentPart.type === 'open' ? "Escribe tu respuesta aquí..." : ""}
                                />
                            )}
                        </>
                    ) : (
                        // REVIEW MODE
                        <div className="space-y-6 animate-in fade-in">
                            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                                <p className="text-xs text-gray-500 uppercase font-bold mb-2">Tu Respuesta:</p>
                                {currentPart.type === 'theory' ? (
                                    <p className={answers[currentPartIndex] === currentPart.correctAnswer ? "text-green-400" : "text-red-400"}>
                                        {currentPart.options[answers[currentPartIndex]] || "Sin respuesta"}
                                    </p>
                                ) : (
                                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                                        {answers[currentPartIndex] || "Sin respuesta"}
                                    </pre>
                                )}
                            </div>

                            <div className="bg-green-900/10 border border-green-900/30 p-6 rounded-xl">
                                <h4 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                                    <CheckCircle size={20} /> Solución y Explicación
                                </h4>

                                {currentPart.type === 'theory' && (
                                    <p className="text-green-100 mb-4 font-medium">
                                        Correcta: {currentPart.options[currentPart.correctAnswer]}
                                    </p>
                                )}

                                {currentPart.type === 'code' && (
                                    <pre className="rounded-lg bg-[#1e1e1e] p-4 border border-green-900/50 overflow-x-auto mb-4">
                                        <code className="language-cpp">{currentPart.solutionCode}</code>
                                    </pre>
                                )}

                                {currentPart.type === 'open' && (
                                    <div className="bg-green-900/20 p-4 rounded-lg mb-4 text-green-100 italic">
                                        "{currentPart.solution}"
                                    </div>
                                )}

                                <div className="text-gray-300 text-sm leading-relaxed border-t border-green-900/30 pt-4">
                                    <span className="font-bold text-green-400">Por qué: </span>
                                    {currentPart.explanation}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
                    <button
                        onClick={() => setCurrentPartIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentPartIndex === 0}
                        className="px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50"
                    >
                        Anterior
                    </button>

                    {examState === 'taking' ? (
                        isLastPart ? (
                            <button
                                onClick={finishExam}
                                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-bold transition-colors"
                            >
                                Finalizar y Calificar
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentPartIndex(prev => prev + 1)}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
                            >
                                Siguiente <ChevronRight size={16} />
                            </button>
                        )
                    ) : (
                        !isLastPart && (
                            <button
                                onClick={() => setCurrentPartIndex(prev => prev + 1)}
                                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold transition-colors"
                            >
                                Siguiente
                            </button>
                        )
                    )}

                    {examState === 'review' && (
                        <button
                            onClick={() => setExamState('selection')}
                            className="ml-4 px-4 py-2 text-blue-400 hover:text-blue-300"
                        >
                            Volver al Menú
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
