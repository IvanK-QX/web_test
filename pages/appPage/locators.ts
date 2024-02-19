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

    redeemCashPage: {
        redeemCashTitle: '[class*="header-title header-title--main header-title--desktop"]',
        redeemCashProgressBar: '[class="progress-bar redeem-card__progress-bar"]', 
        goLiveBtn: '[class="[class*="redeem-card__redeem-life-button"]"]',
        redeemHistoryBtn: '[class*="redeem-card__redeem-history-link"]',
        addPaymentMethodBtn: '[class*="redeem-card__add-method-button redeem-card__add-method-button"]',
        addPaymentMethodTitle: '[class="withdrawal-method-layout__title"]',
        addPaymentMethodBackBtn: '//div[@class="withdrawal-method"]/button',
        addPaymentMethodCloseBtn: '[class="modal-close"]',
        //addPaymentOkBtn: 'div[@class="withdrawal-method-layout__footer"]/button',
        addPaymentOkBtn: '[class*="ui-button ui-button--full-width ui-button--color-primary"]',
        addPayoneerBtn: '//div[@class="withdrawal-methods__methods"]/div[1]//div[@class="withdrawal-methods__add-btn"]/button',
        addBinanceBtn: '//div[@class="withdrawal-methods__methods"]/div[2]//div[@class="withdrawal-methods__add-btn"]/button',
        payoneerEmailInput: '[name="payoutEmail"]',
        binanceWalletInput: '[name="cryptoWallet"]',
        AddPaymentMethodSaveBtn: '[class*="submit-btn submit-btn"]',
        redeemCashAmountInput: '[class="ui-input__label-text"]',
        redeemCashSubmitBtn: '[class*="redeem-card__redeem-submit-button"]',
        cashOutCloseBtn: '[class*="ui-button--size-lg ui-button--is-empty"]', 
        cashOutRedeemBtn: '[class*="ui-button--color-primary ui-button--size-xs"]',
        cashOutCancelBtn: '[class*="ui-button--color-transparent-secondary"]',
        redeemCashMoreBtn: '//div[@class="redeem-card__payment-methods"]/label[1]//div[@class="context-menu"]',
        changePayoutBtn: '[class="chat-file-context-menu__text"]', //???
        changePayoutConfirmationCancelBtn: '[class*="ui-button--color-light-primary ui-button--size-lg"]',
        changePayoutConfirmationChangeBtn: '[class*="ui-button ui-button--full-width ui-button--color-primary"]',
        cashOutDoneOkBtn: '[class*="ui-button ui-button--full-width ui-button--color-primary"]',
        addedPayoutCard: '[class="ui-image payment-method__icon"]',
        redeemInput: '[class="ui-input__input redeem-card__redeem-withdrawal-input"]',
        redeemCashBtn: '[class*="ui-button ui-button--color-primary ui-button--size-lg redeem-card__redeem-submit-button"]',
        redeemHistoryTable: '[class="redeem-history__list-header"]'
    },

    streamPage: {
        endStreamBtn: '[class*="stream-button-close stream-button-close--create"]',
        confirmEndStreamBtn: '[class*="ui-button__text--fill ui-button__text"]',
        closeEndStreamPopUpBtn: '[class*="modal-close"]'

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
