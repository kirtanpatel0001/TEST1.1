import React from 'react';

interface FilterImageMap {
  [key: string]: string;
}

interface ProductFiltersProps {
  frameTypes: string[];
  frameTypeImages: FilterImageMap;
  selectedType: string;
  setSelectedType: (type: string) => void;
  frameShapes: string[];
  frameShapeImages: FilterImageMap;
  selectedShape: string;
  setSelectedShape: (shape: string) => void;
  frameColors: string[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  frameSizes: string[];
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  genderOptions: string[];
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  weightGroups: string[];
  selectedWeight: string;
  setSelectedWeight: (weight: string) => void;
  brands: string[];
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  frameTypes,
  frameTypeImages,
  selectedType,
  setSelectedType,
  frameShapes,
  frameShapeImages,
  selectedShape,
  setSelectedShape,
  frameColors,
  selectedColor,
  setSelectedColor,
  frameSizes,
  selectedSize,
  setSelectedSize,
  priceRange,
  setPriceRange,
  genderOptions,
  selectedGender,
  setSelectedGender,
  weightGroups,
  selectedWeight,
  setSelectedWeight,
  brands,
  selectedBrand,
  setSelectedBrand,
}) => (
  <>
    {/* Frame Type */}
    <div className="mb-6">
      <h3 className="font-semibold mb-2 text-black">FRAME TYPE</h3>
      <div className="grid grid-cols-3 gap-2">
        {frameTypes.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type === selectedType ? '' : type)}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded border w-20 h-20 justify-center shadow-sm transition-colors duration-150
              ${selectedType === type ? 'bg-black text-white border-black font-bold' : 'bg-white text-black border-black hover:bg-gray-100'}`}
            style={{ outline: selectedType === type ? '2px solid #000' : undefined, fontSize: '0.8rem', whiteSpace: 'normal', wordBreak: 'break-word' }}
          >
            <img src={frameTypeImages[type]} alt={type} className="w-16 h-16 object-contain mb-1" />
            <span className="text-xs font-medium break-words text-black" style={{color: selectedType === type ? '#fff' : '#000'}}>{type}</span>
          </button>
        ))}
      </div>
    </div>
    {/* Frame Shape */}
    <div className="mb-6">
      <h3 className="font-semibold mb-2 text-black">FRAME SHAPE</h3>
      <div className="grid grid-cols-3 gap-2">
        {frameShapes.map(shape => (
          <button
            key={shape}
            onClick={() => setSelectedShape(shape === selectedShape ? '' : shape)}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded border w-20 h-20 justify-center shadow-sm transition-colors duration-150
              ${selectedShape === shape ? 'bg-black text-white border-black font-bold' : 'bg-white text-black border-black hover:bg-gray-100'}`}
            style={{ outline: selectedShape === shape ? '2px solid #000' : undefined, fontSize: '0.8rem', whiteSpace: 'normal', wordBreak: 'break-word' }}
          >
            <img src={frameShapeImages[shape]} alt={shape} className="w-16 h-16 object-contain mb-1" />
            <span className="text-xs font-medium break-words text-black" style={{color: selectedShape === shape ? '#fff' : '#000'}}>{shape}</span>
          </button>
        ))}
      </div>
    </div>
    {/* Frame Color */}
    <div className="mb-6">
      <h3 className="font-semibold mb-2 text-black">FRAME COLOR</h3>
      <div className="grid grid-cols-3 gap-2">
        {frameColors.map(color => (
          <button
            key={color}
            onClick={() => setSelectedColor(color === selectedColor ? '' : color)}
            className={`px-2 py-2 rounded border border-black transition-colors duration-150 w-20 h-10 flex items-center justify-center
              ${selectedColor === color ? 'bg-black text-white font-bold' : 'bg-white text-black hover:bg-gray-100'}`}
            style={{ outline: selectedColor === color ? '2px solid #000' : undefined, fontSize: '0.8rem', whiteSpace: 'normal', wordBreak: 'break-word' }}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
    {/* Frame Size */}
    <div className="mb-6">
      <h3 className="font-semibold mb-2 text-black">FRAME SIZE</h3>
      <div className="grid grid-cols-3 gap-2">
        {frameSizes.map(size => (
          <button
            key={size}
            onClick={() => setSelectedSize(size === selectedSize ? '' : size)}
            className={`px-2 py-2 rounded border border-black transition-colors duration-150 w-20 h-10 flex items-center justify-center
              ${selectedSize === size ? 'bg-black text-white font-bold' : 'bg-white text-black hover:bg-gray-100'}`}
            style={{ outline: selectedSize === size ? '2px solid #000' : undefined, fontSize: '0.8rem', whiteSpace: 'normal', wordBreak: 'break-word' }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
    {/* Price Range */}
    <div className="mb-6">
      <h3 className="font-semibold mb-2 text-black">PRICE RANGE</h3>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-black">₹0</span>
        <span className="mx-1">-</span>
        <input
          type="range"
          min={0}
          max={10000}
          step={100}
          value={priceRange[1]}
          onChange={e => setPriceRange([0, Number(e.target.value)])}
          className="w-32 accent-black"
        />
        <span className="text-xs font-semibold text-black">₹{priceRange[1]}</span>
      </div>
    </div>
    {/* Gender */}
    <div className="mb-6">
      <h3 className="font-semibold mb-2 text-black">GENDER</h3>
      <div className="grid grid-cols-3 gap-2">
        {genderOptions.map(gender => (
          <button
            key={gender}
            onClick={() => setSelectedGender(gender === selectedGender ? '' : gender)}
            className={`px-2 py-2 rounded border border-black transition-colors duration-150 w-20 h-10 flex items-center justify-center
              ${selectedGender === gender ? 'bg-black text-white font-bold' : 'bg-white text-black hover:bg-gray-100'}`}
            style={{ outline: selectedGender === gender ? '2px solid #000' : undefined, fontSize: '0.8rem', whiteSpace: 'normal', wordBreak: 'break-word' }}
          >
            {gender}
          </button>
        ))}
      </div>
    </div>
    {/* Weight Group */}
    <div className="mb-6">
      <h3 className="font-semibold mb-2 text-black">WEIGHT GROUP</h3>
      <div className="grid grid-cols-3 gap-2">
        {weightGroups.map(weight => (
          <button
            key={weight}
            onClick={() => setSelectedWeight(weight === selectedWeight ? '' : weight)}
            className={`px-2 py-2 rounded border border-black transition-colors duration-150 w-20 h-10 flex items-center justify-center
              ${selectedWeight === weight ? 'bg-black text-white font-bold' : 'bg-white text-black hover:bg-gray-100'}`}
            style={{ outline: selectedWeight === weight ? '2px solid #000' : undefined, fontSize: '0.8rem', whiteSpace: 'normal', wordBreak: 'break-word' }}
          >
            {weight}
          </button>
        ))}
      </div>
    </div>
    {/* Brand */}
    <div className="mb-6">
      <h3 className="font-semibold mb-2 text-black">BRAND</h3>
      <div className="grid grid-cols-3 gap-2">
        {brands.map(brand => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand === selectedBrand ? '' : brand)}
            className={`px-2 py-2 rounded border border-black transition-colors duration-150 w-20 h-10 flex items-center justify-center
              ${selectedBrand === brand ? 'bg-black text-white font-bold' : 'bg-white text-black hover:bg-gray-100'}`}
            style={{ outline: selectedBrand === brand ? '2px solid #000' : undefined, fontSize: '0.8rem', whiteSpace: 'normal', wordBreak: 'break-word' }}
          >
            {brand}
          </button>
        ))}
      </div>
    </div>
  </>
);

export default ProductFilters;
