import { apiDataSet } from '../../utils/dataSet';
import { Headers } from '../../utils/headers';
import { APIRequestContext, expect, request } from '@playwright/test';

export class ApiStreamPage {
    apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async streamList(url: string, userToken: string, period: 'near' | 'streamersIfollow' | 'public') {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            filter: `${period}`,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/streams/list`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        console.log(`Stream List: ${period} is dispalyed`);
    }

    async getIntrenalList(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.get(`${url}:3000/streams/listInternal`, { headers: headers });
        const response = await apiRequest.text();
        expect(apiRequest.ok()).toBeTruthy();
        expect(response).toContain('internals');
        console.log(`Internals list is dispalyed`);
    }

    async createStream(url: string, userToken: string, option: 'public', streamTitle: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            title: `${streamTitle}`,
            type: `${option}`,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/streams/my/create`, { data, headers: headers });
        const response = await apiRequest.json();
        expect(apiRequest.ok()).toBeTruthy();
        const myStreamId = response._id;
        const title = response.title;
        const myStreamType = response.type;
        const myStreamerId = response.streamerId;
        const myChatId = response.chatId;
        const myStreamLink = response.link;
        expect(myStreamType).toEqual(option);
        console.log(`Stream with title: ${title} is dispalyed`);
        return { myStreamId, myStreamType, myStreamerId, myChatId, myStreamLink };
    }

    async getStream(url: string, userToken: string, streamId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            streamId: `${streamId}`,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/streams/get`, { data, headers: headers });
        const response = await apiRequest.json();
        expect(apiRequest.ok()).toBeTruthy();
        const streamID = response.stream._id;
        expect(streamID).toEqual(streamId);
        console.log(`Stream with id: ${streamID} is dispalyed`);
    }

    async sendInvite(url: string, userToken: string, streamId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            streamId: `${streamId}`,
            //todo add userId as varible, need to find method that returns all users
            // remove hardcoded variable
            userIds: ['648b24260642b2b48c2295da'],
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/streams/my/sendInvite`, { data, headers: headers });
        const response = await apiRequest.json();
        expect(apiRequest.ok()).toBeTruthy();
        const streamID = response[0].streamId;
        expect(streamID).toEqual(streamId);
        console.log(`Stream with id: ${streamID} is dispalyed`);
    }

    async updateStream(url: string, userToken: string, streamId: string, streamTitle: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            _id: `${streamId}`,
            title: `${streamTitle}`,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/streams/my/update`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.json();
        const streamID = response._id;
        const title = response.title;
        expect(title).toEqual(streamTitle);
        console.log(`Stream with id: ${streamID} is update`);
    }

    async stopStream(url: string, userToken: string, streamId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            streamId: `${streamId}`,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/streams/my/stop`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        console.log(`Stream with id: ${streamId} is stopped`);
    }

    async getMyStream(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.get(`${url}:3000/streams/my/list`, { headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.text();
        expect(response).toContain(apiDataSet.streamTitle);
        console.log(`List of my streams is displayed`);
    }

    async streamRank(url: string, userToken: string, streamId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            streamId: `${streamId}`,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/streams/rank`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.json();
        const streamRank = response.streamRank;
        expect(streamRank).toEqual(0);
        console.log(`Stream rank is: ${streamRank}`);
    }

    async addDesireGift(url: string, userToken: string, streamId: string, giftId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            streamId: `${streamId}`,
            giftId: `${giftId}`,
            title: 'My Gift',
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/streams/my/desiredGift`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.json();
        const desiredGiftId = response.desiredGiftId;
        const titleDesiredGift = response.titleDesiredGift;
        expect(desiredGiftId).toEqual(giftId);
        expect(titleDesiredGift).toEqual('My Gift');
        console.log(`Gift with title: ${streamId} is added`);
    }

    async removeDesireGift(url: string, userToken: string, streamId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            streamId: `${streamId}`,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/streams/my/desiredGift/delete`, {
            data,
            headers: headers,
        });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.json();
        const desiredGiftId = response.desiredGiftId;
        expect(desiredGiftId).toEqual(null);
        console.log(`Gift is removed, gift id = ${desiredGiftId}`);
    }
}
