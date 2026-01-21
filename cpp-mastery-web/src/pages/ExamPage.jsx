import React, { useState, useEffect } from 'react';
import { exams } from '../data/exams';
import { Brain, Eye, EyeOff, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import Prism from 'prismjs';

export default function ExamPage() {
    const [currentExam, setCurrentExam] = useState(null);
    const [showSolution, setShowSolution] = useState(false);

    useEffect(() => {
        loadRandomExam();
    }, []);

    useEffect(() => {
        if (currentExam && typeof Prism !== 'undefined') {
            // Small timeout to ensure DOM is ready for Prism
            setTimeout(() => Prism.highlightAll(), 0);
        }
    }, [currentExam, showSolution]);

    const loadRandomExam = () => {
        const randomIndex = Math.floor(Math.random() * exams.length);
        setCurrentExam(exams[randomIndex]);
        setShowSolution(false);
    };

    if (!currentExam) return <div className="text-white">Cargando examen...</div>;

    return (
        <div className="space-y-8 pb-20 animate-in fade-in duration-500">
            {/* Header */}
            <div className="border-b border-gray-800 pb-6 flex justify-between items-start">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-red-400 text-sm font-bold uppercase tracking-wider">
                        <AlertTriangle size={16} />
                        Modo Examen: {currentExam.difficulty}
                    </div>
                    <h1 className="text-3xl font-bold text-white">{currentExam.title}</h1>
                    <div className="flex gap-2 mt-2">
                        {currentExam.topics.map(topic => (
                            <span key={topic} className="px-2 py-1 rounded bg-gray-800 text-xs text-gray-400 border border-gray-700">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
                <button
                    onClick={loadRandomExam}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700"
                >
                    <RefreshCw size={16} />
                    Nuevo Problema
                </button>
            </div>

            {/* Problem Description */}
            <div className="prose prose-invert max-w-none">
                <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-4">Descripción del Problema</h3>
                    <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                        {currentExam.description}
                    </div>
                </div>
            </div>

            {/* Starter Code */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Brain size={20} className="text-blue-400" />
                    Código Inicial
                </h3>
                <pre className="rounded-lg bg-[#1e1e1e] p-4 border border-gray-700 overflow-x-auto">
                    <code className="language-cpp">{currentExam.starterCode}</code>
                </pre>
            </div>

            {/* Solution Section */}
            <div className="pt-8 border-t border-gray-800">
                {!showSolution ? (
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowSolution(true)}
                            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-900/40 transition-all transform hover:scale-105"
                        >
                            <Eye size={20} />
                            Ver Solución y Explicación
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-bold text-green-400 flex items-center gap-2">
                                <CheckCircle size={24} />
                                Solución Oficial
                            </h3>
                            <button
                                onClick={() => setShowSolution(false)}
                                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                <EyeOff size={16} />
                                Ocultar
                            </button>
                        </div>

                        {/* Explanation */}
                        <div className="bg-green-900/10 border border-green-900/30 p-6 rounded-xl">
                            <h4 className="text-lg font-semibold text-green-300 mb-3">Análisis Técnico</h4>
                            <div className="prose prose-invert prose-sm max-w-none text-gray-300">
                                <div dangerouslySetInnerHTML={{ __html: currentExam.explanation.replace(/\n/g, '<br/>') }} />
                            </div>
                        </div>

                        {/* Solution Code */}
                        <pre className="rounded-lg bg-[#1e1e1e] p-4 border border-green-900/50 overflow-x-auto relative">
                            <div className="absolute top-0 right-0 bg-green-900/80 text-green-100 text-xs px-2 py-1 rounded-bl">
                                SOLUTION.cpp
                            </div>
                            <code className="language-cpp">{currentExam.solutionCode}</code>
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
