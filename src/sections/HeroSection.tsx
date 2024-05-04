import { ClientRouting } from "@/constants/routing";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="text-center flex items-center justify-center min-h-screen w-screen relative">
      <div className="flex flex-col gap-[30px] text-hero z-10 relative">
        <h1 className="text-5xl font-medium">Planet0</h1>
        <p className="text-[18px]">
          Invest in Transparency, Power a Green Future
        </p>
      </div>
      <Image
        src={`${ClientRouting.imageURL}/bg.png`}
        alt="logo"
        className="w-full h-full top-0 left-0 absolute object-cover"
        width={324}
        height={174}
      />
    </div>
  );
};

export default HeroSection;
