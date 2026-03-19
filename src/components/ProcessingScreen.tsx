import { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const stages = [
  { label: "Verificando estoque...", threshold: 30 },
  { label: "Validando endereço de entrega...", threshold: 60 },
  { label: "Confirmando pedido...", threshold: 90 },
  { label: "Preparando dados de envio...", threshold: 100 },
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
        <div className="text-center space-y-2">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <h1 className="text-lg font-bold text-foreground">
            Processando seu pedido...
          </h1>
        </div>

        <div className="space-y-3">
          <Progress
            value={progress}
            className="h-2.5 bg-secondary [&>div]:bg-primary [&>div]:rounded-full [&>div]:transition-all [&>div]:duration-100"
          />
          <p className="text-right text-xs font-semibold text-muted-foreground">
            {Math.round(progress)}%
          </p>
        </div>

        <div className="space-y-3">
          {stages.map((stage, i) => {
            const done = completedStages.includes(stage);
            const isCurrent =
              !done &&
              (i === 0 || stages[i - 1].threshold <= progress);

            if (!done && !isCurrent) return null;

            return (
              <div
                key={stage.label}
                className="flex items-center gap-3 animate-fade-in"
              >
                {done ? (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-green/10">
                    <Check className="h-4 w-4 text-brand-green" />
                  </div>
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
                <span
                  className={`text-sm ${
                    done ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessingScreen;
