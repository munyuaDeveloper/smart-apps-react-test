import "./App.css";
import { Link, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer />
      <div className="flex h-[100vh]">
        <div className="min-w-[200px] h-[100vh] bg-red-300">
          <div className="mt-[150px] w-full flex flex-col">
            <Link  className="w-full p-3 bg-cyan-100">All Users</Link>
          </div>
        </div>
        <div className="w-full min-h-full bg-cyan-50 pb-[50px] overflow-y-auto">
            <Outlet />
        </div>
         
      </div>
   
    </>
  );
}

export default App;
