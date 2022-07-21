import { useNavigate } from 'react-router-dom';

import { useAuth } from '../components/useAuth';

function PageLogin() {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  return (
    <>
      <h2>PageLogin</h2>
      <p>
        {token ? (
          // IF (token)
          // 'true'
          <button
            type="button"
            className="my-6 rounded bg-[#333] px-4 py-2 text-white transition-all hover:bg-gray-200"
            onClick={() => {
              console.log('DASHBOARD');
            }}
          >
            DASHBOARD
          </button>
        ) : (
          // IF (!token)
          <button
            type="button"
            className="my-6 rounded bg-[#333] px-4 py-2 text-white transition-all hover:bg-gray-200"
            // className="rounded-md bg-sky-500 py-1 px-3 text-white  hover:bg-sky-700"
            onClick={() => {
              /**
               * #TODO:
               * 1. `onLogin()`
               * 2. if (res.ok)
               */

              const TOKEN = '1234';
              // const TOKEN =
              //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyMTE5Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjU4MzAxMjgxLCJleHAiOjE2NTk1OTcyODEsImp0aSI6ImZlYjU2MjRhLTE1MTktNDA4Yy05ZWU5LWYzMTNiMWQ2YjYwMSJ9.GQUH3i5b52_wloCZGsbBxz8N3JsQu9FYgdo368QZF1Y';

              localStorage.setItem('token', TOKEN);
              setToken(TOKEN);

              navigate('/protected');
            }}
          >
            LOG-IN
          </button>
        )}
      </p>
    </>
  );
}

export default PageLogin;
