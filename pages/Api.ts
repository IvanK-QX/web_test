import { APIRequestContext } from "@playwright/test"
import { ApiLoginPage } from "./apiPages/login_page"
import { ApiProfilePage } from "./apiPages/profile_page"
import { ApiLeadersPage } from "./apiPages/leader_page"
import { ApiDeleteAccountPage } from "./apiPages/deleteAccount_page"
import { ApiStreamPage } from "./apiPages/stream_page"
import { ApiGiftsPage } from "./apiPages/gifts_page"
import { ApiBlockedPage } from "./apiPages/blocked_page"
import { ApiFollowingPage } from "./apiPages/following_page"
import { ApiPayoutPage } from "./apiPages/payout_page"
import { ApiClientSettingsPage } from "./apiPages/clientSettings_page"
import { ApiSalaryRulesPage } from "./apiPages/salaryRules_page"
import { ApiModeratorPage } from "./apiPages/moderator_page"
import { ApiReferalPage } from "./apiPages/referal_page"
import { ApiModerationsPage } from "./apiPages/moderations_page"
import { ApiReportsPage } from "./apiPages/reports_page"
import { ApiNotificationsContentPage } from "./apiPages/notificationsContent_page"
import { ApiInternalPage } from "./apiPages/internal_page"
import { ApiOtherPage } from "./apiPages/other_functionality_page"
import { Api3002Page } from "./apiPages/3002_page"
import { ApiNegativeFlowTemplate } from "./apiPagesNegFlow/negativeFlowTemplate_page"
import { ApiMessage3003Page } from "./apiPages/message_page"
import { ApiSlackPage } from "./apiPages/slack_page"

export class Api {
    apiContext: APIRequestContext
    loginPage: ApiLoginPage
    profilePage: ApiProfilePage
    leadersPage: ApiLeadersPage
    deleteAccountPage: ApiDeleteAccountPage
    streamsPage: ApiStreamPage
    giftsPage: ApiGiftsPage
    blockedPage: ApiBlockedPage
    followingPage: ApiFollowingPage
    payoutPage: ApiPayoutPage
    clientSettingsPage: ApiClientSettingsPage
    selaryRulesPage: ApiSalaryRulesPage
    moderatorPage: ApiModeratorPage
    referalPage: ApiReferalPage
    moderationsPage: ApiModerationsPage
    reportPage: ApiReportsPage
    notificationsContentPage: ApiNotificationsContentPage
    internalPage: ApiInternalPage
    otherTestsPage: ApiOtherPage
    agora3002Page: Api3002Page
    negativeFlowTemplate: ApiNegativeFlowTemplate
    messagePage: ApiMessage3003Page
    slackPage: ApiSlackPage

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
        this.loginPage = new ApiLoginPage(apiContext)
        this.profilePage = new ApiProfilePage(apiContext)
        this.leadersPage = new ApiLeadersPage(apiContext)
        this.deleteAccountPage = new ApiDeleteAccountPage(apiContext)
        this.streamsPage = new ApiStreamPage(apiContext)
        this.blockedPage = new ApiBlockedPage(apiContext)
        this.payoutPage = new ApiPayoutPage(apiContext)
        this.giftsPage = new ApiGiftsPage(apiContext)
        this.followingPage = new ApiFollowingPage(apiContext)
        this.clientSettingsPage = new ApiClientSettingsPage(apiContext)
        this.selaryRulesPage = new ApiSalaryRulesPage(apiContext)
        this.moderatorPage = new ApiModeratorPage(apiContext)
        this.referalPage = new ApiReferalPage(apiContext)
        this.moderationsPage = new ApiModerationsPage(apiContext)
        this.reportPage = new ApiReportsPage(apiContext)
        this.notificationsContentPage = new ApiNotificationsContentPage(apiContext)
        this.internalPage = new ApiInternalPage(apiContext)
        this.otherTestsPage = new ApiOtherPage(apiContext)
        this.agora3002Page = new Api3002Page(apiContext)
        this.negativeFlowTemplate = new ApiNegativeFlowTemplate(apiContext)
        this.messagePage = new ApiMessage3003Page(apiContext)
        this.slackPage = new ApiSlackPage(apiContext)
    }
}