import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Brain, Trophy, ArrowRight, RefreshCw } from "lucide-react";
import questions from "./questions.json"; // Import file JSON
import "./index.css";

// Thành tích và phần thưởng
const achievements = [
  { id: 1, name: "Nhà tư tưởng", description: "Hoàn thành 5 câu hỏi đúng liên tiếp", icon: "🎓" },
  { id: 2, name: "Triết gia", description: "Đạt điểm tuyệt đối trong một lượt chơi", icon: "🏆" },
  { id: 3, name: "Người học siêng năng", description: "Chơi 3 lượt liên tiếp", icon: "⭐" },
];

export default function QuizGame() {
  const [mode, setMode] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const [totalGames, setTotalGames] = useState(0);

  // Timer effect
  useEffect(() => {
    if (mode === "reward" && !showResult && !showExplanation && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAnswerClick(-1); // Auto-submit on timeout
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [mode, timeLeft, showResult, showExplanation]);

  // Check achievements
  useEffect(() => {
    if (streak === 5 && !unlockedAchievements.includes(1)) {
      unlockAchievement(1); // Nhà tư tưởng
    }
    if (showResult && score === questions.length * 10 && !unlockedAchievements.includes(2)) {
      unlockAchievement(2); // Triết gia
    }
    if (totalGames === 3 && !unlockedAchievements.includes(3)) {
      unlockAchievement(3); // Người học siêng năng
    }
  }, [streak, showResult, score, totalGames, unlockedAchievements]);

  const unlockAchievement = (achievementId) => {
    if (!unlockedAchievements.includes(achievementId)) {
      setUnlockedAchievements([...unlockedAchievements, achievementId]);
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
    }
  };

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    const correct = index === questions[currentQuestion].answer;
    setIsCorrect(correct);

    if (correct) {
      setStreak(streak + 1);
      if (mode === "reward") {
        const timeBonus = Math.floor(timeLeft / 2);
        setScore(score + 10 + timeBonus);
      } else {
        setScore(score + 10);
      }
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    setTimeLeft(30);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
      setTotalGames(totalGames + 1);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setShowExplanation(false);
    setStreak(0);
    setTimeLeft(30);
    setMode(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-5">
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-4 rounded-xl shadow-lg"
          >
            <h3 className="text-lg font-bold">🎉 Thành tích mới!</h3>
            <p>{achievements.find((a) => a.id === unlockedAchievements[unlockedAchievements.length - 1])?.name}</p>
          </motion.div>
        )}

        {!mode ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8">
            <div className="mb-12">
              <motion.h1
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Quiz Game Triết học!
              </motion.h1>
              <p className="text-gray-600 text-xl">Khám phá và thử thách kiến thức triết học của bạn</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode("practice")}
                className="group relative bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl font-semibold shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
              >
                <Book className="w-12 h-12 mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <span className="text-2xl block mb-2">🎓 Chế độ Ôn tập</span>
                <p className="text-sm opacity-80">Học và hiểu sâu về triết học không giới hạn thời gian</p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode("reward")}
                className="group relative bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-2xl font-semibold shadow-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300"
              >
                <Trophy className="w-12 h-12 mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <span className="text-2xl block mb-2">🎮 Chế độ Thi đấu</span>
                <p className="text-sm opacity-80">Thử thách bản thân với hệ thống tính điểm và phần thưởng</p>
              </motion.button>
            </div>

            {unlockedAchievements.length > 0 && (
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Thành tích đã đạt được</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {achievements
                    .filter((a) => unlockedAchievements.includes(a.id))
                    .map((achievement) => (
                      <div key={achievement.id} className="bg-white p-4 rounded-xl shadow-md">
                        <span className="text-3xl">{achievement.icon}</span>
                        <h4 className="font-semibold mt-2">{achievement.name}</h4>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : showResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full backdrop-blur-lg bg-opacity-90"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
              Hoàn thành! 🎉
            </h2>

            {mode === "reward" && (
              <div className="mb-8 space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl">
                  <p className="text-2xl font-bold mb-2">Điểm số</p>
                  <p className="text-5xl font-bold text-blue-600">{score}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <p className="text-sm text-purple-600 mb-1">Chuỗi đúng cao nhất</p>
                    <p className="text-2xl font-bold text-purple-700">{streak}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl">
                    <p className="text-sm text-green-600 mb-1">Độ chính xác</p>
                    <p className="text-2xl font-bold text-green-700">
                      {Math.round((score / (questions.length * 10)) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartGame}
                className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg text-lg w-full hover:from-green-500 hover:to-green-700 transition-all duration-300"
              >
                <RefreshCw className="w-5 h-5 inline-block mr-2" />
                Chơi lại
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode(null)}
                className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg text-lg w-full hover:from-gray-500 hover:to-gray-700 transition-all duration-300"
              >
                Về menu chính
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl backdrop-blur-lg bg-opacity-90"
          >
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-gray-800">
                    Câu hỏi {currentQuestion + 1}/{questions.length}
                  </span>
                  {mode === "reward" && (
                    <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                      <RefreshCw className="w-5 h-5 text-purple-600" />
                      <span className="text-blue-600 font-semibold">{timeLeft}s</span>
                    </div>
                  )}
                </div>
                {mode === "reward" && (
                  <div className="flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-full">
                    <Trophy className="w-5 h-5 text-purple-600" />
                    <span className="text-purple-600 font-semibold">{score} điểm</span>
                  </div>
                )}
              </div>

              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{questions[currentQuestion].question}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Brain className="w-4 h-4 mr-1" />
                  <span>
                    Độ khó: {questions[currentQuestion].difficulty === "hard" ? "Khó" : "Trung bình"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerClick(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full py-4 px-6 rounded-xl text-left transition-all duration-300 ${
                    selectedAnswer === null
                      ? "bg-white hover:bg-gray-50 hover:shadow-md border-2 border-gray-100"
                      : selectedAnswer === index
                      ? index === questions[currentQuestion].answer
                        ? "bg-green-50 border-2 border-green-500 shadow-green-100"
                        : "bg-red-50 border-2 border-red-500 shadow-red-100"
                      : index === questions[currentQuestion].answer
                      ? "bg-green-50 border-2 border-green-500 shadow-green-100"
                      : "bg-white border-2 border-gray-100 opacity-50"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        selectedAnswer === null
                          ? "bg-gray-100 text-gray-600"
                          : selectedAnswer === index
                          ? index === questions[currentQuestion].answer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : index === questions[currentQuestion].answer
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg font-medium">{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-8 p-6 rounded-xl border-2 ${
                  isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isCorrect ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {isCorrect ? <span className="text-2xl text-white">✓</span> : <span className="text-2xl text-white">✗</span>}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {isCorrect ? "Tuyệt vời! Câu trả lời chính xác" : "Rất tiếc! Đáp án chưa chính xác"}
                    </h3>
                    <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={nextQuestion}
                  className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg text-lg flex items-center justify-center space-x-2 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  <span>{currentQuestion === questions.length - 1 ? "Xem kết quả" : "Câu hỏi tiếp theo"}</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}