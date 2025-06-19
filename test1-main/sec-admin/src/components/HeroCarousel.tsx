import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const slides = [
	{
		image: 'https://static1.lenskart.com/media/desktop/img/Lenskart/Tilak-Verma/Home/Desktop-Banner.png',
		bg: '#1a2650',
		link: '/posts/tilak-verma',
	},
	{
		image: 'https://static5.lenskart.com/media/uploads/Desktop-v2-topbanner-wildgear.png',
		bg: '#1a2650',
		link: '/posts/wildgear',
	},
	{
		image: 'https://static5.lenskart.com/media/uploads/Desktop-v2-topbanner-harrypotter_20052025_rat.png',
		bg: '#1a2650',
		link: '/posts/harrypotter',
	},
	{
		image: 'https://static5.lenskart.com/media/uploads/Desktop-v2-topbanner-hustlr.png',
		bg: '#1a2650',
		link: '/posts/hustlr',
	},
	{
		image: 'https://static5.lenskart.com/media/uploads/NEW_AT_LK-Shapes_04062025_rat.png',
		bg: '#1a2650',
		link: '/posts/shapes-0406',
	},
	{
		image: 'https://static5.lenskart.com/media/uploads/Desktop-v2-topbanner-twyst.png',
		bg: '#1a2650',
		link: '/posts/twyst',
	},
	{
		image: 'https://static5.lenskart.com/media/uploads/NEW_AT_LK-Shapes-27772-desktop-banner.png',
		bg: '#1a2650',
		link: '/posts/shapes-27772',
	},
];

const HeroCarousel: React.FC = () => {
	const [current, setCurrent] = useState(0);
	const [animating, setAnimating] = useState(false);
	const [direction, setDirection] = useState<'left' | 'right'>('right');
	const [nextSlide, setNextSlide] = useState<number | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setInterval(() => {
			setDirection('right');
			setNextSlide((current + 1) % slides.length);
			setAnimating(true);
		}, 4000);
		return () => clearInterval(timer);
	}, [current]);

	useEffect(() => {
		if (animating && nextSlide !== null) {
			const timeout = setTimeout(() => {
				setCurrent(nextSlide);
				setAnimating(false);
				setNextSlide(null);
			}, 600);
			return () => clearTimeout(timeout);
		}
	}, [animating, nextSlide]);

	const prev = () => {
		if (animating) return;
		setDirection('left');
		setNextSlide((current - 1 + slides.length) % slides.length);
		setAnimating(true);
	};
	const next = () => {
		if (animating) return;
		setDirection('right');
		setNextSlide((current + 1) % slides.length);
		setAnimating(true);
	};

	const slide = slides[current];
	const nextImg = nextSlide !== null ? slides[nextSlide].image : null;

	const handleBannerClick = () => {
		if (slide.link) {
			navigate(slide.link);
		}
	};

	return (
		<div
			className="relative w-full h-[630px] md:h-[630px] flex items-center justify-center overflow-hidden cursor-pointer bg-[#1a2650]"
			style={{ background: slide.bg }}
			onClick={handleBannerClick}
		>
			{/* Book page flip effect */}
			<div className="absolute inset-0 w-full h-full flex items-center justify-center">
				<img
					src={slide.image}
					alt="Banner"
					className={`w-full h-full object-cover opacity-95 pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${animating && nextImg ? (direction === 'right' ? 'origin-left animate-page-flip-left' : 'origin-right animate-page-flip-right') : ''}`}
					style={{ zIndex: 1, position: 'absolute', left: 0, top: 0, transitionProperty: 'transform, opacity' }}
				/>
				{animating && nextImg && (
					<img
						src={nextImg}
						alt="Banner next"
						className={`w-full h-full object-cover opacity-95 pointer-events-none transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${direction === 'right' ? 'origin-left animate-page-flip-next-left' : 'origin-right animate-page-flip-next-right'}`}
						style={{ zIndex: 2, position: 'absolute', left: 0, top: 0, transitionProperty: 'transform, opacity' }}
					/>
				)}
			</div>
			{/* Navigation Arrows */}
			<button
				className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-transparent hover:bg-white/10 rounded-full w-16 h-16 flex items-center justify-center transition pointer-events-auto"
				onClick={(e) => {
					e.stopPropagation();
					prev();
				}}
				aria-label="Previous slide"
				style={{ outline: 'none' }}
			>
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<polyline points="25,10 15,20 25,30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
				</svg>
			</button>
			<button
				className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-transparent hover:bg-white/10 rounded-full w-16 h-16 flex items-center justify-center transition pointer-events-auto"
				onClick={(e) => {
					e.stopPropagation();
					next();
				}}
				aria-label="Next slide"
				style={{ outline: 'none' }}
			>
				<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
					<polyline points="15,10 25,20 15,30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
				</svg>
			</button>
			<style>{`
			@keyframes page-flip-left {
				0% { transform: rotateY(0deg) scale(1); opacity: 1; }
				100% { transform: rotateY(-90deg) scale(0.95); opacity: 0; }
			}
			@keyframes page-flip-next-left {
				0% { transform: rotateY(90deg) scale(0.95); opacity: 0; }
				100% { transform: rotateY(0deg) scale(1); opacity: 1; }
			}
			@keyframes page-flip-right {
				0% { transform: rotateY(0deg) scale(1); opacity: 1; }
				100% { transform: rotateY(90deg) scale(0.95); opacity: 0; }
			}
			@keyframes page-flip-next-right {
				0% { transform: rotateY(-90deg) scale(0.95); opacity: 0; }
				100% { transform: rotateY(0deg) scale(1); opacity: 1; }
			}
			.animate-page-flip-left { animation: page-flip-left 0.7s cubic-bezier(0.4,0,0.2,1) forwards; }
			.animate-page-flip-next-left { animation: page-flip-next-left 0.7s cubic-bezier(0.4,0,0.2,1) forwards; }
			.animate-page-flip-right { animation: page-flip-right 0.7s cubic-bezier(0.4,0,0.2,1) forwards; }
			.animate-page-flip-next-right { animation: page-flip-next-right 0.7s cubic-bezier(0.4,0,0.2,1) forwards; }
			`}</style>
		</div>
	);
};

export default HeroCarousel;
