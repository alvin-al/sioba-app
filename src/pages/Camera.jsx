import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Navbar from "../components/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";

const Camera = () => {
  const [imgSrc, setImgSrc] = useState(null);
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const screenshot = webcamRef.current.getScreenshot();
    setImgSrc(screenshot);
  }, []);

  const videoConstraints = {
    width: 1000,
    height: 1000,
    facingMode: "environment",
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleAnalyze = () => {
    navigate("/result", { state: { imgSrc } });
  };

  return (
    <div className='h-svh bg-white flex flex-col items-center'>
      <Navbar>
        <div className='flex w-full items-center'>
          <div className='w-fit flex items-center'>
            <button onClick={handleBack}>
              <IoMdArrowRoundBack size='1.4em' />
            </button>
          </div>
          <div className='w-full'>
            <p>Ambil Foto Obat Anda</p>
          </div>
          <div className='w-fit flex text-green-600 items-center'>
            <button>
              <IoMdArrowRoundBack size='1.4em' />
            </button>
          </div>
        </div>
      </Navbar>

      {!imgSrc ? (
        <>
          <div className='p-4 w-full flex flex-col items-center'>
            <Webcam
              audio={false}
              height='1000'
              screenshotFormat='image/jpeg'
              width='100%'
              videoConstraints={videoConstraints}
              ref={webcamRef}
              className='rounded-2xl'
            />
            <p className='text-gray-700 text-center text-sm mt-2'>
              Pastikan seluruh obat terlihat jelas dalam bingkai untuk hasil
              deteksi terbaik.
            </p>
            <button
              onClick={capture}
              className='border py-2 px-6 rounded-md font-medium mt-6 bg-green-600 text-white'
            >
              Ambil Foto
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='p-4 w-full flex flex-col items-center'>
            <img src={imgSrc} alt='Screenshot' className='w-full rounded-lg' />
            <div className='grid grid-cols-4 gap-4 w-full mt-6'>
              <button
                onClick={() => setImgSrc(null)}
                className='bg-red-600 text-white py-2 px-4 rounded-md col-span-1'
              >
                Ulangi
              </button>
              <button
                onClick={handleAnalyze}
                className='border py-2 px-6 rounded-md font-medium col-span-3 bg-green-600 text-white'
              >
                Analisa Gambar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Camera;
