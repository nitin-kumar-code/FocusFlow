   import { Link } from 'react-router-dom';
   import { NavLink } from 'react-router-dom';
   
   export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20 w-screen">
      <div className="flex items-center justify-between max-w-7xl mx-auto h-14 px-0">
        <a className="flex items-center flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
          </svg>
          <span className="ml-2 text-lg font-semibold text-gray-800">FocusFlow</span>
        </a>
        <nav className="flex gap-8 space-x-10 text-gray-600">
  <NavLink
    to="/dashboard"
    className={({ isActive }) =>
      `transition-colors ${
        isActive
          ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
          : "hover:text-gray-900"
      }`
    }
  >
    Dashboard
  </NavLink>

  <NavLink
    to="/tasks"
    className={({ isActive }) =>
      `transition-colors ${
        isActive
          ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
          : "hover:text-gray-900"
      }`
    }
  >
    Tasks
  </NavLink>

  <NavLink
    to="/notes"
    className={({ isActive }) =>
      `transition-colors ${
        isActive
          ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
          : "hover:text-gray-900"
      }`
    }
  >
    Notes
  </NavLink>

  <NavLink
    to="/settings"
    className={({ isActive }) =>
      `transition-colors ${
        isActive
          ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
          : "hover:text-gray-900"
      }`
    }
  >
    Settings
  </NavLink>
          </nav>
        <div className="flex-shrink-0">
          <Link 
          to="/login"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors">
            Login
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>
        </div>
    </header>
  );
}








