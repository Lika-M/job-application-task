import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import QuestionnaireList from "../../components/QuestionnaireList.jsx";
import { useGetQuestionnairesQuery, useDeleteQuestionnaireMutation } from '../../features/questionnaires/questionnaireApi';
import { setSelectedQuestionnaire } from '../../features/questionnaires/questionnaireSlice';
import useAuth from "../../hooks/useAuth";

const Questionnaires = () => {
    const { userInfo, userType } = useAuth();
    const dispatch = useDispatch();

    const companyId = userType === 'company' ? userInfo.id : null;

    // Fetch questionnaires from RTK Query
    const { data: questionnaires = [] } = useGetQuestionnairesQuery(companyId, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const [deleteQuestionnaire] = useDeleteQuestionnaireMutation();

    const handleDeleteQuestionnaire = async (id) => {
        try {
            await deleteQuestionnaire(id).unwrap();
            dispatch(setSelectedQuestionnaire(null));
        } catch (error) {
            console.error("Failed to delete questionnaire: ", error);
        }
    };

    // Select questionnaire for editing
    const selectQuestionnaireForEdit = (questionnaire) => {
        dispatch(setSelectedQuestionnaire(questionnaire));
    };

    return (
        <section className="container mx-auto my-12 p-6 bg-white shadow-lg rounded-lg text-center">
            <h1 className="text-4xl font-bold mb-8">Моите Въпросници</h1>
            <p className="mb-4">Това е мястото, където можете да управлявате вашите активни въпросници за работа.</p>
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
            {/* Back Button */}
            <Link to="/company-dashboard" className="inline-block px-8 py-4 bg-[#004AAD] text-white font-semibold rounded hover:bg-blue-700">
                Обратно в Профила
            </Link>
        </section>
    );
};

export default Questionnaires;
