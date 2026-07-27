import "server-only";
import { CompanyEcosystem, CompanyRelationshipItem } from "@/types/company";

function createItem(
  name: string,
  symbol: string,
  type: "company" | "etf" | "index",
  relationship?: string
): CompanyRelationshipItem {
  let href = `/companies/${symbol}`;
  if (type === "etf") href = `/etf/${symbol}`;
  if (type === "index") href = `/index/${symbol}`;
  return { name, symbol, type, href, relationship };
}

const centralizedEcosystemMap: Record<string, CompanyEcosystem> = {
  NVDA: {
    competitors: [
      createItem("Advanced Micro Devices", "AMD", "company", "Direct GPU Competitor"),
      createItem("Intel Corporation", "INTC", "company", "CPU & AI Accelerator Peer"),
      createItem("Broadcom Inc.", "AVGO", "company", "Custom ASIC Competitor"),
    ],
    customers: [
      createItem("Microsoft Corporation", "MSFT", "company", "Hyperscale Cloud & AI Infrastructure"),
      createItem("Amazon.com Inc.", "AMZN", "company", "AWS Cloud Accelerator Deployment"),
      createItem("Alphabet Inc.", "GOOGL", "company", "Google Cloud AI Data Center"),
      createItem("Meta Platforms Inc.", "META", "company", "AI Cluster & LLM Training"),
    ],
    suppliers: [
      createItem("ASML Holding N.V.", "ASML", "company", "EUV Lithography Systems"),
      createItem("SK Hynix", "HYNX", "company", "HBM3 Memory Supplier"),
      createItem("Micron Technology", "MU", "company", "High-Bandwidth Memory Partner"),
    ],
    partners: [
      createItem("Taiwan Semiconductor", "TSM", "company", "Exclusive 4nm/3nm Foundry Partner"),
      createItem("Super Micro Computer", "SMCI", "company", "Server Rack & Cooling Architecture"),
    ],
    sectorPeers: [
      createItem("Qualcomm Inc.", "QCOM", "company", "Semiconductor Innovation Leader"),
      createItem("Arm Holdings plc", "ARM", "company", "Chip Architecture Pioneer"),
      createItem("Texas Instruments", "TXN", "company", "Analog & Mixed-Signal Chip Leader"),
    ],
    relatedEtfs: [
      createItem("iShares Semiconductor ETF", "SOXX", "etf", "Top Fund Weighting (~9.5%)"),
      createItem("VanEck Semiconductor ETF", "SMH", "etf", "Primary Fund Constituent (~20%)"),
      createItem("Invesco QQQ Trust", "QQQ", "etf", "Mega-Cap Tech Growth Benchmark"),
    ],
    relatedIndexes: [
      createItem("NASDAQ Composite", "NASDAQ", "index", "Primary Exchange Benchmark"),
      createItem("S&P 500 Index", "S&P 500", "index", "Broad Market Cap Constituent"),
      createItem("PHLX Semiconductor Sector", "SOX", "index", "Core Industry Sector Index"),
    ],
  },
  AAPL: {
    competitors: [
      createItem("Microsoft Corporation", "MSFT", "company", "OS & Ecosystem Competitor"),
      createItem("Alphabet Inc.", "GOOGL", "company", "Mobile OS & Digital Hardware Competitor"),
      createItem("Samsung Electronics", "SSNLF", "company", "Global Smartphone Leader"),
    ],
    customers: [
      createItem("AT&T Inc.", "T", "company", "Carrier & Retail Distribution Partner"),
      createItem("Verizon Communications", "VZ", "company", "Primary US Wireless Distribution"),
      createItem("Best Buy Co.", "BBY", "company", "Key North American Retail Channels"),
    ],
    suppliers: [
      createItem("Taiwan Semiconductor", "TSM", "company", "Exclusive A-Series & M-Series Foundry"),
      createItem("Foxconn Technology", "FOXA", "company", "Primary Assembly & Manufacturing"),
      createItem("Qualcomm Inc.", "QCOM", "company", "5G Modem & Baseband Supplier"),
    ],
    partners: [
      createItem("Amazon Web Services", "AMZN", "company", "Cloud Infrastructure Collaboration"),
      createItem("Goldman Sachs Group", "GS", "company", "Apple Card & Financial Services"),
    ],
    sectorPeers: [
      createItem("Microsoft Corporation", "MSFT", "company", "Mega-Cap Tech Peer"),
      createItem("Alphabet Inc.", "GOOGL", "company", "Platform Ecosystem Leader"),
      createItem("Meta Platforms Inc.", "META", "company", "Consumer Hardware & Software Peer"),
    ],
    relatedEtfs: [
      createItem("Tech Select Sector SPDR", "XLK", "etf", "Core Technology ETF (~21% Weight)"),
      createItem("Invesco QQQ Trust", "QQQ", "etf", "Top-Two Fund Weighting (~8.8%)"),
      createItem("SPDR S&P 500 ETF Trust", "SPY", "etf", "Core US Benchmark Weighting"),
    ],
    relatedIndexes: [
      createItem("NASDAQ Composite", "NASDAQ", "index", "Primary Exchange Benchmark"),
      createItem("S&P 500 Index", "S&P 500", "index", "Top Index Weight Constituent"),
      createItem("Dow Jones Industrial", "DOW", "index", "30-Stock Price-Weighted Benchmark"),
    ],
  },
  MSFT: {
    competitors: [
      createItem("Alphabet Inc.", "GOOGL", "company", "Cloud, Search & AI Productivity Peer"),
      createItem("Amazon.com Inc.", "AMZN", "company", "Direct Cloud Infrastructure (AWS) Competitor"),
      createItem("Apple Inc.", "AAPL", "company", "Operating System & Hardware Rival"),
    ],
    customers: [
      createItem("General Electric Co.", "GE", "company", "Azure Cloud & Enterprise Agreement"),
      createItem("Accenture plc", "ACN", "company", "Global Enterprise Deployment Partner"),
      createItem("KPMG International", "KPMG", "company", "AI & Cloud Solutions Client"),
    ],
    suppliers: [
      createItem("NVIDIA Corporation", "NVDA", "company", "AI Accelerator & GPU Infrastructure"),
      createItem("Advanced Micro Devices", "AMD", "company", "Server CPU & Accelerator Partner"),
      createItem("Intel Corporation", "INTC", "company", "Data Center Server CPU Provider"),
    ],
    partners: [
      createItem("OpenAI", "OPENAI", "company", "Strategic Generative AI Pioneer Partner"),
      createItem("NVIDIA Corporation", "NVDA", "company", "Cloud AI Supercomputing Alliance"),
      createItem("CrowdStrike Holdings", "CRWD", "company", "Cybersecurity Architecture Partner"),
    ],
    sectorPeers: [
      createItem("Alphabet Inc.", "GOOGL", "company", "Hyperscale Tech Peer"),
      createItem("Oracle Corporation", "ORCL", "company", "Enterprise Database & Cloud Leader"),
      createItem("Adobe Inc.", "ADBE", "company", "SaaS & Productivity Software Leader"),
    ],
    relatedEtfs: [
      createItem("Tech Select Sector SPDR", "XLK", "etf", "Top Fund Weighting (~22%)"),
      createItem("Invesco QQQ Trust", "QQQ", "etf", "Core Nasdaq Benchmark Weighting"),
      createItem("Vanguard Info Tech ETF", "VGT", "etf", "Broad IT Sector Flagship ETF"),
    ],
    relatedIndexes: [
      createItem("NASDAQ Composite", "NASDAQ", "index", "Primary Exchange Benchmark"),
      createItem("S&P 500 Index", "S&P 500", "index", "Top Index Constituent"),
      createItem("Dow Jones Industrial", "DOW", "index", "Blue-Chip Tech Constituent"),
    ],
  },
  GOOGL: {
    competitors: [
      createItem("Microsoft Corporation", "MSFT", "company", "Search, AI & Cloud Computing Competitor"),
      createItem("Meta Platforms Inc.", "META", "company", "Digital Advertising & AI Rival"),
      createItem("Amazon.com Inc.", "AMZN", "company", "Cloud Computing & E-Commerce Ad Rival"),
    ],
    customers: [
      createItem("Omnicom Group Inc.", "OMC", "company", "Global Advertising Agency Client"),
      createItem("WPP plc", "WPP", "company", "Enterprise Digital Ad Spend Partner"),
      createItem("Publicis Groupe", "PUB", "company", "Media & Cloud Analytics Client"),
    ],
    suppliers: [
      createItem("NVIDIA Corporation", "NVDA", "company", "AI Supercluster Infrastructure"),
      createItem("Broadcom Inc.", "AVGO", "company", "TPU Custom ASIC Development Partner"),
      createItem("Advanced Micro Devices", "AMD", "company", "Server Processing Hardware"),
    ],
    partners: [
      createItem("Apple Inc.", "AAPL", "company", "Default Search Engine Agreement Partner"),
      createItem("Salesforce Inc.", "CRM", "company", "Enterprise Cloud & CRM Integration"),
      createItem("Shopify Inc.", "SHOP", "company", "E-Commerce Merchant Search Alliance"),
    ],
    sectorPeers: [
      createItem("Meta Platforms Inc.", "META", "company", "Digital Media & AI Pioneer"),
      createItem("Microsoft Corporation", "MSFT", "company", "Hyperscale Cloud & Search Leader"),
      createItem("Amazon.com Inc.", "AMZN", "company", "Cloud & Digital Commerce Peer"),
    ],
    relatedEtfs: [
      createItem("Comm Services SPDR", "XLC", "etf", "Top Sector ETF Weighting (~24%)"),
      createItem("Invesco QQQ Trust", "QQQ", "etf", "Core Mega-Cap Tech Holding"),
      createItem("SPDR S&P 500 ETF Trust", "SPY", "etf", "Broad US Benchmark Weighting"),
    ],
    relatedIndexes: [
      createItem("NASDAQ Composite", "NASDAQ", "index", "Primary Exchange Benchmark"),
      createItem("S&P 500 Index", "S&P 500", "index", "Top-5 Index Weight Constituent"),
    ],
  },
  TSLA: {
    competitors: [
      createItem("Rivian Automotive", "RIVN", "company", "EV Truck & SUV Specialist Rival"),
      createItem("BYD Company Ltd.", "BYDDF", "company", "Global EV Volume & Battery Competitor"),
      createItem("Ford Motor Co.", "F", "company", "Traditional Auto EV Transition Competitor"),
    ],
    customers: [
      createItem("Hertz Global Holdings", "HTZ", "company", "Commercial Fleet Purchase Agreement"),
      createItem("Uber Technologies", "UBER", "company", "Ride-Share Driver EV Program Partner"),
      createItem("Global Enterprise", "GE", "company", "Mega-Pack Energy Storage Deployment"),
    ],
    suppliers: [
      createItem("Albemarle Corp.", "ALB", "company", "Lithium Hydroxide & Battery Materials"),
      createItem("Sociedad Quimica", "SQM", "company", "Global Lithium Refining Partner"),
      createItem("Palo Alto Networks", "PANW", "company", "Cybersecurity & Cloud Architecture"),
    ],
    partners: [
      createItem("NVIDIA Corporation", "NVDA", "company", "Autonomous Driving AI Supercomputing"),
      createItem("Baidu Inc.", "BIDU", "company", "China Mapping & Navigation Alliance"),
    ],
    sectorPeers: [
      createItem("Rivian Automotive", "RIVN", "company", "Pure-Play Electric Vehicle Peer"),
      createItem("General Motors Co.", "GM", "company", "Legacy Auto & EV Innovator"),
      createItem("Toyota Motor Corp.", "TM", "company", "Global Automotive Volume Leader"),
    ],
    relatedEtfs: [
      createItem("Consumer Discretionary SPDR", "XLY", "etf", "Top Sector ETF Weighting (~18%)"),
      createItem("ARK Innovation ETF", "ARKK", "etf", "Flagship Disruptive Tech Holding"),
      createItem("Invesco QQQ Trust", "QQQ", "etf", "Core Growth & Innovation Benchmark"),
    ],
    relatedIndexes: [
      createItem("NASDAQ Composite", "NASDAQ", "index", "Primary Exchange Benchmark"),
      createItem("S&P 500 Index", "S&P 500", "index", "Mega-Cap Index Constituent"),
    ],
  },
  AMZN: {
    competitors: [
      createItem("Walmart Inc.", "WMT", "company", "Omnichannel Retail & E-Commerce Rival"),
      createItem("Microsoft Corporation", "MSFT", "company", "Primary Cloud Computing (Azure) Rival"),
      createItem("Alphabet Inc.", "GOOGL", "company", "Cloud (GCP) & Digital Advertising Rival"),
    ],
    customers: [
      createItem("Netflix Inc.", "NFLX", "company", "Core AWS Cloud Computing Client"),
      createItem("Airbnb Inc.", "AIRB", "company", "Global Infrastructure & Data Customer"),
      createItem("Lyft Inc.", "LYFT", "company", "Cloud Architecture & AI Deployment Client"),
    ],
    suppliers: [
      createItem("NVIDIA Corporation", "NVDA", "company", "AWS Trainium & GPU Cluster Partner"),
      createItem("Prologis Inc.", "PLD", "company", "Logistics & Warehouse Real Estate Provider"),
      createItem("Rivian Automotive", "RIVN", "company", "Electric Delivery Van Fleet Supplier"),
    ],
    partners: [
      createItem("Apple Inc.", "AAPL", "company", "Digital Services & Retail Integration"),
      createItem("Salesforce Inc.", "CRM", "company", "AWS Strategic Cloud Integration"),
      createItem("Visa Inc.", "V", "company", "Global Payment Processing & Co-Brand Card"),
    ],
    sectorPeers: [
      createItem("Walmart Inc.", "WMT", "company", "Global Retail Leader"),
      createItem("Alibaba Group", "BABA", "company", "International E-Commerce & Cloud Peer"),
      createItem("eBay Inc.", "EBAY", "company", "Online Marketplace Pioneer"),
    ],
    relatedEtfs: [
      createItem("Consumer Discretionary SPDR", "XLY", "etf", "Top Fund Weighting (~23%)"),
      createItem("Invesco QQQ Trust", "QQQ", "etf", "Core Growth Benchmark Weighting"),
      createItem("SPDR S&P 500 ETF Trust", "SPY", "etf", "Broad US Market Constituent"),
    ],
    relatedIndexes: [
      createItem("NASDAQ Composite", "NASDAQ", "index", "Primary Exchange Benchmark"),
      createItem("S&P 500 Index", "S&P 500", "index", "Top-3 Index Constituent"),
    ],
  },
  META: {
    competitors: [
      createItem("Alphabet Inc.", "GOOGL", "company", "Global Digital Advertising & Video Rival"),
      createItem("Snap Inc.", "SNAP", "company", "Social Media & AR Engagement Competitor"),
      createItem("Apple Inc.", "AAPL", "company", "Privacy Ecosystem & Hardware VR Rival"),
    ],
    customers: [
      createItem("Publicis Groupe", "PUB", "company", "Global Digital Ad Spend Client"),
      createItem("WPP plc", "WPP", "company", "Enterprise Advertising Partner"),
      createItem("Omnicom Group Inc.", "OMC", "company", "Global Media Agency Customer"),
    ],
    suppliers: [
      createItem("NVIDIA Corporation", "NVDA", "company", "Llama AI Training Cluster Hardware"),
      createItem("Broadcom Inc.", "AVGO", "company", "Custom ASIC & Network Switch Architecture"),
      createItem("Advanced Micro Devices", "AMD", "company", "AI Accelerator & Server CPU Partner"),
    ],
    partners: [
      createItem("NVIDIA Corporation", "NVDA", "company", "AI Research Supercomputing Collaboration"),
      createItem("EssilorLuxottica", "RAY", "company", "Ray-Ban Meta Smart Glasses Partner"),
      createItem("Salesforce Inc.", "CRM", "company", "WhatsApp Business Integration Alliance"),
    ],
    sectorPeers: [
      createItem("Alphabet Inc.", "GOOGL", "company", "Digital Media & AI Pioneer"),
      createItem("Snap Inc.", "SNAP", "company", "Social Platform Peer"),
      createItem("Pinterest Inc.", "PINS", "company", "Visual Discovery & Ad Platform Peer"),
    ],
    relatedEtfs: [
      createItem("Comm Services SPDR", "XLC", "etf", "Top Sector Fund Weighting (~22%)"),
      createItem("Invesco QQQ Trust", "QQQ", "etf", "Core Mega-Cap Tech Holding"),
      createItem("SPDR S&P 500 ETF Trust", "SPY", "etf", "Broad US Benchmark Weighting"),
    ],
    relatedIndexes: [
      createItem("NASDAQ Composite", "NASDAQ", "index", "Primary Exchange Benchmark"),
      createItem("S&P 500 Index", "S&P 500", "index", "Top-7 Index Weight Constituent"),
    ],
  },
  AMD: {
    competitors: [
      createItem("NVIDIA Corporation", "NVDA", "company", "Data Center AI GPU Competitor"),
      createItem("Intel Corporation", "INTC", "company", "x86 Server & Client CPU Competitor"),
      createItem("Broadcom Inc.", "AVGO", "company", "Custom Silicon & Connectivity Peer"),
    ],
    customers: [
      createItem("Microsoft Corporation", "MSFT", "company", "Azure MI300 AI Accelerator Client"),
      createItem("Amazon.com Inc.", "AMZN", "company", "AWS EPYC Server CPU Deployment"),
      createItem("Meta Platforms Inc.", "META", "company", "AI Inference Cluster Infrastructure"),
    ],
    suppliers: [
      createItem("Taiwan Semiconductor", "TSM", "company", "Exclusive 4nm/5nm Foundry Partner"),
      createItem("ASML Holding N.V.", "ASML", "company", "Lithography Architecture Supplier"),
      createItem("Applied Materials", "AMAT", "company", "Semiconductor Equipment Provider"),
    ],
    partners: [
      createItem("Microsoft Corporation", "MSFT", "company", "Windows AI PC Chip Architecture"),
      createItem("HP Inc.", "HPQ", "company", "Enterprise Laptop & Desktop Integration"),
    ],
    sectorPeers: [
      createItem("NVIDIA Corporation", "NVDA", "company", "GPU & AI Semiconductor Leader"),
      createItem("Intel Corporation", "INTC", "company", "Legacy Semiconductor Peer"),
      createItem("Qualcomm Inc.", "QCOM", "company", "Mobile & AI Processing Peer"),
    ],
    relatedEtfs: [
      createItem("iShares Semiconductor ETF", "SOXX", "etf", "Core Semiconductor Holding (~6.5%)"),
      createItem("VanEck Semiconductor ETF", "SMH", "etf", "Primary Fund Constituent (~5.8%)"),
      createItem("Invesco QQQ Trust", "QQQ", "etf", "Mega-Cap Tech Benchmark Holding"),
    ],
    relatedIndexes: [
      createItem("NASDAQ Composite", "NASDAQ", "index", "Primary Exchange Benchmark"),
      createItem("S&P 500 Index", "S&P 500", "index", "Core Index Constituent"),
      createItem("PHLX Semiconductor Sector", "SOX", "index", "Semiconductor Flagship Benchmark"),
    ],
  },
  INTC: {
    competitors: [
      createItem("Advanced Micro Devices", "AMD", "company", "x86 Client & Server CPU Competitor"),
      createItem("NVIDIA Corporation", "NVDA", "company", "AI Accelerator & GPU Competitor"),
      createItem("Taiwan Semiconductor", "TSM", "company", "Foundry Manufacturing Rival"),
    ],
    customers: [
      createItem("Dell Technologies", "DELL", "company", "Primary Enterprise Client & Server Hardware"),
      createItem("HP Inc.", "HPQ", "company", "Commercial & Consumer PC Chip Customer"),
      createItem("Lenovo Group", "LENOVO", "company", "Global PC & Data Center OEM Partner"),
    ],
    suppliers: [
      createItem("ASML Holding N.V.", "ASML", "company", "High-NA EUV Lithography Systems"),
      createItem("Applied Materials", "AMAT", "company", "Wafer Fabrication Equipment"),
      createItem("Lam Research Corp.", "LRCX", "company", "Etch & Deposition Systems"),
    ],
    partners: [
      createItem("Microsoft Corporation", "MSFT", "company", "Windows OS & Copilot+ Collaboration"),
      createItem("Amazon Web Services", "AMZN", "company", "Custom Foundry Packaging Agreement"),
    ],
    sectorPeers: [
      createItem("Advanced Micro Devices", "AMD", "company", "Direct Semiconductor Peer"),
      createItem("NVIDIA Corporation", "NVDA", "company", "AI Processing Pioneer"),
      createItem("Texas Instruments", "TXN", "company", "US Semiconductor Manufacturer"),
    ],
    relatedEtfs: [
      createItem("iShares Semiconductor ETF", "SOXX", "etf", "Core Fund Constituent"),
      createItem("VanEck Semiconductor ETF", "SMH", "etf", "Semiconductor Flagship Holding"),
      createItem("Tech Select Sector SPDR", "XLK", "etf", "Broad Technology Constituent"),
    ],
    relatedIndexes: [
      createItem("NASDAQ Composite", "NASDAQ", "index", "Primary Exchange Benchmark"),
      createItem("S&P 500 Index", "S&P 500", "index", "Broad Market Cap Constituent"),
      createItem("Dow Jones Industrial", "DOW", "index", "Legacy 30-Stock Benchmark Constituent"),
    ],
  },
  TSM: {
    competitors: [
      createItem("Intel Foundry Services", "INTC", "company", "US Foundry Expansion Rival"),
      createItem("Samsung Electronics", "SSNLF", "company", "3nm GAA Foundry Manufacturing Rival"),
      createItem("GlobalFoundries Inc.", "GFS", "company", "Specialty Semiconductor Foundry Competitor"),
    ],
    customers: [
      createItem("Apple Inc.", "AAPL", "company", "Largest Revenue Client (~25% of Foundry Spend)"),
      createItem("NVIDIA Corporation", "NVDA", "company", "Core GPU & H100/Blackwell AI Partner"),
      createItem("Advanced Micro Devices", "AMD", "company", "Primary 5nm/4nm Zen Architecture Customer"),
      createItem("Qualcomm Inc.", "QCOM", "company", "Snapdragon Mobile Baseband Customer"),
    ],
    suppliers: [
      createItem("ASML Holding N.V.", "ASML", "company", "Exclusive EUV Lithography Supplier"),
      createItem("Applied Materials", "AMAT", "company", "Core Materials & Deposition Supplier"),
      createItem("Lam Research Corp.", "LRCX", "company", "Wafer Etch Equipment Specialist"),
    ],
    partners: [
      createItem("ASML Holding N.V.", "ASML", "company", "Next-Gen High-NA EUV Development Alliance"),
      createItem("Apple Inc.", "AAPL", "company", "Advanced Packaging & Node Co-Development"),
    ],
    sectorPeers: [
      createItem("ASML Holding N.V.", "ASML", "company", "Semiconductor Equipment Monopoly Peer"),
      createItem("NVIDIA Corporation", "NVDA", "company", "AI Chip Design Leader"),
      createItem("Broadcom Inc.", "AVGO", "company", "Mega-Cap Semiconductor Peer"),
    ],
    relatedEtfs: [
      createItem("VanEck Semiconductor ETF", "SMH", "etf", "Top Fund Weighting (~12.5%)"),
      createItem("iShares Semiconductor ETF", "SOXX", "etf", "Core Global Semiconductor Holding"),
      createItem("iShares Core MSCI Emerging", "IEMG", "etf", "Primary Emerging Markets Flagship Holding"),
    ],
    relatedIndexes: [
      createItem("NASDAQ Composite", "NASDAQ", "index", "US ADR Exchange Benchmark"),
      createItem("PHLX Semiconductor Sector", "SOX", "index", "Semiconductor Flagship Constituent"),
      createItem("Taiwan Weighted Index", "TAIEX", "index", "Primary Domestic Market Benchmark"),
    ],
  },
  BKR: {
    competitors: [
      createItem("Schlumberger N.V.", "SLB", "company", "Global Oilfield Services & Tech Rival"),
      createItem("Halliburton Company", "HAL", "company", "Hydraulic Fracturing & Completion Rival"),
      createItem("Weatherford International", "WFT", "company", "Well Construction & Drilling Peer"),
    ],
    customers: [
      createItem("Exxon Mobil Corp.", "XOM", "company", "Global LNG & Offshore Drilling Client"),
      createItem("Chevron Corporation", "CVX", "company", "Energy Technology & Subsea Equipment Client"),
      createItem("Shell plc", "SHEL", "company", "Deepwater Exploration & Turbine Customer"),
      createItem("BP p.l.c.", "BP", "company", "Global Digital Energy Solutions Partner"),
    ],
    suppliers: [
      createItem("Caterpillar Inc.", "CAT", "company", "Heavy Machinery & Turbine Component Partner"),
      createItem("Valaris Limited", "VAL", "company", "Offshore Drilling Rig Operations Provider"),
      createItem("NOV Inc.", "NOV", "company", "Oilfield Equipment & Supply Chain Partner"),
    ],
    partners: [
      createItem("Exxon Mobil Corp.", "XOM", "company", "Lower-Carbon & Hydrogen Solutions Alliance"),
      createItem("Amazon Web Services", "AMZN", "company", "BKRLeap Cloud Energy AI Architecture"),
    ],
    sectorPeers: [
      createItem("Schlumberger N.V.", "SLB", "company", "Primary Oilfield Technology Peer"),
      createItem("Halliburton Company", "HAL", "company", "Major North American Services Peer"),
      createItem("TechnipFMC plc", "FTI", "company", "Subsea & Energy Transition Technology Peer"),
    ],
    relatedEtfs: [
      createItem("Energy Select Sector SPDR", "XLE", "etf", "Core US Energy Sector Holding"),
      createItem("VanEck Oil Services ETF", "OIH", "etf", "Top-Three Fund Weighting (~13%)"),
      createItem("SPDR S&P Oil & Gas Exp", "XOP", "etf", "Broad Energy Exploration & Production ETF"),
    ],
    relatedIndexes: [
      createItem("S&P 500 Index", "S&P 500", "index", "Core Energy Sector Constituent"),
      createItem("PHLX Oil Service Sector", "OSX", "index", "Primary Oilfield Tech Benchmark"),
    ],
  },
};

