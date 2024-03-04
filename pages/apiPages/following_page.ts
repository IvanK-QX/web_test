import { APIRequestContext, expect, request } from '@playwright/test';
import { Headers } from '../../utils/headers';

export class ApiFollowingPage {
    apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async doIFollow(url: string, userToken: string, followedUserId: string, status: true | false) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            userId: `${followedUserId}`,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/doIFollow`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.json();
        const doIfollow = response.doIfollow;
        expect(doIfollow).toEqual(status);
        console.log(`User with id: ${followedUserId} is followed: ${status}`);
    }

    async suggestedUsersToFollow(url: string, userToken: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.get(`${url}:3000/suggestUsersToFollow`, { headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.json();
        const followUserIdOne = response[0]._id;
        const followUserIdTwo = response[1]._id;
        console.log(`List of suggest to follow user displayed, first user: ${followUserIdOne}`);
        return { followUserIdOne, followUserIdTwo };
    }

    async follow(url: string, userToken: string, followedUserId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            userId: `${followedUserId}`,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/follow`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        console.log(`User with id: ${followedUserId} is followed`);
    }

    async unFollow(url: string, userToken: string, followedUserId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            userId: `${followedUserId}`,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/unfollow`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        console.log(`User with id: ${followedUserId} is unfollow`);
    }

    async followMultiple(url: string, userToken: string, followedUserIdOne: string, followedUserIdTwo: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            users: [`${followedUserIdOne}`, `${followedUserIdTwo}`],
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/followMultiple`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        console.log(`Users with id: ${followedUserIdOne} and ${followedUserIdTwo} followed`);
    }

    async getFollowingIds(url: string, userToken: string, followUserIdOne: string, followUserIdTwo: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.get(`${url}:3000/following/ids`, { headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.text();
        expect(response).toContain(followUserIdOne);
        expect(response).toContain(followUserIdTwo);
        console.log(`List of suggest to follow user id displayed, ${followUserIdOne}, ${followUserIdTwo}`);
    }

    async getFollowingList(url: string, userToken: string, followedUserId: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            userId: `${followedUserId}`,
            itemsPerPage: 100,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/following`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.text();
        expect(response).toContain('users');
        console.log(`List of followed users is diaplyed`);
    }

    async isMutualFollow(url: string, userToken: string, followedUserId: string, status: true | false) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            userId: `${followedUserId}`,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/isMutualFollowing`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.json();
        const isMutualFollowing = response.isMutualFollowing;
        expect(isMutualFollowing).toEqual(status);
        console.log(`User with id: ${followedUserId} isMutualFollowing: ${status}`);
    }

    async followCounters(url: string, userToken: string, userId: string, followingCounter = 0, followerCounter = 0) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
        const data = {
            userId: `${userId}`,
        };
        const headers = Headers.userHeader(userToken);

        const apiRequest = await apiContext.post(`${url}:3000/followCounters`, { data, headers: headers });
        expect(apiRequest.ok()).toBeTruthy();
        const response = await apiRequest.json();
        const responseUserId = response.userId;
        const following = response.following;
        const followers = response.followers;
        expect(responseUserId).toEqual(userId);
        expect(following).toEqual(followingCounter);
        expect(followers).toEqual(followerCounter);
        console.log(`Following counter for user: ${responseUserId} is displayed`);
    }
}
