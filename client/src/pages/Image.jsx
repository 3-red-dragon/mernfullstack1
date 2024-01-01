import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

function ImageCompressor() {
  const [compressedImage, setCompressedImage] = useState('');

  async function compressAndConvertToBase64(event) {
    const file = event.target.files[0];

    // Image compression
    const options = {
      maxSizeMB: 0.5,
    //   maxWidthOrHeight: 1024,
      useWebWorker: true,
      onProgress: (p) => console.log(`Compression Progress: ${p}%`),
    };

    const compressedFile = await imageCompression(file, options);

    // Convert to base64
    const reader = new FileReader();
    reader.readAsDataURL(compressedFile);

    reader.onload = () => {
      const base64Result = reader.result;
      console.log(base64Result); // Log the result here
      setCompressedImage(base64Result);
    };

    reader.onerror = (error) => {
      console.error('Error:', error);
    };
  }

  return (
    <div>
      <input accept='image/*' type='file' onChange={compressAndConvertToBase64} />
      {compressedImage && <img width={1000} src={compressedImage} alt="Compressed" />}
    </div>
  );
}

export default ImageCompressor;