export class RelationshipProvider {
  async getRelationships(symbol: string): Promise<CompanyEcosystem> {
    const upperSym = symbol.toUpperCase();

    if (centralizedEcosystemMap[upperSym]) {
      return centralizedEcosystemMap[upperSym];
    }

    // Centralized default fallback ecosystem for any unmapped symbol
    return {
      competitors: [
        createItem("Apple Inc.", "AAPL", "company", "Industry Benchmark Peer"),
        createItem("Microsoft Corporation", "MSFT", "company", "Enterprise Technology Leader"),
        createItem("Alphabet Inc.", "GOOGL", "company", "Platform & Cloud Leader"),
      ],
      customers: [
        createItem("Global Enterprise Clients", "GE", "company", "Commercial & Enterprise Sector"),
        createItem("Consumer Retail Markets", "AMZN", "company", "Global Distribution & Retail Channels"),
        createItem("Government & Defense", "LMT", "company", "Public Sector & Infrastructure Clients"),
      ],
      suppliers: [
        createItem("Global Semiconductor Partners", "TSM", "company", "Core Technology & Foundry Architecture"),
        createItem("Cloud Infrastructure Providers", "MSFT", "company", "Data Center & Cloud Hosting Services"),
        createItem("Logistics & Supply Chain", "PLD", "company", "Global Real Estate & Distribution Network"),
      ],
      partners: [
        createItem("Microsoft Corporation", "MSFT", "company", "Enterprise Cloud & Software Collaboration"),
        createItem("Amazon Web Services", "AMZN", "company", "Infrastructure & Scalability Partner"),
      ],
      sectorPeers: [
        createItem("NVIDIA Corporation", "NVDA", "company", "Market Cap & Technology Benchmark"),
        createItem("Apple Inc.", "AAPL", "company", "Consumer & Hardware Benchmark"),
        createItem("Amazon.com Inc.", "AMZN", "company", "Digital Commerce & Cloud Peer"),
      ],
      relatedEtfs: [
        createItem("SPDR S&P 500 ETF Trust", "SPY", "etf", "Primary Broad US Market Flagship ETF"),
        createItem("Invesco QQQ Trust", "QQQ", "etf", "Core Innovation & Growth ETF Benchmark"),
        createItem("Vanguard Total Stock Market", "VTI", "etf", "Comprehensive Total Market Fund"),
      ],
      relatedIndexes: [
        createItem("S&P 500 Index", "S&P 500", "index", "Primary Large-Cap US Benchmark"),
        createItem("NASDAQ Composite", "NASDAQ", "index", "Technology & Growth Exchange Benchmark"),
      ],
    };
  }
}

export const relationshipProvider = new RelationshipProvider();
