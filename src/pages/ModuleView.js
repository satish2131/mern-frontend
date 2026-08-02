import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBookOpen, FaCheckCircle, FaTimesCircle, FaCode, FaQuestionCircle, FaAward, FaRedo } from "react-icons/fa";
import "./ModuleView.css";

const Confetti = lazy(() => import("react-confetti"));

export default function ModuleView() {
  const { courseId, moduleId } = useParams();
  const navigate = useNavigate();

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const resultRef = useRef(null);
  const firstQuestionRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [moduleId]);

  // Module content database mapped by index / ID
  const moduleDatabase = {
    "m1": {
      id: "m1",
      title: "Module 1: Modern JavaScript & Async Fundamentals",
      duration: "3h 45m",
      category: "JavaScript & Async",
      theory: [
        {
          heading: "1. Understanding Asynchronous JavaScript & Promises",
          text: "JavaScript is single-threaded and executes code synchronously line by line on the main call stack. To handle long-running operations like network requests, database queries, and file I/O without blocking the user interface, JavaScript uses the Event Loop, Callbacks, Promises, and the async/await pattern.",
          code: `// Promises vs Async/Await syntax comparison
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    if (!response.ok) throw new Error("Network response error");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }
};`
        },
        {
          heading: "2. Event Loop & Microtask Queue",
          text: "Promises resolve into the Microtask Queue, which has higher priority than the Macrotask Queue (setTimeout, setInterval). This means Promise callbacks (.then / await) execute before timers even if set to 0 milliseconds.",
          code: `console.log("1: Start");

setTimeout(() => console.log("2: Macrotask Timeout"), 0);

Promise.resolve().then(() => console.log("3: Microtask Promise"));

console.log("4: End");

// Output Order:
// 1: Start -> 4: End -> 3: Microtask Promise -> 2: Macrotask Timeout`
        }
      ],
      quiz: [
        {
          id: 1,
          question: "Which task queue has higher priority in the JavaScript Event Loop?",
          options: ["Macrotask Queue", "Microtask Queue", "Render Queue", "Call Stack"],
          correct: 1,
          explanation: "The Microtask Queue (Promises, process.nextTick) is processed completely before the Macrotask Queue."
        },
        {
          id: 2,
          question: "What does the async keyword before a function guarantee?",
          options: [
            "The function executes in a background thread",
            "The function always returns a Promise",
            "The function blocks the main thread until done",
            "The function ignores errors"
          ],
          correct: 1,
          explanation: "Functions declared with 'async' always wrap their return value in a resolved Promise."
        },
        {
          id: 3,
          question: "How do you handle errors when using async/await syntax?",
          options: ["Using .catch() only", "Using try...catch blocks", "Errors are ignored", "Using throwError()"],
          correct: 1,
          explanation: "try...catch blocks are used to catch asynchronous errors in async/await functions."
        },
        {
          id: 4,
          question: "What is the output order of: console.log(1); Promise.resolve().then(() => console.log(2)); console.log(3);?",
          options: ["1, 2, 3", "1, 3, 2", "3, 2, 1", "2, 1, 3"],
          correct: 1,
          explanation: "Synchronous logs (1, 3) execute first, followed by the resolved Promise microtask (2)."
        },
        {
          id: 5,
          question: "Which method executes multiple Promises in parallel and fails if ANY promise rejects?",
          options: ["Promise.allSettled()", "Promise.any()", "Promise.all()", "Promise.race()"],
          correct: 2,
          explanation: "Promise.all() waits for all promises to resolve, but rejects immediately if any single promise fails."
        }
      ]
    },
    "m2": {
      id: "m2",
      title: "Module 2: React 19 Architecture & State Management",
      duration: "6h 20m",
      category: "React 19 Core",
      theory: [
        {
          heading: "1. React 19 Server Components & Hooks",
          text: "React 19 introduces native Actions, useActionState, useOptimistic, and improved hydration. State management relies on immutable updates to maintain predictable component rendering and Virtual DOM reconciliation.",
          code: `import React, { useState, useTransition } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const handleIncrement = () => {
    startTransition(() => {
      setCount(prev => prev + 1);
    });
  };

  return (
    <button onClick={handleIncrement} disabled={isPending}>
      Count: {count}
    </button>
  );
}`
        }
      ],
      quiz: [
        {
          id: 1,
          question: "Which hook is used in React 19 to handle non-blocking state transitions?",
          options: ["useDeferredValue", "useTransition", "useEffect", "useCallback"],
          correct: 1,
          explanation: "useTransition allows marking state updates as non-blocking transitions."
        },
        {
          id: 2,
          question: "Why should React state never be mutated directly (e.g. state.push())?",
          options: [
            "Direct mutation prevents re-rendering because reference equality check fails",
            "It throws a syntax error",
            "It slows down network requests",
            "State becomes global"
          ],
          correct: 0,
          explanation: "React relies on shallow object reference equality checks (prev !== next) to trigger re-renders."
        },
        {
          id: 3,
          question: "What is the primary benefit of React Server Components (RSC)?",
          options: [
            "Reduces client JavaScript bundle size by executing on the server",
            "Replaces CSS styling",
            "Eliminates database queries",
            "Automates HTML forms"
          ],
          correct: 0,
          explanation: "Server Components execute exclusively on the server, sending zero JS bundle overhead to the client."
        },
        {
          id: 4,
          question: "Which Hook memoizes computed values between re-renders?",
          options: ["useMemo", "useCallback", "useRef", "useState"],
          correct: 0,
          explanation: "useMemo caches the result of a calculation between re-renders until dependencies change."
        },
        {
          id: 5,
          question: "What parameter does useEffect's cleanup function execute before unmounting?",
          options: ["The return function", "The initial callback", "The dependency array", "The render props"],
          correct: 0,
          explanation: "The cleanup function returned by useEffect runs prior to component unmounting or re-execution."
        }
      ]
    }
  };

  // Fallback module if moduleId not found directly
  const moduleData = moduleDatabase[moduleId] || moduleDatabase["m1"];

  const handleOptionSelect = (questionId, optionIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    let calculatedScore = 0;
    moduleData.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
    setSubmitted(true);

    const isPass = calculatedScore >= 4;
    setPassed(isPass);

    if (isPass) {
      localStorage.setItem(`completed_module_${courseId || "c1"}_${moduleId}`, "true");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4500);
    }

    setTimeout(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
    setPassed(false);

    setTimeout(() => {
      if (firstQuestionRef.current) {
        firstQuestionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="module-view-page animate-fade-in">
      {showConfetti && (
        <Suspense fallback={null}>
          <Confetti numberOfPieces={250} recycle={false} />
        </Suspense>
      )}

      {/* Header bar */}
      <div className="module-header-bg">
        <div className="module-header-container">
          <button className="btn btn-outline back-btn" onClick={() => navigate(`/course/${courseId || "c1"}`)}>
            <FaArrowLeft /> Back to Syllabus
          </button>
          
          <div className="module-title-row">
            <div>
              <span className="badge badge-primary">{moduleData.category}</span>
              <h1>{moduleData.title}</h1>
            </div>
            <span className="duration-tag"><FaBookOpen /> {moduleData.duration}</span>
          </div>
        </div>
      </div>

      <div className="module-body-container">
        {/* Theory & Code Examples Section */}
        <div className="theory-section glass-panel">
          <h2 className="section-title"><FaBookOpen color="var(--accent-primary)" /> Course Theory & Concepts</h2>
          
          {moduleData.theory.map((item, idx) => (
            <div key={idx} className="theory-block">
              <h3>{item.heading}</h3>
              <p>{item.text}</p>
              
              {item.code && (
                <div className="code-example-card">
                  <div className="code-card-header">
                    <span className="code-lang-tag"><FaCode /> Example Snippet</span>
                  </div>
                  <pre className="code-block">
                    <code>{item.code}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 5-Question Module Completion Quiz */}
        <div className="quiz-section glass-panel">
          <div className="quiz-header">
            <div>
              <span className="badge badge-gold"><FaQuestionCircle /> MODULE EVALUATION</span>
              <h2>End-of-Module Quiz (5 Questions)</h2>
              <p>Score 4 or 5 out of 5 to complete this module and earn completion credit.</p>
            </div>
          </div>

          <form onSubmit={handleQuizSubmit} className="quiz-form">
            {moduleData.quiz.map((q, index) => (
              <div
                key={q.id}
                ref={index === 0 ? firstQuestionRef : null}
                className="quiz-question-card glass-card"
              >
                <div className="question-title">
                  <span className="q-num">Q{index + 1}.</span> {q.question}
                </div>

                <div className="quiz-options-list">
                  {q.options.map((opt, optionIdx) => {
                    const isSelected = selectedAnswers[q.id] === optionIdx;
                    const isCorrectOption = q.correct === optionIdx;
                    let optionClass = "";
                    if (submitted) {
                      if (isCorrectOption) optionClass = "option-correct";
                      else if (isSelected && !isCorrectOption) optionClass = "option-wrong";
                    }

                    return (
                      <label
                        key={optionIdx}
                        className={`quiz-option-item ${isSelected ? "selected" : ""} ${optionClass}`}
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={isSelected}
                          onChange={() => handleOptionSelect(q.id, optionIdx)}
                          disabled={submitted}
                        />
                        <span className="option-radio-custom" />
                        <span className="option-text">{opt}</span>
                      </label>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="explanation-box animate-fade-in">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}

            {!submitted ? (
              <button
                type="submit"
                className="btn btn-primary btn-submit-quiz"
                disabled={Object.keys(selectedAnswers).length < 5}
              >
                Submit Quiz Answers ({Object.keys(selectedAnswers).length}/5)
              </button>
            ) : (
              <div ref={resultRef} className="quiz-result-card text-center animate-fade-in">
                <div className="result-score-badge">
                  {passed ? <FaCheckCircle size={44} color="#10b981" /> : <FaTimesCircle size={44} color="#f43f5e" />}
                </div>

                <h3>{passed ? "Module Passed!" : "Module Not Passed"}</h3>
                <p className="result-subtitle">
                  You scored <strong>{score} / 5</strong> ({((score / 5) * 100).toFixed(0)}%).
                </p>

                <div className="result-actions">
                  <button type="button" className="btn btn-outline" onClick={resetQuiz}>
                    <FaRedo /> Retake Quiz
                  </button>
                  {passed && (
                    <button type="button" className="btn btn-primary" onClick={() => navigate(`/course/${courseId || "c1"}`)}>
                      <FaAward /> Complete Module
                    </button>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
