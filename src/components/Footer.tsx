const Footer = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-orange-950 h-48 flex items-center">
        <h2 className="w-max mx-auto text-white text-3xl font-bold">
          %Offers% everyday and more..
        </h2>
      </div>
      <div className="mx-auto flex justify-evenly">
        <img
          alt="mobile app1"
          src="/footer1.png"
          className="w-[35%] object-cover"
        />
        <img
          alt="mobile app1"
          src="/footer2.png"
          className="w-[35%] object-cover"
        />
      </div>
    </div>
  );
};

export default Footer;
