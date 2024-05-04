const HeroSection = () => {
  return (
    <div className="h-screen w-screen bg-primary text-center flex items-center justify-center">
      <div className="flex flex-col gap-[30px]">
        <h1 className="text-3xl font-medium">Planet0</h1>
        <p className="text-[18px]">
          Invest in Transparency, Power a Green Future
        </p>
        <div>
          <button className="rounded-full px-[15px] py-[10px] bg-white border border-solid border-black hover:bg-black hover:text-white transition-all">
            Invest now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
