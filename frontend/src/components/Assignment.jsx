import React, { useState } from 'react';

const Assignment = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = "Who i Python ? ";
  const options = [
    { id: 1, text: "Berlin", isCorrect: false },
    { id: 2, text: "Madrid", isCorrect: false },
    { id: 3, text: "Paris", isCorrect: true },
    { id: 4, text: "Rome", isCorrect: false },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsAnswered(true);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{question}</h2>
        <div className="grid grid-cols-1 gap-4">
          {options.map((option) => (
            <div
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={`p-4 border rounded-lg cursor-pointer text-center transition duration-300 
                ${isAnswered && (selectedOption?.id === option.id ? (option.isCorrect ? 'bg-green-300' : 'bg-red-300') : 'bg-gray-200')}`}
            >
              {option.text}
            </div>
          ))}
        </div>
        {isAnswered && (
          <div className="mt-4 text-center">
            {selectedOption?.isCorrect ? (
              <p className="text-green-600 font-semibold">Correct! 🎉</p>
            ) : (
              <p className="text-red-600 font-semibold">Incorrect! Try again. 😔</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignment;
