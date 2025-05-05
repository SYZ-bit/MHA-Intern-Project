// src/components/QuizComponent.jsx
import { useState } from 'react';

export function Quiz({ question, options, correctAnswer, correctReply, incorrectReply }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer) {
      setFeedback(correctReply);
    } else {
      setFeedback(incorrectReply);
    }
  };

  return (
    <div>
      <p>{question}</p>
      <div>
        {options.map((option, index) => (
          <button key={index} onClick={() => handleAnswer(option)}>
            {option}
          </button>
        ))}
      </div>
      {selectedAnswer && <p>{feedback}</p>}
    </div>
  );
}

