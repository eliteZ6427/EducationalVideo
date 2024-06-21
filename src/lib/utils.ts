export function timeSince(date: string) {
    const now: Date = new Date();
    const createdAt: Date = new Date(date);
    const seconds: number = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        return interval + "y ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + "mo ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + "d ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + "h ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return interval + "min ago";
    }
    return Math.floor(seconds < 0 ? 0 : seconds) + "s ago";
}