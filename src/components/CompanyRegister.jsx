import { useState } from 'react';

import { validateRegistration } from '../utils/validation'; 

// eslint-disable-next-line react/prop-types
const CompanyRegister = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ companyName: '', vat: '', email: '', password: '', confirmPassword: '', termsAccepted: false });
  const [errors, setErrors] = useState({}); 

  const handleInputChange = (e) => {
    const { id, value, checked } = e.target;
    setFormData({ ...formData, [id]: id === 'termsAccepted' ? checked : value });
    setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateRegistration(formData);
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(validationErrors); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Register as Company</h2>

      <label htmlFor="companyName" className="block mb-2">Company Name</label>
      <input type="text" id="companyName" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
      {errors.companyName && <p className="text-red-500">{errors.companyName}</p>}

      <label htmlFor="vat" className="block mb-2">VAT Number</label>
      <input type="text" id="vat" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
      {errors.vat && <p className="text-red-500">{errors.vat}</p>}

      <label htmlFor="email" className="block mb-2">Email</label>
      <input type="email" id="email" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
      {errors.email && <p className="text-red-500">{errors.email}</p>}

      <label htmlFor="password" className="block mb-2">Password</label>
      <input type="password" id="password" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
      {errors.password && <p className="text-red-500">{errors.password}</p>}

      <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
      <input type="password" id="confirmPassword" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

      <div className="flex items-center mb-4">
        <input type="checkbox" id="termsAccepted" onChange={handleInputChange} className="mr-2" />
        <label htmlFor="termsAccepted" className="text-gray-600">I agree to the General Conditions and Privacy Notice.</label>
      </div>
      {errors.termsAccepted && <p className="text-red-500">{errors.termsAccepted}</p>}

      <button type="submit" className="w-full p-2 bg-[#004AAD] text-white rounded">Register</button>
    </form>
  );
};

export default CompanyRegister;
