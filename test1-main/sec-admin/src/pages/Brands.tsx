import React from 'react';

const eyeglassImages = [
  'https://static1.lenskart.com/media/catalog/product/1/2/1200x600_blue_eyeglass.png',
  'https://static1.lenskart.com/media/catalog/product/1/2/1200x600_red_eyeglass.png',
  'https://static1.lenskart.com/media/catalog/product/1/2/1200x600_white_eyeglass.png',
];

const zeroPowerImages = [
  'https://static1.lenskart.com/media/catalog/product/1/2/1200x600_kids_blue.png',
  'https://static1.lenskart.com/media/catalog/product/1/2/1200x600_kids_pink.png',
  'https://static1.lenskart.com/media/catalog/product/1/2/1200x600_kids_black.png',
];

const Brands: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="w-full bg-[#7B2FF2] flex flex-col md:flex-row items-center justify-between px-8 py-10 rounded-b-3xl" style={{minHeight: '280px'}}>
        <div className="flex-1 flex flex-col justify-center items-start">
          <img src="https://static1.lenskart.com/media/desktop/img/Nov22/hooper-logo.png" alt="Hooper Logo" className="h-16 mb-4" />
          <div className="text-white text-2xl md:text-3xl font-bold leading-snug max-w-xl">
            COMFY, STURDY AND<br />A WHOLE LOTTA COOOOOOL!<br />EXPLORE GLASSES FOR KIDS.
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center mt-8 md:mt-0">
          <img src="https://static1.lenskart.com/media/desktop/img/Nov22/hooper-banner-kids.png" alt="Kids Glasses" className="h-48 md:h-56 rounded-2xl object-cover" />
        </div>
      </div>

      {/* Section 1 */}
      <div className="w-full max-w-6xl mx-auto mt-12">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-xl md:text-2xl font-semibold tracking-wide">WITH POWER COMPUTER BLU LENSES</h2>
          <a href="#" className="text-teal-500 font-medium hover:underline text-lg">View Range</a>
        </div>
        <div className="flex flex-row justify-center items-center space-x-8">
          {eyeglassImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Eyeglass ${idx + 1}`}
              className="h-40 md:h-48 object-contain drop-shadow-lg bg-white rounded"
              style={{minWidth: '160px', maxWidth: '200px'}}
            />
          ))}
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-full max-w-6xl mx-auto mt-16 mb-12">
        <div className="flex justify-between items-center mb-4 px-2">
          <h2 className="text-xl md:text-2xl font-semibold tracking-wide">WITH ZERO POWER COMPUTER BLU LENSES</h2>
          <a href="#" className="text-teal-500 font-medium hover:underline text-lg">View Range</a>
        </div>
        <div className="flex flex-row justify-center items-center space-x-8">
          {zeroPowerImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Zero Power Eyeglass ${idx + 1}`}
              className="h-40 md:h-48 object-contain drop-shadow-lg bg-white rounded"
              style={{minWidth: '160px', maxWidth: '200px'}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
