import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const CompanyLogin = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Login as Company</h2>
      <label htmlFor="email" className="block mb-2">Email</label>
      <input type="email" id="email" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
      <label htmlFor="password" className="block mb-2">Password</label>
      <input type="password" id="password" onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded mb-4" required />
      <button type="submit" className="w-full p-2 bg-[#004AAD] text-white rounded">Login</button>
    </form>
  );
};

export default CompanyLogin;
