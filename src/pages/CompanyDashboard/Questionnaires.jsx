import { useState } from "react";
import { Link } from "react-router-dom";

import QuestionnaireForm from "../../components/QuestionnaireForm";
import QuestionnaireList from "../../components/QuestionnaireList.jsx";
import { useGetQuestionnairesQuery, useAddQuestionnaireMutation, useUpdateQuestionnaireMutation, useDeleteQuestionnaireMutation } from '../../features/questionnaires/questionnaireApi';
import useAuth from "../../hooks/useAuth";

const Questionnaires = () => {
    const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
    const { userInfo, userType } = useAuth();

    const companyId = userType === 'company' ? userInfo.id : null;

    // Fetch questionnaires from RTK Query
    const { data: questionnaires = [] } = useGetQuestionnairesQuery(companyId);

    // Initialize mutations
    const [addQuestionnaire] = useAddQuestionnaireMutation();
    const [updateQuestionnaire] = useUpdateQuestionnaireMutation();
    const [deleteQuestionnaire] = useDeleteQuestionnaireMutation();

    // Create questionnaire
    const handleCreateQuestionnaire = async (newQuestionnaire) => {
        try {
            await addQuestionnaire(newQuestionnaire).unwrap();
        } catch (error) {
            console.error("Failed to create questionnaire: ", error);
        }
    };

    // Update questionnaire
    const handleUpdateQuestionnaire = async (updatedQuestionnaire) => {
        try {
            await updateQuestionnaire(updatedQuestionnaire).unwrap();
            setSelectedQuestionnaire(null); // Reset selected questionnaire
        } catch (error) {
            console.error("Failed to update questionnaire: ", error);
        }
    };

    // Delete questionnaire
    const handleDeleteQuestionnaire = async (id) => {
        try {
            await deleteQuestionnaire(id).unwrap();
            setSelectedQuestionnaire(null); // Reset selected questionnaire
        } catch (error) {
            console.error("Failed to delete questionnaire: ", error);
        }
    };

    // Select questionnaire for editing
    const selectQuestionnaireForEdit = (questionnaire) => {
        setSelectedQuestionnaire(questionnaire);
    };

    return (
        <section className="container mx-auto my-12 p-6 bg-white shadow-lg rounded-lg text-center">
            <h1 className="text-4xl font-bold mb-8">Моите Въпросници</h1>
            <p className="mb-4">Това е мястото, където можете да управлявате вашите активни въпросници за работа.</p>

            {/* Back Button */}
            <Link to="/company-dashboard" className="inline-block px-8 py-4 bg-[#004AAD] text-white font-semibold rounded hover:bg-blue-700">
                Обратно в Профила
            </Link>

            {/* Questionnaire List  */}
            <ul className="mt-6 mb-6">
                {questionnaires.length === 0 ? (
                    <p className="text-gray-600">Все още нямате създадени въпросници.</p>
                ) : (
                    <QuestionnaireList
                        questionnaires={questionnaires}
                        selectQuestionnaireForEdit={selectQuestionnaireForEdit}
                        deleteQuestionnaire={handleDeleteQuestionnaire} // Use the correct function here
                    />
                )}
            </ul>
            {/* Questionnaire creation/edit form */}
            <QuestionnaireForm
                initialData={selectedQuestionnaire || {}}
                onSave={handleCreateQuestionnaire}
                onUpdate={handleUpdateQuestionnaire}
                onDelete={handleDeleteQuestionnaire}
            />
        </section>
    );
};

export default Questionnaires;
