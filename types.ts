export interface Kline {
    openTime: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    closeTime: number;
    quoteAssetVolume: string;
    numberOfTrades: number;
    takerBuyBaseAssetVolume: string;
    takerBuyQuoteAssetVolume:string;
    ignore: string;
}

export interface RsiDataPoint {
    time: number;
    value: number;
}

export interface PriceDataPoint {
    time: number;

    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    takerBuyVolume: number;
}

export interface WeeklyLevels {
  pwh: number | null;
  pwl: number | null;
  unsweptHigh: number | null;
  unsweptLow: number | null;
  pwo: number | null;
  pwc: number | null;
}

export interface KiwiHuntResult {
    q1: RsiDataPoint[];
    trigger: RsiDataPoint[];
    q3: RsiDataPoint[];
    q5: RsiDataPoint[];
}


export interface SymbolData {
    rsi: RsiDataPoint[];
    sma: RsiDataPoint[];
    priceSma: RsiDataPoint[];
    priceSma50?: RsiDataPoint[];
    priceSma100?: RsiDataPoint[];
    stochK: RsiDataPoint[];
    stochD: RsiDataPoint[];
    waveTrend1: RsiDataPoint[];
    waveTrend2: RsiDataPoint[];
    vwap: RsiDataPoint[];
    dailyVwap?: RsiDataPoint[];
    vwapAnchoredHigh?: RsiDataPoint[];
    vwapAnchoredLow?: RsiDataPoint[];
    kiwiHunt?: KiwiHuntResult;
    price: number;
    volume: number;
    klines: PriceDataPoint[];
    weeklyLevels?: WeeklyLevels;
    volumeProfile?: VolumeProfileData;
    volumeProfileFromLow?: VolumeProfileData;
    volumeProfileFromHigh?: VolumeProfileData;
}

export type Timeframe = '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '8h' | '1d' | '3d' | '1w';

export interface AlertConditions {
    extreme: boolean;
    rsiSmaCross: boolean;
    divergence: boolean;
    stochRecovery: boolean;
    stochCross: boolean;
    priceGoldenPocket: boolean;
    gpReversalVolume: boolean;
    fib786Reversal: boolean;
    breakoutVolume: boolean;
    capitulationVolume: boolean;
    accumulationVolume: boolean;
    waveTrendExtreme: boolean;
    stochCrossAboveDailyVwap: boolean;
    vwapReversalStochConfirmation: boolean;
    highConvictionBuy: boolean;
    highConvictionSell: boolean;
    waveTrendConfluenceBuy: boolean;
    highConvictionBuyNoVolume: boolean;
    priceRejectionAnchoredVwapHigh: boolean;
    priceBounceAnchoredVwapLow: boolean;
    pocRejection: boolean;
    valueAreaEdgeRejection: boolean;
    valueAreaBreakout: boolean;
    pocBounceLowAnchor: boolean;
    pocRejectionHighAnchor: boolean;
    breakoutHighAnchorVAH: boolean;
    kiwiHuntHunt: boolean;
    kiwiHuntCrazy: boolean;
    kiwiHuntBuyTrend: boolean;
}

export interface Settings {
    bgColor: string;
    textColor: string;
    cellBgColor: string;
    rsiColor: string;
    smaColor: string;
    rsi50Color: string;
    lineWidth: number;
    stochKColor: string;
    stochDColor: string;
    waveTrend1Color: string;
    waveTrend2Color: string;
    showHeatmapView: boolean;
    showPriceView: boolean;
    showStochView: boolean;
    showWaveTrendView: boolean;
    showKiwiHuntView: boolean;
    kiwiHuntQ1Color: string;
    kiwiHuntTriggerColor: string;
    kiwiHuntQ3Color: string;
    kiwiHuntQ5Color: string;
    alertConditions: AlertConditions;
    sendDiscordNotifications: boolean;
}

export type SortOrder = 'default' | 'rsi-asc' | 'rsi-desc' | 'chg-asc' | 'chg-desc' | 'stoch-asc' | 'stoch-desc' | 'waveTrend-asc' | 'waveTrend-desc' | 'kiwiHunt-asc' | 'kiwiHunt-desc';

export type DrawingTool = 'brush' | 'trendline';

export interface Drawing {
    tool: DrawingTool;
    points: { x: number; y: number }[];
    color: string;
    size: number;
}

export type Theme = 'light' | 'dark';
export type ViewMode = 'chart' | 'heatmap' | 'price' | 'stoch' | 'waveTrend' | 'kiwiHunt';
export type ActiveModal = 'rsi' | 'price' | 'stoch' | 'waveTrend' | 'kiwiHunt' | null;


export interface Notification {
  id: number;
  symbol: string;
  timeframe: Timeframe;
  rsi?: number;
  price?: number;
  type: 'overbought' | 'oversold' | 'bullish-cross' | 'death-cross' | 'bullish-divergence' | 'bearish-divergence' | 'stoch-recovery' | 'stoch-bullish-cross' | 'price-golden-pocket' | 'gp-reversal-volume' | 'fib-786-reversal' | 'breakout-volume' | 'capitulation-volume' | 'accumulation-volume' | 'wavetrend-buy' | 'wavetrend-sell' | 'stoch-cross-above-daily-vwap' | 'vwap-reversal-stoch-confirmation' | 'high-conviction-buy' | 'high-conviction-sell' | 'wavetrend-confluence-buy' | 'high-conviction-buy-no-volume' | 'price-rejection-vwap-high' | 'price-bounce-vwap-low' | 'poc-rejection-bullish' | 'poc-rejection-bearish' | 'value-area-rejection-bullish' | 'value-area-rejection-bearish' | 'value-area-breakout-bullish' | 'value-area-breakout-bearish' | 'poc-bounce-low-anchor' | 'poc-rejection-high-anchor' | 'breakout-high-anchor-vah' | 'liquidity-sweep-reversal-bullish' | 'liquidity-sweep-reversal-bearish' | 'kiwi-hunt-buy' | 'kiwi-hunt-sell' | 'kiwi-hunt-crazy-buy' | 'kiwi-hunt-crazy-sell' | 'kiwi-hunt-buy-trend';
  read: boolean;
  body?: string;
  value?: number;
}

export interface VolumeProfileData {
    profile: { price: number; volume: number; buyVolume: number; sellVolume: number; }[];
    poc: number;
    vah: number;
    val: number;
    maxVolume: number;
    minPrice: number;
    maxPrice: number;
}