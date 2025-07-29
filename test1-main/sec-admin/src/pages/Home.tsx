import React, { useState } from 'react';
import HeroCarousel from '../components/HeroCarousel';

const eyewearCategories = [
  { name: 'Round', img: 'https://static1.lenskart.com/media/desktop/img/Sep21/image179.png' },
  { name: 'Clubmaster', img: 'https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg' },
  { name: 'Transparent', img: 'https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg' },
  { name: 'Blend', img: 'https://static1.lenskart.com/media/desktop/img/Sep21/blend.jpg' },
  { name: 'Clip-On', img: 'https://static1.lenskart.com/media/desktop/img/Sep21/clipon.jpg' },
  { name: 'Air Flex', img: 'https://static1.lenskart.com/media/desktop/img/Sep21/airflex.jpg' },
  { name: 'Aviator', img: 'https://static1.lenskart.com/media/desktop/img/Sep21/aviator.jpg' },
];

const eyeglassesImages = [
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/gold-full-rim-geometric-vincent-chase-sleek-steel-vc-e13785-c1-eyeglasses_gm_5964.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//l/i/black-full-rim-square-lenskart-air-fusion-la-e13069-c1-eyeglasses_lenskart-air-la-e13033-c1-eyeglasses_eyeglasses_g_7875_1b_28july23.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e12395-c2-eyeglasses_g_4493.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-black-full-rim-geometric-vincent-chase-sleek-steel-vc-e13786-c2-eyeglasses_ccg_3318.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/blue-silver-full-rim-square-vincent-chase-sleek-steel-vc-e16002-c2-eyeglasses_g_3149_09_21_23.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/Transparent-Blue-Full-Rim-Rectangle-Vincent-Chase-Classic-Acetate-VC-E13676-C3-Eyeglasses_vincent-chase-vc-e13676-c3-c3-eyeglasses_G_924107_02_2022.jpg',
];
const sunglassesImages = [
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-grey-full-rim-round-vincent-chase-polarized-met-effect-vc-s15398-c2-sunglasses_g_0998_02_02_23.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/black-full-rim-round-vincent-chase-the-metal-edit-vc-s13112-c9-polarized-sunglasses_vincent-chase-vcs13112-c9-c9-sunglasses_sunglasses_g_8958_1_5july23.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/black-grey-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14459-c7-sunglasses_g_2628_9_29_22.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/gunmetal-blue-full-rim-round-vincent-chase-the-metal-edit-vc-s13137-c3-sunglasses_vincent-chase-vc-s13137-c3-c3-sunglasses_sunglasses_g_8708_5july23.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/Gold-Black-Grey-Gradient-Full-Rim-Square-Vincent-Chase-Polarized-VINTAGE-VC-S11748-C4-Polarized-Sunglasses_vincent-chase-vc-s11748-c4-sunglasses_sunglasses_G_126118_02_2022.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s16958-c1-sunglasses_dd_dsc6021_04_06_2024.jpg',
];

// WITH POWER COMPUTER BLU LENSES
const withPowerBluImages = [
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/o/john-jacobs-jj-e10235-c7-eyeglasses_g_2374.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/o/john-jacobs-rimless-jj-e12565-c3-eyeglasses_john-jacobs-rimless-jj-e12565-c3-eyeglasses_g_3253.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/black-blue-full-rim-square-john-jacobs-tr-flex-jj-e14414-c5-eyeglasses__dsc5647.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/green-brown-full-rim-rectangle-john-jacobs-tr-flex-jj-e16847-c1-eyeglasses__dsc5067_23_04_2024.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-e14486-c4-eyeglasses_g_7954.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/o/john-jacobs-jj-e13343-c2-eyeglasses_g_5786.jpg',
];
// WITH ZERO POWER COMPUTER BLU LENSES
const withZeroPowerBluImages = [
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/gold-transparent-blue-gradient-full-rim-hexagonal-john-jacobs-jj-tints-jj-s13146-c4-sunglasses_john-jacobs-john-jacobs-jj-s13146-c4-sunglasses_g_1458_1_28july23.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/gold-brown-green-full-rim-round-john-jacobs-jj-tints-jj-s12810-c2-polarized-sunglasses-coltrane_g_1703_06_02_2025.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/black-grey-full-rim-cat-eye-john-jacobs-jj-tints-jj-s13085-c4-sunglasses_g_5377_08_11_23.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/blue-grey-transparent-full-rim-wayfarer-john-jacobs-jj-tints-jj-s13313--c1-sunglasses-basalt__dsc2472.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/o/john-jacobs-jj-s12808-c1-sunglasses_g_8863.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//j/i/Black-Green-Solid-Full-Rim-Wayfarer-John-Jacobs-JJ-Tints-JJ-S13311-C3-Sunglasses_john-jacobs-jj-s13311-c3-sunglasses_sunglasses_g_980618_02_2022.jpg',
];

