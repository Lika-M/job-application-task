import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const EmployeeRegister = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', termsAccepted: false });

    const handleInputChange = (e) => {
        const { id, value, checked } = e.target;
        setFormData({ ...formData, [id]: id === 'termsAccepted' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Register as Employee</h2>
            <label htmlFor="firstName" className="block mb-2">First Name</label>
            <input type="text" id="firstName" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
            <label htmlFor="lastName" className="block mb-2">Last Name</label>
            <input type="text" id="lastName" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" id="email" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
            <label htmlFor="password" className="block mb-2">Password</label>
            <input type="password" id="password" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
            <div className="flex items-center mb-4">
                <input type="checkbox" id="termsAccepted" onChange={handleInputChange} className="mr-2" />
                <label htmlFor="termsAccepted" className="text-gray-600">I agree to the General Conditions and Privacy Notice.</label>
            </div>
            <button type="submit" className="w-full p-2 bg-[#004AAD] text-white rounded">Register</button>
        </form>
    );
};

export default EmployeeRegister;
