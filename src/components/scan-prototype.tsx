"use client";

import { useMemo, useState } from "react";
import { mockIdentifyCard, type MockScanResult } from "@/lib/mock-matching";

type ScanState = "idle" | "processing" | "done";

const emptyResult: MockScanResult | null = null;

export function ScanPrototype() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [result, setResult] = useState<MockScanResult | null>(emptyResult);

  const topCandidate = useMemo(() => result?.candidates[0] ?? null, [result]);

  async function handleFileChange(file: File | null) {
    if (!file) {
      return;
    }

    setSelectedFileName(file.name);
    setScanState("processing");
    setResult(emptyResult);

    await new Promise((resolve) => window.setTimeout(resolve, 900));

    setResult(mockIdentifyCard(file.name));
    setScanState("done");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-6">
      <section className="rounded-[28px] border border-line bg-card/95 p-5 shadow-panel backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accentDark">
          dexr prototype
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-tight text-ink">
          Karten erfassen, bevor wir das Inventar bauen.
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-700">
          Dieser erste Spike testet nur den kritischsten Teil des MVPs:
          Kartenfoto rein, Hinweise extrahieren, plausible Treffer zeigen.
        </p>
      </section>

      <section className="mt-5 rounded-[28px] bg-pine p-5 text-white shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
          Scan-Eingang
        </p>
        <h2 className="mt-2 text-2xl font-semibold">
          Foto hochladen oder direkt mit der Handy-Kamera aufnehmen
        </h2>
        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-white/60 bg-white/10 px-4 py-8 text-center transition hover:bg-white/15">
          <span className="text-base font-semibold">Kartenbild auswaehlen</span>
          <span className="mt-2 text-sm text-amber-50/90">
            `capture=&quot;environment&quot;` oeffnet auf vielen Smartphones direkt
            die Rueckkamera.
          </span>
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              void handleFileChange(file);
            }}
          />
        </label>
        <p className="mt-3 text-xs text-amber-50/90">
          Noch ohne echte OCR: Wir simulieren den Matching-Schritt, damit wir den
          Nutzerfluss und die Produktannahmen schnell testen koennen.
        </p>
      </section>

      <section className="mt-5 rounded-[28px] border border-line bg-card/95 p-5 shadow-panel">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accentDark">
              Pipeline-Status
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">
              OCR und Matching
            </h2>
          </div>
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
            {scanState === "idle"
              ? "bereit"
              : scanState === "processing"
                ? "laeuft"
                : "fertig"}
          </span>
        </div>

        <dl className="mt-5 grid gap-3 text-sm text-slate-700">
          <div className="rounded-2xl bg-background p-3">
            <dt className="font-semibold text-ink">Datei</dt>
            <dd className="mt-1">{selectedFileName || "Noch kein Bild gewaehlt"}</dd>
          </div>
          <div className="rounded-2xl bg-background p-3">
            <dt className="font-semibold text-ink">Naechster echter Schritt</dt>
            <dd className="mt-1">
              Tesseract.js anhaengen und echte API-Suche gegen Pokemon TCG API
              umsetzen.
            </dd>
          </div>
        </dl>

        {scanState === "processing" ? (
          <div className="mt-5 rounded-2xl bg-amber-100 p-4 text-sm text-amber-950">
            Bild wird verarbeitet. In der echten Version laufen hier OCR,
            Normalisierung und Kandidaten-Suche.
          </div>
        ) : null}

        {result ? (
          <div className="mt-5 space-y-4">
            <div className="rounded-[24px] bg-background p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accentDark">
                Extrahierte Hinweise
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-slate-700">
                <div>
                  <p className="font-semibold text-ink">Name</p>
                  <p>{result.extractedName}</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Nummer</p>
                  <p>{result.collectorNumber}</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Set-Hinweis</p>
                  <p>{result.setHint}</p>
                </div>
                <div>
                  <p className="font-semibold text-ink">Confidence</p>
                  <p>{Math.round(result.confidence * 100)}%</p>
                </div>
              </div>
            </div>

            {topCandidate ? (
              <div className="rounded-[24px] bg-ink p-4 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-orange-200">
                  Top-Kandidat
                </p>
                <h3 className="mt-2 text-2xl font-semibold">
                  {topCandidate.name}
                </h3>
                <p className="mt-2 text-sm text-slate-200">
                  {topCandidate.setName} · {topCandidate.collectorNumber} ·{" "}
                  {topCandidate.rarity}
                </p>
                <p className="mt-3 text-sm text-slate-300">{topCandidate.evidence}</p>
              </div>
            ) : null}

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accentDark">
                Weitere Kandidaten
              </p>
              <div className="mt-3 space-y-3">
                {result.candidates.map((candidate) => (
                  <article
                    key={candidate.id}
                    className="rounded-[22px] border border-line bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-semibold text-ink">
                          {candidate.name}
                        </h4>
                        <p className="mt-1 text-sm text-slate-700">
                          {candidate.setName} · {candidate.collectorNumber}
                        </p>
                      </div>
                      <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-accentDark">
                        {Math.round(candidate.score * 100)}%
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{candidate.evidence}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  );
}
