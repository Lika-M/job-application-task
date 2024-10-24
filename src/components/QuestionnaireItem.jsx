/* eslint-disable react/prop-types */
// import { useHistory } from 'react-router-dom';

const QuestionnaireItem = ({ questionnaire, onSelect }) => {
    // const history = useHistory();

    const handleCardClick = () => {
        // history.push(`/questionnaires/${questionnaire.id}`); 
    };

    return (
        <div
            className="flex flex-col bg-white shadow-lg rounded-lg p-4 hover:shadow-xl cursor-pointer"
            onClick={handleCardClick}
        >
            <h3 className="text-xl font-semibold mb-2">Category: {questionnaire.category}</h3>
            <h4 className="text-lg font-medium mb-1">Position: {questionnaire.position}</h4>
            {/* <p className="text-gray-600 truncate">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p> */}
        </div>
    );
};

export default QuestionnaireItem;
