import React from "react";
import image from "./../assets/drug.png";
import { AiFillCamera } from "react-icons/ai";
import Button from "../components/button";
import { LuUpload } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const FrontPage = () => {
  const navigate = useNavigate();
  const handleAnalyze = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      navigate("/result", { state: { imgSrc: base64 } });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='h-dvh bg-white flex items-center flex-col'>
      <div className='text-2xl px-8 leading-tight font-medium text-center pt-16 text-gray-800'>
        Selamat Datang di <br />
        SIOBA - Sistem Pengenalan Obat
      </div>
      <div>
        <img src={image} />
      </div>
      <div>
        <p className='text-gray-700 text-center text-sm px-8'>
          Ambil foto obat atau unggah foto untuk mendapatkan informasi nama,
          kegunaan, kandungan, efek samping, dan harga secara cepat. Mudah dan
          akurat, untuk membantu Anda memahami obat dengan lebih baik.
        </p>
      </div>
      <div className='flex flex-col items-center pt-16 gap-4'>
        <Button
          className='bg-green-600 text-white'
          icon={<AiFillCamera size='1.4em' />}
          link='camera'
        >
          Ambil Foto Obat
        </Button>
        <label className='border-green-600 border text-green-600 px-4 py-2 rounded-md font-medium flex gap-2 items-center cursor-pointer'>
          <span>Upload Foto</span> <LuUpload size='1.3em' />
          <input
            type='file'
            onChange={handleAnalyze}
            className='hidden'
            accept='image/*'
          />
        </label>
      </div>
    </div>
  );
};

export default FrontPage;
