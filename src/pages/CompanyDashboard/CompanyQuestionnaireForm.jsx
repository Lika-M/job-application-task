import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import QuestionnaireForm from "../../components/QuestionnaireForm";
import { useAddQuestionnaireMutation, useUpdateQuestionnaireMutation, useDeleteQuestionnaireMutation } from '../../features/questionnaires/questionnaireApi';
import { selectSelectedQuestionnaire } from '../../features/questionnaires/questionnaireSlice.jsx'
// import useAuth from "../../hooks/useAuth";

const CompanyQuestionnaireForm = () => {
    const navigate = useNavigate();

    const selectedQuestionnaire = useSelector(selectSelectedQuestionnaire);
    
    // Initialize mutations
    const [addQuestionnaire] = useAddQuestionnaireMutation();
    const [updateQuestionnaire] = useUpdateQuestionnaireMutation();

    // Create questionnaire
    const handleCreateQuestionnaire = async (newQuestionnaire) => {
        try {
            await addQuestionnaire(newQuestionnaire).unwrap();
        } catch (error) {
            console.error("Failed to create questionnaire: ", error);
        }
        navigate('/company-dashboard/questionnaires');
    };

    // Update questionnaire
    const handleUpdateQuestionnaire = async (updatedQuestionnaire) => {
        try {
            await updateQuestionnaire(updatedQuestionnaire).unwrap();
        } catch (error) {
            console.error("Failed to update questionnaire: ", error);
        }
        navigate('/company-dashboard/questionnaires');
    };

    return (
        <section className="container mx-auto my-12 p-6 bg-white shadow-lg rounded-lg text-center">
            {/* Questionnaire creation/edit form */}
            <QuestionnaireForm
                initialData={selectedQuestionnaire || {}}
                onSave={handleCreateQuestionnaire}
                onUpdate={handleUpdateQuestionnaire}
            />
        </section>
    );
};

export default CompanyQuestionnaireForm;
