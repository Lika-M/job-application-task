/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';

const CompanyJobItem = ({ job, onSelect, onDelete }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/company-dashboard/jobs/${job.id}`);
    };
    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    return (
        <div className="flex flex-col bg-white shadow rounded-lg p-3 hover:shadow-xl cursor-pointer"
            onClick={handleClick}
        >
            <div>
                <h3 className="text-xl font-bold text-blue-600">{job.position}</h3>
                <p className="text-gray-600">Technologies: <span className="font-semibold">{job.technologies}</span></p>
            </div>
            <div className="text-gray-500">{formatDate(job.createdAt)}</div>
            {/* TODO: Add buttons for deleting and updating */}
        </div>

    );
}

export default CompanyJobItem;