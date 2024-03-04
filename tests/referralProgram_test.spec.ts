import { apiUrl } from '../utils/apiUrl';
import { locators } from '../pages/appPage/locators';
import { streamerAndWatcherFixture } from '../fixtures/fixtures';

let user, myAgent;

streamerAndWatcherFixture.describe('UI Referral Program Flow', async () => {
    streamerAndWatcherFixture.beforeEach(async ({ streamer }) => {
        user = await streamer.app.loginPage.apiLogin(apiUrl.qaEnvUrl);
    });

    streamerAndWatcherFixture('Check Referral Program Page', async ({ streamer }) => {
        await streamer.app.referralPage.clickProfileBtn();
        await streamer.app.referralPage.clickReferralProgramBtn();
        await streamer.app.referralPage.clickCopyCodeBtn();
        await streamer.app.referralPage.copyCheck();
        await streamer.page.waitForSelector(locators.referralPage.copyBanner, { state: 'hidden' });
        await streamer.app.referralPage.clickCopyLinkBtn();
        await streamer.app.referralPage.copyCheck();
    });

    //todo degub and fix
    streamerAndWatcherFixture.skip('Add My Agent and My Referrals Check', async ({ streamer, watcher }) => {
        myAgent = await watcher.app.loginPage.apiLogin(apiUrl.qaEnvUrl);

        await watcher.app.referralPage.clickProfileBtn();
        await watcher.app.referralPage.clickReferralProgramBtn();
        const agentCode = await watcher.app.referralPage.copyAgentCode();

        //User Flow
        await streamer.app.referralPage.clickProfileBtn();
        await streamer.app.referralPage.clickReferralProgramBtn();
        await streamer.app.referralPage.enterMyAgentCode(agentCode);
        await streamer.app.referralPage.clickAddManager();
        await streamer.app.referralPage.checkMyAgentId(myAgent.humanReadableId);
        await streamer.app.referralPage.clickMyAgentAvatarBtn();
        await streamer.app.referralPage.checkMyAgentOtherUserProfile(myAgent.humanReadableId);

        //My Referrals Check
        await watcher.app.referralPage.clickMyReferralsBtn();
        await watcher.app.referralPage.checkMyReferrals(user.humanReadableId);
    });
});
