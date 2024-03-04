import { apiUrl } from '../utils/apiUrl';
import { apiDataSet } from '../utils/dataSet';
import { streamerAndWatcherFixture } from '../fixtures/fixtures';

let user;

streamerAndWatcherFixture.describe('UI - Profile Tests', async () => {
    streamerAndWatcherFixture.beforeEach(async ({ streamer }) => {
        user = await streamer.app.loginPage.apiLogin(apiUrl.qaEnvUrl);
        await streamer.app.profilePage.open();
    });

    // test.afterEach(async () => {
    //     const apiContext = await request.newContext()
    //     const api = new Api(apiContext)
    //     await api.deleteAccountPage.deleteAccount(apiUrl.qaEnvUrl, user.userToken)
    // })

    streamerAndWatcherFixture('Profile - My Info', async ({ streamer }) => {
        await streamer.app.profilePage.observeStartStreamButton();
        await streamer.app.profilePage.observeBuyCoinsButton();
        await streamer.app.profilePage.observePersonalInfo(user.name);
    });

    streamerAndWatcherFixture('Profile - Buy Coins', async ({ streamer }) => {
        await streamer.app.profilePage.clickBuyCoinsBtn();
    });

    streamerAndWatcherFixture('Profile - Start Stream', async ({ streamer }) => {
        await streamer.app.profilePage.clickStartStreamBtn();
    });

    streamerAndWatcherFixture('Profile - Edit Profile', async ({ streamer }) => {
        await streamer.app.profilePage.clickKebabMenuBtn();
        await streamer.app.profilePage.clickEditProfileBtn();
    });

    streamerAndWatcherFixture('Profile - Redeem Cash', async ({ streamer }) => {
        await streamer.app.profilePage.clickKebabMenuBtn();
        await streamer.app.profilePage.clickRedeemCashBtn();
    });

    streamerAndWatcherFixture('Profile - Edit Profile e2e', async ({ streamer }) => {
        const name = apiDataSet.randomName;
        const bio = apiDataSet.randomBio;
        await streamer.app.ediProfilePage.open();
        await streamer.app.ediProfilePage.chageName(name);
        await streamer.app.ediProfilePage.chageBio(bio);
        // await app.ediProfilePage.selectDate()
        await streamer.app.ediProfilePage.clickSaveBtn();
        await streamer.app.profilePage.open();
        await streamer.app.profilePage.observeMyBio(bio);
        await streamer.app.profilePage.observePersonalInfo(name);
    });
});
