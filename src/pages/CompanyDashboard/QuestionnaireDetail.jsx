import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { useGetQuestionnairesQuery } from '../../features/questionnaires/questionnaireApi';

const QuestionnaireDetail = () => {
    const { id } = useParams();
    const { userInfo } = useAuth();
    const companyId = userInfo?.id;

    const { data: questionnaires = [] } = useGetQuestionnairesQuery(companyId);

    if (questionnaires.length === 0) {
        return <p className="text-center mt-10">Няма налични въпросници.</p>;
    }

    const questionnaire = questionnaires.find(q => q.id === Number(id));

    if (!questionnaire) {
        return <p className="text-center mt-10">Въпросникът не беше намерен.</p>;
    }

    const handleEditQuestion = (questionId) => {
        console.log(`Update question ${questionId + 1}`);
    };

    const handleDeleteQuestion = (questionId) => {
        console.log(`Delete question ${questionId + 1}`);
    };

    return (
        <section className="container mx-auto">
            <article className="my-12 p-6 bg-white shadow-lg rounded-lg text-center">
                <h3 className="text-2xl font-bold mb-4">
                    Въпросник {questionnaire.id} / Категория: {questionnaire.category}
                </h3>
                <p className="text-lg mb-6">Позиция: <span className="text-xl font-bold text-blue-600">{questionnaire.position}</span></p>

                <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-4">Въпроси</h4>
                    <ul className="space-y-4">
                        {questionnaire.questions.map((question, index) => (
                            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
                                <p className="mb-4 text-left" ><span>{index + 1}. </span>{question.text}</p>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        onClick={() => handleEditQuestion(index)}
                                        className="px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                                    >
                                        Редактирай
                                    </button>
                                    <button
                                        onClick={() => handleDeleteQuestion(index)}
                                        className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                                    >
                                        Изтрий
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </article>

            <article className="text-center">
                <Link to="/company-dashboard/questionnaires" className="inline-block px-8 py-4 bg-[#004AAD] text-white font-semibold rounded hover:bg-blue-700">
                    Към Моите въпросници
                </Link>
            </article>
        </section>
    );
};

export default QuestionnaireDetail;
