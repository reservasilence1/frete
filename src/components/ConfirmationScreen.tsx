import { Check, Clock, Package, Shield } from "lucide-react";
import StoreHeader from "@/components/StoreHeader";

const ConfirmationScreen = ({ onContinue }: { onContinue: () => void }) => {
  return (
    <div className="min-h-screen bg-background p-4 pt-16 flex items-center justify-center">
      <StoreHeader />
      <div className="w-full max-w-sm space-y-6 animate-fade-in">
        {/* Success header */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10">
            <Check className="h-8 w-8 text-brand-green" />
          </div>
          <h1 className="text-xl font-bold text-foreground">
            Pedido confirmado com sucesso!
          </h1>
          <p className="text-sm text-muted-foreground">
            Seu pedido já foi aprovado e está em preparação para envio.
          </p>
        </div>

        {/* Order details card */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm space-y-0 divide-y divide-border">
          <div className="flex items-center gap-3 py-3 first:pt-0">
            <Clock className="h-5 w-5 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Prazo</p>
              <p className="text-sm font-semibold text-foreground">
                15 a 20 dias úteis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 py-3">
            <Package className="h-5 w-5 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Envio</p>
              <p className="text-sm font-semibold text-foreground">
                Correios (Padrão)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 py-3 last:pb-0">
            <Shield className="h-5 w-5 text-muted-foreground shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Garantia</p>
              <p className="text-sm font-semibold text-foreground">
                7 dias após entrega
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onContinue}
          className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold text-base transition-all active:scale-[0.98] hover:opacity-90"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
