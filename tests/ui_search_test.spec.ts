import { apiUrl } from '../utils/apiUrl';
import { streamerAndWatcherFixture } from '../fixtures/fixtures';

streamerAndWatcherFixture.describe('UI - Search Tests', async () => {
    streamerAndWatcherFixture.beforeEach(async ({ streamer }) => {
        await streamer.app.loginPage.apiLogin(apiUrl.qaEnvUrl);
        await streamer.page.goto('/');
    });

    streamerAndWatcherFixture('Chats - Search by name ', async ({ streamer }) => {
        await streamer.app.mainPage.searchUserByName('50cent');
        await streamer.app.mainPage.validateCorrectSearch('50cent');
    });

    streamerAndWatcherFixture('Chats - Unblock Chat', async ({ streamer }) => {
        await streamer.app.mainPage.searchUserByName('7879');
        await streamer.app.mainPage.validateCorrectSearch('50cent');
    });

    streamerAndWatcherFixture('Chats - Send Gift From Profile ', async ({ streamer }) => {
        await streamer.app.mainPage.searchUserByName('7879');
        await streamer.app.mainPage.validateCorrectSearch('50cent');
        await streamer.app.mainPage.clickonUserProfile();
        await streamer.app.mainPage.sendGiftFromProfile();
    });
});
