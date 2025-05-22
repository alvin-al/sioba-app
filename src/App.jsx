import "./App.css";

function App({ children }) {
  return (
    <div className='w-full flex justify-center items-center h-dvh p-0'>
      <div className='w-screen lg:w-96 h-full'>{children}</div>
    </div>
  );
}

export default App;
