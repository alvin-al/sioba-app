import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Base64 from "base64-js";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import MarkdownIt from "markdown-it";

const Result = () => {
  const location = useLocation();
  const { imgSrc } = location.state || {};
  const [output, setOutput] = useState("Sedang menganalisa...");
  const API_KEY = import.meta.env.VITE_API_KEY;
  const defaultPrompt =
    "Tolong analisa gambar tersebut. Jika bukan obat, maka keluarkan bukan obat. Jika obat, maka sebutkan hal berikut: Nama obat, kegunaan obat (berikan list saja),Kandungan (berikan list saja), Efek samping (berikan list saja), Bentuk Obat ,Rentang Harga (harus diberikan meskipun perkiraan). Berikan warning bahwa perlu pengawasan dokter untuk penggunaan lebih lanjut (1 paragraf saja. jangan terlalu panjang)";

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
  }, [imgSrc]);

  return (
    <div className='min-h-dvh bg-white flex  items-center flex-col p-4'>
      {imgSrc && (
        <>
          <div>
            <p className='text-xl font-medium text-center text-gray-800 mb-4'>
              Hasil analisa
            </p>
            <img
              src={imgSrc}
              alt='Captured'
              className='w-full max-w-[300px] mx-auto mb-4'
            />
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: output }}
            className='text-gray-800 output'
          />
          <div>
            <a href='/camera'>
              <button className='bg-red-600 border py-2 px-4 rounded-md font-medium w-full mt-8'>
                Coba obat lain
              </button>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Result;
