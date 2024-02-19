import React, { useState, useEffect } from 'react';

export const TimeInterval = ({ date }: any) => {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeAgo(formatTimeAgo(date));
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [date]);

    useEffect(() => {
        setTimeAgo(formatTimeAgo(date));
    }, [date]);

    const formatTimeAgo = (date) => {
        const now = new Date();
        const postedDate = new Date(date);
        const secondsAgo = Math.round((now - postedDate) / 1000);
        const minutesAgo = Math.round(secondsAgo / 60);
        const hoursAgo = Math.round(minutesAgo / 60);
        const daysAgo = Math.round(hoursAgo / 24);

        if (secondsAgo < 60) return 'Just now';
        else if (minutesAgo < 60) return `${minutesAgo}m ago`;
        else if (hoursAgo < 24) return `${hoursAgo}h ago`;
        else return `${daysAgo}d ago`;
    };

    return <span>{timeAgo}</span>;
};
