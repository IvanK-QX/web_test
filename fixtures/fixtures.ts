import { APIRequestContext, BrowserContext, Page, request } from '@playwright/test';
import { Api } from '../pages/Api';
import { App } from '../pages/App';
import { mergeTests, test } from '@playwright/test';

export interface PlamfyContext {
    apiContext: APIRequestContext;
    app: App;
    api: Api;
    context: BrowserContext;
    page: Page;
}

export const streamerFixture = test.extend<{ streamer: PlamfyContext }>({
    streamer: async ({ page }, use) => {
        const apiContext = await request.newContext();
        const app = new App(page);
        const api = new Api(apiContext);
        await use({
            app,
            api,
            context: page.context(),
            page,
            apiContext: apiContext,
        });
    },
});

export const watcherFixture = test.extend<{ watcher: PlamfyContext }>({
    watcher: async ({ browser }, use) => {
        const context = await browser.newContext();
        const apiContext = await request.newContext();
        const page = await context.newPage();
        const app = new App(page);
        const api = new Api(apiContext);
        await use({
            app,
            api,
            context,
            page,
            apiContext: apiContext,
        });
        await page.close();
        await context.close();
    },
});

export const streamerAndWatcherFixture = mergeTests(streamerFixture, watcherFixture);
