import { useDispatch } from 'react-redux';

import useAuth from "../../hooks/useAuth";
import CompanyJobItem from "../../components/CompanyJobItem";
import { useDeleteJobMutation, useGetJobsQuery } from '../../features/jobs/jobsApiSlice';
import { setSelectedJob } from '../../features/jobs/jobsSlice';

const AllCompanyJobs = () => {
    const { userInfo } = useAuth();
    const companyId = userInfo.id;
    const dispatch = useDispatch();

    const { data: jobs = [] } = useGetJobsQuery(companyId, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const [deleteJob] = useDeleteJobMutation();

    const handleDeleteJob = async (jobId) => {
        try {
            await deleteJob(jobId).unwrap();
            dispatch(setSelectedJob(null));
        } catch (error) {
            console.error("Failed to delete job: ", error);
        }
    };

    const handleSelectJobForEdit = (job) => {
        dispatch(setSelectedJob(job));
        console.log("Selected job for edit:", job);
    };

    return (
        <section className="container mx-auto my-12 p-6 bg-white shadow-lg rounded-lg text-center">
            <h1 className="text-4xl font-bold mb-8">Информация за Компанията</h1>

            <h1 className="text-4xl font-bold mb-8">Всички обяви на компанията на Компанията</h1>

            <article className="container mx-auto py-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 py-8">
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <CompanyJobItem
                                key={job.id}
                                job={job}
                                onSelect={handleSelectJobForEdit}
                                onDelete={handleDeleteJob}
                            />
                        ))
                    ) : (
                        <p className="text-gray-600">Все още нямате създадени обяви.</p> 
                    )}
                </div>
                <div>
                    <a href="/company-dashboard" className="inline-block mt-6 px-8 py-4 bg-[#004AAD] text-white font-semibold rounded hover:bg-blue-700">Обратно в Профила</a>
                </div>
            </article>
        </section>
    );
};

export default AllCompanyJobs;
