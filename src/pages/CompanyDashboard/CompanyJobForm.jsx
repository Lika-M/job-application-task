import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useAddJobMutation, useUpdateJobMutation } from '../../features/jobs/jobsApiSlice';
import { selectSelectedJob } from '../../features/jobs/jobsSlice';
import JobForm from "../../components/JobForm";

const CompanyJobForm = () => {
    const navigate = useNavigate();
    const selectedJob = useSelector(selectSelectedJob);

    // Initialize mutations
    const [addJob] = useAddJobMutation();
    const [updateJob] = useUpdateJobMutation();

    // Create job
    const handleCreateJob = async (newJob) => {
        try {
            await addJob(newJob).unwrap();
            console.log('job created!')
        } catch (error) {
            console.error("Failed to create job: ", error);
        }
        navigate('/company-dashboard/all-jobs');
    };

    // Update job
    const handleUpdateJob = async (updatedJob) => {
        try {
            await updateJob(updatedJob).unwrap();
        } catch (error) {
            console.error("Failed to update job: ", error);
        }
        navigate('/company-dashboard/all-jobs');
    };

    return (
        <section className="container mx-auto my-12 p-6 text-center">
            <JobForm
                initialData={selectedJob || {}}
                onSave={handleCreateJob}
                onUpdate={handleUpdateJob}
            />
        </section>
    );
}

export default CompanyJobForm;
