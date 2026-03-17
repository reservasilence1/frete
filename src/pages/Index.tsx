import { useState, useEffect } from "react";
import {
  Check,
  AlertTriangle,
  AlertCircle,
  Loader2,
  Package,
  Rocket,
  Shield,
  Clock,
  X,
  Zap,
} from "lucide-react";
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
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/10">
          <Loader2 className="h-4 w-4 animate-spin text-brand-gold" />
        </div>
      );
    case "check":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-green/10">
          <Check className="h-4 w-4 text-brand-green" />
        </div>
      );
    case "warning":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-warm/10">
          <AlertTriangle className="h-4 w-4 text-brand-warm" />
        </div>
      );
    case "alert":
      return (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive" />
        </div>
      );
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

    setTimeout(() => {
      onTransition();
    }, 12500);
  }, [onTransition]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-cream p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo area */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-4 py-1.5">
            <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest">
              ✦ Loja Rosa Mistério
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-border/50 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-brown/60">
                Status do pedido
              </span>
              <span className="text-xs font-bold text-brand-gold">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-brand-cream [&>div]:bg-gradient-to-r [&>div]:from-brand-gold [&>div]:to-brand-warm [&>div]:rounded-full" />
          </div>

          {/* Steps */}
          <div className="space-y-3 pt-2">
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
                  className={`text-sm leading-tight ${
                    step.icon === "alert"
                      ? "text-destructive font-semibold"
                      : step.icon === "warning"
                      ? "text-brand-warm font-medium"
                      : "text-brand-brown"
                  }`}
                >
                  {step.text}
                </span>
              </div>
            ))}
          </div>
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
      <div className="flex min-h-screen items-center justify-center bg-brand-cream">
        <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream p-4 md:p-8">
      <div className="mx-auto max-w-xl space-y-4 animate-fade-in py-4">
        {/* Store name */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-gold/10 px-4 py-1.5">
            <span className="text-brand-gold text-xs font-semibold uppercase tracking-widest">
              ✦ Loja Rosa Mistério
            </span>
          </div>
        </div>

        {/* Header Alert - Red prominent */}
        <div className="rounded-2xl border-2 border-destructive/50 bg-gradient-to-br from-destructive/8 to-destructive/3 p-6 shadow-lg shadow-destructive/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/15">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <h1 className="text-base font-extrabold text-destructive uppercase tracking-wide">
              Aviso de Processamento Logístico
            </h1>
          </div>
          <p className="text-brand-brown text-sm leading-relaxed pl-[52px]">
            Seu pedido foi concluído…{" "}
            <span className="font-extrabold text-destructive">
              mas NÃO está liberado para envio imediato.
            </span>
          </p>
        </div>

        {/* Alert Block */}
        <div className="rounded-2xl bg-white p-5 space-y-3 shadow-sm border border-border/50">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-warm/10 shrink-0 mt-0.5">
              <AlertTriangle className="h-4 w-4 text-brand-warm" />
            </div>
            <p className="text-sm text-brand-brown/80 leading-relaxed">
              Devido ao alto volume de entregas na sua região,
              seu pedido foi automaticamente direcionado para:
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-destructive/8 p-4 border border-destructive/20 ml-11">
            <Package className="h-5 w-5 text-destructive shrink-0" />
            <span className="font-extrabold text-destructive uppercase text-sm tracking-wide">
              Modalidade Padrão (Fila Comum)
            </span>
          </div>
        </div>

        {/* Consequences */}
        <div className="rounded-2xl bg-white p-5 space-y-3 shadow-sm border border-destructive/20">
          <h2 className="font-bold text-destructive text-sm uppercase tracking-wide flex items-center gap-2">
            <X className="h-4 w-4" />
            Isso pode resultar em:
          </h2>
          <ul className="space-y-2 pl-1">
            {[
              "Atrasos de até 20 dias ou mais",
              "Reprocessamento do envio",
              "Mudança de rota logística",
              "Risco de retenção temporária",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-brand-brown/80">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-destructive/10 shrink-0">
                  <X className="h-3 w-3 text-destructive" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Belief Break */}
        <div className="rounded-2xl bg-brand-gold/5 border border-brand-gold/20 p-5">
          <p className="text-sm text-brand-brown/70 italic leading-relaxed text-center">
            "Muitos pedidos nessa modalidade enfrentam atrasos porque seguem o
            fluxo padrão sem prioridade."
          </p>
        </div>

        {/* Solution */}
        <div className="rounded-2xl border-2 border-brand-green bg-gradient-to-br from-brand-green/5 to-brand-green/2 p-6 space-y-4 shadow-lg shadow-brand-green/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/15">
              <Rocket className="h-5 w-5 text-brand-green" />
            </div>
            <h2 className="font-extrabold text-brand-brown text-sm uppercase tracking-wide">
              Liberação Prioritária (Envio Expresso)
            </h2>
          </div>

          <p className="text-sm text-brand-brown/70 pl-[52px]">
            Para evitar isso, você pode ativar agora:
          </p>

          <ul className="space-y-2 pl-[52px]">
            {[
              "Seu pedido sai da fila comum imediatamente",
              "Envio antecipado com prioridade logística",
              "Redução drástica no prazo de entrega",
              "Evita gargalos e retenções",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-brand-brown/80">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green/10 shrink-0">
                  <Check className="h-3 w-3 text-brand-green" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Urgency */}
        <div className="rounded-2xl bg-destructive/5 border border-destructive/20 p-5 space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/10 shrink-0">
              <Clock className="h-4 w-4 text-destructive" />
            </div>
            <p className="text-sm font-bold text-destructive leading-relaxed">
              Essa liberação só pode ser feita AGORA, antes do pedido entrar
              definitivamente na fila padrão.
            </p>
          </div>
          <div className="flex items-center gap-3 pl-11">
            <Shield className="h-4 w-4 text-brand-brown/50 shrink-0" />
            <p className="text-xs text-brand-brown/60 font-medium">
              Após sair dessa tela, não será possível alterar o envio.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-1">
          <button className="w-full h-14 rounded-2xl text-base font-extrabold uppercase tracking-wide bg-brand-green hover:bg-brand-green/90 text-brand-green-foreground shadow-lg shadow-brand-green/25 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]">
            <Zap className="h-5 w-5" />
            Liberar envio prioritário — R$14,90
          </button>

          <button className="w-full text-center text-xs text-brand-brown/40 hover:text-brand-brown/60 transition-colors py-2">
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
