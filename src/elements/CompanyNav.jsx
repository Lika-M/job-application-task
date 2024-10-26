import { Link } from 'react-router-dom';

const CompanyNav = () => {
    return (
        <>
            <div className="flex flex-row justify-between items-center w-full">
                <ul className="flex flex-row justify-center items-center space-x-6">
                    <li><Link to="/home" className="hover:underline">Начало</Link></li>
                    <li><Link to='/company-dashboard/job-form' className='hover:underline'>Създаване на работни места</Link></li>
                    <li><Link to="/company-dashboard/questionnaires/create-questionnaire" className="hover:underline">Създаване на въпросници</Link></li>
                    <li><Link to="/contact" className="hover:underline">Моите активи </Link></li>
                    <li><Link to="/blog" className="hover:underline">CV библиотека</Link></li>
                    <li><Link to='/company-dashboard'>Профил</Link></li>
                </ul>
            </div>
        </>
    );
};

export default CompanyNav;
