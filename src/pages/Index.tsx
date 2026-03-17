import { useState, useEffect } from "react";
import { Check, AlertTriangle, AlertCircle, Loader2, Package, Rocket, Shield, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Step {
  text: string;
  icon: "loading" | "check" | "warning" | "alert";
  delay: number;
}

const steps: Step[] = [
  { text: "Processando seu pedido…", icon: "loading", delay: 0 },
  { text: "Verificando estoque…", icon: "check", delay: 1500 },
  { text: "Validando endereço de entrega…", icon: "check", delay: 3000 },
  { text: "Confirmando pagamento…", icon: "check", delay: 4500 },
  { text: "Analisando rota de envio…", icon: "warning", delay: 6500 },
  { text: "Identificando gargalos logísticos…", icon: "alert", delay: 8500 },
  { text: "Seu pedido entrou em fluxo padrão (fila comum)", icon: "warning", delay: 10500 },
];

const StepIcon = ({ type }: { type: Step["icon"] }) => {
  switch (type) {
    case "loading":
      return <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />;
    case "check":
      return <Check className="h-5 w-5 text-emerald-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case "alert":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
  }
};

const ProcessingScreen = ({ onTransition }: { onTransition: () => void }) => {
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    steps.forEach((step, index) => {
      setTimeout(() => {
        setVisibleSteps(index + 1);
        setProgress(((index + 1) / steps.length) * 100);
      }, step.delay);
    });

    // Transition after last step
    setTimeout(() => {
      onTransition();
    }, 12500);
  }, [onTransition]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground text-right">
            {Math.round(progress)}%
          </p>
        </div>

        <div className="space-y-4">
          {steps.slice(0, visibleSteps).map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-3 animate-fade-in"
            >
              <StepIcon
                type={
                  index === visibleSteps - 1 && visibleSteps < steps.length
                    ? "loading"
                    : step.icon
                }
              />
              <span
                className={`text-sm font-medium ${
                  step.icon === "alert"
                    ? "text-red-600"
                    : step.icon === "warning"
                    ? "text-amber-600"
                    : "text-foreground"
                }`}
              >
                {step.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AlertScreen = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  if (!visible) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-red-50">
        <Loader2 className="h-8 w-8 animate-spin text-red-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50 p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
        {/* Header Alert */}
        <div className="rounded-lg border-2 border-red-500 bg-white p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-7 w-7 text-red-600" />
            <h1 className="text-xl font-bold text-red-700 uppercase tracking-wide">
              Aviso de Processamento Logístico
            </h1>
          </div>
          <p className="text-foreground text-base leading-relaxed">
            Seu pedido foi concluído…{" "}
            <span className="font-bold text-red-700">
              mas NÃO está liberado para envio imediato.
            </span>
          </p>
        </div>

        {/* Alert Block */}
        <div className="rounded-lg border border-amber-400 bg-amber-50 p-5 space-y-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-900">
              Devido ao alto volume de entregas na sua região, seu pedido foi
              automaticamente direcionado para:
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-amber-100 p-3">
            <Package className="h-5 w-5 text-amber-700" />
            <span className="font-bold text-amber-800 uppercase text-sm tracking-wide">
              Modalidade Padrão (Fila Comum)
            </span>
          </div>
        </div>

        {/* Consequences */}
        <div className="rounded-lg border border-red-300 bg-white p-5 space-y-3">
          <h2 className="font-bold text-red-700 text-base">
            Isso pode resultar em:
          </h2>
          <ul className="space-y-2">
            {[
              "Atrasos de até 20 dias ou mais",
              "Reprocessamento do envio",
              "Mudança de rota logística",
              "Risco de retenção temporária",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-red-800">
                <X className="h-4 w-4 text-red-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Belief Break */}
        <div className="rounded-lg bg-muted p-4">
          <p className="text-sm text-muted-foreground italic leading-relaxed">
            Muitos pedidos nessa modalidade enfrentam atrasos porque seguem o
            fluxo padrão sem prioridade.
          </p>
        </div>

        {/* Solution */}
        <div className="rounded-lg border-2 border-emerald-500 bg-emerald-50 p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-emerald-600" />
            <h2 className="font-bold text-emerald-800 text-base uppercase tracking-wide">
              Liberação Prioritária (Envio Expresso)
            </h2>
          </div>

          <p className="text-sm text-emerald-900">
            Para evitar isso, você pode ativar agora:
          </p>

          <ul className="space-y-2">
            {[
              "Seu pedido sai da fila comum imediatamente",
              "Envio antecipado com prioridade logística",
              "Redução drástica no prazo de entrega",
              "Evita gargalos e retenções",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-emerald-800">
                <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Urgency */}
        <div className="rounded-lg bg-red-100 border border-red-300 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-red-600" />
            <p className="text-sm font-bold text-red-700">
              Essa liberação só pode ser feita AGORA, antes do pedido entrar
              definitivamente na fila padrão.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            <p className="text-xs text-red-600">
              Após sair dessa tela, não será possível alterar o envio.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-2">
          <Button
            className="w-full h-14 text-base font-bold uppercase tracking-wide bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
            size="lg"
          >
            <Rocket className="h-5 w-5 mr-2" />
            Liberar envio prioritário por R$14,90
          </Button>

          <button className="w-full text-center text-xs text-muted-foreground underline hover:text-foreground transition-colors py-2">
            Continuar sem prioridade (assumir risco de atraso)
          </button>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [screen, setScreen] = useState<"processing" | "alert">("processing");

  return screen === "processing" ? (
    <ProcessingScreen onTransition={() => setScreen("alert")} />
  ) : (
    <AlertScreen />
  );
};

export default Index;