const airFlexImages = [
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e12852-c1-eyeglasses_vincent-chase-vc-e12852-c1-eyeglasses_g_1089_1.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//l/i/Black-Full-Rim-Rectangle-Lenskart-AIR-Flex-LA-E12852-C2-Eyeglasses_vincent-chase-vc-e12852-c2-eyeglasses_2eyeglasses_G_2091_10_02_2022.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//l/i/black-rimless-geometric-lenskart-air-rimless-la-e16173-eyeglasses_lk_dsc8871.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e12947-c2-eyeglasses_vincent-chase-vc-e12947-c2-eyeglasses_G_1969_1.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//l/i/vincent-chase-la-e16170-c3-eyeglasses__dsc9649_25_10_2024.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//l/i/vincent-chase-la-e16170-c4-eyeglasses__dsc9641_25_10_2024.jpg'
];

const withPowerComputerBluLenses = [
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//l/i/peyush-bansal-shark-tank-monza-red-full-rim-hustlr-eyeglasses_g_7904_02_01_2023.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-computer-glasses:-ocean-blue-full-rim-wayfarer-lenskart-hustlr-hp-e15011-c6-eyeglasses_ocrean_blue_front_4.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//h/i/sky-blue-full-rim-wayfarer-lenskart-extra-narrow-hustlr-computer-eyeglasses_csvfile-1689595048517-hooper-hp-d15011l-c6-eyeglasses_g_8686_04_05_2023.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//h/i/midnight-blue-full-rim-wayfarer-lenskart-extra-narrow-hustlr-computer-eyeglasses_csvfile-1689594935385-hooper-hp-d15011l-c9-eyeglasses_g_8701_04_05_2023.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//h/i/black-full-rim-wayfarer-lenskart-extra-narrow-hustlr-computer-eyeglasses_csvfile-1689594898001-hooper-hp-d15011l-c8-eyeglasses_g_8694_04_05_2023.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//h/i/amber-full-rim-wayfarer-lenskart-extra-narrow-hustlr-computer-eyeglasses_csvfile-1689594971819-hooper-hp-d15011l-c10-eyeglasses_g_8679_04_05_2023.jpg',
];

const withZeroPowerComputerBluLenses = [
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//h/i/blue-transparent-black-grey-full-rim-rectangle-kids--8-12-yrs--hooper-flexi-hooper-hp-e15084l-c3-eyeglasses_blue-transparent-black-grey-full-rim-rectangle-kids-(8-12-yrs)-hooper-flexi-hooper-hp-e15084l-c3-eyeglasses_g_5351_9_21_22_22_march23.jpg.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//h/i/pink-transparent-purple-pink-tortoise-full-rim-rectangle-kids--5-8-yrs--hooper-tr-flex-hooper-hp-e15084m-c3-eyeglasses_g_5387.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//h/i/green-transparent-blue-full-rim-rectangle-kids-(8-12-yrs)-hooper-flexi-hooper-hp-e15085l-c1-eyeglasses_g_5328_9_21_22.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//h/i/blue-transparent-pink-purple-full-rim-round-kids--5-8-yrs--hooper-flexi-hooper-hp-e15083m-c3-eyeglasses_blue-transparent-pink-purple-full-rim-round-kids-(5-8-yrs)-hooper-flexi-hooper-hp-e15083m-c3-eyeglasses_g_8786_9_21_22_22_march23.jpg.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//h/i/hooper-hp-e10025l-c11-eyeglasses_csvfile-1717417134037-_dsc5674.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//h/i/kids-glasses:-black-blue-transparent-black-full-rim-rectangle-kids--8-12-yrs--hooper-astra-hooper-hp-e10014l-c4_hooper-hp-e10014l-c4-eyeglasses_g_0981_22_march23.jpg.jpg',
  
];

