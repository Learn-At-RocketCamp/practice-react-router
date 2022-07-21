import { Link, Outlet } from 'react-router-dom';

import UserStatus from '../components/UserStatus.jsx';

// const Layout = () => {
function Layout() {
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
}

export default Layout;
