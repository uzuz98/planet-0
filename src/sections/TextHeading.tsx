const TextHeading = () => {
  return (
    <div className="vertical-spacing flex items-center min-h-screen w-screen relative bg-[#EEF7FF] text-[#333333]">
      <div className="container">
        <div className="flex flex-col gap-[40px] text-hero z-10 relative text-[20px] max-w-[950px]">
          <h3 className="text-5xl font-medium">
            Investing on Planet0 is easy, powerful, and trusted.
          </h3>
          <p className="">
            Planet0 tackles the critical issue of transparency in green energy
            investments. It connects individuals passionate about sustainability
            with green energy projects seeking funding, fostering a win-win
            situation for both parties.
          </p>
          <p>Still have questions? Learn more about how Planet0 works.</p>
        </div>
      </div>
    </div>
  );
};

export default TextHeading;
