/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from '@playwright/test';
import { ClickHouse } from 'clickhouse';
import { clickHouseConfigQA, clickHouseConfigProd } from '../../clickHouseConfig';

export async function clickHouseSearch(environment: 'QA' | 'Prod', tableName: string,  query: string) {
    const clickhouseConfig = (environment === 'QA') ? clickHouseConfigQA : (environment === 'Prod') ? clickHouseConfigProd : null
    const clickhouse = new ClickHouse(clickhouseConfig)
    let defaultPrefix = `SELECT * FROM activity.${tableName} WHERE `
    const selectQuery = defaultPrefix += query

    try {
        const searchResult = await clickhouse.query(selectQuery).toPromise();
        return { searchResult, selectQuery } 
    } 
        catch (error) {
        console.error('Error:', error);
    }
}

export async function checkParamsValue(event: any[], paramName: string, expectedParamValue: string) {
    const params = JSON.parse(event[0].params)
    const paramValue = params[paramName];
    expect(paramValue).toEqual(expectedParamValue)
    console.log(`The Param: '${paramName}' with the value: '${paramValue}' is displayed`)
}