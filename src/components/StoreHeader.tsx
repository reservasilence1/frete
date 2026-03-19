import { Store } from "lucide-react";

const StoreHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-md">
      <div className="mx-auto max-w-sm flex items-center justify-center gap-2 h-12">
        <Store className="h-4 w-4" />
        <span className="text-sm font-bold tracking-wide">Loja Rosa Mistério</span>
      </div>
    </header>
  );
};

export default StoreHeader;
