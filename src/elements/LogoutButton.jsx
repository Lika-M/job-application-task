import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetAuth } from '../features/auth/authSlice'; 

const LogoutButton = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      dispatch(resetAuth()); 
      navigate('/login'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="ml-2">
      Logout
    </button>
  );
};

export default LogoutButton;
