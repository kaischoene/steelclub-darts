import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Apple, Mail, ArrowRight } from "lucide-react";
import { Logo, LogoIcon } from "../components/Logo";
import { players } from "../data/players";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const nav = useNavigate();

  const togglePlayer = (slug: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  if (step === 0) {
    // Splash
    return (
      <div className="min-h-screen bg-bg-surface relative overflow-hidden flex flex-col">
        <div className="absolute inset-0 bg-accent-lines pointer-events-none" />
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <Logo variant="stacked" className="mb-6" />
          <p className="text-lg font-semibold text-ink mt-2">Dein Dart. Deine Liga. Dein Club.</p>
        </div>
        <div className="p-6 pb-10 relative">
          <button
            onClick={() => setStep(1)}
            className="w-full bg-orange hover:bg-orange-bright text-white font-bold py-4 rounded-pill shadow-orange-strong transition active:scale-95"
          >
            Jetzt starten
          </button>
          <Link to="/" className="block text-center mt-4 text-sm text-ink-mid font-semibold underline">
            Ohne Account fortfahren
          </Link>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <OnboardingShell
        step={1}
        onBack={() => setStep(0)}
        onContinue={() => setStep(2)}
        skipLabel="Später"
      >
        <div className="flex flex-col items-center text-center mt-6">
          <div className="w-24 h-24 rounded-3xl bg-purple/15 flex items-center justify-center mb-6">
            <MapPin size={42} className="text-orange" strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-ink tracking-tight">Standort freigeben</h1>
          <p className="text-base text-ink-mid mt-3 max-w-sm">
            Wir zeigen dir Dart-Events und Turniere in deiner Nähe – auf Karte und im Feed.
          </p>
        </div>
      </OnboardingShell>
    );
  }

  if (step === 2) {
    return (
      <OnboardingShell
        step={2}
        onBack={() => setStep(1)}
        onContinue={() => setStep(3)}
        primaryLabel={`Weiter${selectedPlayers.length > 0 ? ` (${selectedPlayers.length})` : ""}`}
      >
        <div className="mt-4">
          <h1 className="text-2xl font-black text-ink tracking-tight px-2">Lieblingsspieler wählen</h1>
          <p className="text-sm text-ink-mid mt-1 px-2">Tippe Spieler an, denen du folgen möchtest.</p>

          <div className="grid grid-cols-3 gap-3 mt-6">
            {players.slice(0, 9).map((p) => {
              const selected = selectedPlayers.includes(p.slug);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePlayer(p.slug)}
                  className={`flex flex-col items-center transition-all active:scale-95 ${selected ? "" : "opacity-90 hover:opacity-100"}`}
                >
                  <div className={`w-20 h-20 rounded-full overflow-hidden ring-4 transition-all ${selected ? "ring-orange shadow-orange" : "ring-transparent shadow-soft"}`}>
                    <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <p className={`text-xs font-bold mt-2 ${selected ? "text-orange" : "text-ink"}`}>{p.shortName}</p>
                </button>
              );
            })}
          </div>
        </div>
      </OnboardingShell>
    );
  }

  // Step 3: SSO
  return (
    <OnboardingShell step={3} onBack={() => setStep(2)} hideContinue>
      <div className="flex flex-col items-center mt-8">
        <LogoIcon className="w-20 h-20 mb-5" />
        <h1 className="text-2xl font-black text-ink tracking-tight text-center">Account erstellen</h1>
        <p className="text-sm text-ink-mid mt-2 text-center max-w-sm">
          Optional – aber empfohlen für volle Funktionen wie Scorer-Sync und Community.
        </p>

        <div className="w-full max-w-sm mt-8 space-y-3">
          <button className="w-full bg-bg-base text-white font-bold py-4 rounded-pill flex items-center justify-center gap-3 transition active:scale-95 hover:bg-bg-elevated">
            <Apple size={20} fill="white" />
            Mit Apple anmelden
          </button>
          <button className="w-full bg-bg-surface border border-white/15 text-ink font-bold py-4 rounded-pill flex items-center justify-center gap-3 transition active:scale-95 hover:bg-surface-gray">
            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Mit Google anmelden
          </button>
          <button onClick={() => nav("/")} className="w-full bg-orange hover:bg-orange-bright text-white font-bold py-4 rounded-pill shadow-orange flex items-center justify-center gap-3 transition active:scale-95">
            <Mail size={18} />
            Mit E-Mail registrieren
          </button>
        </div>

        <button onClick={() => nav("/")} className="mt-8 text-sm text-ink-mid font-semibold underline">
          Vorerst überspringen
        </button>
      </div>
    </OnboardingShell>
  );
}

function OnboardingShell({
  step,
  children,
  onBack,
  onContinue,
  primaryLabel = "Weiter",
  skipLabel,
  hideContinue,
}: {
  step: number;
  children: React.ReactNode;
  onBack: () => void;
  onContinue?: () => void;
  primaryLabel?: string;
  skipLabel?: string;
  hideContinue?: boolean;
}) {
  return (
    <div className="min-h-screen bg-bg-surface relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-accent-lines pointer-events-none" />

      <header className="p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-sm font-semibold text-ink-mid">
          Zurück
        </button>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={`h-1.5 rounded-full transition-all ${
                s === step ? "w-6 bg-orange" : "w-1.5 bg-ink-light"
              }`}
            />
          ))}
        </div>
        <div className="w-12" />
      </header>

      <div className="flex-1 px-6 relative z-10">{children}</div>

      {!hideContinue && (
        <div className="p-6 pb-10 relative space-y-3">
          <button
            onClick={onContinue}
            className="w-full bg-orange hover:bg-orange-bright text-white font-bold py-4 rounded-pill shadow-orange-strong flex items-center justify-center gap-2 transition active:scale-95"
          >
            {primaryLabel}
            <ArrowRight size={18} />
          </button>
          {skipLabel && (
            <button onClick={onContinue} className="block w-full text-center text-sm text-ink-mid font-semibold">
              {skipLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
