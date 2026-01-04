import React, { useState, useEffect } from 'react';
import { GeminiService } from '../services/geminiService';
import { Quiz as QuizType } from '../types';
import { BrainCircuit, CheckCircle2, AlertCircle, Loader2, Timer, Trophy } from 'lucide-react';

export const Quiz: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // in seconds

  const QUIZ_DURATION = 15 * 60; // 15 minutes

  // Timer effect
  useEffect(() => {
    if (!quiz || submitted || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, submitted, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    setLoading(true);
    setQuiz(null);
    setSubmitted(false);
    setAnswers({});
    
    const generatedQuiz = await GeminiService.generateQuiz(topic);
    if (generatedQuiz) {
       setQuiz(generatedQuiz);
       setTimeLeft(QUIZ_DURATION);
    }
    setLoading(false);
  };

  const handleOptionSelect = (qIdx: number, oIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmit = () => {
    if (!quiz || submitted) return;
    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  // Badge Logic Calculation (Visual only for this demo)
  const earnedBadges = Math.floor(score / 20); 
  
  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight">Skill Assessment</h1>
        <p className="text-slate-400">Prove your knowledge. 20 Questions. 15 Minutes.</p>
      </div>

      {!quiz && (
        <div className="bg-slate-900/80 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-slate-800 text-center hover:border-violet-500/30 transition-all">
          <BrainCircuit className="w-12 h-12 text-violet-500 mx-auto mb-4 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
          <h2 className="text-xl font-bold text-white mb-2">Generate a New Quiz</h2>
          <p className="text-slate-400 mb-6">Enter a topic (e.g., "React Hooks", "Embedded Systems", "Data Structures")</p>
          
          <form onSubmit={handleGenerate} className="flex max-w-md mx-auto gap-2">
            <input
              type="text"
              className="flex-1 p-3 bg-slate-950 border border-slate-700 rounded-xl text-white focus:ring-1 focus:ring-violet-500 outline-none placeholder-slate-600"
              placeholder="Enter topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !topic}
              className="bg-gradient-to-r from-green-400 to-pink-500 text-white px-6 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(236,72,153,0.4)] disabled:opacity-50 flex items-center gap-2 transition-all"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Start'}
            </button>
          </form>
          {loading && <p className="text-xs text-slate-500 mt-3 animate-pulse">Generating 20 questions... This might take a moment.</p>}
        </div>
      )}

      {quiz && (
        <div className="space-y-6 animate-fade-in relative">
          
          {/* Sticky Timer Header */}
          <div className="sticky top-20 z-40 bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-xl flex justify-between items-center shadow-2xl">
             <div>
                <h2 className="font-bold text-white text-lg truncate max-w-[200px]">{quiz.title}</h2>
                <span className="text-xs text-slate-400">{quiz.questions.length} Questions</span>
             </div>
             <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-cyan-400'}`}>
                <Timer className="w-5 h-5" />
                {formatTime(timeLeft)}
             </div>
          </div>

          <div className="space-y-4">
            {quiz.questions.map((q, qIdx) => (
              <div key={qIdx} className="bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-800">
                <div className="flex justify-between items-start mb-4">
                   <h3 className="font-semibold text-lg text-slate-200 flex gap-2">
                     <span className="text-violet-400">Q{qIdx + 1}.</span> {q.question}
                   </h3>
                   {q.difficulty && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                         q.difficulty === 'Hard' ? 'bg-red-900/20 text-red-400 border-red-800' :
                         q.difficulty === 'Medium' ? 'bg-amber-900/20 text-amber-400 border-amber-800' :
                         'bg-green-900/20 text-green-400 border-green-800'
                      }`}>
                         {q.difficulty}
                      </span>
                   )}
                </div>
                
                <div className="space-y-2">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = answers[qIdx] === oIdx;
                    const isCorrect = q.correctAnswer === oIdx;
                    let bgClass = "hover:bg-slate-800/80 border-slate-700 text-slate-300";
                    let icon = null;

                    if (submitted) {
                      if (isCorrect) {
                         bgClass = "bg-green-900/30 border-green-700/50 text-green-300";
                         icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
                      } else if (isSelected && !isCorrect) {
                         bgClass = "bg-red-900/30 border-red-700/50 text-red-300";
                         icon = <AlertCircle className="w-5 h-5 text-red-500" />;
                      } else {
                         bgClass = "opacity-50 border-slate-800";
                      }
                    } else if (isSelected) {
                       bgClass = "bg-violet-900/30 border-violet-500/50 text-violet-300 shadow-sm ring-1 ring-violet-500/30";
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleOptionSelect(qIdx, oIdx)}
                        disabled={submitted}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex justify-between items-center ${bgClass}`}
                      >
                        <span>{opt}</span>
                        {icon}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {!submitted ? (
            <div className="flex justify-end pt-4">
               <button
                 onClick={handleSubmit}
                 className="bg-gradient-to-r from-green-400 to-pink-500 text-white px-8 py-3 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:-translate-y-1 transition-all"
               >
                 Submit Quiz
               </button>
            </div>
          ) : (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
               <div className="bg-slate-900 border border-slate-700 text-white p-8 rounded-3xl text-center max-w-md w-full shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500"></div>
                  
                  <div className="mb-6 flex justify-center">
                     <div className="w-20 h-20 bg-violet-900/50 rounded-full flex items-center justify-center border-4 border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                        <Trophy className="w-10 h-10 text-yellow-400" />
                     </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-1">Quiz Completed!</h2>
                  <p className="text-slate-400 mb-6">You scored</p>
                  
                  <div className="text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
                     {score} <span className="text-2xl text-slate-500 font-normal">/ {quiz.questions.length}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="bg-slate-800 p-3 rounded-xl">
                         <div className="text-slate-400">Points Earned</div>
                         <div className="font-bold text-cyan-400">+{score * 10} pts</div>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-xl">
                         <div className="text-slate-400">Badges Unlocked</div>
                         <div className="font-bold text-amber-400">{earnedBadges > 0 ? `+${earnedBadges} New` : 'None'}</div>
                      </div>
                  </div>

                  <button onClick={() => setQuiz(null)} className="w-full bg-violet-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-violet-700 transition-colors">
                    Back to Quizzes
                  </button>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};