import { APIRequestContext, expect, request } from '@playwright/test';
import { Headers } from '../../utils/headers';
import { ReportsPayloads } from './reports_payloads';

export class ApiReportsPage {
    apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async reportUser(
        url: string,
        userToken: string,
        reason:
            | 'streamerUnder17'
            | 'nudity'
            | 'sexualContent'
            | 'displayOfCriminalActivitiesOrWeapon'
            | 'drugsAlcoholSmoking'
            | 'harassmentHatefulSpeechBullying'
            | 'sharingPrivateInformation'
            | 'spam'
            | 'other',
        userId: string
    ) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = ReportsPayloads.reportUserPayload(reason, userId);

        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/report`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        console.log(`User ${userId} reported with reason ${reason}`);
    }

    async adminReport(
        url: string,
        adminToken: string,
        reason:
            | 'streamerUnder17'
            | 'nudity'
            | 'sexualContent'
            | 'displayOfCriminalActivitiesOrWeapon'
            | 'drugsAlcoholSmoking'
            | 'harassmentHatefulSpeechBullying'
            | 'sharingPrivateInformation'
            | 'spam'
            | 'other',
        humanId: string
    ) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = ReportsPayloads.adminReportPayload(humanId);

        const headers = Headers.userHeader(adminToken);

        const apiRequest = await apiContext.post(`${url}:3000/admin/reports`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.json();
        const reportId = response.documents[0]._id;
        const reportedHumanId = response.documents[0].reportedUser.humanReadableId;
        const reportReason = response.documents[0].reason;
        expect(reportedHumanId).toEqual(humanId);
        expect(reportReason).toEqual(reason);
        console.log(`Report For User ${reportedHumanId} is Displayed`);
        return { reportId };
    }

    async reportStatus(url: string, adminToken: string, reportId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = ReportsPayloads.reportStatusPayload(reportId);

        const headers = Headers.userHeader(adminToken);

        const apiRequest = await apiContext.post(`${url}:3000/admin/report/status`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.json();
        const id = response[0]._id;
        const reportStatus = response[0].status;
        expect(reportStatus).toEqual('New');
        expect(id).toEqual(reportId);
        console.log(`Report ${reportId} with status ${reportStatus} is Displayed`);
    }
}
