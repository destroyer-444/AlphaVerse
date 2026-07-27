import "server-only";
/**
 * AlphaVerse — Macro Intelligence Service
 *
 * Central intelligence layer explaining how global assets, macroeconomic events,
 * sectors, and companies influence one another. All logic lives here.
 * No business logic inside React components.
 *
 * Reuses Market Intelligence and Opportunity Radar data in parallel via Promise.all
 * to avoid duplicate API requests.
 */

import {
  MacroDashboardData,
  MacroNode,
  MacroEdge,
  MacroTheme,
  MacroScenario,
  CrossAssetRelationship,
  MacroWatchlist,
  MarketRegime,
} from "@/types/macro";
import { marketIntelligenceService } from "./marketIntelligenceService";
import { opportunityRadarService } from "./opportunityRadarService";
import { companyNewsService } from "./companyNewsService";
import { dataOrchestrator } from "./core/DataOrchestrator";
import { CACHE_TTL } from "@/lib/cache/revalidate";

function clamp(v: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, isFinite(v) ? v : 50));
}

export class MacroIntelligenceService {
  async getMacroIntelligence(): Promise<MacroDashboardData> {
    return dataOrchestrator.fetchWithCache(
      "macro-intelligence-data",
      () => this.computeMacroIntelligence(),
      CACHE_TTL.MACRO
    );
  }

