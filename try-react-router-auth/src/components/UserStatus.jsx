import { useNavigate } from 'react-router-dom';

import { useAuth } from './useAuth';

// const UserStatus = () => {
function UserStatus() {
  const { token, setToken } = useAuth();
  // 大家共用 app
  const navigate = useNavigate();

  if (!token) {
    return <p className="text-orange-500">!Not Allow!</p>;
  }

  return (
    <>
      <p>Welcome!</p>

      <button
        type="button"
        className="rounded-md bg-sky-500 py-1 px-3 text-white  hover:bg-sky-700"
        onClick={() => {
          setToken(false);
          // localStorage.removeItem('token');
          localStorage.clear();

          navigate('/');
        }}
      >
        LOG-OUT
      </button>
    </>
  );
}

export default UserStatus;
