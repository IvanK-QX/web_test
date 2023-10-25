import { faker } from "@faker-js/faker";

export const apiDataSet = {
    deviceUUID : `${faker.string.uuid()}`,
    randomEmail  : `api+${Math.floor(Math.random() * (999999-100000) + 100000)}@unitedtech.ai`,
    randomName : `Lloy${(Math.random() + 1).toString(36).substring(7)}`,
    randomBio : `MyBio ${(Math.random() + 1).toString(36).substring(7)}`,
    randomAbout : `About me ${(Math.random() + 1).toString(36).substring(10)}`,
    searchText: '50cent',
    email: 'myleadsp.ace',
    password: 'dp1181345',
    streamTitle: 'My stream Title',
    updatedStreamTitle: 'My updated title',
    isoDate: new Date().toISOString(),
    randomWord: `word${(Math.random() + 1).toString(36).substring(7)}`,
    guestUserTokenNegativeFlow: '18be5c07fb38ddbb9515777a047273977da1e767f7d5d066917e4636f757462e7fe0e5c383df0a27c610f6283ef1a427cda15014f7f384e125b349f9b832c00a1234', //only for the Negative Flows 
    messageText: `Message Text + ${Math.floor(Math.random() * (999999-100000) + 100000)}`,
    uiStreamMessage: 'hello this is playwright message for chat in real-time'

}