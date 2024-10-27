/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';


const CompanyJobItem = ({ job, onSelect, onDelete }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/company-dashboard/jobs/${job.id}`);
    };
  
    return (
        <div className="flex flex-col bg-white shadow rounded-lg p-3 hover:shadow-xl cursor-pointer"
            onClick={handleClick}
        >
            <div>
                <h3 className="text-xl font-bold text-blue-600">{job.position}</h3>
                <p className="text-gray-600">Technologies: <span className="font-semibold">{job.technologies}</span></p>
            </div>
            <div>
                <p className="text-blue-600 font-semibold mx-3">{job.isActive ? 'активна' : 'свалена'}</p>
            </div>
            {/* TODO: Add buttons for deleting and updating */}
        </div>

    );
}

export default CompanyJobItem;