import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import {
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import logo from './logo.svg';
import poweredBy from './powered-by-vitawind-dark.png';

const UserContext = createContext(null);
// null => { token, setToken }

const useAuth = () => {
  return useContext(UserContext);
  // custom hooks
};

const UserStatus = () => {
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
          localStorage.removeItem('token');

          navigate('/');
        }}
      >
        LOG-OUT
      </button>
    </>
  );
};

const Layout = () => {
  return (
    <>
      <UserStatus />

      <hr className="h-2 bg-gray-300" />
      <nav className="text-sky-600">
        <li>
          <Link to="/">[Public]_PageHome</Link>
        </li>
        <li>{/* <Link to="/login">LOGIN</Link> */}</li>
        <li>
          <Link to="/protected">[Protected]_PageTodos</Link>
        </li>
      </nav>
      <hr className="h-2 bg-gray-300" />

      <Outlet />
    </>
  );
};

const PageLogin = () => {
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
              const TOKEN =
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTM2Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjU3Njk1NDc1LCJleHAiOjE2NTg5OTE0NzUsImp0aSI6ImFjMTE5MmM3LTA4NzMtNDQyMC05MjdlLTVkMzFiMzdlYjJlYSJ9.dZr_xp21nXTRNrTc-TPGaPM4-79mhOV4TKowYmFWXmg';
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
};
const PageHome = () => {
  return (
    <main>
      <h2>Welcome to the Homepage!</h2>
      <PageLogin />
    </main>
  );
};

const PageProtected = () => {
  const { token } = useAuth();

  return (
    <main className="container mx-auto p-2">
      <h2 className="bg-orange-300">! This is PageProtected !</h2>
      <p className="text-xl text-yellow-600">TODOLIST</p>

      <pre>{JSON.stringify(token, null, 2)}</pre>
    </main>
  );
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  // const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  // Step-0
  const [token, setToken] = useState(null);

  const getLocalToken = () => {
    // const localToken = localStorage.getItem('token');
    // console.log('hasToken-localToken:::', localToken);
    // return localToken ? true : false;
    return localStorage.getItem('token');
  };

  const apiTestCheck = (localToken = '') => {
    console.log('#TODO-API: fetch()');
    /**
     * #TODO:
     * if (res.ok)
     */
    setToken(localToken);
    navigate('/protected');
    // return <Navigate to="/protected" replace />;
    // IF(!) navigate('/');
  };

  useEffect(() => {
    console.log('getLocalToken::', getLocalToken());

    if (getLocalToken()) {
      console.log('#TODO: API-TestCheck()');
      apiTestCheck(getLocalToken());
    }

    return () => {
      console.log('#TODO: return clear');
    };
  }, []);

  return (
    <div className="text-center selection:bg-green-900">
      {/* 1 */}
      <UserContext.Provider value={{ token, setToken }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PageHome />} />
            <Route path="/login" element={<PageLogin />} />

            {/* <Route path="protected" element={<PageProtected />} /> */}
            <Route
              path="protected"
              element={
                <ProtectedRoute>
                  <PageProtected />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </UserContext.Provider>

      <header className="flex min-h-screen flex-col items-center justify-center bg-[#282c34] text-white">
        <img
          src={logo}
          className="animate-speed h-60 motion-safe:animate-spin"
          alt="logo"
        />
        <style>
          {
            '\
            .animate-speed{\
              animation-duration:20s;\
            }\
          '
          }
        </style>

        <p className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent">
          Vite + React + Tailwindcss v3
        </p>

        <p className="mt-3">
          <button
            type="button"
            className="my-6 rounded bg-gray-300 px-2 py-2 text-[#282C34] transition-all hover:bg-gray-200"
            onClick={() => setCount((count) => count + 1)}
          >
            count is: {count}
          </button>
        </p>

        <p>
          Edit <code className="text-[#8d96a7]">App.jsx</code> and save to test
          HMR updates.
        </p>

        <p className="mt-3 flex gap-3 text-center text-[#8d96a7]">
          <a
            className="text-[#61dafb] transition-all hover:text-blue-400"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}

          <a
            className="text-[#61dafb] transition-all hover:text-blue-400"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>

        <img src={poweredBy} className="mx-auto my-8" alt="powered-by" />
      </header>
    </div>
  );
}

export default App;
