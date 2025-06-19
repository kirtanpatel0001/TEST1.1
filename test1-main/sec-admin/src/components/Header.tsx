import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Heart, ShoppingCart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const categories = [
  "EYEGLASSES",
  "SCREEN GLASSES",
  "KIDS GLASSES",
  "CONTACT LENSES",
  "SUNGLASSES",
  "HOME EYE-TEST",
  "STORE LOCATOR",
];

// Mega menu type definitions
interface MegaMenuColumn {
  title: string;
  items: string[];
}
interface MegaMenuLeftItem {
  label: string;
  img: string;
  desc: string;
}
interface MegaMenuData {
  [key: string]: {
    left?: MegaMenuLeftItem[];
    columns?: MegaMenuColumn[];
    type?: string;
    cards?: { img: string; label: string }[];
    categories?: { label: string; img: string; picks: { title: string; subtitle: string } }[];
    topPicks?: string[];
    shapes?: string[];
    collections?: string[];
    brands?: string[];
  };
}

// Mega menu data for each category
const megaMenuData: MegaMenuData = {
  EYEGLASSES: {
    left: [
      {
        label: "Men",
        img: "https://randomuser.me/api/portraits/men/1.jpg",
        desc: "CLASSIC EYEGLASSES\nStarting From ₹2000",
      },
      {
        label: "Women",
        img: "https://randomuser.me/api/portraits/women/1.jpg",
        desc: "PREMIUM EYEGLASSES\nStarting From ₹4000",
      },
      {
        label: "Kids",
        img: "https://randomuser.me/api/portraits/men/2.jpg",
        desc: "SCREEN EYEGLASSES\nStarting From ₹600",
      },
    ],
    columns: [
      {
        title: "Our Top Picks",
        items: [
          "New Arrivals",
          "Best Seller",
          "Lenskart BLU Lenses",
          "Progressive Eyeglasses",
        ],
      },
      {
        title: "Frame Type",
        items: [
          "Rectangle Frames",
          "Square Frames",
          "Round Frames",
          "Aviator Frames",
          "Cat-Eye Frames",
          "Rimless Frames",
          "Halfrim Frames",
          "Geometric Frames",
        ],
      },
      {
        title: "Collection",
        items: [
          "Harry Potter",
          "Aao Twyst Karein",
          "Hustlr - As Seen on Shark Tank",
          "Switch - Magnetic Clips-On",
          "Patriot",
          "Hip Hop",
          "Turban Edit",
          "Classic Acetates",
        ],
      },
      {
        title: "Brands",
        items: ["Vincent Chase", "Lenskart Air", "Lenskart STUDIO"],
      },
    ],
  },

  "SCREEN GLASSES": {
    left: [
      {
        label: "Men",
        img: "https://randomuser.me/api/portraits/men/1.jpg",
        desc: "BLUE CUT LENSES\nStarting From ₹2000",
      },
      {
        label: "Women",
        img: "https://randomuser.me/api/portraits/women/1.jpg",
        desc: "ZERO POWER GLASSES\nStarting From ₹4000",
      },
      {
        label: "Kids",
        img: "https://randomuser.me/api/portraits/men/2.jpg",
        desc: "KIDS SCREEN GLASSES\nStarting From ₹600",
      },
    ],
    columns: [
      {
        title: "Our Top Picks",
        items: [
          "Blue Cut Lenses",
          "Zero Power Glasses",
          "Kids Screen Glasses",
          "Computer Glasses",
        ],
      },
      {
        title: "Frame Type",
        items: [
          "Rectangle Frames",
          "Round Frames",
          "Cat-Eye Frames",
          "Rimless Frames",
        ],
      },
      {
        title: "Collection",
        items: ["Kids Collection", "Work From Home", "Student Special"],
      },
      {
        title: "Brands",
        items: ["Lenskart Air", "Lenskart STUDIO"],
      },
    ],
  },
  "KIDS GLASSES": {
    left: [
      {
        label: "Eyeglasses",
        img: "/images/kids-eyeglasses.png",
        desc: "Eyeglasses\nStarting From ₹600",
      },
      {
        label: "Zero Power Screen Glasses",
        img: "/images/kids-zero-power.png",
        desc: "Zero Power Screen Glasses\nStarting From ₹800",
      },
      {
        label: "Sunglasses",
        img: "/images/kids-sunglasses.png",
        desc: "Sunglasses\nStarting From ₹1000",
      },
    ],
    columns: [
      {
        title: "Our Top Picks",
        items: ["Kids Collection", "Student Special", "Work From Home"],
      },
      {
        title: "Frame Type",
        items: ["Rectangle", "Round", "Cat-Eye", "Rimless"],
      },
      {
        title: "Brands",
        items: ["Lenskart Air", "Lenskart STUDIO"],
      },
    ],
  },
  "CONTACT LENSES": {
    left: [
      {
        label: "Aqualens",
        img: "/images/contact-aqualens.png",
        desc: "Aqualens\nMonthly, Daily, Yearly",
      },
      {
        label: "Bausch Lomb",
        img: "/images/contact-bausch.png",
        desc: "Bausch Lomb\nMonthly, Daily, Yearly",
      },
      {
        label: "Acuvue",
        img: "/images/contact-acuvue.png",
        desc: "Acuvue\nMonthly, Daily, Yearly",
      },
    ],
    columns: [
      {
        title: "Explore By Disposability",
        items: ["Monthly", "Day & Night", "Daily", "Yearly", "Bi-weekly"],
      },
      {
        title: "Explore By Power",
        items: ["Spherical - (CYL<0.5)", "Spherical + (CYL<0.5)", "Cylindrical Power(>0.75)", "Toric Power"],
      },
      {
        title: "Explore By Color",
        items: ["Green", "Blue", "Brown", "Turquoise", "View all colors"],
      },
      {
        title: "Solution",
        items: ["Small", "Large", "View all solutions"],
      },
    ],
  },
  SUNGLASSES: {
    left: [
      {
        label: "Men",
        img: "/images/men-sunglasses.png",
        desc: "CLASSIC SUNGLASSES\nStarting From ₹1500",
      },
      {
        label: "Women",
        img: "/images/women-sunglasses.png",
        desc: "PREMIUM SUNGLASSES\nStarting From ₹4000",
      },
    ],
    columns: [
      {
        title: "Our Top Picks",
        items: ["Lenskart Boost", "New Arrivals", "Power Sunglasses"],
      },
      {
        title: "Shape",
        items: ["Aviator", "Rounders", "Square", "Rectangle", "Hexagon", "Cat-Eye", "Clubmaster"],
      },
      {
        title: "Collection",
        items: ["Harry Potter", "Sports Wear", "Lenskart Hustlr", "Cruise Edit", "Havana", "Wedding Edit", "Holiday Edit", "Pilot"],
      },
      {
        title: "Brands",
        items: ["Vincent Chase", "Lenskart Boost"],
      },
    ],
  },
};

