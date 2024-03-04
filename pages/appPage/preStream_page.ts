import { Locator, Page, expect } from '@playwright/test';
import { texts } from '../../utils/dataSet';

export class AppPreStreamPage {
    page: Page;
    streamTitleField: Locator;
    startStreamBtn: Locator;
    uploadAvatarBtn: Locator;
    pauseStreamBtn: Locator;
    streamActionsBtn: Locator;
    cameraIcon: Locator;
    streamVideoAvatar: Locator;
    closeStreamBtn: Locator;
    sideBarCreateStreamBtn: Locator;
    snackBarCloseBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.streamTitleField = page.getByPlaceholder('Stream Title');
        this.startStreamBtn = page.locator('.stream-main-action__button--public button');
        this.uploadAvatarBtn = page.locator('button.user-data-entris__button-upload');
        this.pauseStreamBtn = page.getByText('Pause');
        this.streamActionsBtn = page.locator('div.create-stream__actions');
        this.cameraIcon = page.locator('button.stream-top-action__button').nth(1);
        this.streamVideoAvatar = page.locator('.create-stream.is-placeholder.is-avatar-cover');
        this.closeStreamBtn = page.locator('button.stream-button-close--create');
        this.sideBarCreateStreamBtn = page.locator('button.sidebar__create-button');
        this.snackBarCloseBtn = page.locator('button.stream-snackbar__close');
    }

    async changeStreamTitle(name = 'lets go') {
        await this.streamTitleField.fill(name);
    }

    async clickStartStreamBtn() {
        await this.startStreamBtn.click();
    }

    async uploadAvatar() {
        this.page.on('filechooser', async (filechooser) => {
            await filechooser.setFiles('./utils/unnamed.jpg');
        });
        await this.uploadAvatarBtn.click();
        await this.page.waitForTimeout(1500);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForTimeout(2500);
        await this.page.waitForLoadState('networkidle');
    }

    async observeStream() {
        await this.streamActionsBtn.waitFor();
    }

    async observeStreamTitle() {
        await expect(this.streamTitleField).toBeVisible();
    }

    async observeCameraDropdown() {
        await this.page.locator('.ui-select__label', { hasText: 'Camera' }).waitFor();
    }

    async observeMicrophoneDropdown() {
        await this.page.locator('.ui-select__label', { hasText: 'Microphone' }).waitFor();
    }

    async observePreStreamAttributes() {
        await this.page.locator('.stream-snackbar__text', { hasText: 'Ready to Go' }).waitFor();
        await this.page
            .locator('.stream-snackbar__text', { hasText: 'Broadcasters under 18 are not permitted' })
            .waitFor();
        await this.page.locator('.stream-snackbar__text', { hasText: 'Stream Tips' }).waitFor();
        await this.page.locator('span.chat-system-message__text-message').waitFor();
    }

    async disableCamera() {
        await this.cameraIcon.click();
        await this.streamVideoAvatar.waitFor();
    }

    async enableCamera() {
        await this.cameraIcon.click();
        await this.streamVideoAvatar.waitFor({ state: 'detached' });
    }

    async closePreStream() {
        await this.closeStreamBtn.click();
        await this.sideBarCreateStreamBtn.waitFor();
    }

    async closeStreamSnackbar() {
        await this.snackBarCloseBtn.click();
        await this.page
            .locator('span.stream-snackbar__text', { hasText: 'Broadcasters under 18 are not permitted' })
            .waitFor({ state: 'detached' });
    }

    async observeInapproperiateError() {
        await this.page.locator('.ui-input__error-text', { hasText: texts.streamTitleInappropriateError }).waitFor();
    }
}
