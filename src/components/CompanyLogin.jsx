/* eslint-disable react/prop-types */
import { useState } from 'react';
import { validateLoginForm } from '../utils/validation';

const CompanyLogin = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({}); 

  const handleInputChange = (e) => {
    const { id } = e.target;
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData); 
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
    } else {
      setErrors({});
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Login as Company</h2>
      <label htmlFor="email" className="block mb-2">Email</label>
      <input type="email" id="email" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
      {errors.email && <p className="text-red-500">{errors.email}</p>} {/* Показване на грешката */}

      <label htmlFor="password" className="block mb-2">Password</label>
      <input type="password" id="password" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
      {errors.password && <p className="text-red-500">{errors.password}</p>} {/* Показване на грешката */}

      <button type="submit" className="w-full p-2 bg-[#004AAD] text-white rounded">Login</button>
    </form>
  );
};

export default CompanyLogin;
