import { Link } from "react-router-dom";
import logo from "../Navbar/logo3.png";

export default function AdminOnly() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <img className="h-48 w-48 mx-auto" src={logo} alt="i-novotek logo" />
        <p className="text-4xl font-bold text-gray-800 ">
          Operation Not Allowed
        </p>
        <p className="text-xl font-semibold text-gray-600">Admin Only</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center text-indigo-600 hover:text-indigo-500"
        >
          Go Home
          <svg
            className="w-6 h-6 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