const eyewearCategoriesWithImages = [
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-dailies_134722-fda.png',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-daily-disposable-contact-lenses--30-lenses-box_aqualens-daily-disposable-contact-lenses--30-lenses-box_csvfile-1681129631044-134723.png.png',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-dailies_118538-fda.png',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-toric-dailies_144128-fda.png',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-nxt-monthly_144127-fda.png',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-monthly_134538-fda.png'


];

const eyelens = [
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aquacolor-dusk-blue-premium-powered-monthly-1lp_nw-153143_dusk_blue.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aquacolor-gray-premium-powered-monthly-1lp_nw-153145_gray.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aquacolor-silver-gray-premium-zero-power-monthly_nw-151324_sky_blue.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aquacolor-turquoise-premium-powered-monthly-1lp_nw-153142_turquoise.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aquacolor-emerald-premium-powered-monthly-1lp_nw-153141_emerald.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aquacolor-turquoise-zero-power-dailies_216761_turquoise_nw.jpg'
];

const CarouselRow = ({ title, images, viewRangeHref }: { title: string; images: string[]; viewRangeHref?: string }) => {
  const [startIdx, setStartIdx] = useState(0);
  const showCount = 3;
  const canPrev = startIdx > 0;
  const canNext = startIdx + showCount < images.length;

  // When clicking arrow, change all 3 images at once
  const handlePrev = () => {
    if (canPrev) setStartIdx(startIdx - showCount);
  };
  const handleNext = () => {
    if (canNext) setStartIdx(startIdx + showCount);
  };

  return (
    <div className="w-full mb-12">
      <div className="flex flex-col mb-2 mt-8 px-2">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-[22px] md:text-[24px] font-normal text-gray-800 tracking-tight" style={{marginLeft: '50px'}}>{title}</h2>
          <a href={viewRangeHref || '#'} className="text-teal-500 text-[20px] font-medium hover:underline">View Range</a>
        </div>
        <div className="w-full flex items-center" style={{marginTop: '2px'}}>
          <div style={{marginLeft: '50px', marginRight: '16px', height: '2px', background: '#e5e7eb', flex: 1}}></div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center gap-4">
        <button
          className={`text-5xl text-gray-300 hover:text-gray-700 transition px-2 ${!canPrev && 'opacity-30 cursor-not-allowed'}`}
          onClick={handlePrev}
          disabled={!canPrev}
          aria-label="Previous"
        >&#8249;</button>
        <div className="flex-1 flex justify-center gap-12 overflow-hidden transition-all duration-500 ease-in-out" style={{minHeight: '140px'}}>
          {images.slice(startIdx, startIdx + showCount).map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={title + ' ' + (startIdx + idx + 1)}
              className="w-full max-w-[320px] md:max-w-[340px] h-[120px] md:h-[140px] object-contain transition-transform duration-500 ease-in-out"
              style={{margin: '0 10px'}}
            />
          ))}
        </div>
        <button
          className={`text-5xl text-gray-300 hover:text-gray-700 transition px-2 ${!canNext && 'opacity-30 cursor-not-allowed'}`}
          onClick={handleNext}
          disabled={!canNext}
          aria-label="Next"
        >&#8250;</button>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = 4;
  const canPrev = startIdx > 0;
  const canNext = startIdx + visibleCount < eyewearCategories.length;

  const handlePrev = () => {
    if (canPrev) setStartIdx(startIdx - 1);
  };
  const handleNext = () => {
    if (canNext) setStartIdx(startIdx + 1);
  };

  return (
    <>
      <HeroCarousel />
      
      {/* Eyewear Category Carousel Section */}
      <section className="w-full bg-white py-12">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center md:items-start px-4">
          {/* Left text and logo */}
          <div className="md:w-1/4 w-full flex flex-col items-start mb-8 md:mb-0 pl-10 md:pl-20">
            <h2 className="text-6xl font-light leading-tight text-gray-900 mb-2" style={{letterSpacing: '-2px'}}>
              WEAR<br/>
              <span className="font-bold">THE</span><br/>
              <span className="font-bold tracking-tight">TREND</span>
            </h2>
            <p className="text-lg text-gray-600 mt-2 mb-8">Our hottest collections</p>
          </div>
          {/* Carousel */}
          <div className="md:w-3/4 w-full flex flex-col">
            <div className="flex items-center justify-center w-full">
              <button
                className={`text-4xl px-3 py-2 text-gray-300 hover:text-gray-700 transition ${!canPrev && 'opacity-30 cursor-not-allowed'}`}
                onClick={handlePrev}
                disabled={!canPrev}
                aria-label="Previous"
              >&#60;</button>
              <div className="flex-1 flex justify-center gap-8">
                {eyewearCategories.slice(startIdx, startIdx + visibleCount).map((cat) => (
                  <div key={cat.name} className="flex flex-col items-center min-w-[200px] mx-2">
                    <img src={cat.img} alt={cat.name} className="w-40 h-40 object-contain mb-4" />
                    <span className="text-xl font-medium text-gray-800 mb-4">{cat.name}</span>
                    <button className="bg-teal-400 text-white px-10 py-2 rounded hover:bg-teal-500 text-lg font-semibold">Explore</button>
                  </div>
                ))}
              </div>
              <button
                className={`text-4xl px-3 py-2 text-gray-300 hover:text-gray-700 transition ${!canNext && 'opacity-30 cursor-not-allowed'}`}
                onClick={handleNext}
                disabled={!canNext}
                aria-label="Next"
              >&#62;</button>
            </div>
          </div>
        </div>
      </section>
      {/*  home under */}
       <div className="w-full bg-white flex flex-col items-center  py-10">
        <div className="flex items-center w-full max-w-screen-2xl">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-8 text-3xl font-medium tracking-wide text-black whitespace-nowrap">LENS REPLCEMENT AT STORE</span>
          <hr className="flex-grow border-gray-300" />
        </div>
      </div>

      <div className="w-full flex justify-center bg-white pb-8">
        <img
          src="https://static5.lenskart.com/media/uploads/Desktop-v2-topbanner-hustlrswitch-GJ-150525.png"
          alt="Banner"
          className="w-full max-w-screen-2xl object-cover"
        />
      </div>
      {/* Divider with text */}
      <div className="w-full bg-white flex flex-col items-center py-10">
        <div className="flex items-center w-full max-w-screen-2xl">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-8 text-3xl font-medium tracking-wide text-black whitespace-nowrap">BUY ONE GET ONE FREE</span>
          <hr className="flex-grow border-gray-300" />
        </div>
      </div>
      <div className="w-full flex justify-center bg-white pb-18">
        <img
          src="https://static5.lenskart.com/media/uploads/1920x520-desktop-banner.png"
          alt="Banner"
          className="w-full max-w-screen-2xl object-cover"
        />
      </div>
      
      <div className="w-full bg-white flex flex-col items-center py-10">
        <div className="flex items-center w-full max-w-screen-2xl">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-8 text-3xl font-medium tracking-wide text-black whitespace-nowrap">BUY ONE GET ONE FREE</span>
          <hr className="flex-grow border-gray-300" />
        </div>
      </div>
      <div className="w-full flex justify-center bg-white pb-18">
        <img
          src="https://static1.lenskart.com/media/desktop/img/2024/jun/eyetest/Turban-DesktopBanner.jpg"
          alt="Banner"
          className="w-full max-w-screen-2xl object-cover"
        />
      </div>
      <div className="w-full bg-white flex flex-col items-center py-10">
        <div className="flex items-center w-full max-w-screen-2xl">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-8 text-3xl font-medium tracking-wide text-black whitespace-nowrap">EYE TEST</span>
          <hr className="flex-grow border-gray-300" />
        </div>
      </div>
      <div className="w-full flex justify-center bg-white pb-18">
        <img
          src="https://static1.lenskart.com/media/desktop/img/16-sep-24/r1.jpeg"
          alt="Banner"
          className="w-full max-w-screen-2xl object-cover"
        />
      </div> 
      <div className="w-full bg-white flex flex-col items-center py-10">
        <div className="flex items-center w-full max-w-screen-2xl">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-8 text-3xl font-medium tracking-wide text-black whitespace-nowrap">PREMIUM EYEWEAR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
      </div>
      <div className="w-full flex justify-center bg-white pb-18">
        <img
          src="https://static1.lenskart.com/media/desktop/img/Dec22/1-Dec/Homepage-Banner-web.gif"
          
          alt="Banner"
          className="w-full max-w-screen-2xl object-cover"
        />
      </div>
      <div className="w-full bg-white flex flex-col items-center py-10">
        <div className="flex items-center w-full max-w-screen-2xl">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-8 text-3xl font-medium tracking-wide text-black whitespace-nowrap">TRENDING EYEGLASSES</span>
          <hr className="flex-grow border-gray-300" />
        </div>
      </div>
      <div className="w-full flex justify-center bg-white pb-18">
        <img
          src="https://static1.lenskart.com/media/desktop/img/Jan23/sunglasses/Sun-Banner-web.gif"
          alt="Banner"
          className="w-full max-w-screen-2xl object-cover"
        />
      </div>
      {/* Contact Lenses & More Section - Images connected with 3px gap */}
      <section className="w-full bg-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex items-center mb-12">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-8 text-4xl font-semibold tracking-wide text-black whitespace-nowrap">CONTACT LENSES & MORE</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-0">
            <img
              src="https://static1.lenskart.com/media/desktop/img/June22/contact-lens-more.jpg"
              alt="Colored contact lenses"
              className="rounded-l-lg shadow-lg w-full md:w-[600px] h-auto object-cover border-r-[3px] border-white"
              style={{maxWidth: '100%', height: 'auto'}}
            />
            <img
              src="https://static1.lenskart.com/media/desktop/img/June22/contact-lens-more-1.jpg"
              alt="Contact lens solution"
              className="rounded-r-lg shadow-lg w-full md:w-[600px] h-auto object-cover"
              style={{maxWidth: '100%', height: 'auto'}}
            />
          </div>
        </div>
      </section>
      {/* Our Brands Section - Matches provided image */}
      <section className="w-full bg-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex items-center mb-8">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-8 text-4xl font-semibold tracking-wide text-black whitespace-nowrap">OUR BRANDS</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <div className="w-full flex flex-col items-center mb-12">
            <div className="w-full relative">
              <img
                src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/VC-Banner.jpg"
                alt="Vincent Chase Banner"
                className="rounded-lg w-full max-h-[260px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">Vincent Chase</h2>
              </div>
            </div>
          </div>
        </div> 
      </section>
      {/* Eyeglasses and Sunglasses Carousel Section - Full width, arrows, and image swap */}
      <section className="w-full bg-white py-12">
        <div className="max-w-screen-2xl mx-auto px-4">
          <CarouselRow title="EYEGLASSES" images={eyeglassesImages} />
          <CarouselRow title="SUNGLASSES" images={sunglassesImages} />
        </div>
      </section>
      {/* Contact Lenses Section - New Addition */}
      <div className="w-full bg-white py-12">
        {/* Contact Lens Banner KIRTAN */}
        <div className="w-full flex justify-center mb-8">
          <img
            src="https://static1.lenskart.com/media/desktop/img/Nov22/Updated%20brand%20banner%20jj%20.jpg"
            alt="Contact Lens Banner"
            className="w-full max-w-screen-2xl object-cover rounded-lg shadow"
          />
        </div>
        <section className="w-full bg-white py-12">
        <div className="max-w-screen-2xl mx-auto px-4">
          <CarouselRow title="EYEGLASSES" images={withPowerBluImages} />
          <CarouselRow title="SUNGLASSES" images={withZeroPowerBluImages} />
        </div>
      </section>
      <div className="w-full flex justify-center mt-8">
          <img
            src="https://static1.lenskart.com/media/desktop/img/Aug21/25-Aug/LK-AIR-Banner.jpg"
            alt="LK Air Banner"
            className="w-full max-w-screen-2xl object-cover rounded-lg shadow"
          />
        </div>
        <section className="w-full bg-white py-12">
        <div className="max-w-screen-2xl mx-auto px-4">
          <CarouselRow title="EYEGLASSES" images={withPowerBluImages} />
          <CarouselRow title="SUNGLASSES" images={withZeroPowerBluImages} />
        </div>
      </section>
        
       
      </div>
      <div className="w-full flex justify-center mt-8">
          <img
            src="https://static1.lenskart.com/media/desktop/img/Aug21/25-Aug/LK-Readers-Banner.jpg"
            alt="LK Air Banner"
            className="w-full max-w-screen-2xl object-cover rounded-lg shadow"
          />
      </div>
      <section className="w-full bg-white py-12">
        <div className="max-w-screen-2xl mx-auto px-4">
          <CarouselRow title="EYEGLASSES" images={airFlexImages} />
          
        </div>
      </section>
      <div className="w-full flex justify-center mt-8">
          <img
            src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/Banner05_Final2ndDec21.jpg"
            alt="LK Air Banner"
            className="w-full max-w-screen-2xl object-cover rounded-lg shadow"
          />
      </div>
      <section className="w-full bg-white py-12">
        <div className="max-w-screen-2xl mx-auto px-4">
          <CarouselRow title="EYEGLASSES" images={withPowerComputerBluLenses} />
          <CarouselRow title="EYEGLASSES" images={withZeroPowerComputerBluLenses} />
          
        </div>
      </section>
      <div className="w-full flex justify-center mt-8">
          <img
            src="https://static1.lenskart.com/media/desktop/img/June22/Our-Brands-Banner.jpg"
            alt="LK Air Banner"
            className="w-full max-w-screen-2xl object-cover rounded-lg shadow"
          />
      </div>
      <section className="w-full bg-white py-12">
        <div className="max-w-screen-2xl mx-auto px-4">
          <CarouselRow title="EYEGLASSES" images={eyewearCategoriesWithImages} />
          <CarouselRow title="EYEGLASSES" images={eyelens} />
          
        </div>
      </section>
      {/* Meet Our Happy Customers Section */}
      <section className="w-full py-12" style={{ background: '#ffed8f' }}>
        <div className="max-w-screen-2xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl font-semibold mb-10 text-center tracking-wide" style={{ fontFamily: 'inherit' }}>
            MEET OUR HAPPY CUSTOMERS
          </h2>
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center">
            <div className="bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-[400px] aspect-video">
              <iframe width="100%" height="220" src="https://www.youtube.com/embed/HYPqf_eVvvM" title="Customer Reviews" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-[400px] aspect-video">
              <iframe width="100%" height="220" src="https://www.youtube.com/embed/SQm3RxXRunw" title="Customer Testimonial" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className="bg-black rounded-xl overflow-hidden shadow-lg w-full max-w-[400px] aspect-video">
              <iframe width="100%" height="220" src="https://www.youtube.com/embed/IZpUQ-S_LcM" title="Customer Diaries" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </section>
      {/* Custom Footer Section */}
      <footer className="w-full bg-[#0a0d36] text-white pt-16 pb-8 px-4 font-sans" style={{minWidth:'100vw', position: 'static'}}>
        <div className="max-w-full mx-auto">
          <h2 className="text-5xl font-light mb-6" style={{letterSpacing: '-1px'}}>Buy The Best Eyewear From Vision Cart</h2>
          <p className="text-lg font-normal leading-relaxed mb-2 text-[#bfc2e2]">Vision Cart Is The Leading E-Commerce Portal For Eyewear In India. It Has Revolutionised The Eyewear Industry In The Country With Its Omni-Channel Approach. From An Ever-Growing Number Of Offline Stores Across Major Cities In The Country To Innovative Integration Of Technology While Purchasing Online, Vision Cart Caters To Every Customer With Several Deals And Offers.</p>
          <p className="text-lg font-normal leading-relaxed mb-6 text-[#bfc2e2]">A One-Stop Online Solution For Purchasing Eyewear And Its Accessories, Vision Cart Delivers Them Right At Your Doorstep With Convenient Methods Of Payment. <span className="text-[#3ed0c6]">Sunglasses</span> as well as <span className="text-[#3ed0c6]">Eyeglasses</span> Are Available For Men And Women In A Diverse Array Of Styles And Trendy Colours. If You Want To Try Out <span className="text-[#3ed0c6]">Contact Lenses</span>, Pick The Ones Of Your Choice From The Extensive Variety Of Coloured Contact Lenses From Our Online Store.</p>
          <div className="flex flex-col md:flex-row justify-between mt-12 mb-8 gap-8">
            <div>
              <h3 className="text-2xl font-medium mb-4">Services</h3>
              <ul className="space-y-2 text-[#bfc2e2]">
                <li>Store Locator</li>
                <li>Buying Guide</li>
                <li>Frame Size</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-medium mb-4">About Us</h3>
              <ul className="space-y-2 text-[#bfc2e2]">
                <li>We Are Hiring</li>
                <li>Refer And Earn</li>
                <li>About us</li>
                <li>Vision Cart Coupons</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-medium mb-4">Help</h3>
              <ul className="space-y-2 text-[#bfc2e2]">
                <li>FAQ's</li>
                <li>Grievance Redressal</li>
                <li>Cardemi</li>
              </ul>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex gap-4 mb-4">
                <img src="https://static.lenskart.com/media/desktop/img/play-store.svg" alt="Google Play" className="h-12" />
                <img src="https://static.lenskart.com/media/desktop/img/app-store.svg" alt="App Store" className="h-12" />
              </div>
              <p className="text-lg text-[#bfc2e2] text-center md:text-right mb-2">Download Vision Cart App to buy<br/>Eyeglasses, Sunglasses and Contact Lenses</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#23265a] pt-6 mt-8 gap-4">
            <div className="flex flex-wrap gap-6 text-[#bfc2e2] text-lg">
              <span>T & C</span>
              <span>Privacy</span>
              <span>Disclaimer</span>
            </div>
            <div className="flex items-center gap-6 text-[#bfc2e2] text-lg">
              <span>Version 1.0.0</span>
              <span className="hidden md:inline">||</span>
              <span>Follow Us</span>
              <a href="#"><img src="https://static.lenskart.com/media/desktop/img/facebook.svg" alt="Facebook" className="h-7 inline" /></a>
              <a href="#"><img src="https://static.lenskart.com/media/desktop/img/instagram.svg" alt="Instagram" className="h-7 inline" /></a>
              <a href="#"><img src="https://static.lenskart.com/media/desktop/img/twitter.svg" alt="Twitter" className="h-7 inline" /></a>
              <a href="#"><img src="https://static.lenskart.com/media/desktop/img/chat.svg" alt="Chat" className="h-7 inline" /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;