import { apiDataSet } from '../../utils/dataSet';

export const loginGuestTestCases = [
    {
        payload: {
            deviceId: apiDataSet.deviceUUID,
            language: 'UK',
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginGuest',
        case: 'missedAuthProvider',
    },
    {
        payload: {
            deviceId: '123458077',
            language: 'UK',
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginGuest',
        case: 'missedDeviceId',
    },
    {
        payload: {
            authProvider: 'ownDeviceId',
            deviceId: apiDataSet.deviceUUID,
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginGuest',
        case: 'missedLanguage',
    },
    {
        payload: {
            authProvider: 'ownDeviceId',
            deviceId: '12345', //less than 6 characters
            language: 'UK',
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginGuest',
        case: 'deviceIdToShirt',
    },
    {
        payload: {
            authProvider: 'ownDeviceId',
            deviceId: '123456789012345678901234567890123456789012345678901', //more than 50 characters
            language: 'UK',
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginGuest',
        case: 'deviceIdToLong',
    },
    {
        payload: {
            authProvider: 'test', // shoud be ownDeviceId
            deviceId: '123456',
            language: 'UK',
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginGuest',
        case: 'wrongAuthProvider',
    },
];

export const loginUserTestCases = [
    {
        payload: {
            email: apiDataSet.randomEmail,
            password: apiDataSet.password,
            deviceId: apiDataSet.deviceUUID,
            language: 'UK',
            guestUserToken: apiDataSet.guestUserTokenNegativeFlow,
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginUser',
        case: 'missedAuthProvider',
    },
    {
        payload: {
            authProvider: 'ownEmail',
            password: apiDataSet.password,
            deviceId: apiDataSet.deviceUUID,
            language: 'UK',
            guestUserToken: apiDataSet.guestUserTokenNegativeFlow,
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginUser',
        case: 'missedEmail',
    },
    {
        payload: {
            authProvider: 'ownEmail',
            email: apiDataSet.randomEmail,
            deviceId: apiDataSet.deviceUUID,
            language: 'UK',
            guestUserToken: apiDataSet.guestUserTokenNegativeFlow,
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginUser',
        case: 'missedPassword',
    },
    {
        payload: {
            authProvider: 'ownEmail',
            email: apiDataSet.randomEmail,
            password: apiDataSet.password,
            language: 'UK',
            guestUserToken: apiDataSet.guestUserTokenNegativeFlow,
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginUser',
        case: 'missedDeviceId',
    },
    {
        payload: {
            authProvider: 'ownEmail',
            email: apiDataSet.randomEmail,
            password: apiDataSet.password,
            deviceId: apiDataSet.deviceUUID,
            guestUserToken: apiDataSet.guestUserTokenNegativeFlow,
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginUser',
        case: 'missedLanguage',
    },
    {
        payload: {
            authProvider: 'ownEmail',
            email: apiDataSet.randomEmail,
            password: apiDataSet.password,
            deviceId: apiDataSet.deviceUUID,
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginUser',
        case: 'missedGuestToken',
    },
    {
        payload: {
            authProvider: 'ownEmail',
            email: apiDataSet.randomEmail,
            password: apiDataSet.password,
            deviceId: apiDataSet.deviceUUID,
            language: 'string',
            guestUserToken: apiDataSet.guestUserTokenNegativeFlow + '1234',
        },
        expectedStatus: 500,
        errorMessage: 'wrong final block length',
        testSuite: 'loginUser',
        case: 'guestTokenToLong',
    },
    {
        payload: {
            authProvider: 'ownEmail',
            email: apiDataSet.randomEmail,
            password: apiDataSet.password,
            deviceId: apiDataSet.deviceUUID,
            language: 'string',
            guestUserToken: apiDataSet.guestUserTokenNegativeFlow + 'Test',
        },
        expectedStatus: 418,
        errorMessage: 'TOKEN_MALFORMED',
        testSuite: 'loginUser',
        case: 'guestTokenIncorrect',
    },
    {
        payload: {
            authProvider: 'phone',
            email: apiDataSet.randomEmail,
            password: apiDataSet.password,
            deviceId: apiDataSet.deviceUUID,
            guestUserToken: apiDataSet.guestUserTokenNegativeFlow + 'Test',
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginUser',
        case: 'wrongAuthProvider',
    },
];

export const loginAdminTestCases = [
    {
        payload: {
            email: apiDataSet.email + '@gmail.com',
            password: apiDataSet.password,
            deviceId: apiDataSet.deviceUUID,
            language: 'UK',
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginAdmin',
        case: 'missedAuthProvider',
    },
    {
        payload: {
            authProvider: 'ownEmail',
            password: apiDataSet.password,
            deviceId: apiDataSet.deviceUUID,
            language: 'UK',
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginAdmin',
        case: 'missedEmail',
    },
    {
        payload: {
            authProvider: 'ownEmail',
            email: apiDataSet.email + '@gmail.com',
            deviceId: apiDataSet.deviceUUID,
            language: 'UK',
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginAdmin',
        case: 'missedPassword',
    },
    {
        payload: {
            authProvider: 'ownEmail',
            email: apiDataSet.email + '@gmail.com',
            password: apiDataSet.password,
            language: 'UK',
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginAdmin',
        case: 'missedDeviceId',
    },
    {
        payload: {
            authProvider: 'ownEmail',
            email: apiDataSet.email + '@gmail.com',
            password: apiDataSet.password,
            deviceId: apiDataSet.deviceUUID,
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        case: 'missedLanguage',
    },
    {
        payload: {
            authProvider: 'phone',
            email: apiDataSet.email + '@gmail.com',
            password: apiDataSet.password,
            deviceId: apiDataSet.deviceUUID,
            language: 'UK',
        },
        expectedStatus: 400,
        errorMessage: 'Error while validating request',
        testSuite: 'loginAdmin',
        case: 'wrongAuthProvider',
    },
];
