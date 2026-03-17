import { useState, useEffect } from "react";
import { Check, AlertTriangle, AlertCircle, Loader2, Package, Rocket, Shield, Clock, X } from "lucide-react";
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
      return <Loader2 className="h-5 w-5 animate-spin text-brand-gold" />;
    case "check":
      return <Check className="h-5 w-5 text-brand-gold" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-brand-warm" />;
    case "alert":
      return <AlertCircle className="h-5 w-5 text-destructive" />;
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
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-1">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">✦ Loja Rosa Mistério</p>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-1.5 bg-secondary [&>div]:bg-brand-gold" />
          <p className="text-xs text-muted-foreground text-right font-medium">
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
                className={`text-sm ${
                  step.icon === "alert"
                    ? "text-destructive font-semibold"
                    : step.icon === "warning"
                    ? "text-brand-warm font-medium"
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
      <div className="flex min-h-screen items-center justify-center bg-brand-cream">
        <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream p-4 md:p-8">
      <div className="mx-auto max-w-xl space-y-5 animate-fade-in py-4">
        {/* Store name */}
        <p className="text-center text-xs uppercase tracking-widest text-brand-warm">
          ✦ Loja Rosa Mistério
        </p>

        {/* Header Alert */}
        <div className="rounded-xl border-2 border-destructive/40 bg-destructive/5 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="h-7 w-7 text-destructive" />
            <h1 className="text-lg font-bold text-destructive uppercase tracking-wide">
              🚨 Aviso de Processamento Logístico
            </h1>
          </div>
          <p className="text-foreground text-sm leading-relaxed">
            Seu pedido foi concluído…{" "}
            <span className="font-bold text-destructive text-base">
              mas NÃO está liberado para envio imediato.
            </span>
          </p>
        </div>

        {/* Alert Block */}
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 space-y-3">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
            <p className="text-sm text-foreground/80">
              Devido ao alto volume de entregas na sua região, seu pedido foi
              automaticamente direcionado para:
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 border border-destructive/30">
            <Package className="h-5 w-5 text-destructive" />
            <span className="font-bold text-destructive uppercase text-sm tracking-wide">
              ⚠️ Modalidade Padrão (Fila Comum)
            </span>
          </div>
        </div>

        {/* Consequences */}
        <div className="rounded-xl border border-destructive/30 bg-white p-5 space-y-3">
          <h2 className="font-bold text-destructive text-sm uppercase tracking-wide">
            ❌ Isso pode resultar em:
          </h2>
          <ul className="space-y-2.5">
            {[
              "Atrasos de até 20 dias ou mais",
              "Reprocessamento do envio",
              "Mudança de rota logística",
              "Risco de retenção temporária",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/80">
                <X className="h-4 w-4 text-destructive shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Belief Break */}
        <div className="rounded-xl bg-secondary p-4">
          <p className="text-sm text-muted-foreground italic leading-relaxed text-center">
            Muitos pedidos nessa modalidade enfrentam atrasos porque seguem o
            fluxo padrão sem prioridade.
          </p>
        </div>

        {/* Solution */}
        <div className="rounded-xl border-2 border-brand-gold bg-white p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-brand-gold" />
            <h2 className="font-bold text-brand-brown text-sm uppercase tracking-wide">
              Liberação Prioritária (Envio Expresso)
            </h2>
          </div>

          <p className="text-sm text-foreground/70">
            Para evitar isso, você pode ativar agora:
          </p>

          <ul className="space-y-2.5">
            {[
              "Seu pedido sai da fila comum imediatamente",
              "Envio antecipado com prioridade logística",
              "Redução drástica no prazo de entrega",
              "Evita gargalos e retenções",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/80">
                <Check className="h-4 w-4 text-brand-gold shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Urgency */}
        <div className="rounded-xl bg-brand-warm/5 border border-brand-warm/20 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-brand-warm" />
            <p className="text-sm font-semibold text-brand-brown">
              Essa liberação só pode ser feita AGORA, antes do pedido entrar
              definitivamente na fila padrão.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-brand-warm" />
            <p className="text-xs text-muted-foreground">
              Após sair dessa tela, não será possível alterar o envio.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-2">
          <button
            className="w-full h-14 rounded-xl text-base font-bold uppercase tracking-wide bg-brand-gold hover:bg-brand-gold/90 text-white shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <Rocket className="h-5 w-5" />
            Liberar envio prioritário — R$14,90
          </button>

          <button className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors py-2">
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
