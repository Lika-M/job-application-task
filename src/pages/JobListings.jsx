import { useEffect, useState } from 'react';
import { useGetAllJobsQuery } from '../features/jobs/jobsApiSlice.jsx';

const JobListings = () => {
    const { data: jobs = [], refetch } = useGetAllJobsQuery({
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    const [filters, setFilters] = useState({
        workType: [],
        experienceLevel: [],
        technologies: ''
    });

    const [filteredJobs, setFilteredJobs] = useState([]);
   
    const activeJobs = jobs.filter(job => job.isActive);

    useEffect(() => {
        if (activeJobs.length > 0) {
            setFilteredJobs(activeJobs);
        }
    }, []);


    const handleFilterChange = (type, value) => {
        setFilters(prev => {
            const newFilters = { ...prev };
    
            if (type === 'workType') {
                newFilters.workType = newFilters.workType.includes(value)
                    ? newFilters.workType.filter(wt => wt !== value)
                    : [...newFilters.workType, value];
            } else if (type === 'experienceLevel') {
                newFilters.experienceLevel = newFilters.experienceLevel.includes(value)
                    ? newFilters.experienceLevel.filter(el => el !== value)
                    : [...newFilters.experienceLevel, value];
            } else if (type === 'technologies') {
                newFilters.technologies = value;
            }
    
            return newFilters;
        });
    };

    const applyFilters = () => {
        let filtered = activeJobs;

        if (filters.workType.length > 0) {
            filtered = filtered.filter(job =>
                filters.workType.includes(job.workType)
            );
        }

        if (filters.experienceLevel.length > 0) {
            filtered = filtered.filter(job =>
                filters.experienceLevel.includes(job.experienceLevel)
            );
        }

        if (filters.technologies) {
            filtered = filtered.filter(job =>
                job.technologies.toLowerCase().includes(filters.technologies.toLowerCase())
            );
        }
        console.log(filtered)
        setFilteredJobs(filtered); 
    };

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }

    return (
        <main className="container mx-auto py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Filter Section */}
                <div className="bg-white p-6 shadow rounded-lg">
                    <h2 className="text-xl font-bold text-[#00b4d8] mb-4">Персонализирай търсенето</h2>

                    {/* Way to Work Filter */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-blue-1000">Начин на работа</h3>
                        <div className="space-y-2 mt-2">
                            {['remote', 'hybrid', 'onsite'].map((type) => (
                                <div key={type}>
                                    <input
                                        type="checkbox"
                                        id={type}
                                        className="mr-2"
                                        onChange={() => handleFilterChange('workType', type)}
                                    />
                                    <label htmlFor={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience Level Filter */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-blue-1000">Ниво на опит</h3>
                        <div className="space-y-2 mt-2">
                            {['junior', 'mid', 'senior', 'lead'].map((level) => (
                                <div key={level}>
                                    <input
                                        type="checkbox"
                                        id={level}
                                        className="mr-2"
                                        onChange={() => handleFilterChange('experienceLevel', level)}
                                    />
                                    <label htmlFor={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technologies Filter */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-blue-1000">Технологии</h3>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Напишете технологии..."
                            onChange={(e) => handleFilterChange('technologies', e.target.value)}
                        />
                    </div>

                    {/* Filter Button */}
                    <button
                        id="filter-btn"
                        className="w-full bg-blue-950 text-white py-2 rounded hover:bg-[#00b4d8]"
                        onClick={applyFilters}  
                    >
                        Приложи филтрите
                    </button>
                </div>

                {/* Job Listings Section */}
                <div className="col-span-3 space-y-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 shadow rounded-lg flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-xl font-bold text-blue-600">{job.position}</h3>
                                <p className="text-gray-600">Technologies: <span className="font-semibold">{job.technologies}</span></p>
                            </div>
                            <div className="text-gray-500">{formatDate(job.createdAt)}</div>
                            <div className="text-gray-500">{job.experienceLevel}</div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-center mt-10">Няма налични обяви за тези филтри.</div>
                )}
                </div>
            </div>
        </main>
    );
};

export default JobListings;
