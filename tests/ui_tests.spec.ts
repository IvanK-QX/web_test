/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiUrl } from '../utils/apiUrl';
import { apiDataSet } from '../utils/dataSet';
import { streamerAndWatcherFixture } from '../fixtures/fixtures';

let streamer_user, watcher_user;

streamerAndWatcherFixture.describe('UI Tests', async () => {
    streamerAndWatcherFixture.beforeEach(async ({ streamer, watcher }) => {
        streamer_user = await streamer.app.loginPage.apiLogin(apiUrl.qaEnvUrl);
        watcher_user = await watcher.app.loginPage.apiLogin(apiUrl.qaEnvUrl);
        await streamer.api.followingPage.follow(apiUrl.qaEnvUrl, watcher_user.userToken, streamer_user.id);
    });

    streamerAndWatcherFixture('Star sand Join Stream', async ({ page, streamer, watcher }) => {
        await streamer.app.sidePanelPage.clickCreateStreamBtn();
        await streamer.app.preStreamPage.changeStreamTitle();
        await streamer.app.preStreamPage.clickStartStreamBtn();
        await streamer.app.preStreamPage.uploadAvatar();
        await streamer.app.preStreamPage.clickStartStreamBtn();
        await streamer.app.preStreamPage.observeStream();
        await page.waitForTimeout(1000);
        await watcher.app.mainPage.open();
        await watcher.app.mainPage.joinStream(streamer_user.name);
        await watcher.app.streamPage.waitForStreamLoadingWatcher();
        await watcher.app.streamPage.sendMessageInStreamChat(apiDataSet.uiStreamMessage);
        await streamer.app.streamPage.observeReceivedMessage(apiDataSet.uiStreamMessage);
        await watcher.app.streamPage.sendMessageInStreamChat('bitch');
        await watcher.app.streamPage.observeModeratorMessage();
        await streamer.app.streamPage.openWatchersList();
        await streamer.app.streamPage.clickFollowOnWatchersList();
        await streamer.app.streamPage.closeWatchersList();

        await streamer.app.streamPage.closeStreamAsStreamer();
        await watcher.app.streamPage.closeEndStreamModalAsWatcher();
        await streamer.app.chatPage.open();
        await streamer.app.chatPage.startChetWithSpecificUser(watcher_user.name);
        await streamer.app.chatPage.sendMessage('hello');
        await watcher.app.chatPage.open();
        await watcher.app.chatPage.openExistingChat(streamer_user.name);
        await watcher.app.chatPage.observeNewMessage('hello');
        await watcher.app.chatPage.sendMessage('bitch');
        await watcher.app.chatPage.observeNewMessage('bitch');
        //   await watcher.app..chatPage.sendObusiveWord('bitch')
        await streamer.app.chatPage.observeNewMessage('bitch');
        await streamer.app.chatPage.blockUser();
        await streamer.app.chatPage.doNotSeeChatForSpecificUser(watcher_user.name);
        await streamer.app.blockedPage.open();
        await streamer.app.blockedPage.oberveBlockedUser(watcher_user.name);
        await streamer.app.blockedPage.unblockUser(watcher_user.name);
        await streamer.app.blockedPage.doNotOberveBlockedUser(watcher_user.name);
    });
});
