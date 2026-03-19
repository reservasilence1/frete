import logo from "@/assets/logo-rosa-misterio.png";

const StoreHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="mx-auto max-w-sm flex items-center justify-center gap-2.5 h-14">
        <img src={logo} alt="Rosa Mistério" className="h-9 w-9 rounded-full object-contain" />
        <span className="text-base font-extrabold text-primary tracking-wide">
          Rosa Mistério
        </span>
      </div>
    </header>
  );
};

export default StoreHeader;
