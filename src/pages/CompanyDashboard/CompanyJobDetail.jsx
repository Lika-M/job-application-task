import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import useAuth from "../../hooks/useAuth";
import { useGetJobsQuery } from '../../features/jobs/jobsApiSlice.jsx'

const CompanyJobDetail = () => {
    const { id } = useParams();
    const { userInfo } = useAuth();
    const companyId = userInfo?.id;

    const { data: jobs = [] } = useGetJobsQuery(companyId);

    if (jobs.length === 0) {
        return (<p className="text-center mt-10">Няма налични обяви.</p>);
    }

    const job = jobs.find(job => job.id === Number(id));

    if (!job) {
        return <p className="text-center mt-10">Обявата не беше намерена.</p>;
    }

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    const splitDescription = (description) => {
        const words = description.split(" ");
        const firstPart = words.slice(0, 8).join(" ");
        const secondPart = words.slice(8).join(" ");
        return { firstPart, secondPart };
    };

    const { firstPart, secondPart } = splitDescription(job.description);

    //TODO: logic for add a questionnaire

    return (
        <section className="container mx-auto">
            <article className="my-12 mx-12 p-6 bg-white shadow-lg rounded-lg">

                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-blue-600">{job.position}</h2>
                </div>
                <p className="text-gray-500 mb-4">{formatDate(job.createdAt)} г.</p>

                <h3 className="text-lg font-bold text-gray-700 mb-2">ИЗИСКВАНИ ТЕХНОЛОГИИ</h3>
                <div className="flex space-x-2 mb-4">{job.technologies}</div>

                <p className="text-lg font-bold mb-2">{firstPart}</p>
                <p className="text-gray-700 mb-4">... {secondPart}</p>

                <h4 className="text-md font-bold text-gray-700">Required experience:</h4>
                <ul className="list-disc pl-5 text-gray-700">
                    {job.requirements.map((r, index) =>
                        <li key={index}>{r.text}</li>
                    )}
                </ul>
                <div className="flex justify-center py-12 space-x-4">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                        Добави въпросник
                    </button>
                </div>
            </article>
            <article className="text-center">
                <Link to="/company-dashboard/all-jobs" className="inline-block px-8 py-4 bg-[#004AAD] text-white font-semibold rounded hover:bg-blue-700">
                    Към Моите обяви
                </Link>
            </article>
        </section>
    );
}
export default CompanyJobDetail;