/* eslint-disable react/prop-types */
import { useState } from 'react';
import useAuth from "../hooks/useAuth";

const JobForm = ({ initialData, onSave, onUpdate }) => {
    const [category, setCategory] = useState(initialData.category || '');
    const [position, setPosition] = useState(initialData.position || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [technologies, setTechnologies] = useState(initialData.technologies || '');
    const [requirements, setRequirements] = useState(initialData.requirements || [{ text: '' }]);
    const [isActive, setIsActive] = useState(initialData.isActive || true); 
    const { userInfo } = useAuth();
    const companyId = userInfo?.id;

    const handleChangeRequirement = (index, value) => {
        const newRequirements = [...requirements];
        newRequirements[index].text = value;
        setRequirements(newRequirements);
    };

    const handleAddRequirement = () => {
        setRequirements([...requirements, { text: '' }]);
    };

    const removeRequirement = (index) => {
        const newRequirements = [...requirements];
        newRequirements.splice(index, 1);
        setRequirements(newRequirements);
    };

    const handleSave = () => {
        const job = {
            createdAt: new Date().toISOString(),
            companyId,
            category,
            position,
            description,
            technologies,
            requirements,
            isActive 
        };

        if (initialData.id) {
            onUpdate(job);
        } else {
            onSave(job);
        }

        setPosition('');
        setCategory('');
        setDescription('');
        setTechnologies('');
        setRequirements([]);
        setIsActive(true); 
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Създай Обява</h1>
            <form className="space-y-4">
                <div>
                    <div className="flex items-center justify-center">
                        <label className="mr-4">
                            <input
                                className="mr-2"
                                type="radio"
                                name="isActive"
                                value={true}
                                checked={isActive === true}
                                onChange={() => setIsActive(true)}
                            />Активна
                        </label>
                        <label>
                            <input
                                className="mr-2"
                                type="radio"
                                name="isActive"
                                value={false}
                                checked={isActive === false}
                                onChange={() => setIsActive(false)}
                            />Неактивна
                        </label>
                    </div>
                </div>
                <div>
                    <label htmlFor="category" className="font-medium text-gray-700">Изберете категория:</label>
                    <select 
                    id="category" 
                    name="category" 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    required 
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value=""></option>
                        <option value="backend">Backend Development</option>
                        <option value="frontend">Frontend Development</option>
                        <option value="fullStack">Full Stack Development</option>
                        <option value="infrastructure">Infrastructure</option>
                        <option value="dataScience">Data Science</option>
                        <option value="quality Assurance">Quality Assurance</option>
                        <option value="management">IT Management</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="position" className="font-medium text-gray-700">Наименование на позицията:</label>
                    <input 
                    type="text" 
                    id="position" 
                    name="position" 
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    required 
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label htmlFor="technologies" className="font-medium text-gray-700">Технологии:</label>
                    <input 
                    type="text" 
                    id="technologies" 
                    name="technologies" 
                    value={technologies}
                    onChange={(e) => setTechnologies(e.target.value)}
                    required 
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label htmlFor="description" className="font-medium text-gray-700">Описание на ролята:</label>
                    <textarea 
                    id="description" 
                    name="description" 
                    rows="4" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required 
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <div className="mb-6">
                    <h3 className="font-medium text-gray-700">Изисквания към кандидата:</h3>
                    {requirements.map((requirement, index) => (
                        <div key={index} className="mb-3 flex items-center">
                            <input
                                type="text"
                                value={requirement.text}
                                onChange={(e) => handleChangeRequirement(index, e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                            />
                            <button
                                type="button"
                                onClick={() => removeRequirement(index)}
                                className="ml-2 text-white bg-[#004AAD] text-sm hover:bg-blue-700 p-2 rounded-md shadow-sm"
                            >
                                Изтрий
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddRequirement}
                        className="text-white bg-[#004AAD] hover:bg-blue-700 px-4 py-2 rounded-md shadow-sm"
                    > Добави ред
                    </button>
                </div>
                <button onClick={handleSave} type="button" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Създай Обява</button>
            </form>
        </div>
    );
}

export default JobForm;
