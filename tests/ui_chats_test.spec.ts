import { apiUrl } from '../utils/apiUrl';
import { apiDataSet } from '../utils/dataSet';
import { streamerAndWatcherFixture } from '../fixtures/fixtures';

let user, watcher_user;

streamerAndWatcherFixture.describe('UI - Chat Tests', async () => {
    streamerAndWatcherFixture.beforeEach(async ({ streamer }) => {
        user = await streamer.app.loginPage.apiLogin(apiUrl.qaEnvUrl);
        await streamer.app.chatPage.open();
    });

    streamerAndWatcherFixture('Chats - Default System Messge', async ({ streamer }) => {
        await streamer.app.chatPage.openExistingChat('Plamfy');
        await streamer.app.chatPage.observeSupportMessageTextContent();
    });

    streamerAndWatcherFixture('Chats - Unblock Chat', async ({ streamer }) => {
        await streamer.app.chatPage.clickStartChatButton();
        await streamer.app.chatPage.clickStartChatButtonWithFirstSuggestedUser();
        await streamer.app.chatPage.observeBlockedChatForCoins();
        await streamer.app.chatPage.unblockChat();
    });
});

streamerAndWatcherFixture.describe('UI - Chat Page With Two Users', async () => {
    streamerAndWatcherFixture.beforeEach(async ({ streamer, watcher }) => {
        user = await streamer.app.loginPage.apiLogin(apiUrl.qaEnvUrl);

        watcher_user = await watcher.api.loginPage.createNewUser(apiUrl.qaEnvUrl);
        await streamer.api.followingPage.follow(apiUrl.qaEnvUrl, watcher_user.userToken, user.id);
        await streamer.api.followingPage.follow(apiUrl.qaEnvUrl, user.userToken, watcher_user.id);
        await streamer.app.chatPage.open();
        await streamer.api.slackPage.addCoins(user.humanReadableId);
    });

    streamerAndWatcherFixture('Chats - Unblock Chat By Followings', async ({ streamer }) => {
        await streamer.app.chatPage.startChetWithSpecificUser(watcher_user.name);
        await streamer.app.chatPage.observeUnblockedChat();
    });

    streamerAndWatcherFixture('Chats - Message Validation', async ({ streamer }) => {
        await streamer.app.chatPage.startChetWithSpecificUser(watcher_user.name);
        await streamer.app.chatPage.sendMessage(apiDataSet.validationMessageText);
        await streamer.app.chatPage.sendMessage(apiDataSet.message254Symbols);
        await streamer.app.chatPage.sendMessage255Symbols();
    });

    streamerAndWatcherFixture('Chats - Send Media File', async ({ streamer }) => {
        await streamer.app.chatPage.startChetWithSpecificUser(watcher_user.name);
        await streamer.app.chatPage.sendMediaFile();
    });

    streamerAndWatcherFixture('Chats - Send Emoji', async ({ streamer }) => {
        await streamer.app.chatPage.startChetWithSpecificUser(watcher_user.name);
        await streamer.app.chatPage.sendEmoji();
    });

    streamerAndWatcherFixture('Chats - Send Gift In Chat', async ({ streamer }) => {
        await streamer.app.chatPage.startChetWithSpecificUser(watcher_user.name);
        await streamer.app.chatPage.sendGift();
    });
});
