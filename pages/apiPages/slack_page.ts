import { APIRequestContext, expect, request } from "@playwright/test"

export class ApiSlackPage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async addCoins(humanReadebleId: string) {
        const apiContext = await request.newContext({ignoreHTTPSErrors: true})
        const multipart = {
            'command': '/qaplam',  
            'channel': 'C066KMR5TC4',
            'blocks': `[{"type":"rich_text","elements":[{"type":"rich_text_section","elements":[{"type":"text","text":"add-coins-to-user ${humanReadebleId} 999"}]}]}]`,
            'token': `xoxc-41552049474-5365324317510-5384734141377-87e33672797779046ddee72c92c8b048e736cdca57401e2f4d58d7ee049b470a`
        }
        const apiRequest = await apiContext.post(`https://web4space.slack.com/api/chat.command`, {
            multipart: multipart,
        headers: {
            'authority': 'web4space.slack.com',  
            'cookie': 'b=0235204cf92d7bd5519975fa48a8399f; _lc2_fpi=e00b11ac9c9b--01h1y1y0mm5jnq0929z8kahhgm; __qca=P0-468738033-1685709586991; __adroll_fpc=bde435948a4e34ec6a782cc84abdf0bb-1685709587567; ssb_instance_id=57fe7acd-1fd6-4a76-8b8d-829b8859c682; __ar_v4=K2HN2U4VSJGOVKC2WJLQNH%3A20230602%3A1%7CQCM34G7NBZEHHATIFDIUBJ%3A20230602%3A2%7C4UHU5P4P3FESHLUMNBLWAU%3A20230602%3A2%7CKDMBLDIYHFHI5NUNKGJ4LV%3A20230602%3A1; shown_ssb_redirect_page=1; _ga=GA1.3.1593056904.1685709585; __pdst=5ec930d86e904171bb484c19d0e8a814; PageCount=2; _gcl_au=1.1.2032138379.1700476355; _cs_mk_ga=0.09283645256330009_1700476355405; _rdt_uuid=1700476355690.04cda8c9-b847-4f4b-9259-eeb185d6fd24; _cs_c=0; _gid=GA1.2.1765085646.1700476591; _ga=GA1.1.1593056904.1685709585; _cs_cvars=%7B%221%22%3A%5B%22Visitor%20ID%22%2C%220235204cf92d7bd5519975fa48a8399f%22%5D%2C%222%22%3A%5B%22Is%20Signed%20In%22%2C%22true%22%5D%2C%223%22%3A%5B%22URL%20Path%22%2C%22%2F%22%5D%2C%224%22%3A%5B%22Visitor%20Type%22%2C%22prospect%22%5D%7D; _cs_id=d03c59e2-467c-aee2-977c-c7456812e6dd.1685709585.7.1700476590.1700476355.1.1719873585762; _cs_s=2.0.0.1700478390996; existing_users_hp={"launched":1700476590,"launch_count":1}; OptanonConsent=isGpcEnabled=1&datestamp=Mon+Nov+20+2023+12%3A36%3A44+GMT%2B0200+(Eastern+European+Standard+Time)&version=202211.1.0&isIABGlobal=false&hosts=&consentId=ded7ff89-001e-4541-90fa-69a07636daec&interactionCount=1&landingPath=NotLandingPage&groups=1%3A1%2C3%3A1%2C2%3A1%2C4%3A0&AwaitingReconsent=false; shown_download_ssb_modal=1; show_download_ssb_banner=1; no_download_ssb_banner=1; d=xoxd-lCSY94MamnUwPTPTQIrMORoIkomFJRpPewiwLBR840j0Kbi%2FG1j1keWMy36htQVWWJzLlUzsI8Rx8EgKCV7XEdQLVDq9OVAkN%2Fs8%2BV8bXjCIsIkE163cwLTI2VQ%2FoaDpnkHv70fRsY2pQwP0%2BbLikgHE7P51z7bsH97fzsCyUM80ZH1ToFuiTk0nJXHSZt44kdb608lc; d-s=1700476619; tz=120; web_cache_last_updated190a4b1c31a824e502c2ec5b3a1a753d=1700476620531; _ga_QTJQME5M5D=GS1.1.1700476355.8.1.1700476674.60.0.0; x=0235204cf92d7bd5519975fa48a8399f.1700477687',
            'origin': 'https://app.slack.com'
        }})
        expect(apiRequest.ok()).toBeTruthy()
        const response = await apiRequest.json()
        console.log(response)
        expect(response.ok).toBeTruthy()
        console.log(`Coins are added`)
    }

}