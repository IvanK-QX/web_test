import { APIRequestContext, expect, request } from '@playwright/test';
import { Headers } from '../../utils/headers';
import { NotificationsContentPayloads } from './notificationsContent_payloads';
export class ApiNotificationsContentPage {
    apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async notificationsContentCreate(url: string, adminToken: string, contentTitle: string, contentText: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = NotificationsContentPayloads.notificationsContentCreate(contentTitle, contentText);
        const headers = Headers.userHeader(adminToken);

        const apiRequest = await apiContext.post(`${url}:3000/admin/notificationsContent/create`, {
            data,
            headers: headers,
        });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.json();
        const createdNotificationTitle = response.resultId.title;
        const createdNotificationText = response.resultId.text;
        const notificationContentId = response.resultId._id;
        expect(createdNotificationTitle).toEqual(contentTitle);
        expect(createdNotificationText).toEqual(contentText);
        console.log(`The Notification Content with ${contentTitle} and ${contentText} is created`);
        return { notificationContentId };
    }

    async notificationsContentUpdate(
        url: string,
        adminToken: string,
        notificationContentId: string,
        contentTitle: string,
        contentText: string
    ) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = NotificationsContentPayloads.notificationsContentUpdate(
            notificationContentId,
            contentTitle,
            contentText
        );
        const headers = Headers.userHeader(adminToken);

        const apiRequest = await apiContext.post(`${url}:3000/admin/notificationsContent/update`, {
            data,
            headers: headers,
        });
        expect(apiRequest.ok()).toBeTruthy();
    }

    async notificationsContentDelete(url: string, adminToken: string, notificationContentId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            id: `${notificationContentId}`,
        };
        const headers = Headers.userHeader(adminToken);

        const apiRequest = await apiContext.post(`${url}:3000/admin/notificationsContent/delete`, {
            data,
            headers: headers,
        });
        expect(apiRequest.ok()).toBeTruthy();
    }
}