const Header: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const renderMegaMenu = (category: string) => {
    const data = megaMenuData[category];
    if (!data) return null;

    if (data.type === "cards") {
      // For KIDS GLASSES
      return (
        <div className="flex justify-center gap-12 py-10 bg-white rounded-2xl">
          {data.cards?.map((card, idx) => (
            <div key={idx} className="flex flex-col items-center bg-gray-50 rounded-2xl p-8 w-64 shadow-sm">
              <img src={card.img} alt={card.label} className="w-32 h-32 object-contain mb-4" />
              <span className="text-lg font-medium text-gray-900">{card.label}</span>
            </div>
          ))}
        </div>
      );
    }
    if (data.type === "columns") {
      // For CONTACT LENSES
      return (
        <div className="flex gap-12 py-8 px-8 bg-white border-t border-gray-200">
          {data.columns?.map((col, idx) => (
            <div key={idx} className="min-w-[180px]">
              <div className="font-semibold text-base mb-3">{col.title}</div>
              <ul className="space-y-2">
                {col.items.map((item, i) => (
                  <li key={i} className="text-gray-700 text-[15px] hover:underline cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }
    if (data.type === "category-picks") {
      // For SUNGLASSES
      return (
        <div className="flex py-8 px-8 bg-white border-t border-gray-200">
          {/* Left: Category selection */}
          <div className="w-56 pr-8 border-r border-gray-200">
            <div className="font-semibold text-base mb-3">SELECT CATEGORY</div>
            <div className="space-y-2">
              {data.categories?.map((cat, idx) => (
                <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${idx === 0 ? 'bg-gray-100' : ''}`}>
                  <img src={cat.img} alt={cat.label} className="w-10 h-10 rounded-full object-cover" />
                  <span className="text-lg font-medium text-gray-900">{cat.label}</span>
                  <span className="ml-auto text-gray-400">&gt;</span>
                </div>
              ))}
            </div>
          </div>
          {/* Right: Picks and columns */}
          <div className="flex-1 flex gap-12 pl-8">
            <div className="w-64">
              <div className="font-semibold text-base mb-3">Our Top Picks</div>
              <ul className="space-y-2">
                {data.topPicks?.map((pick, i) => (
                  <li key={i} className="text-gray-700 text-[15px] hover:underline cursor-pointer">{pick}</li>
                ))}
              </ul>
            </div>
            <div className="w-64">
              <div className="font-semibold text-base mb-3">Shape</div>
              <ul className="space-y-2">
                {data.shapes?.map((shape, i) => (
                  <li key={i} className="text-gray-700 text-[15px] hover:underline cursor-pointer">{shape}</li>
                ))}
              </ul>
            </div>
            <div className="w-64">
              <div className="font-semibold text-base mb-3">Collection</div>
              <ul className="space-y-2">
                {data.collections?.map((col, i) => (
                  <li key={i} className="text-gray-700 text-[15px] hover:underline cursor-pointer">{col}</li>
                ))}
              </ul>
            </div>
            <div className="w-64">
              <div className="font-semibold text-base mb-3">Brands</div>
              <ul className="space-y-2">
                {data.brands?.map((brand, i) => (
                  <li key={i} className="text-gray-700 text-[15px] hover:underline cursor-pointer">{brand}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Handler for navigation button click
  const handleCategoryClick = (cat: string) => {
    // Map category to the correct shop route path
    const categoryToPath: Record<string, string> = {
      'EYEGLASSES': '/eyeglasses',
      'SCREEN GLASSES': '/screen-glasses',
      'KIDS GLASSES': '/kids-glasses',
      'CONTACT LENSES': '/contact-lenses',
      'SUNGLASSES': '/sunglasses',
      'HOME EYE-TEST': '/home-eye-test',
      'STORE LOCATOR': '/store-locator',
    };
    const path = categoryToPath[cat] || '/';
    navigate(path);
  };

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 text-xs text-blue-900 flex justify-between px-8 py-1">
        <div className="flex gap-2">
          <span>Do More, Be More</span>
          <span>|</span>
          <span>StoreLocator</span>
          <span>|</span>
          <span>Singapore</span>
          <span>|</span>
          <span>UAE</span>
          <span>|</span>
          <span>John Jacobs</span>
          <span>|</span>
          <span>Aqualens</span>
          <span>|</span>
          <span>Cobrowsing</span>
          <span>|</span>
          <span>Engineering Blog</span>
          <span>|</span>
          <span>Partner With Us</span>
          <span>|</span>
          <span>Meet our Stars ⭐</span>
        </div>
        <div>Contact Us</div>
      </div>
      {/* Main Header */}
      <div className="flex items-center justify-between px-8 py-4 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}> 
          <img
            src="https://static.lenskart.com/media/desktop/img/site-images/main_logo.svg"
            alt="lenskart"
            className="h-12 md:h-14 w-auto"
          />
        </div>
        {/* Phone */}
        <div className="flex items-center gap-2 text-blue-900 font-bold text-lg">
          <Phone className="w-5 h-5 mr-2 text-blue-900" />
          99998 99998
        </div>
        {/* Search */}
        <div className="flex-1 mx-8">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full border border-gray-300 rounded px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        {/* Actions */}
        <div className="flex items-center gap-6 text-blue-900">
          <span className="cursor-pointer">Track Order</span>
          {user ? (
            <>
              <span className="font-medium text-blue-900">
                Hi, {user.name ? user.name.split(" ")[0] : user.email}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer"
            >
              Sign In & Sign Up
            </span>
          )}
          <span className="cursor-pointer flex items-center gap-1" onClick={() => navigate('/wishlist')}>
            <Heart className="w-5 h-5 mr-1" />
            Wishlist
          </span>
          <span className="cursor-pointer flex items-center gap-1" onClick={() => navigate('/cart')}>
            <ShoppingCart className="w-5 h-5 mr-1" />
            Cart
          </span>
        </div>
      </div>
      {/* Category Bar */}
      <div className="flex items-center justify-between px-8 py-2 bg-[#fcfbfa] border-b border-gray-100 relative">
        <div className="flex items-center gap-8">
          {categories.map((cat) => (
            <div
              key={cat}
              className="relative"
              onMouseEnter={() => setHoveredCategory(cat)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <span
                className={`cursor-pointer font-semibold text-base px-1.5 py-1 hover:text-teal-600 transition-colors ${
                  hoveredCategory === cat ? "border-b-2 border-blue-900" : ""
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </span>
              {/* Mega Menu */}
              {hoveredCategory === cat && megaMenuData[cat] && megaMenuData[cat].left && megaMenuData[cat].columns && (
                <div className="absolute left-0 top-full w-screen bg-white shadow-lg border-t border-gray-200 z-50">
                  <div className="flex px-8 py-6 gap-8">
                    {/* Left: Category Selection */}
                    <div className="w-56">
                      <div className="font-bold mb-4">SELECT CATEGORY</div>
                      <div className="space-y-2">
                        {megaMenuData[cat].left?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center rounded-lg p-2 hover:bg-gray-100 cursor-pointer"
                          >
                            <img
                              src={item.img}
                              alt={item.label}
                              className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                              <div className="font-medium">{item.label}</div>
                              <div className="text-xs text-gray-500 whitespace-pre-line">
                                {item.desc}
                              </div>
                            </div>
                            <span className="ml-auto">&gt;</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Right: Columns */}
                    <div className="flex-1 grid grid-cols-4 gap-8">
                      {megaMenuData[cat].columns?.map((col, idx) => (
                        <div key={idx}>
                          <div className="font-bold mb-2">{col.title}</div>
                          <ul className="space-y-1 text-gray-600">
                            {col.items.map((item, i) => (
                              <li
                                key={i}
                                className="hover:text-teal-600 cursor-pointer"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {/* Render new mega menu types */}
              {hoveredCategory === cat && (
                <div className="fixed left-0 top-[calc(100%+2px)] w-full z-30 min-w-[900px] shadow-xl">
                  {/* Robust mega menu rendering: check for left/columns, fallback to renderMegaMenu, never crash */}
                  {megaMenuData[cat]?.left && megaMenuData[cat]?.columns ? (
                    <div className="flex bg-white border-t border-gray-200 mx-auto max-w-screen-xl">
                      {/* Left: Category Selection */}
                      <div className="w-56">
                        <div className="font-bold mb-4">SELECT CATEGORY</div>
                        <div className="space-y-2">
                          {megaMenuData[cat].left?.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center rounded-lg p-2 hover:bg-gray-100 cursor-pointer"
                            >
                              <img
                                src={item.img}
                                alt={item.label}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <div className="font-medium">{item.label}</div>
                                <div className="text-xs text-gray-500 whitespace-pre-line">
                                  {item.desc}
                                </div>
                              </div>
                              <span className="ml-auto">&gt;</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Right: Columns */}
                      <div className="flex-1 grid grid-cols-4 gap-8">
                        {megaMenuData[cat].columns?.map((col, idx) => (
                          <div key={idx}>
                            <div className="font-bold mb-2">{col.title}</div>
                            <ul className="space-y-1 text-gray-600">
                              {col.items.map((item, i) => (
                                <li
                                  key={i}
                                  className="hover:text-teal-600 cursor-pointer"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // fallback: use renderMegaMenu, or show a message if no data
                    renderMegaMenu(cat) || (
                      <div className="bg-white p-8 text-center text-gray-500">No menu data available.</div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* 3D TRY ON, BLU, GOLD MAX */}
        <div className="flex items-center gap-2">
          <button className="bg-teal-400 text-white px-4 py-2 rounded font-semibold">
            3D TRY ON
          </button>
          <button className="bg-blue-100 text-blue-900 px-4 py-2 rounded font-semibold">
            BLU
          </button>
          <button className="bg-black text-yellow-300 px-4 py-2 rounded font-semibold">
            GOLD{" "}
            <span className="text-xs">MAX</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
