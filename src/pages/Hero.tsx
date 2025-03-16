import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router";
const Hero = () => {
  return (
    <section className="bg-gray-100 lg:px-40 py-5 px-5">
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
        {/* Left Side - Text */}
        <div className="text-left lg:w-1/2">
          <h1 className="font-[Recoleta] text-4xl font-bold text-black leading-tight">
            Gear Up for the Ultimate Experience!
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Explore our high-quality computer accessories, from mechanical
            keyboards to top-tier gaming gear. Get the best deals today!
          </p>
          <Link to="/shop">
            <button className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 cursor-pointer transition-all shadow-md hover:shadow-lg">
              <FaShoppingCart className="text-xl" />
              Shop Now 🚀
            </button>
          </Link>
        </div>

        {/* Right Side - Image */}
        <div className="w-full lg:w-1/2 hidden lg:flex justify-center">
          <img
            src="./src/assets/img/hero.png"
            alt="GigaGears Accessories"
            className="w-80 sm:w-96 lg:w-full max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
