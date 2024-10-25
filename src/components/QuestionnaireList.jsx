/* eslint-disable react/prop-types */
import QuestionnaireItem from './QuestionnaireItem';

const QuestionnaireList = ({ questionnaires, selectQuestionnaireForEdit, deleteQuestionnaire }) => {
    
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 py-8">
            {questionnaires.map((questionnaire) => (
                <QuestionnaireItem
                    key={questionnaire.id}
                    questionnaire={questionnaire}
                    onSelect={selectQuestionnaireForEdit}
                    onDelete={deleteQuestionnaire}
                />
            ))}
        </div>
    );
};

export default QuestionnaireList;
