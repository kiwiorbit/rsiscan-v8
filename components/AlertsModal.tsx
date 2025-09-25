import React, { useState } from 'react';
import type { Settings, AlertConditions } from '../types';

interface AlertsModalProps {
    isOpen: boolean;
    onClose: () => void;
    settings: Settings;
    onAlertConditionChange: (key: keyof AlertConditions, value: boolean) => void;
}

const AlertToggle: React.FC<{
    condition: keyof AlertConditions;
    label: string;
    description: string;
    settings: Settings;
    onChange: AlertsModalProps['onAlertConditionChange'];
}> = ({ condition, label, description, settings, onChange }) => {
    const isEnabled = settings.alertConditions[condition];
    const id = `modal-alert-toggle-${condition}`;
    return (
        <li>
            <div className="p-3 rounded-lg bg-light-bg/80 dark:bg-dark-bg/80 flex items-center justify-between">
                <label htmlFor={id} className="cursor-pointer pr-4 text-dark-text dark:text-light-text flex-grow">
                    <span className="font-semibold">{label}</span>
                    <p className="text-xs text-medium-text-light dark:text-medium-text">{description}</p>
                </label>
                <div className="relative">
                    <input
                        type="checkbox"
                        id={id}
                        className="sr-only peer"
                        checked={isEnabled}
                        onChange={(e) => onChange(condition, e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-light-border peer-focus:outline-none rounded-full peer dark:bg-dark-border peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-dark-card after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-light dark:peer-checked:bg-primary"></div>
                </div>
            </div>
        </li>
    );
};

const TABS = [
    'Indicator', 'Price-Based', 'VWAP', 'Volume Profile', 'Anchored Profile', 'Confluence Strategy', 'KiwiHunt'
];

const AlertsModal: React.FC<AlertsModalProps> = ({ isOpen, onClose, settings, onAlertConditionChange }) => {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-dark-bg/80 dark:bg-dark-bg/90 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-lg h-auto max-h-[90vh] flex flex-col border border-light-border/50 dark:border-dark-border/50">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-light-border dark:border-dark-border">
                    <h2 className="text-xl font-bold text-dark-text dark:text-light-text">Configure Alerts</h2>
                    <button onClick={onClose} className="text-2xl text-medium-text-light dark:text-medium-text hover:text-dark-text dark:hover:text-light-text transition-colors" aria-label="Close alert settings">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="px-4 pt-4 border-b border-light-border dark:border-dark-border">
                    <div className="flex flex-wrap -mb-px">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 transition-colors ${
                                    activeTab === tab
                                        ? 'text-primary-light dark:text-primary border-primary-light dark:border-primary'
                                        : 'text-medium-text-light dark:text-medium-text border-transparent hover:text-dark-text dark:hover:text-light-text hover:border-gray-300 dark:hover:border-gray-600'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-grow p-4 overflow-y-auto space-y-6">
                    {activeTab === 'Indicator' && (
                        <div>
                            <ul className="space-y-2">
                                <AlertToggle condition="extreme" label="Extreme Alerts" description="RSI > 70 or < 30. (15m, 1h, 2h, 4h, 8h, 1d, 1w)" settings={settings} onChange={onAlertConditionChange} />
                                <AlertToggle condition="rsiSmaCross" label="RSI/SMA Cross Alerts" description="RSI crosses its SMA. (15m, 1h, 2h, 4h, 8h, 1d, 3d)" settings={settings} onChange={onAlertConditionChange} />
                                <AlertToggle condition="divergence" label="Divergence Alerts" description="Bullish/Bearish divergences. (1h, 4h, 8h, 1d, 3d)" settings={settings} onChange={onAlertConditionChange} />
                                <AlertToggle condition="stochRecovery" label="Stoch Recovery from Zero" description="Stoch hits 0, then recovers. (1h, 2h, 4h, 8h, 1d, 3d)" settings={settings} onChange={onAlertConditionChange} />
                                <AlertToggle condition="stochCross" label="Stoch Cross after Recovery" description="Stoch crosses after recovery. (1h, 2h, 4h, 8h, 1d, 3d)" settings={settings} onChange={onAlertConditionChange} />
                                <AlertToggle condition="waveTrendExtreme" label="Wavetrend Extreme" description="Buy/Sell signals on extreme WT levels. (1h, 4h, 1d)" settings={settings} onChange={onAlertConditionChange} />
                                <AlertToggle condition="waveTrendConfluenceBuy" label="WaveTrend Confluence Buy" description="Bullish cross while WT is oversold (< -53). (1h, 4h, 1d)" settings={settings} onChange={onAlertConditionChange} />
                            </ul>
                        </div>
                    )}
                     {activeTab === 'Price-Based' && (
                        <div>
                            <ul className="space-y-2">
                                 <AlertToggle condition="priceGoldenPocket" label="Price in Golden Pocket" description="Price enters the 0.618 Fib zone. (1h, 4h, 1d, 3d)" settings={settings} onChange={onAlertConditionChange} />
                                 <AlertToggle condition="gpReversalVolume" label="GP Reversal w/ Volume" description="Price reverses from GP w/ volume. (1h, 4h, 1d, 3d)" settings={settings} onChange={onAlertConditionChange} />
                                 <AlertToggle condition="fib786Reversal" label="0.786 Fib Reversal" description="Price reverses from the 0.786 Fib zone. (1h, 4h, 1d, 3d)" settings={settings} onChange={onAlertConditionChange} />
                            </ul>
                        </div>
                    )}
                    {activeTab === 'VWAP' && (
                        <div>
                            <ul className="space-y-2">
                                 <AlertToggle condition="stochCrossAboveDailyVwap" label="Stoch Cross Above Daily VWAP" description="Stoch bullish cross when price > daily VWAP. (30m)" settings={settings} onChange={onAlertConditionChange} />
                                 <AlertToggle condition="vwapReversalStochConfirmation" label="VWAP Reversal & Stoch" description="Price taps/reverses from daily VWAP w/ Stoch confirmation. (30m)" settings={settings} onChange={onAlertConditionChange} />
                                 <AlertToggle condition="priceBounceAnchoredVwapLow" label="Bounce from VWAP Anchored to Low" description="Price taps/reverses from VWAP anchored to last strong low w/ Stoch confirmation. (30m, 1h, 4h)" settings={settings} onChange={onAlertConditionChange} />
                                 <AlertToggle condition="priceRejectionAnchoredVwapHigh" label="Rejection from VWAP Anchored to High" description="Price taps/reverses from VWAP anchored to last strong high w/ Stoch confirmation. (30m, 1h, 4h)" settings={settings} onChange={onAlertConditionChange} />
                            </ul>
                        </div>
                    )}
                    {activeTab === 'Volume Profile' && (
                        <div>
                             <ul className="space-y-2">
                                <AlertToggle condition="pocRejection" label="POC Bounce/Rejection" description="Price tests the Point of Control and reverses, with Stoch confirmation. (30m, 1h, 4h)" settings={settings} onChange={onAlertConditionChange} />
                                <AlertToggle condition="valueAreaEdgeRejection" label="Value Area Edge Rejection" description="Price tests VAH/VAL and fades back inside the value area, with Stoch confirmation. (30m, 1h, 4h)" settings={settings} onChange={onAlertConditionChange} />
                                <AlertToggle condition="valueAreaBreakout" label="Value Area Breakout" description="Price closes outside the value area on high volume (>150% average). (30m, 1h, 4h)" settings={settings} onChange={onAlertConditionChange} />
                            </ul>
                        </div>
                    )}
                     {activeTab === 'Anchored Profile' && (
                        <div>
                             <ul className="space-y-2">
                                <AlertToggle condition="pocBounceLowAnchor" label="Bounce from Low-Anchored POC" description="Price bounces from the POC calculated from the last strong low, w/ Stoch confirmation. (1h, 4h, 1d)" settings={settings} onChange={onAlertConditionChange} />
                                <AlertToggle condition="pocRejectionHighAnchor" label="Rejection from High-Anchored POC" description="Price rejects from the POC calculated from the last strong high, w/ Stoch confirmation. (1h, 4h, 1d)" settings={settings} onChange={onAlertConditionChange} />
                                <AlertToggle condition="breakoutHighAnchorVAH" label="Acceptance Above High-Anchored Value" description="Price breaks and accepts above the Value Area from the last strong high, on volume. (1h, 4h, 1d)" settings={settings} onChange={onAlertConditionChange} />
                            </ul>
                        </div>
                    )}
                     {activeTab === 'Confluence Strategy' && (
                        <div>
                            <ul className="space-y-2">
                                 <AlertToggle condition="highConvictionBuy" label="High-Conviction Buy" description="Triggers on deep reversals, confirmed SMA bounces, or SMA reclamations with volume/stoch confirmation. (1h, 4h, 1d)" settings={settings} onChange={onAlertConditionChange} />
                                 <AlertToggle condition="highConvictionBuyNoVolume" label="High-Conviction Buy (No Volume)" description="Same as High-Conviction Buy, but without the volume confirmation check. (1h, 4h, 1d)" settings={settings} onChange={onAlertConditionChange} />
                                 <AlertToggle condition="highConvictionSell" label="High-Conviction Sell" description="Triggers on deep exhaustion, confirmed SMA rejections, or SMA reclamations with volume/stoch confirmation. (1h, 4h, 1d)" settings={settings} onChange={onAlertConditionChange} />
                            </ul>
                        </div>
                    )}
                     {activeTab === 'KiwiHunt' && (
                        <div>
                            <ul className="space-y-2">
                                <AlertToggle condition="kiwiHuntHunt" label="Hunt Signals" description="Hunt Buy & Hunt Sell. Highest quality signals based on a perfect confluence of events. (15m, 1h, 4h, 1d)" settings={settings} onChange={onAlertConditionChange} />
                                <AlertToggle condition="kiwiHuntCrazy" label="Crazy Signals" description="Crazy Buy & Crazy Sell. Strong signals indicating strength from weakness, and vice-versa. (15m, 1h, 4h, 1d)" settings={settings} onChange={onAlertConditionChange} />
                                <AlertToggle condition="kiwiHuntBuyTrend" label="Buy Trend" description="Signals that a shallow pullback is likely over and the bullish trend is resuming. (15m, 1h, 4h, 1d)" settings={settings} onChange={onAlertConditionChange} />
                            </ul>
                        </div>
                    )}
                </div>
                
                 {/* Footer */}
                <div className="flex justify-end p-4 border-t border-light-border dark:border-dark-border">
                    <button onClick={onClose} className="px-6 py-2 font-bold text-white dark:text-dark-bg bg-primary-light dark:bg-primary rounded-lg hover:opacity-90 transition-opacity">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlertsModal;