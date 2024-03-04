export class NotificationsContentPayloads {
    static notificationsContentCreate(contentTitle: string, contentText: string) {
        const query = {
            type: 'giftReceived',
            title: `${contentTitle}`,
            text: `${contentText}`,
        };
        return query;
    }

    static notificationsContentUpdate(notificationContentId: string, contentTitle: string, contentText: string) {
        const query = {
            id: `${notificationContentId}`,
            type: 'giftReceived',
            title: `${contentTitle}`,
            text: `${contentText}`,
        };
        return query;
    }
}
