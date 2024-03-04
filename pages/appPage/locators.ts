export const locators = {
    chatPage: {
        chatTextArea: '[placeholder:"Send a message…"]',
        mainStatChatBtn: 'button.header-chat__button',
        chatSearchField: '[placeholder:"Search"]',
        createChatBtn: 'button.chat-modal__button',
        chatValidationError: 'p.chat-input-area__error',
        contextMenu: 'div.context-menu',
        blockUserBtn: '//span[contains(text(,"Block User"]/..',
        confirmModal: 'button.confirm-modal__buttons--first',
        contactSupportBtn: '[rel:"noreferrer noopener"]',
        messageTimeIcon: 'span.message-time',
        translateIcon: 'svg.message__translate-icon',
        startChatWithFirstSuggestedUser: '.chat-modal__card button',
        chatTextArea2: 'div.chat-input-area__textarea',
        atachmentBtn: '.chat-input-area__attach-btn',
        mediaMessage: 'div.chat-private-message-file__content',
        emojiBtn: 'button.chat-input-area__button-emoji-picker',
    },
    mainPage: {
        profileBtn: '[class="user-dropdown__name"]',
        redeemCashBtn: '[href="/redeem-cash"]'
    },
    referralPage: {
        referralProgramBtn: '[href="/referral"]',
        referralProgramPageTitle: '[class*="header-title header-title"]',
        myAgentId: '[class="user-simple-card__content--uid"]',
        agentAvatarBtn: '[class="ui-avatar user-simple-card__avatar"]',
        otherUserProfileId: '[class="profile-info__human-id--text"]',
        copyBanner: '[class="notification-global__text body"]',
        myReferralsBtn: '[class="ui-button ui-button"]',
        myReferralId: '[class="user-simple-card__content--uid"]'
        
    }
}