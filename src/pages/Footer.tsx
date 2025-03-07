const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-gray-100 text-base-content lg:px-40 lg:py-20 py-4 px-4">
        <aside>
          <img
            src="./src/assets/img/logo.png"
            alt="GigaGears"
            className="w-36"
          />
          <p className="">
            Shop top-quality computer accessories at GigaGears!
            <br /> From keyboards to gaming gear, <br />
            we’ve got everything you need. <br />
            Stay connected for the latest deals and updates!
          </p>
        </aside>
        <nav>
          <h6 className="footer-title font-[Recoleta]">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title font-[Recoleta]">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title font-[Recoleta]">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
