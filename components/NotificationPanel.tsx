
import React from 'react';
import type { Notification } from '../types';
import { getNotificationDetails } from '../services/notificationService';

interface NotificationItemProps {
    notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
    // Get all details including colors for the accent bar and icon
    const { icon, title, body, accentColor, iconColor } = getNotificationDetails(notification);

    return (
        // The parent is relative with extra left padding to make space for the accent bar
        <div className={`relative p-3 pl-6 border-b border-light-border dark:border-dark-border last:border-b-0 hover:bg-light-border/50 dark:hover:bg-dark-border/50 transition-colors`}>
            {/* The colored accent border, matching the toast notifications */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${accentColor}`}></div>
            
            <div className="flex items-start gap-3">
                {/* Use the specific iconColor for the icon */}
                <i className={`fa-solid ${icon} ${iconColor} text-lg mt-1`}></i>
                <div>
                    <p className="font-bold text-sm text-dark-text dark:text-light-text">{title}</p>
                    <p className="text-xs text-medium-text-light dark:text-medium-text">{body}</p>
                </div>
            </div>
        </div>
    );
};

interface NotificationPanelProps {
    isOpen: boolean;
    notifications: Notification[];
    onClear: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, notifications, onClear }) => {
    if (!isOpen) return null;

    return (
        <div
            className="absolute top-full mt-2 w-64 max-w-[calc(100vw-2rem)] bg-light-bg/95 dark:bg-dark-bg/95 backdrop-blur-lg border border-light-border/50 dark:border-dark-border/50 rounded-xl shadow-2xl z-50 animate-dropdown-in flex flex-col overflow-hidden md:right-0 left-1/2 -translate-x-[60%] md:left-auto md:translate-x-0 origin-top md:origin-top-right"
        >
            <div className="flex justify-between items-center p-3 border-b border-light-border dark:border-dark-border">
                <h3 className="font-bold text-dark-text dark:text-light-text">Notifications</h3>
                {notifications.length > 0 && (
                     <button onClick={onClear} className="text-xs font-semibold text-primary-light dark:text-primary hover:underline focus:outline-none">
                        Clear All
                    </button>
                )}
            </div>
            <div className="flex-grow max-h-[60vh] overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="text-center p-8 text-sm text-medium-text-light dark:text-medium-text">
                        <i className="fa-solid fa-bell-slash text-4xl mb-4 opacity-70"></i>
                        <p>No new notifications.</p>
                    </div>
                ) : (
                    <div>
                        {notifications.map(n => <NotificationItem key={n.id} notification={n} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationPanel;
