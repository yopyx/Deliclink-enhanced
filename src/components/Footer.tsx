const Footer = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="bg-orange-950 h-48 flex items-center">
        <h2 className="w-max mx-auto text-white text-3xl font-bold md-h:text-2xl mobile:text-lg">
          %Offers% everyday and more..
        </h2>
      </div>
      <div className="mx-auto flex justify-evenly md:hidden">
        <img
          alt="mobile app1"
          src="/footer1.png"
          className="w-[25%] object-cover"
        />
        <img
          alt="mobile app1"
          src="/footer2.png"
          className="w-[25%] object-cover"
        />
      </div>
    </div>
  );
};

export default Footer;
