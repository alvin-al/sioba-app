import "./App.css";

function App({ children }) {
  return (
    <div className='w-full flex justify-center items-center'>
      <div className='w-screen lg:w-96 '>{children}</div>
    </div>
  );
}

export default App;
