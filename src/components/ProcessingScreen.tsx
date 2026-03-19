import { useState, useEffect } from "react";
import { Check, Loader2, Package, MapPin, ClipboardCheck, Truck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import StoreHeader from "@/components/StoreHeader";

const stages = [
  { label: "Verificando estoque...", threshold: 30, icon: Package },
  { label: "Validando endereço de entrega...", threshold: 60, icon: MapPin },
  { label: "Confirmando pedido...", threshold: 90, icon: ClipboardCheck },
  { label: "Preparando dados de envio...", threshold: 100, icon: Truck },
];

const ProcessingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 7000;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      if (p >= 100) {
        clearInterval(timer);
        setTimeout(onComplete, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const completedStages = stages.filter((s) => progress >= s.threshold);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <h1 className="text-lg font-extrabold text-foreground">
            Processando seu pedido...
          </h1>
          <p className="text-sm text-muted-foreground">
            Aguarde enquanto preparamos tudo para você
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <Progress
            value={progress}
            className="h-3 bg-secondary rounded-full [&>div]:bg-primary [&>div]:rounded-full [&>div]:transition-all [&>div]:duration-100"
          />
          <div className="flex justify-between">
            <p className="text-xs text-muted-foreground">Processando...</p>
            <p className="text-xs font-bold text-primary">
              {Math.round(progress)}%
            </p>
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-3">
          {stages.map((stage, i) => {
            const done = completedStages.includes(stage);
            const isCurrent =
              !done && (i === 0 || stages[i - 1].threshold <= progress);
            const Icon = stage.icon;

            if (!done && !isCurrent) return null;

            return (
              <div
                key={stage.label}
                className="flex items-center gap-3 animate-fade-in rounded-xl border border-border bg-card p-3 shadow-sm"
              >
                {done ? (
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green/10">
                    <Check className="h-4 w-4 text-brand-green" />
                  </div>
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1">
                  <span className={`text-sm font-medium ${done ? "text-foreground" : "text-muted-foreground"}`}>
                    {stage.label}
                  </span>
                </div>
                <Icon className={`h-4 w-4 ${done ? "text-brand-green" : "text-muted-foreground/40"}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;
