import { useState, useCallback } from "react";
import ProcessingScreen from "@/components/ProcessingScreen";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import UpsellScreen from "@/components/UpsellScreen";

type Screen = "processing" | "confirmation" | "upsell";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("processing");

  const goToConfirmation = useCallback(() => setScreen("confirmation"), []);
  const goToUpsell = useCallback(() => {
    setTimeout(() => setScreen("upsell"), 400);
  }, []);

  switch (screen) {
    case "processing":
      return <ProcessingScreen onComplete={goToConfirmation} />;
    case "confirmation":
      return <ConfirmationScreen onContinue={goToUpsell} />;
    case "upsell":
      return <UpsellScreen />;
  }
};

export default Index;
