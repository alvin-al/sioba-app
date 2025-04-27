import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";

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

  const handleAnalyze = () => {
    navigate("/result", { state: { imgSrc } });
  };

  return (
    <div className='h-dvh bg-white flex justify-between items-center flex-col p-4'>
      {/* Tampilkan webcam jika tidak ada gambar */}
      {!imgSrc ? (
        <>
          <div className='h-full'>
            <p className='text-xl font-medium text-center text-gray-800 mb-4'>
              Ambil Foto Obat Anda
            </p>
            <Webcam
              audio={false}
              height='1000'
              screenshotFormat='image/jpeg'
              width='100%'
              videoConstraints={videoConstraints}
              ref={webcamRef}
            />
            <p className='text-gray-700 text-center text-sm mt-2'>
              Pastikan seluruh obat terlihat jelas dalam bingkai untuk hasil
              deteksi terbaik.
            </p>
          </div>
          <button
            onClick={capture}
            className='bg-green-600 py-2 px-4 mt-4 rounded-md font-medium w-full'
          >
            Ambil Foto
          </button>
        </>
      ) : (
        <>
          {" "}
          <div>
            <p className='text-xl font-medium text-center text-gray-800 mb-4'>
              Hasil foto
            </p>
            <img src={imgSrc} alt='Screenshot' className='w-full mt-4' />
          </div>
          <div className='w-full gap-2 flex'>
            <div className='w-1/4'>
              <button
                onClick={() => setImgSrc(null)}
                className=' bg-red-600 border py-2 px-4 rounded-md font-medium w-full'
              >
                Ulangi
              </button>
            </div>
            <div className='w-3/4'>
              <button
                className='border-green-600 text-green-600 border py-2 px-4 rounded-md font-medium w-full'
                onClick={handleAnalyze}
              >
                Analisa gambar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Camera;
