import type { Notification } from '../types';
import { getNotificationDetails } from './notificationService';

// Hardcoded Webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1419438422950678548/UKRWESWz7GG5eFpbiPtJus_Kf5juLNj8Np8UHEm5ktBEP7iU_ZaAyvZvU6KTjcZFwL6Z';

// Maps Tailwind CSS background color classes to decimal color codes for Discord embeds.
const colorMap: Record<string, number> = {
  'bg-red-500': 15680580,
  'bg-red-600': 15680580,
  'bg-green-500': 2278750,
  'bg-green-600': 2278750,
  'bg-sky-500': 960009,
  'bg-purple-500': 10023159,
  'bg-cyan-500': 440020,
  'bg-blue-500': 3447003,
  'bg-amber-500': 16098048,
  'bg-amber-600': 16098048,
  'bg-fuchsia-500': 13959936,
  'bg-yellow-500': 15186214,
  'bg-slate-500': 6524330,
  'bg-indigo-500': 6373356,
  'bg-teal-500': 1356708,
  'bg-orange-500': 16422144,
  'bg-orange-600': 16422144,
  'bg-cyan-400': 2523880,
  'bg-sky-400': 5981938,
  'bg-rose-500': 15883392,
  'bg-gray-500': 6524330,
};

/**
 * Sends a formatted notification to the hardcoded Discord webhook URL.
 * @param notification The notification object containing alert details.
 */
export const sendDiscordWebhook = async (
    notification: Omit<Notification, 'id' | 'read'>
): Promise<void> => {
    // Enrich the notification with display details (title, body, color, etc.)
    const details = getNotificationDetails(notification as Notification);
    
    const embed = {
        title: details.title,
        description: details.body,
        color: colorMap[details.accentColor] || 5814783, // Default to gray if color not found
        timestamp: new Date().toISOString(),
        footer: {
            text: 'Crypto RSI Scanner',
        },
    };

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                embeds: [embed],
            }),
        });
    } catch (error) {
        console.error('Failed to send Discord webhook:', error);
    }
};