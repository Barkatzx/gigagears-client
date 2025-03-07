const Footer = () => {
  return (
    <footer className="bg-gray-100 text-base-content px-6 py-10 lg:px-40 lg:py-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start lg:gap-20 gap-10">
        {/* Left Section - Logo & Description */}
        <div className="text-left lg:w-1/3">
          <img
            src="./src/assets/img/logo.png"
            alt="GigaGears"
            className="w-36"
          />
          <p className="mt-4 text-gray-600">
            Shop top-quality computer accessories at GigaGears! From keyboards
            to gaming gear, we’ve got everything you need. Stay connected for
            the latest deals and updates!
          </p>
        </div>

        {/* Middle Section - Company & Legal */}
        <div className="flex flex-row sm:flex-row  w-full lg:justify-center lg:w-2/3 gap-20 lg:gap-40">
          {/* Company */}
          <div>
            <h6 className="font-[Recoleta] font-bold text-lg text-black mb-3">
              Company
            </h6>
            <a
              className="block text-gray-600 hover:text-blue-600 mb-2"
              href="#"
            >
              About Us
            </a>
            <a
              className="block text-gray-600 hover:text-blue-600 mb-2"
              href="#"
            >
              Contact
            </a>
            <a
              className="block text-gray-600 hover:text-blue-600 mb-2"
              href="#"
            >
              Jobs
            </a>
            <a className="block text-gray-600 hover:text-blue-600" href="#">
              Press Kit
            </a>
          </div>

          {/* Legal */}
          <div>
            <h6 className="font-bold text-lg text-black mb-3 font-[Recoleta]">
              Legal
            </h6>
            <a
              className="block text-gray-600 hover:text-blue-600 mb-2"
              href="#"
            >
              Terms of Use
            </a>
            <a
              className="block text-gray-600 hover:text-blue-600 mb-2"
              href="#"
            >
              Privacy Policy
            </a>
            <a className="block text-gray-600 hover:text-blue-600" href="#">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
