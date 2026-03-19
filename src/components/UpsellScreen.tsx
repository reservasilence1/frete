import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Check,
  Rocket,
  Lock,
  CreditCard,
  Package,
  Zap,
  Clock,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import StoreHeader from "@/components/StoreHeader";
import alertShield from "@/assets/alert-shield.png";
import truckFast from "@/assets/truck-fast.png";
import rocketLaunch from "@/assets/rocket-launch.png";
import trackingPin from "@/assets/tracking-pin.png";
import giftBox from "@/assets/gift-box.png";

const UpsellScreen = () => {
  const [queueCount, setQueueCount] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setQueueCount(Math.floor(Math.random() * (1800 - 800 + 1)) + 800);
    const interval = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 pt-16 pb-10">
      <StoreHeader />
      <div className="mx-auto max-w-sm space-y-5 animate-slide-up">

        {/* BLOCO 1 — ALERTA com imagem */}
        <div className="rounded-2xl border-2 border-brand-red/30 bg-gradient-to-br from-brand-red/8 to-brand-red/3 p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-3">
            <img src={alertShield} alt="Alerta" className="h-12 w-12 object-contain" />
            <div>
              <h2 className="text-base font-extrabold text-brand-red flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" />
                Alta demanda na sua região
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Ação necessária</p>
            </div>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            Seu pedido foi confirmado, mas entrou automaticamente na{" "}
            <span className="font-bold text-brand-red">fila padrão de envio.</span>
          </p>
        </div>

        {/* BLOCO 2 — FILA VISUAL */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red/10">
                <TrendingUp className="h-5 w-5 text-brand-red" />
              </div>
              <span className="text-sm font-bold text-foreground">
                {queueCount.toLocaleString("pt-BR")} pedidos na frente
              </span>
            </div>
            <span className="text-xs font-semibold text-brand-red bg-brand-red/10 px-2 py-1 rounded-full">
              Fila alta
            </span>
          </div>
          <div className="relative h-4 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-brand-red/60 to-brand-red"
              style={{ width: "15%" }}
            />
            <div
              className={`absolute left-[13%] top-0 h-full w-3 rounded-full bg-brand-red transition-opacity duration-500 ${
                pulse ? "opacity-100" : "opacity-40"
              }`}
            />
          </div>
          <div className="flex items-center gap-2 bg-brand-red/5 rounded-xl p-3">
            <Clock className="h-4 w-4 text-brand-red shrink-0" />
            <p className="text-xs text-foreground/70 font-medium">
              Isso pode aumentar <span className="text-brand-red font-bold">significativamente</span> o prazo de entrega.
            </p>
          </div>
        </div>

        {/* BLOCO 3 — SOLUÇÃO com imagem */}
        <div className="rounded-2xl border-2 border-brand-green/30 bg-gradient-to-br from-brand-green/8 to-brand-green/3 p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-3">
            <img src={truckFast} alt="Envio rápido" className="h-14 w-14 object-contain" />
            <div>
              <h2 className="text-base font-extrabold text-foreground">
                Receba em até 2 dias úteis
              </h2>
              <p className="text-xs text-brand-green font-semibold mt-0.5">
                ⚡ Solução disponível
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Você pode <span className="font-bold text-foreground">priorizar seu envio</span> e sair da fila comum agora mesmo.
          </p>
        </div>

        {/* BLOCO 4 — OFERTA com imagem */}
        <div className="rounded-2xl border-2 border-primary bg-card p-5 space-y-4 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl">
            RECOMENDADO
          </div>
          <div className="flex items-center gap-3">
            <img src={rocketLaunch} alt="Envio expresso" className="h-14 w-14 object-contain" />
            <div>
              <h2 className="text-base font-extrabold text-foreground">
                Envio Expresso Prioritário
              </h2>
              <p className="text-xs text-primary font-semibold">Entrega acelerada</p>
            </div>
          </div>
          <ul className="space-y-3">
            {[
              { text: "Envio imediato com prioridade logística", icon: Zap },
              { text: "Redução do prazo para até 2 dias úteis", icon: Clock },
              { text: "Processamento antecipado do seu pedido", icon: Rocket },
            ].map(({ text, icon: Icon }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-green/10 shrink-0">
                  <Icon className="h-3.5 w-3.5 text-brand-green" />
                </div>
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* BLOCO 5 — RASTREAMENTO com imagem */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <img src={trackingPin} alt="Rastreamento" className="h-12 w-12 object-contain" />
            <div>
              <h2 className="text-sm font-extrabold text-foreground">
                Acompanhamento completo do seu pedido
              </h2>
              <p className="text-xs text-muted-foreground">Rastreio em tempo real</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Ao ativar o envio prioritário, você recebe:
          </p>
          <ul className="space-y-2.5">
            {[
              "Código de rastreio dos Correios",
              "Atualizações em tempo real do envio",
              "Acompanhamento completo até a entrega",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-green/10 shrink-0">
                  <Check className="h-3.5 w-3.5 text-brand-green" />
                </div>
                {item}
              </li>
            ))}
          </ul>
          <div className="rounded-xl bg-secondary/80 p-3.5 border border-border/50">
            <p className="text-xs text-muted-foreground leading-relaxed">
              ⚠️ No envio padrão, o rastreio pode levar <span className="font-bold text-foreground">dias para ser liberado</span>.
              Com o envio prioritário, ele é gerado <span className="font-bold text-brand-green">mais rapidamente</span> após a postagem.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <p className="text-xs font-semibold text-foreground/70">
              Acompanhe cada etapa do envio com total segurança.
            </p>
          </div>
        </div>

        {/* BLOCO 6 — BÔNUS com imagem */}
        <div className="rounded-2xl border-2 border-brand-green/20 bg-gradient-to-br from-brand-green/8 to-transparent p-5 space-y-2 shadow-sm">
          <div className="flex items-center gap-3">
            <img src={giftBox} alt="Bônus" className="h-12 w-12 object-contain" />
            <div>
              <h2 className="text-sm font-extrabold text-foreground">
                Bônus exclusivo
              </h2>
              <p className="text-xs text-brand-green font-semibold">Presente incluído</p>
            </div>
          </div>
          <p className="text-sm text-foreground/80">
            Garantia estendida de <span className="font-extrabold text-foreground">30 dias</span>{" "}
            com reembolso via <span className="font-extrabold text-brand-green">PIX imediato</span> em caso de insatisfação.
          </p>
        </div>

        {/* PREÇO */}
        <div className="text-center py-3 space-y-1">
          <p className="text-sm text-muted-foreground">Por apenas</p>
          <p className="text-4xl font-extrabold text-primary">R$14,90</p>
          <p className="text-xs text-muted-foreground">Pagamento único • Sem mensalidade</p>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <button className="w-full h-14 rounded-2xl bg-brand-green text-brand-green-foreground font-bold text-base transition-all active:scale-[0.97] hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-brand-green/25">
            <Zap className="h-5 w-5" />
            Quero receber em até 2 dias
          </button>

          <button className="w-full text-center text-xs text-muted-foreground hover:text-foreground/60 transition-colors py-2">
            Continuar com envio padrão (15–20 dias)
          </button>
        </div>

        {/* CONFIANÇA */}
        <div className="flex items-center justify-center gap-5 pt-2 pb-1">
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

        {/* FOOTER */}
        <p className="text-center text-xs text-muted-foreground pt-2">
          Loja Rosa Mistério
        </p>
      </div>
    </div>
  );
};

export default UpsellScreen;
