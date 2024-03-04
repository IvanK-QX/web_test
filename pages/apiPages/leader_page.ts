import { APIRequestContext, expect, request } from '@playwright/test';
import { Headers } from '../../utils/headers';
export class ApiLeadersPage {
    apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async getLeders(url: string, userToken: string, period: 'week' | 'day' | 'month') {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            period: `${period}`,
            itemsPerPage: 100,
            skip: 0,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/streams/leaderboard`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        console.log(`Leaders for period: ${period} is dispalyed`);
    }
}
