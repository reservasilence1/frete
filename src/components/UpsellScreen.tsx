import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Check,
  Package,
  Rocket,
  Truck,
  Gift,
  Lock,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

const UpsellScreen = () => {
  const [queueCount, setQueueCount] = useState(0);

  useEffect(() => {
    setQueueCount(Math.floor(Math.random() * (1800 - 800 + 1)) + 800);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 pb-8">
      <div className="mx-auto max-w-sm space-y-4 animate-slide-up">
        {/* BLOCO 1 — Alerta */}
        <div className="rounded-xl border border-brand-red/20 bg-brand-red/5 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-brand-red shrink-0" />
            <h2 className="text-sm font-bold text-brand-red">
              Alta demanda na sua região
            </h2>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Seu pedido foi confirmado, mas entrou automaticamente na{" "}
            <span className="font-bold text-foreground">
              fila padrão de envio.
            </span>
          </p>
        </div>

        {/* BLOCO 2 — Fila visual */}
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-bold text-foreground">
              📦 {queueCount.toLocaleString("pt-BR")} pedidos na frente do seu
            </span>
          </div>
          <div className="relative h-3 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-brand-red/70"
              style={{ width: "12%" }}
            />
            <div className="absolute left-[10%] top-0 h-full w-2 rounded-full bg-brand-red animate-pulse" />
          </div>
          <p className="text-xs text-muted-foreground">
            Isso pode aumentar significativamente o prazo de entrega.
          </p>
        </div>

        {/* BLOCO 3 — Solução */}
        <div className="rounded-xl border border-brand-green/30 bg-brand-green/5 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-brand-green" />
            <h2 className="text-sm font-bold text-foreground">
              Receba em até 2 dias úteis
            </h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Você pode priorizar seu envio e sair da fila comum agora mesmo.
          </p>
        </div>

        {/* BLOCO 4 — Oferta */}
        <div className="rounded-xl border-2 border-primary bg-card p-5 space-y-4 shadow-md">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <h2 className="text-base font-bold text-foreground">
              Envio Expresso Prioritário
            </h2>
          </div>
          <ul className="space-y-2.5">
            {[
              "Envio imediato com prioridade logística",
              "Redução do prazo para até 2 dias úteis",
              "Processamento antecipado do seu pedido",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                <Check className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* BLOCO 5 — Rastreamento */}
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-bold text-foreground">
              📦 Acompanhamento completo do seu pedido
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Ao ativar o envio prioritário, você recebe:
          </p>
          <ul className="space-y-2">
            {[
              "Código de rastreio dos Correios",
              "Atualizações em tempo real do envio",
              "Acompanhamento completo até a entrega",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                <Check className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <div className="rounded-lg bg-secondary/80 p-3 space-y-1">
            <p className="text-xs text-muted-foreground leading-relaxed">
              No envio padrão, o rastreio pode levar dias para ser liberado.
              Com o envio prioritário, ele é gerado mais rapidamente após a
              postagem.
            </p>
          </div>
          <p className="text-xs font-medium text-foreground/70">
            Você poderá acompanhar cada etapa do envio com total segurança.
          </p>
        </div>

        {/* BLOCO 6 — Bônus */}
        <div className="rounded-xl border border-brand-green/20 bg-brand-green/5 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-brand-green" />
            <h2 className="text-sm font-bold text-foreground">
              🎁 Bônus exclusivo
            </h2>
          </div>
          <p className="text-sm text-foreground/80">
            Garantia estendida de <span className="font-bold">30 dias</span>{" "}
            com reembolso via PIX imediato em caso de insatisfação.
          </p>
        </div>

        {/* Preço */}
        <div className="text-center py-2">
          <p className="text-sm text-muted-foreground">Por apenas</p>
          <p className="text-3xl font-extrabold text-primary">R$14,90</p>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <button className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold text-base transition-all active:scale-[0.98] hover:opacity-90 flex items-center justify-center gap-2">
            Quero receber em até 2 dias
          </button>

          <button className="w-full text-center text-xs text-muted-foreground hover:text-foreground/60 transition-colors py-2">
            Continuar com envio padrão (15–20 dias)
          </button>
        </div>

        {/* Bloco de confiança */}
        <div className="flex items-center justify-center gap-6 pt-2 pb-1">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            <span>Compra segura</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Package className="h-3.5 w-3.5" />
            <span>Via Correios</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CreditCard className="h-3.5 w-3.5" />
            <span>Pgto. protegido</span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pt-2">
          Loja Rosa Mistério
        </p>
      </div>
    </div>
  );
};

export default UpsellScreen;
