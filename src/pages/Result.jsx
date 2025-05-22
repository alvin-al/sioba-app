import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Base64 from "base64-js";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import MarkdownIt from "markdown-it";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { IoMdArrowRoundBack } from "react-icons/io";

const Result = () => {
  const location = useLocation();
  const { imgSrc } = location.state || {};
  const [output, setOutput] = useState("Sedang menganalisa...");
  const API_KEY = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const defaultPrompt =
    "Tolong analisa gambar tersebut. Jika bukan obat, maka keluarkan bukan obat. Jika obat, maka sebutkan hal berikut tanpa deskripsi: Nama obat, kegunaan obat (berikan list saja), kandungan (berikan list saja), Efek samping (berikan list saja), Bentuk Obat ,Rentang Harga (harus diberikan meskipun perkiraan). Berikan warning bahwa perlu pengawasan dokter untuk penggunaan lebih lanjut (1 paragraf saja. jangan terlalu panjang)";

  useEffect(() => {
    if (imgSrc) {
      const generateContent = async () => {
        try {
          // Convert image to Base64
          let imageBase64 = await fetch(imgSrc)
            .then((r) => r.arrayBuffer())
            .then((a) => Base64.fromByteArray(new Uint8Array(a)));

          // Create prompt with image
          let contents = [
            {
              role: "user",
              parts: [
                { inline_data: { mime_type: "image/jpeg", data: imageBase64 } },
                { text: defaultPrompt },
              ],
            },
          ];

          // Set up Gemini API
          const genAI = new GoogleGenerativeAI(API_KEY);
          const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            safetySettings: [
              {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
              },
            ],
          });

          // Get response stream
          const result = await model.generateContentStream({ contents });

          // Show results as they come in
          let buffer = [];
          let md = new MarkdownIt();
          for await (let response of result.stream) {
            buffer.push(response.text());
            setOutput(md.render(buffer.join("")));
          }
        } catch (e) {
          setOutput("<hr>" + e);
        }
      };

      generateContent();
    }
  }, [imgSrc, API_KEY, defaultPrompt]);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-screen bg-white flex items-center flex-col '>
      {" "}
      <Navbar>
        <div className='flex w-full items-center'>
          <div className='w-fit flex items-center'>
            <button onClick={handleBack}>
              <IoMdArrowRoundBack size='1.4em' />
            </button>
          </div>
          <div className='w-full'>
            <p>Hasil Analisa</p>
          </div>
          <div className='w-fit  text-green-600 items-center'>
            <button>
              <IoMdArrowRoundBack size='1.4em' />
            </button>
          </div>
        </div>
      </Navbar>
      {imgSrc && (
        <>
          <div className='overflow-hidden w-full mb-8 h-96 object-center'>
            <div className=''>
              <img
                src={imgSrc}
                alt='Analyzed content'
                className='w-full object-fill justify-center'
              />
            </div>
          </div>
          <div className='p-4  items-center flex flex-col w-full'>
            <div
              dangerouslySetInnerHTML={{ __html: output }}
              className='text-gray-700 output border border-gray-300 px-8 py-6 rounded-xl w-full'
            />
            <div className='w-fit'>
              <a href='/camera'>
                <button className='bg-red-600 border py-2 px-4 rounded-md font-medium w-full mt-8'>
                  Coba obat lain
                </button>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Result;
