import FrontPage from "./pages/FrontPage";
import "./App.css";
import Camera from "./pages/Camera";

function App({ children }) {
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-screen lg:w-96 '>{children}</div>
    </div>
  );
}

export default App;
