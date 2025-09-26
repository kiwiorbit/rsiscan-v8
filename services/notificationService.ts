import type { Notification } from '../types';

interface NotificationDetails {
    icon: string;
    title: string;
    body: string;
    accentColor: string;
    iconColor: string;
}

export const getNotificationDetails = (notification: Notification): NotificationDetails => {
    let icon = 'fa-bell', title = 'Notification', body = '...', accentColor = 'bg-gray-500', iconColor = 'text-gray-500';

    switch (notification.type) {
        case 'overbought':
            icon = 'fa-arrow-trend-up';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `Overbought at ${notification.rsi?.toFixed(2)}`;
            accentColor = 'bg-red-500';
            iconColor = 'text-red-500';
            break;
        case 'oversold':
            icon = 'fa-arrow-trend-down';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `Oversold at ${notification.rsi?.toFixed(2)}`;
            accentColor = 'bg-green-500';
            iconColor = 'text-green-500';
            break;
        case 'bullish-cross':
            icon = 'fa-angles-up';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `Bullish Cross: RSI over SMA.`;
            accentColor = 'bg-sky-500';
            iconColor = 'text-sky-500';
            break;
        case 'death-cross':
            icon = 'fa-angles-down';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `Death Cross: RSI under SMA.`;
            accentColor = 'bg-purple-500';
            iconColor = 'text-purple-500';
            break;
        case 'bullish-divergence':
            icon = 'fa-chart-line';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `Bullish Divergence detected.`;
            accentColor = 'bg-green-600';
            iconColor = 'text-green-500';
            break;
        case 'bearish-divergence':
            icon = 'fa-chart-line';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `Bearish Divergence detected.`;
            accentColor = 'bg-red-600';
            iconColor = 'text-red-500';
            break;
        case 'stoch-recovery':
            icon = 'fa-level-up-alt';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `Stoch Recovery from Zero`;
            accentColor = 'bg-cyan-500';
            iconColor = 'text-cyan-500';
            break;
        case 'stoch-bullish-cross':
            icon = 'fa-signal';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `Stoch Bullish Cross after Recovery`;
            accentColor = 'bg-blue-500';
            iconColor = 'text-blue-500';
            break;
        case 'price-golden-pocket':
            icon = 'fa-magnet';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `Price in Golden Pocket.`;
            accentColor = 'bg-amber-500';
            iconColor = 'text-amber-500';
            break;
        case 'gp-reversal-volume':
            icon = 'fa-chart-line';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `GP Reversal with rising volume.`;
            accentColor = 'bg-amber-600';
            iconColor = 'text-amber-600';
            break;
        case 'fib-786-reversal':
            icon = 'fa-wave-square';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `Reversal from 0.786 Fib Zone.`;
            accentColor = 'bg-fuchsia-500';
            iconColor = 'text-fuchsia-500';
            break;
        case 'breakout-volume':
            icon = 'fa-bolt';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `Breakout with Volume Surge.`;
            accentColor = 'bg-yellow-500';
            iconColor = 'text-yellow-500';
            break;
        case 'capitulation-volume':
            icon = 'fa-skull-crossbones';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = `Capitulation Volume Detected.`;
            accentColor = 'bg-slate-500';
            iconColor = 'text-slate-500';
            break;
        case 'accumulation-volume':
            icon = 'fa-box-archive';
            title = `${notification.symbol} (${notification.timeframe})`;
            body = notification.body || 'Accumulation Volume Detected';
            accentColor = 'bg-indigo-500';
            iconColor = 'text-indigo-500';
            break;
        case 'wavetrend-buy':
            icon = 'fa-water';
            title = `Wavetrend Buy`;
            body = `${notification.symbol} (${notification.timeframe}) at ${notification.value?.toFixed(2)}`;
            accentColor = 'bg-teal-500';
            iconColor = 'text-teal-500';
            break;
        case 'wavetrend-sell':
            icon = 'fa-water';
            title = `Wavetrend Sell`;
            body = `${notification.symbol} (${notification.timeframe}) at ${notification.value?.toFixed(2)}`;
            accentColor = 'bg-rose-500';
            iconColor = 'text-rose-500';
            break;
        case 'wavetrend-confluence-buy':
            icon = 'fa-circle-check';
            title = `WaveTrend Confluence Buy`;
            body = `${notification.symbol} (${notification.timeframe}) crossed up from oversold.`;
            accentColor = 'bg-sky-500';
            iconColor = 'text-sky-500';
            break;
        case 'stoch-cross-above-daily-vwap':
            icon = 'fa-check-double';
            title = `${notification.symbol} (30m)`;
            body = `Stoch cross while price > Daily VWAP.`;
            accentColor = 'bg-cyan-500';
            iconColor = 'text-cyan-500';
            break;
        case 'vwap-reversal-stoch-confirmation':
            icon = 'fa-water-arrow-up';
            title = `${notification.symbol} (30m)`;
            body = `VWAP tap/reversal w/ Stoch confirmation.`;
            accentColor = 'bg-purple-500';
            iconColor = 'text-purple-500';
            break;
        case 'price-bounce-vwap-low':
            icon = 'fa-anchor-circle-up';
            title = `Anchored VWAP Bounce`;
            body = `${notification.symbol} (${notification.timeframe}) bounced from VWAP anchored to low.`;
            accentColor = 'bg-blue-500';
            iconColor = 'text-blue-500';
            break;
        case 'price-rejection-vwap-high':
            icon = 'fa-anchor-circle-down';
            title = `Anchored VWAP Rejection`;
            body = `${notification.symbol} (${notification.timeframe}) rejected from VWAP anchored to high.`;
            accentColor = 'bg-orange-500';
            iconColor = 'text-orange-500';
            break;
        case 'high-conviction-buy':
            icon = 'fa-gem';
            title = `High-Conviction Buy Signal`;
            body = `${notification.symbol} (${notification.timeframe}) meets all criteria.`;
            accentColor = 'bg-cyan-400';
            iconColor = 'text-cyan-400';
            break;
        case 'high-conviction-buy-no-volume':
            icon = 'fa-gem';
            title = `High-Conviction Buy (No Vol)`;
            body = `${notification.symbol} (${notification.timeframe}) meets criteria.`;
            accentColor = 'bg-sky-400';
            iconColor = 'text-sky-400';
            break;
        case 'high-conviction-sell':
            icon = 'fa-gem';
            title = `High-Conviction Sell Signal`;
            body = `${notification.symbol} (${notification.timeframe}) meets all criteria.`;
            accentColor = 'bg-rose-500';
            iconColor = 'text-rose-500';
            break;
        case 'poc-rejection-bullish':
            icon = 'fa-magnet';
            title = `POC Bounce`;
            body = `${notification.symbol} (${notification.timeframe}) bounced from Point of Control.`;
            accentColor = 'bg-green-500';
            iconColor = 'text-green-500';
            break;
        case 'poc-rejection-bearish':
            icon = 'fa-magnet';
            title = `POC Rejection`;
            body = `${notification.symbol} (${notification.timeframe}) rejected from Point of Control.`;
            accentColor = 'bg-red-500';
            iconColor = 'text-red-500';
            break;
        case 'value-area-rejection-bullish':
            icon = 'fa-arrow-down-to-bracket';
            title = `Value Area Low Bounce`;
            body = `${notification.symbol} (${notification.timeframe}) bounced from VAL.`;
            accentColor = 'bg-teal-500';
            iconColor = 'text-teal-500';
            break;
        case 'value-area-rejection-bearish':
            icon = 'fa-arrow-up-to-bracket';
            title = `Value Area High Rejection`;
            body = `${notification.symbol} (${notification.timeframe}) rejected from VAH.`;
            accentColor = 'bg-orange-500';
            iconColor = 'text-orange-500';
            break;
        case 'value-area-breakout-bullish':
            icon = 'fa-arrow-up-from-bracket';
            title = `Value Area Breakout`;
            body = `${notification.symbol} (${notification.timeframe}) broke above VAH on volume.`;
            accentColor = 'bg-sky-500';
            iconColor = 'text-sky-500';
            break;
        case 'value-area-breakout-bearish':
            icon = 'fa-arrow-down-from-bracket';
            title = `Value Area Breakdown`;
            body = `${notification.symbol} (${notification.timeframe}) broke below VAL on volume.`;
            accentColor = 'bg-purple-500';
            iconColor = 'text-purple-500';
            break;
        case 'poc-bounce-low-anchor':
            icon = 'fa-person-digging';
            title = `Low-Anchored POC Bounce`;
            body = `${notification.symbol} (${notification.timeframe}) bounced from POC anchored to recent low.`;
            accentColor = 'bg-sky-500';
            iconColor = 'text-sky-500';
            break;
        case 'poc-rejection-high-anchor':
            icon = 'fa-person-falling';
            title = `High-Anchored POC Rejection`;
            body = `${notification.symbol} (${notification.timeframe}) rejected from POC anchored to recent high.`;
            accentColor = 'bg-orange-500';
            iconColor = 'text-orange-500';
            break;
        case 'breakout-high-anchor-vah':
            icon = 'fa-rocket';
            title = `Acceptance Above Value`;
            body = `${notification.symbol} (${notification.timeframe}) broke above value area from recent high.`;
            accentColor = 'bg-teal-500';
            iconColor = 'text-teal-500';
            break;
        case 'kiwi-hunt-buy':
            icon = 'fa-rocket';
            title = `KiwiHunt: Hunt Buy`;
            body = `${notification.symbol} (${notification.timeframe}) Hunt signal detected.`;
            accentColor = 'bg-lime-500';
            iconColor = 'text-lime-500';
            break;
        case 'kiwi-hunt-sell':
            icon = 'fa-rocket';
            title = `KiwiHunt: Hunt Sell`;
            body = `${notification.symbol} (${notification.timeframe}) Hunt signal detected.`;
            accentColor = 'bg-red-500';
            iconColor = 'text-red-500';
            break;
        case 'kiwi-hunt-crazy-buy':
            icon = 'fa-bolt';
            title = `KiwiHunt: Crazy Buy`;
            body = `${notification.symbol} (${notification.timeframe}) Crazy signal detected.`;
            accentColor = 'bg-yellow-400';
            iconColor = 'text-yellow-400';
            break;
        case 'kiwi-hunt-crazy-sell':
            icon = 'fa-bolt-lightning';
            title = `KiwiHunt: Crazy Sell`;
            body = `${notification.symbol} (${notification.timeframe}) Crazy signal detected.`;
            accentColor = 'bg-orange-500';
            iconColor = 'text-orange-500';
            break;
        case 'kiwi-hunt-buy-trend':
            icon = 'fa-play-circle';
            title = `KiwiHunt: Buy Trend`;
            body = `${notification.symbol} (${notification.timeframe}) Buy trend signal detected.`;
            accentColor = 'bg-cyan-400';
            iconColor = 'text-cyan-400';
            break;
        case 'super-confluence-buy':
            icon = 'fa-star-of-life';
            title = `Super Confluence Buy`;
            body = `${notification.symbol} (${notification.timeframe}) shows KiwiHunt & WaveTrend buy signals.`;
            accentColor = 'bg-lime-400';
            iconColor = 'text-lime-400';
            break;
        case 'super-confluence-sell':
            icon = 'fa-star-of-life';
            title = `Super Confluence Sell`;
            body = `${notification.symbol} (${notification.timeframe}) shows KiwiHunt & WaveTrend sell signals.`;
            accentColor = 'bg-fuchsia-500';
            iconColor = 'text-fuchsia-500';
            break;
        case 'confirmed-reversal-buy':
            icon = 'fa-check-double';
            title = `Confirmed Reversal Buy`;
            body = `${notification.symbol} (${notification.timeframe}) WaveTrend bottom confirmed by KiwiHunt.`;
            accentColor = 'bg-teal-400';
            iconColor = 'text-teal-400';
            break;
        case 'confirmed-reversal-sell':
            icon = 'fa-check-double';
            title = `Confirmed Reversal Sell`;
            body = `${notification.symbol} (${notification.timeframe}) WaveTrend top confirmed by KiwiHunt.`;
            accentColor = 'bg-orange-500';
            iconColor = 'text-orange-500';
            break;
        case 'trend-rider-buy':
            icon = 'fa-person-running';
            title = `Trend Rider Buy`;
            body = `${notification.symbol} (${notification.timeframe}) Bullish pullback signal in a macro uptrend.`;
            accentColor = 'bg-cyan-400';
            iconColor = 'text-cyan-400';
            break;
    }

    return { icon, title, body, accentColor, iconColor };
};