import { useState, useEffect } from 'react';
import { useLoginEmployeeMutation, useLoginCompanyMutation, useRegisterEmployeeMutation, useRegisterCompanyMutation } from '../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import EmployeeLogin from '../components/EmployeeLogin';
import EmployeeRegister from '../components/EmployeeRegister';
import CompanyLogin from '../components/CompanyLogin';
import CompanyRegister from '../components/CompanyRegister';
import useAuth from '../hooks/useAuth';

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, userType } = useAuth();
  const [mode, setMode] = useState('login');
  const [userRole, setUserRole] = useState('employee');
  const [error, setError] = useState('');

  const [loginEmployee] = useLoginEmployeeMutation();
  const [loginCompany] = useLoginCompanyMutation();
  const [registerEmployee] = useRegisterEmployeeMutation();
  const [registerCompany] = useRegisterCompanyMutation();

  const handleFormSubmit = async (formData) => {
    setError('');
    const { confirmPassword, ...dataToSubmit } = formData;
// TODO: Add validation
    try {
      let result;
      if (mode === 'login') {
        if (userRole === 'employee') {
          dataToSubmit['user_type'] = 'employee';
          result = await loginEmployee(dataToSubmit).unwrap();
        } else {
          dataToSubmit['user_type'] = 'company';
          result = await loginCompany(dataToSubmit).unwrap();
        }

        if (Array.isArray(result) && result.length === 0) {
          setError('Invalid email or password.');
          return; 
        }
        
        dispatch(setAuthData({
          userInfo: result[0],
        }));

      } else {
        if (dataToSubmit.password !== confirmPassword) {
          setError('Passwords do not match!');
          return;
        }

        if (!dataToSubmit.termsAccepted) {
          setError('You must accept the terms to register.');
          return;
        }

        if (userRole === 'employee') {
          dataToSubmit['user_type'] = 'employee'
          result = await registerEmployee(dataToSubmit).unwrap();
        } else {
          dataToSubmit['user_type'] = 'company'
          result = await registerCompany(dataToSubmit).unwrap();
        }

        if (Array.isArray(result) && result.length === 0) {
          setError('Invalid email or password.');
          return; 
        }

        dispatch(setAuthData({
          userInfo: result,
        }));
      }

    } catch (err) {
      console.error('Error during authentication:', err);
      setError(err.data?.message || 'An error occurred during authentication.');
    }
  };

  //routes based on userType
  useEffect(() => {
    if (userInfo) {
      if (userType === 'employee') {
        navigate('/employee-dashboard');
      } else if (userType === 'company') {
        navigate('/company-dashboard');
      }
    }
  }, [userInfo, userType, navigate]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <button onClick={() => setMode('login')} className={`px-4 py-2 ${mode === 'login' ? 'bg-[#004AAD] text-white' : 'bg-gray-200 text-[#004AAD]'} rounded-l`}>
          Login
        </button>
        <button onClick={() => setMode('register')} className={`px-4 py-2 ${mode === 'register' ? 'bg-[#004AAD] text-white' : 'bg-gray-200 text-[#004AAD]'} rounded-r`}>
          Register
        </button>
      </div>
      <div className="flex justify-center mb-6">
        <button onClick={() => setUserRole('employee')} className={`px-4 py-2 ${userRole === 'employee' ? 'bg-[#004AAD] text-white' : 'bg-gray-200 text-[#004AAD]'} rounded-l`}>
          Employee
        </button>
        <button onClick={() => setUserRole('company')} className={`px-4 py-2 ${userRole === 'company' ? 'bg-[#004AAD] text-white' : 'bg-gray-200 text-[#004AAD]'} rounded-r`}>
          Company
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1 text-center">{error}</p>}
      {mode === 'login' && userRole === 'employee' && <EmployeeLogin onSubmit={handleFormSubmit} />}
      {mode === 'register' && userRole === 'employee' && <EmployeeRegister onSubmit={handleFormSubmit} />}
      {mode === 'login' && userRole === 'company' && <CompanyLogin onSubmit={handleFormSubmit} />}
      {mode === 'register' && userRole === 'company' && <CompanyRegister onSubmit={handleFormSubmit} />}
    </div>
  );
};



export default AuthPage;
