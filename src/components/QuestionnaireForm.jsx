/* eslint-disable react/prop-types */
import { useState } from 'react';
import useAuth from "../hooks/useAuth";

const QuestionnaireForm = ({ onSave, onUpdate, onDelete, initialData = {} }) => {
  const [category, setCategory] = useState(initialData.category || '');
  const [position, setPosition] = useState(initialData.position || '');
  const [technologies, setTechnologies] = useState(initialData.technologies || '');
  const [questions, setQuestions] = useState(initialData.questions || [{ text: '' }]);

  const { userInfo } = useAuth();
  const companyId = userInfo?.id;

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '' }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSave = () => {
    const questionnaire = { 
      companyId,
      category, 
      position, 
      technologies, 
      questions, 
    };
    if (initialData.id) {
      onUpdate(questionnaire);
    } else {
      onSave(questionnaire);
    }
    setCategory('');
    setPosition('');
    setTechnologies('');
    setQuestions([]);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(initialData.id);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {initialData.id ? 'Редактирай Въпросник' : 'Създай Въпросник'}
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Категория:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Позиция:</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Технологии:</label>
        <input
          type="text"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-lg text-sm font-medium text-gray-700 mb-2">Въпроси:</h3>
        {questions.map((question, index) => (
          <div key={index} className="mb-3 flex items-center">
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
            />
            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className="ml-2 text-white bg-[#004AAD] text-sm hover:bg-blue-700 p-2 rounded-md shadow-sm"
            >
              Изтрий 
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="text-white bg-[#004AAD] hover:bg-blue-700 px-4 py-2 rounded-md shadow-sm"
        >
          Добави въпрос
        </button>
      </div>

      <div className="flex space-x-4 flex justify-center">
        <button
          onClick={handleSave}
          className="text-white bg-[#07085F] hover:bg-blue-700 px-6 py-2 rounded-md shadow-sm"
        >
          {initialData.id ? 'Запази редакцията' : 'Запази въпросник'}
        </button>

        {initialData.id && (
          <button
            onClick={handleDelete}
            className="text-white bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md shadow-sm"
          >
            Изтрий
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireForm;
