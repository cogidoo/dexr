export type MockCandidate = {
  id: string;
  name: string;
  setName: string;
  collectorNumber: string;
  rarity: string;
  score: number;
  evidence: string;
};

export type MockScanResult = {
  extractedName: string;
  collectorNumber: string;
  setHint: string;
  confidence: number;
  candidates: MockCandidate[];
};

const fallbackCandidates: MockCandidate[] = [
  {
    id: "base1-4",
    name: "Charizard",
    setName: "Base Set",
    collectorNumber: "4/102",
    rarity: "Rare Holo",
    score: 0.76,
    evidence: "Collector number and name fragment align strongly.",
  },
  {
    id: "sv3-125",
    name: "Charizard ex",
    setName: "Obsidian Flames",
    collectorNumber: "125/197",
    rarity: "Double Rare",
    score: 0.54,
    evidence: "Name aligns, but set hint is uncertain.",
  },
  {
    id: "swshp-SWSH260",
    name: "Charizard",
    setName: "SWSH Black Star Promos",
    collectorNumber: "SWSH260",
    rarity: "Promo",
    score: 0.38,
    evidence: "Weak fallback candidate from broad name match.",
  },
];

export function mockIdentifyCard(fileName: string): MockScanResult {
  const normalized = fileName.toLowerCase();

  if (normalized.includes("pikachu")) {
    return {
      extractedName: "Pikachu",
      collectorNumber: "58/102",
      setHint: "Base Set",
      confidence: 0.82,
      candidates: [
        {
          id: "base1-58",
          name: "Pikachu",
          setName: "Base Set",
          collectorNumber: "58/102",
          rarity: "Common",
          score: 0.89,
          evidence: "Name, number, and set hint all agree.",
        },
        {
          id: "svp-088",
          name: "Pikachu",
          setName: "Scarlet & Violet Promos",
          collectorNumber: "088",
          rarity: "Promo",
          score: 0.42,
          evidence: "Name aligns, but collector number conflicts.",
        },
      ],
    };
  }

  if (normalized.includes("bulbasaur")) {
    return {
      extractedName: "Bulbasaur",
      collectorNumber: "44/102",
      setHint: "Base Set",
      confidence: 0.78,
      candidates: [
        {
          id: "base1-44",
          name: "Bulbasaur",
          setName: "Base Set",
          collectorNumber: "44/102",
          rarity: "Common",
          score: 0.87,
          evidence: "Strong exact match from name fragment and number.",
        },
        {
          id: "sv151-001",
          name: "Bulbasaur",
          setName: "Scarlet & Violet 151",
          collectorNumber: "001/165",
          rarity: "Common",
          score: 0.51,
          evidence: "Secondary fallback from name-only match.",
        },
      ],
    };
  }

  return {
    extractedName: "Charizard",
    collectorNumber: "4/102",
    setHint: "Base Set",
    confidence: 0.71,
    candidates: fallbackCandidates,
  };
}
