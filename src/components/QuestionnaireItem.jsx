/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const QuestionnaireItem = ({ questionnaire, onSelect }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/company-dashboard/questionnaires/${questionnaire.id}`);
    };

    return (
        <div
            className="flex flex-col bg-white shadow rounded-lg p-3 hover:shadow-xl cursor-pointer"
            onClick={handleCardClick}
        >
            <h3 className="text-xl font-bold text-blue-600">{questionnaire.position}</h3>
            <p className="text-gray-600">Technologies: <span className="font-semibold">{questionnaire.technologies}</span></p>
        </div>
    );
};

export default QuestionnaireItem;
