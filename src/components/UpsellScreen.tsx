import { useState, useEffect } from "react";
import {
  Check,
  Zap,
  Lock,
  CreditCard,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import StoreHeader from "@/components/StoreHeader";
import alertShield from "@/assets/alert-shield.png";
import correiosLogo from "@/assets/correios-logo.png";
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
    <div className="min-h-screen bg-background p-4 pt-20 pb-10">
      <StoreHeader />
      <div className="mx-auto max-w-sm space-y-6 animate-slide-up">

        {/* ALERTA */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <img src={alertShield} alt="Alerta" className="h-10 w-10 object-contain" />
            <h2 className="text-lg font-extrabold text-primary flex items-center gap-1.5">
              Alta demanda na sua região
            </h2>
          </div>
          <p className="text-base text-foreground/80 leading-relaxed">
            Seu pedido foi confirmado, mas entrou automaticamente na{" "}
            <span className="font-bold text-primary">fila padrão de envio</span>. 
            Isso significa que ele será processado junto com todos os outros pedidos da sua região, 
            o que pode resultar em atrasos consideráveis.
          </p>
        </div>

        <hr className="border-border" />

        {/* FILA */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-base font-bold text-foreground">
              📦 {queueCount.toLocaleString("pt-BR")} pedidos na frente
            </span>
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              Fila alta
            </span>
          </div>
          <div className="relative h-3.5 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
              style={{ width: "15%" }}
            />
            <div
              className={`absolute left-[13%] top-0 h-full w-3 rounded-full bg-primary transition-opacity duration-500 ${
                pulse ? "opacity-100" : "opacity-40"
              }`}
            />
          </div>
          <p className="text-sm text-foreground/60">
            Isso pode aumentar <span className="text-primary font-bold">significativamente</span> o prazo de entrega.
          </p>
        </div>

        {/* SOLUÇÃO */}
        <div className="space-y-2">
          <h2 className="text-lg font-extrabold text-foreground">
            ⚡ Receba em até 2 dias úteis
          </h2>
          <p className="text-base text-foreground/80 leading-relaxed">
            Você pode <span className="font-bold text-foreground">priorizar seu envio</span> e 
            sair da fila comum agora mesmo. Ao ativar a prioridade, seu pedido é separado e 
            encaminhado diretamente para o setor de envio expresso.
          </p>
        </div>

        {/* ENVIO EXPRESSO */}
        <div className="rounded-2xl border-2 border-brand-green bg-card p-5 space-y-4 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-brand-green text-brand-green-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl">
            RECOMENDADO
          </div>
          <div className="flex items-center gap-3">
            <img src={correiosLogo} alt="Correios" className="h-12 w-12 object-contain" />
            <div>
              <h2 className="text-lg font-extrabold text-foreground">
                Envio Expresso Prioritário
              </h2>
              <p className="text-sm text-brand-green font-semibold">Entrega acelerada</p>
            </div>
          </div>
          <ul className="space-y-2">
            {[
              "Envio imediato com prioridade logística",
              "Redução do prazo para até 2 dias úteis",
              "Processamento antecipado do seu pedido",
            ].map((text) => (
              <li key={text} className="flex items-center gap-2.5 text-base text-foreground/80">
                <Check className="h-4 w-4 text-brand-green shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {/* RASTREAMENTO */}
        <div className="space-y-3">
          <h2 className="text-lg font-extrabold text-foreground">
            📦 Acompanhamento completo do seu pedido
          </h2>
          <div>
            <Badge className="bg-brand-green text-brand-green-foreground text-sm px-3 py-1 mb-2 hover:bg-brand-green/90">
              Código de Rastreio dos Correios
            </Badge>
            <p className="text-base text-foreground/80 leading-relaxed mt-2">
              Ao ativar o envio prioritário, você recebe atualizações em tempo real do envio 
              e acompanhamento completo até a entrega. No envio padrão, o rastreio pode levar 
              dias para ser liberado. Com o envio prioritário, ele é gerado mais rapidamente 
              após a postagem — você poderá acompanhar cada etapa com total segurança.
            </p>
          </div>
        </div>

        {/* BÔNUS */}
        <div className="rounded-2xl border border-brand-green/30 bg-brand-green/5 p-4 space-y-2">
          <div className="flex items-center gap-3">
            <img src={giftBox} alt="Bônus" className="h-10 w-10 object-contain" />
            <h2 className="text-base font-extrabold text-foreground">Bônus exclusivo</h2>
          </div>
          <p className="text-base text-foreground/80">
            Garantia estendida de <span className="font-extrabold text-foreground">30 dias</span>{" "}
            com reembolso via <span className="font-extrabold text-brand-green">PIX imediato</span> em caso de insatisfação.
          </p>
        </div>

        {/* PREÇO */}
        <div className="text-center py-2 space-y-1">
          <p className="text-base text-muted-foreground">De <span className="line-through">R$49,90</span> por</p>
          <p className="text-4xl font-extrabold text-primary">R$24,90</p>
          <p className="text-sm text-muted-foreground">Pagamento único • Sem mensalidade</p>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <button className="w-full h-14 rounded-2xl bg-brand-green text-brand-green-foreground font-bold text-base transition-all active:scale-[0.97] hover:opacity-90 flex items-center justify-center gap-2 shadow-lg shadow-brand-green/25">
            <Zap className="h-5 w-5" />
            Quero receber em até 2 dias
          </button>
          <button className="w-full h-12 rounded-2xl bg-secondary text-foreground font-semibold text-sm transition-all active:scale-[0.97] hover:opacity-90 shadow-sm border border-border">
            Continuar com envio padrão (15–20 dias)
          </button>
        </div>

        {/* CONFIANÇA */}
        <div className="flex items-center justify-center gap-5 pt-1 pb-1">
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

        <p className="text-center text-xs text-muted-foreground pt-1">
          Loja Rosa Mistério
        </p>
      </div>
    </div>
  );
};

export default UpsellScreen;
