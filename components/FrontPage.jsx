import React from "react";
import image from "./../src/assets/drug.png";
import { AiFillCamera } from "react-icons/ai";

const FrontPage = () => {
  return (
    <div className='h-dvh bg-white flex items-center flex-col'>
      <div className='text-2xl px-8 leading-tight font-medium text-center pt-16 text-gray-800'>
        Selamat Datang di Aplikasi Pengenalan Obat!
      </div>
      <div>
        <img src={image} />
      </div>
      <div>
        <p className='text-gray-700 text-center text-sm px-8'>
          Ambil foto obat untuk mendapatkan informasi nama, kegunaan, kandungan,
          efek samping, dan harga secara cepat. Mudah dan akurat, untuk membantu
          Anda memahami obat dengan lebih baik.
        </p>
      </div>
      <div>
        <button className=' flex gap-2 items-center bg-green-600 py-2 px-4 mt-12 rounded-md font-medium'>
          Ambil Foto Obat
          <span>
            <AiFillCamera size='1.4em' />
          </span>
        </button>
      </div>
    </div>
  );
};

export default FrontPage;