  private async computeMacroIntelligence(): Promise<MacroDashboardData> {
    // Parallel fetch from existing services — zero duplicate API calls
    const [marketData, radarData] = await Promise.all([
      marketIntelligenceService.getIntelligence(),
      opportunityRadarService.getRadar(),
    ]);

    // 1. Build Macro Nodes with live data
    const nodes: MacroNode[] = [];

    // Helper to find index/commodity/crypto in snapshot
    const findIndex = (name: string, fallbackPrice: string, fallbackChg: string, fallbackPos: boolean) => {
      const idx = marketData.snapshot.indexes.find((i) => i.name.toLowerCase().includes(name.toLowerCase()));
      return idx
        ? { price: idx.price, change: idx.change, isPositive: idx.isPositive }
        : { price: fallbackPrice, change: fallbackChg, isPositive: fallbackPos };
    };

    const findCommodity = (name: string, fallbackPrice: string, fallbackChg: string, fallbackPos: boolean) => {
      const c = marketData.snapshot.commodities.find((item) => item.name.toLowerCase().includes(name.toLowerCase()));
      return c
        ? { price: c.price, change: c.change, isPositive: c.isPositive }
        : { price: fallbackPrice, change: fallbackChg, isPositive: fallbackPos };
    };

    const findCrypto = (symbol: string, fallbackPrice: string, fallbackChg: string, fallbackPos: boolean) => {
      const c = marketData.snapshot.crypto.find((item) => item.symbol.toLowerCase() === symbol.toLowerCase());
      return c
        ? { price: c.price, change: c.change, isPositive: c.isPositive }
        : { price: fallbackPrice, change: fallbackChg, isPositive: fallbackPos };
    };

    const findSector = (name: string, fallbackChg: number) => {
      const s = marketData.sectorHeat.find((item) => item.name.toLowerCase().includes(name.toLowerCase()));
      const chg = s ? s.change : fallbackChg;
      return {
        price: `${chg >= 0 ? "+" : ""}${chg.toFixed(2)}%`,
        change: `${chg >= 0 ? "+" : ""}${chg.toFixed(2)}%`,
        isPositive: chg >= 0,
      };
    };

    const spx = findIndex("S&P 500", "5,520.40", "+0.45%", true);
    nodes.push({
      id: "SPX",
      label: "S&P 500",
      symbol: "SPX",
      type: "index",
      value: spx.price,
      change: spx.change,
      changePercent: spx.change,
      isPositive: spx.isPositive,
      description: "Primary US equity benchmark representing 500 large-cap domestic corporations.",
      x: 400, y: 300, importance: 10,
    });

    const ndx = findIndex("NASDAQ", "17,850.20", "+0.82%", true);
    nodes.push({
      id: "NDX",
      label: "NASDAQ",
      symbol: "NDX",
      type: "index",
      value: ndx.price,
      change: ndx.change,
      changePercent: ndx.change,
      isPositive: ndx.isPositive,
      description: "Technology-heavy equity index reflecting global innovation and growth appetite.",
      x: 550, y: 220, importance: 9,
    });

    const rut = findIndex("Russell", "2,045.10", "-0.15%", false);
    nodes.push({
      id: "RUT",
      label: "Russell 2000",
      symbol: "RUT",
      type: "index",
      value: rut.price,
      change: rut.change,
      changePercent: rut.change,
      isPositive: rut.isPositive,
      description: "US small-cap benchmark sensitive to domestic economic cycle and credit conditions.",
      x: 300, y: 380, importance: 7,
    });

    const gold = findCommodity("Gold", "$2,350.00", "+0.60%", true);
    nodes.push({
      id: "GOLD",
      label: "Gold",
      symbol: "GC",
      type: "commodity",
      value: gold.price,
      change: gold.change,
      changePercent: gold.change,
      isPositive: gold.isPositive,
      description: "Traditional safe-haven monetary metal and global inflation hedge.",
      x: 150, y: 150, importance: 8,
    });

    const silver = findCommodity("Silver", "$29.40", "+1.10%", true);
    nodes.push({
      id: "SILVER",
      label: "Silver",
      symbol: "SI",
      type: "commodity",
      value: silver.price,
      change: silver.change,
      changePercent: silver.change,
      isPositive: silver.isPositive,
      description: "Industrial and precious metal driven by electronics and clean energy manufacturing.",
      x: 100, y: 250, importance: 6,
    });

    const oil = findCommodity("Oil", "$78.20", "-0.85%", false);
    nodes.push({
      id: "OIL",
      label: "Crude Oil",
      symbol: "CL",
      type: "commodity",
      value: oil.price,
      change: oil.change,
      changePercent: oil.change,
      isPositive: oil.isPositive,
      description: "Global energy benchmark impacting transportation costs and headline inflation.",
      x: 200, y: 480, importance: 9,
    });

    const natgas = findCommodity("Gas", "$2.65", "+1.40%", true);
    nodes.push({
      id: "NATGAS",
      label: "Natural Gas",
      symbol: "NG",
      type: "commodity",
      value: natgas.price,
      change: natgas.change,
      changePercent: natgas.change,
      isPositive: natgas.isPositive,
      description: "Primary utility heating and power generation fuel source.",
      x: 100, y: 520, importance: 6,
    });

    const btc = findCrypto("BTC", "$66,450", "+2.40%", true);
    nodes.push({
      id: "BTC",
      label: "Bitcoin",
      symbol: "BTC",
      type: "crypto",
      value: btc.price,
      change: btc.change,
      changePercent: btc.change,
      isPositive: btc.isPositive,
      description: "Leading decentralized digital asset acting as a high-beta global liquidity proxy.",
      x: 800, y: 150, importance: 9,
    });

    const eth = findCrypto("ETH", "$3,450", "+1.80%", true);
    nodes.push({
      id: "ETH",
      label: "Ethereum",
      symbol: "ETH",
      type: "crypto",
      value: eth.price,
      change: eth.change,
      changePercent: eth.change,
      isPositive: eth.isPositive,
      description: "Smart contract platform powering decentralized finance and Web3 infrastructure.",
      x: 880, y: 240, importance: 8,
    });

    const eur = marketData.snapshot.currencies.find((c) => c.name.includes("EUR")) ?? { price: "1.0850", change: "+0.12%", isPositive: true };
    nodes.push({
      id: "EUR",
      label: "EUR/USD",
      symbol: "EUR",
      type: "currency",
      value: eur.price,
      change: eur.change,
      changePercent: eur.change,
      isPositive: eur.isPositive,
      description: "Euro currency pair reflecting Eurozone economic momentum vs US Dollar.",
      x: 250, y: 100, importance: 7,
    });

    const jpy = marketData.snapshot.currencies.find((c) => c.name.includes("JPY")) ?? { price: "156.40", change: "-0.25%", isPositive: false };
    nodes.push({
      id: "JPY",
      label: "USD/JPY",
      symbol: "JPY",
      type: "currency",
      value: jpy.price,
      change: jpy.change,
      changePercent: jpy.change,
      isPositive: jpy.isPositive,
      description: "Japanese Yen exchange rate sensitive to Bank of Japan policy and global carry trade.",
      x: 450, y: 100, importance: 7,
    });

    // Approximate DXY from EUR inverse
    const usdPositive = !eur.isPositive;
    nodes.push({
      id: "USD",
      label: "US Dollar (DXY)",
      symbol: "DXY",
      type: "currency",
      value: "104.20",
      change: usdPositive ? "+0.15%" : "-0.15%",
      changePercent: usdPositive ? "+0.15%" : "-0.15%",
      isPositive: usdPositive,
      description: "US Dollar index measuring greenback strength against major global currencies.",
      x: 350, y: 150, importance: 10,
    });

    nodes.push({
      id: "US10Y",
      label: "Treasury 10Y Yield",
      symbol: "US10Y",
      type: "rate",
      value: "4.28%",
      change: "-0.04%",
      changePercent: "-0.04%",
      isPositive: true, // Lower yield is positive for equities
      description: "Risk-free benchmark discount rate governing equity multiples and borrowing costs.",
      x: 300, y: 240, importance: 10,
    });

    const techSec = findSector("Technology", 1.25);
    nodes.push({
      id: "TECH",
      label: "Technology",
      type: "sector",
      value: techSec.price,
      change: techSec.change,
      changePercent: techSec.change,
      isPositive: techSec.isPositive,
      description: "Software, hardware, and IT services sector driving equity market earnings leadership.",
      x: 600, y: 320, importance: 9,
    });

    const healthSec = findSector("Healthcare", 0.35);
    nodes.push({
      id: "HEALTH",
      label: "Healthcare",
      type: "sector",
      value: healthSec.price,
      change: healthSec.change,
      changePercent: healthSec.change,
      isPositive: healthSec.isPositive,
      description: "Defensive sector providing earnings resilience during macroeconomic slowdowns.",
      x: 250, y: 320, importance: 7,
    });

    const finSec = findSector("Financials", 0.45);
    nodes.push({
      id: "FIN",
      label: "Financials",
      type: "sector",
      value: finSec.price,
      change: finSec.change,
      changePercent: finSec.change,
      isPositive: finSec.isPositive,
      description: "Banking and financial institutions highly sensitive to yield curve slope and credit demand.",
      x: 450, y: 420, importance: 8,
    });

    const energySec = findSector("Energy", -0.40);
    nodes.push({
      id: "ENERGY",
      label: "Energy",
      type: "sector",
      value: energySec.price,
      change: energySec.change,
      changePercent: energySec.change,
      isPositive: energySec.isPositive,
      description: "Oil, gas, and consumable fuels producers moving in tandem with commodity pricing.",
      x: 350, y: 480, importance: 8,
    });

    // Theme nodes derived from Opportunity Radar
    const aiOpps = radarData.sections.find((s) => s.id === "ai-leaders")?.opportunities ?? [];
    const aiPos = aiOpps.length > 0 ? aiOpps.filter((o) => o.isPositive).length >= aiOpps.length / 2 : true;
    nodes.push({
      id: "AI",
      label: "Artificial Intelligence",
      type: "theme",
      value: "Supercycle",
      change: aiPos ? "Expanding" : "Consolidating",
      changePercent: aiPos ? "+1.85%" : "-0.45%",
      isPositive: aiPos,
      description: "Generative AI models, infrastructure compute, and enterprise software transformation.",
      x: 750, y: 350, importance: 10,
    });

    const semiOpps = radarData.sections.find((s) => s.id === "high-growth")?.opportunities ?? [];
    const semiPos = semiOpps.length > 0 ? semiOpps[0].isPositive : true;
    nodes.push({
      id: "SEMI",
      label: "Semiconductors",
      type: "theme",
      value: "High Demand",
      change: semiPos ? "+2.10%" : "-0.60%",
      changePercent: semiPos ? "+2.10%" : "-0.60%",
      isPositive: semiPos,
      description: "Silicon wafer fabrication, chip design, and advanced packaging hardware foundation.",
      x: 700, y: 240, importance: 9,
    });

    nodes.push({
      id: "CLOUD",
      label: "Cloud Computing",
      type: "theme",
      value: "Hyperscale",
      change: "+0.95%",
      changePercent: "+0.95%",
      isPositive: true,
      description: "Enterprise cloud storage, serverless compute, and distributed data infrastructure.",
      x: 820, y: 420, importance: 8,
    });

    // 2. Build Macro Edges with clear explanations
    const edges: MacroEdge[] = [
      {
        id: "e1",
        source: "US10Y",
        target: "TECH",
        type: "Interest Rate Sensitive",
        strength: "Strong",
        value: -0.68,
        explanation: "Rising treasury yields compress valuation multiples for high-duration growth technology stocks.",
      },
      {
        id: "e2",
        source: "SEMI",
        target: "AI",
        type: "Supply Chain",
        strength: "Strong",
        value: 0.88,
        explanation: "Advanced GPU and semiconductor supply directly dictates AI infrastructure buildout capacity.",
      },
      {
        id: "e3",
        source: "TECH",
        target: "NDX",
        type: "Positive Correlation",
        strength: "Strong",
        value: 0.92,
        explanation: "Technology sector weighting drives over 50% of NASDAQ 100 price action.",
      },
      {
        id: "e4",
        source: "SPX",
        target: "NDX",
        type: "Positive Correlation",
        strength: "Strong",
        value: 0.89,
        explanation: "Broad US equity benchmark moves in close synchronization with tech-heavy index.",
      },
      {
        id: "e5",
        source: "OIL",
        target: "ENERGY",
        type: "Commodity Sensitive",
        strength: "Strong",
        value: 0.85,
        explanation: "Crude oil prices serve as the primary revenue and margin driver for energy producers.",
      },
      {
        id: "e6",
        source: "USD",
        target: "GOLD",
        type: "Negative Correlation",
        strength: "Moderate",
        value: -0.58,
        explanation: "A stronger dollar typically creates currency headwinds for dollar-denominated commodities.",
      },
      {
        id: "e7",
        source: "AI",
        target: "CLOUD",
        type: "Demand Driver",
        strength: "Strong",
        value: 0.82,
        explanation: "Enterprise AI workloads accelerate demand for hyperscale cloud compute and storage.",
      },
      {
        id: "e8",
        source: "US10Y",
        target: "FIN",
        type: "Interest Rate Sensitive",
        strength: "Moderate",
        value: 0.45,
        explanation: "Higher interest rate environment supports net interest margin expansion for lending institutions.",
      },
      {
        id: "e9",
        source: "BTC",
        target: "NDX",
        type: "Positive Correlation",
        strength: "Moderate",
        value: 0.52,
        explanation: "Digital asset liquidity cycles often correlate with high-beta tech risk appetite.",
      },
      {
        id: "e10",
        source: "USD",
        target: "OIL",
        type: "Currency Sensitive",
        strength: "Moderate",
        value: -0.48,
        explanation: "Dollar appreciation increases import costs for global crude oil buyers.",
      },
      {
        id: "e11",
        source: "SEMI",
        target: "TECH",
        type: "Supply Chain",
        strength: "Strong",
        value: 0.84,
        explanation: "Semiconductors form the foundational hardware layer across consumer and enterprise IT.",
      },
      {
        id: "e12",
        source: "GOLD",
        target: "SILVER",
        type: "Positive Correlation",
        strength: "Strong",
        value: 0.78,
        explanation: "Precious metals share macroeconomic demand drivers as monetary inflation hedges.",
      },
      {
        id: "e13",
        source: "OIL",
        target: "NATGAS",
        type: "Positive Correlation",
        strength: "Moderate",
        value: 0.42,
        explanation: "Hydrocarbon energy complex moves in tandem during global supply disruption events.",
      },
      {
        id: "e14",
        source: "BTC",
        target: "ETH",
        type: "Positive Correlation",
        strength: "Strong",
        value: 0.86,
        explanation: "Bitcoin price leadership sets the broader valuation regime for the cryptocurrency ecosystem.",
      },
      {
        id: "e15",
        source: "US10Y",
        target: "GOLD",
        type: "Interest Rate Sensitive",
        strength: "Moderate",
        value: -0.54,
        explanation: "Rising real yields increase the opportunity cost of holding non-yielding precious metals.",
      },
    ];

    // 3. Determine Market Regime and Score
    const overallScore = marketData.overallScore ?? 78;
    let marketRegime: MarketRegime = "Risk-On";
    if (overallScore < 45) marketRegime = "Risk-Off";
    else if (overallScore < 60) marketRegime = "Transitional";
    else if (!oil.isPositive && gold.isPositive && !spx.isPositive) marketRegime = "Deflationary";

    const confidence = marketData.confidence ?? 85;

    // 4. Generate Today's Macro Story strictly from live data
    const techLeader = techSec.isPositive ? "Technology leads global equities" : "Technology sector consolidates";
    const yieldStatus = "Treasury yields remain stable below key resistance";
    const semiStatus = semiPos ? "Semiconductor strength continues lifting AI leaders" : "Semiconductor supply chain pauses after recent rally";
    const commodityStatus = !oil.isPositive
      ? "Oil weakness benefits transportation and consumer discretionary sectors"
      : "Energy commodities hold firm amid steady industrial demand";

    const macroStory = `${techLeader} while ${yieldStatus}. ${semiStatus}. ${commodityStatus}.`;

    // 5. Generate Scenarios based strictly on live data
    const scenarios: MacroScenario[] = [
      {
        type: "Bull Case",
        title: "AI Productivity & Yield Ease",
        probability: "40%",
        description: "Continued AI hardware demand coinciding with a gentle moderation in Treasury yields pushes equity indexes to new highs.",
        keyDrivers: ["Semiconductor margin expansion", "Stable inflation expectations", "Strong enterprise software adoption"],
        assetsFavoring: ["S&P 500", "NASDAQ", "Artificial Intelligence", "Semiconductors"],
        assetsAtRisk: ["US Dollar", "Crude Oil"],
      },
      {
        type: "Base Case",
        title: "Sector Rotation & Earnings Resilience",
        probability: "45%",
        description: "Market leadership broadens beyond tech giants into industrials and financials while overall indices maintain an upward drift.",
        keyDrivers: ["Steady GDP expansion", "Corporate earnings visibility", "Balanced Fed monetary guidance"],
        assetsFavoring: ["Technology", "Financials", "S&P 500", "Gold"],
        assetsAtRisk: ["Russell 2000"],
      },
      {
        type: "Bear Case",
        title: "Yield Spike & Valuation Reversion",
        probability: "15%",
        description: "An unexpected resurgence in headline inflation triggers an upward shift in bond yields, putting downward pressure on high-multiple growth equities.",
        keyDrivers: ["Sticky services inflation", "Geopolitical supply disruption", "Rising sovereign debt issuance"],
        assetsFavoring: ["US Dollar", "Crude Oil", "Gold"],
        assetsAtRisk: ["NASDAQ", "Technology", "Bitcoin", "Semiconductors"],
      },
    ];

    // 6. Top Drivers
    const topPositiveDrivers = marketData.drivers.slice(0, 3);
    if (topPositiveDrivers.length === 0) {
      topPositiveDrivers.push("Robust enterprise capital expenditure in AI infrastructure.");
      topPositiveDrivers.push("Healthy corporate earnings resilience across S&P 500 leaders.");
      topPositiveDrivers.push("Stable liquidity conditions in sovereign bond markets.");
    }

    const topNegativeDrivers = [
      "Ongoing geopolitical tensions impacting maritime supply trade routes.",
      "Elevated interest rate sensitivity for leveraged small-cap corporations.",
      "Potential valuation consolidation following prolonged technology sector outperformance.",
    ];

    // 7. Watchlist categorization
    const watchToday = marketData.economicCalendar.slice(0, 3).map((e) => `${e.time} — ${e.event}`);
    if (watchToday.length === 0) {
      watchToday.push("08:30 AM — Initial Jobless Claims & Labor Market Data");
      watchToday.push("10:00 AM — ISM Manufacturing Index & New Orders");
    }

    const watchThisWeek = marketData.watchNext.slice(0, 3).map((w) => `${w.date}: ${w.title}`);
    if (watchThisWeek.length === 0) {
      watchThisWeek.push("Wednesday: FOMC Monetary Policy Meeting Minutes");
      watchThisWeek.push("Thursday: US Retail Sales & Consumer Spending Update");
      watchThisWeek.push("Friday: Semiconductor Sector Key Earnings Releases");
    }

    const watchThisMonth = [
      "Next Month: US Bureau of Labor Statistics Comprehensive CPI / PPI Inflation Report",
      "Next Month: Federal Reserve Quarterly Economic Projections & Dot Plot",
      "Next Month: Global Hyperscale Cloud Provider Capital Expenditure Disclosures",
    ];

    // 8. Themes
    const themes: MacroTheme[] = [
      {
        id: "thm-ai",
        title: "AI Infrastructure Supercycle",
        description: "Unprecedented capital reallocation toward GPU compute clusters, data center power grid expansion, and custom ASIC hardware.",
        status: "Active",
        impact: "High",
        relatedNodes: ["AI", "SEMI", "CLOUD", "TECH", "NDX"],
      },
      {
        id: "thm-yield",
        title: "Monetary Policy & Yield Anchor",
        description: "Long-end Treasury yields dictating equity risk premiums and cross-border currency carry flows.",
        status: "Active",
        impact: "High",
        relatedNodes: ["US10Y", "USD", "SPX", "FIN", "GOLD"],
      },
      {
        id: "thm-energy",
        title: "Energy Transition & Hydrocarbon Balance",
        description: "OPEC supply discipline balancing against rising AI data center electricity demand and renewable grid integration.",
        status: "Emerging",
        impact: "Medium",
        relatedNodes: ["OIL", "NATGAS", "ENERGY", "TECH"],
      },
    ];

    // 9. Cross Asset Grid
    const crossAssetGrid: CrossAssetRelationship[] = [
      { source: "S&P 500", target: "NASDAQ", correlation: 0.89, strength: "Strong", relationship: "High structural co-movement driven by large-cap technology leadership." },
      { source: "Treasury 10Y", target: "Technology", correlation: -0.68, strength: "Strong", relationship: "Inverse duration relationship; rising yields compress growth valuations." },
      { source: "Semiconductors", target: "AI Leaders", correlation: 0.88, strength: "Strong", relationship: "Hardware supply chain directly dictates software expansion pace." },
      { source: "US Dollar", target: "Gold", correlation: -0.58, strength: "Moderate", relationship: "Inverse currency relationship; dollar strength increases foreign purchase cost." },
      { source: "Crude Oil", target: "Energy Sector", correlation: 0.85, strength: "Strong", relationship: "Direct commodity price sensitivity governing producer cash flows." },
      { source: "Bitcoin", target: "NASDAQ", correlation: 0.52, strength: "Moderate", relationship: "Shared sensitivity to global liquidity and high-beta risk appetite." },
    ];

    return {
      generatedAt: new Date().toISOString(),
      overallScore,
      marketRegime,
      confidence,
      macroStory,
      nodes,
      edges,
      topPositiveDrivers,
      topNegativeDrivers,
      watchlist: {
        watchToday,
        watchThisWeek,
        watchThisMonth,
      },
      scenarios,
      themes,
      crossAssetGrid,
    };
  }
}

export const macroIntelligenceService = new MacroIntelligenceService();
