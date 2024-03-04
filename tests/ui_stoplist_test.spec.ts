import { apiUrl } from '../utils/apiUrl';
import { streamerAndWatcherFixture } from '../fixtures/fixtures';
let user;

streamerAndWatcherFixture.describe('UI - Profile Tests', async () => {
    streamerAndWatcherFixture.beforeEach(async ({ streamer }) => {
        user = await streamer.app.loginPage.apiLogin(apiUrl.qaEnvUrl);
        await streamer.app.profilePage.open();
    });

    streamerAndWatcherFixture('Stoplist - Forbidden Name', async ({ streamer }) => {
        await streamer.app.ediProfilePage.open();
        await streamer.app.ediProfilePage.setInappropriateName('penis');
    });

    //stoplist bug
    streamerAndWatcherFixture.skip('Stoplist - Forbidden Words in Chat', async ({ streamer }) => {
        const watcher = await streamer.api.loginPage.createNewUser(apiUrl.qaEnvUrl);
        await streamer.api.followingPage.follow(apiUrl.qaEnvUrl, watcher.userToken, user.id);
        await streamer.api.followingPage.follow(apiUrl.qaEnvUrl, user.userToken, watcher.id);
        await streamer.app.chatPage.open();
        await streamer.app.chatPage.startChetWithSpecificUser(watcher.name);
        await streamer.app.chatPage.sendMessageFromBlocklist('tango');
    });

    streamerAndWatcherFixture('Stoplist - Stream Titile', async ({ streamer }) => {
        await streamer.app.sidePanelPage.clickCreateStreamBtn();
        await streamer.app.preStreamPage.clickStartStreamBtn();
        await streamer.app.preStreamPage.uploadAvatar();
        await streamer.app.preStreamPage.changeStreamTitle('blow job');
        await streamer.page.keyboard.press('Enter');
        await streamer.app.preStreamPage.observeInapproperiateError();
    });

    streamerAndWatcherFixture('Stoplist - Stream Chat', async ({ streamer }) => {
        await streamer.app.sidePanelPage.clickCreateStreamBtn();
        await streamer.app.preStreamPage.clickStartStreamBtn();
        await streamer.app.preStreamPage.uploadAvatar();
        await streamer.app.preStreamPage.clickStartStreamBtn();
        await streamer.app.preStreamPage.observeStream();
        await streamer.app.streamPage.sendMessageInStreamChat('bitch');
        await streamer.app.streamPage.observeModeratorMessage();
    });
});
