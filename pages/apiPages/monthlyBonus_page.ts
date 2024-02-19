import { APIRequestContext, expect, request } from '@playwright/test'
import { Collection, ObjectId } from 'mongodb'
import { apiUrl } from '../../utils/apiUrl'
import { Headers } from '../../utils/headers'
import { Api } from '../Api'

export class ApiMonthlyBonusPage {
    apiContext: APIRequestContext

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext
    }

    async dateGenerator() {
        const today: Date = new Date();
        const datesArray: Date[] = [];
        const currentDay: string = today.toISOString();
        const currentMonth: number = today.getMonth() + 1;
        const currentYear: number = today.getFullYear();
      
        for (let i = 0; i < 15; i++) {
            const dayOfMonth: number = today.getDate() > 15 ? 1 : 15;
            const month: number = today.getDate() > 15 ? today.getMonth() + 2 : today.getMonth() + 1;
            const year: number = month > 12 ? today.getFullYear() + 1 : today.getFullYear();
          
            const date = new Date(year, month - 1, dayOfMonth + i);
            date.setHours(21, 0, 0, 0);
            datesArray.push(date);
        }
    
        const firstGeneratedDate = datesArray[0];
    
        return { datesArray, currentDay, currentMonth, currentYear, firstGeneratedDate };
    }

    async monthlyBonusesCalculation(url: string, adminToken: string, year: number, month: number) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            "year": `${year}`,
            "month": `${month}`,
            "calculateOnly": true
          }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3004/bonuses/monthlyBonuses`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
    }

    async cloneAndUpdateEarnings(collection: Collection, streamerId: string, startDate: Date, duration: number, newStreamId: ObjectId) {
        const query = { streamerId: new ObjectId(streamerId)}
        const itemResult = await collection.find(query).toArray()
        const newObjectId = new ObjectId();
        const clonedItemResult = Object.assign({}, itemResult[0], {_id: newObjectId, startDate: startDate, durationInMinutes: duration, streams: itemResult[0].streams.map(obj =>Object.assign({}, obj, {streamId: newStreamId}))
        })
        await collection.insertOne(clonedItemResult);
        console.log(`The Earning Item with StreamerId: ${streamerId} is Cloned and Updated. New OblectId: ${newObjectId}, New StreamId: ${newStreamId}, New Start Date: ${startDate}, New Duration: ${duration}`)
    }

    async cloneAndUpdateStreams(collection: Collection, streamerId: string, startDate: Date, endDate: Date, duration: number) {
        const query = { streamerId: new ObjectId(streamerId)}
        const itemResult = await collection.find(query).toArray()
        const newObjectId = new ObjectId();
        const clonedItemResult = Object.assign({}, itemResult[0], {_id: newObjectId, createdAt: startDate, durationInMinutes: duration, start: startDate, end: endDate})
        await collection.insertOne(clonedItemResult);
        const streamId = newObjectId
        console.log(`The Item with StreamerId: ${streamerId} is cloned with itemId: ${streamId}`)
        return streamId
    }

    async updateStreamItem(collection: Collection, userId: string, startDate: Date, duration: number) {
        const query = {streamerId: new ObjectId(userId)}
        const end = new Date(startDate)
        end.setHours(23, 0, 0, 0);
        const update = { $set: { createdAt: startDate, durationInMinutes: duration, start: startDate, end: end} }
        await collection.updateOne(query, update)
        console.log(`The First Stream Item with the Id: ${userId} is updated`)
    }

    async updateEarningItem(earningsCollection: Collection, streamerId: string, earnedDiamondsReal: number, startDate: Date, duration: number) {
        const query = {streamerId: new ObjectId(streamerId)};
        const update = {
            $set: {
                startDate: startDate,
                earnedDiamonds_real: earnedDiamondsReal,
                earnedDiamonds: earnedDiamondsReal,
                durationInMinutes: duration,
                'streams.$[].earnedDiamonds_real': earnedDiamondsReal,
                'streams.$[].durationInMinutes': duration
            }
        }
    
        await earningsCollection.updateOne(query, update);
    }

    async changeStreamerStatus(url: string, adminToken: string, userId: string, streamerType: string) {
        const apiContext = await request.newContext({ ignoreHTTPSErrors: true })
        const data = {
            "userId": `${userId}`,
            "type": `${streamerType}`
        }
        const headers = Headers.userHeader(adminToken)

        const apiRequest = await apiContext.post(`${url}:3000/streamer/type`, { data, headers: headers })
        expect(apiRequest.ok()).toBeTruthy()
    }

    async streamAndEarningItemsGenerator(earningsCollection: Collection, streamsColection: Collection, userId: string, userToken: string, durationInMinutes: number, watcherToken: string, expectedDiamondsNumber: number) {
        const apiContext = await request.newContext()
        const api = new Api(apiContext)
        const diamondsCalculation = expectedDiamondsNumber / 15
        const diamondsNumber = Math.ceil(diamondsCalculation);

        //Create a Stream and Earning Items 
        const stream = await api.streamsPage.createStream(apiUrl.qaEnvUrl, userToken, 'public', 'lets go')
        await api.giftsPage.sendGift(apiUrl.qaEnvUrl, watcherToken, '614c4d1574faac3e988b2c79', userId, stream.myChatId, stream.myStreamId )
        await api.streamsPage.stopStream(apiUrl.qaEnvUrl, userToken, stream.myStreamId)

        //Generate the Array with 15 dates 
        const date = await this.dateGenerator()
        const datesArray = date.datesArray
        const firstGeneretedDate = date.firstGeneratedDate

        //Update Created Stream Item
        await this.updateStreamItem(streamsColection, userId, firstGeneretedDate, durationInMinutes)
        await this.updateEarningItem(earningsCollection, userId, diamondsNumber, firstGeneretedDate, 120)

        //Clone and Update Stream and Earning Items 
        for (let i = 1; i < datesArray.length; i++) {
            const startDate = new Date(datesArray[i]);
            console.log(startDate);
        
            const endDate = new Date(datesArray[i]);
            endDate.setHours(23, 0, 0, 0);
        
            const streamId = await this.cloneAndUpdateStreams(streamsColection, userId, startDate, endDate, durationInMinutes);
            await this.cloneAndUpdateEarnings(earningsCollection, userId, startDate, durationInMinutes, streamId);
        }

        console.log('Items generation success')
    }

    async checkStreamerMonthlyBonusItem(collection: Collection, userId: string, typeOfUser: string, dollarPrice: number) {
        const query = { userId: new ObjectId(userId), userType: typeOfUser }
        const returnedItem = await collection.find(query).toArray()
        const userType = returnedItem[0].userType
        const month = returnedItem[0].month
        const year = returnedItem[0].year
        const bonusInDiamonds = returnedItem[0].bonus
        let bonusInDollar = returnedItem[0].bonus / dollarPrice
        const bonusBeforePenaltyCoefficientIn = returnedItem[0].bonusBeforePenaltyCoefficient / dollarPrice
        const diamondsEarned = returnedItem[0].diamondsEarned
        const hoursStreamed = returnedItem[0].hoursStreamed
        const numbOfSuspends = returnedItem[0].numbOfSuspends
        expect(typeOfUser).toEqual(userType)
        let expectedBonus = bonusBeforePenaltyCoefficientIn
        expectedBonus = numbOfSuspends === 3 ? expectedBonus / 2 : numbOfSuspends > 3 ? 0 : expectedBonus;
        bonusInDollar = Number.isInteger(bonusInDollar) ? bonusInDollar : Math.round(bonusInDollar * 10) / 10;
        expect(bonusInDollar).toEqual(expectedBonus)
        console.log(`The Calculated Year is: ${year}`)
        console.log(`The Calculated Month is: ${month}`)
        console.log(`The User's Hours Streamed is ${hoursStreamed}`)
        console.log(`The User's Diamonds Earned is ${diamondsEarned}`)
        console.log(`The User's Bonus befor Penalty is ${bonusBeforePenaltyCoefficientIn}`)
        console.log(`The User's Number of Suspends is ${numbOfSuspends}`)
        console.log(`The User's Bonus in Diamonds is: ${bonusInDiamonds}`)
        console.log(`The User's Bonus in Dollar is: ${bonusInDollar}$`)

    }

    async checkAgentMonthlyBonusItem(collection: Collection, agentId: string, typeOfUser: string, dollarPrice: number) {
        const query = { userId: new ObjectId(agentId), userType: typeOfUser }
        const returnedItem = await collection.find(query).toArray()
        
        const item = returnedItem[0]
        const userType = returnedItem[0].userType
        expect(userType).toEqual('agent')
        const bonusInDollar = returnedItem[0].bonus / dollarPrice
        const bonusInDiamonds = returnedItem[0].bonus
        const coef = returnedItem[0].coef
        const usersSuspends: { [key: string]: number } = {}
        let bonusFromAllReferral = 0;           

        for (let i = 0; i < item.streamersBonuses.length; i++) {
            const streamerBonus = item.streamersBonuses[i]
            bonusFromAllReferral += streamerBonus.bonus
            if (streamerBonus.numbOfSuspends > 0) {
            const userKey = `user${i + 1}`
            usersSuspends[userKey] = streamerBonus.numbOfSuspends
            }
        }

        if (Object.keys(usersSuspends).length > 1 && item.streamersBonuses.length <= 5) {
            expect(coef).toEqual(0.15)
            const expectedBonus = bonusFromAllReferral * coef
            expect(bonusInDiamonds).toEqual(expectedBonus)
            console.log(`The Agent's Coef is: ${coef}`)
            console.log(`The Agent's Bonus in Dollar is: ${bonusInDollar}`)
        } else {
            expect(coef).toEqual(0.3)
            const expectedBonus = bonusFromAllReferral * coef
            expect(bonusInDiamonds).toEqual(expectedBonus)
            console.log(`The Agent's Coef is: ${coef}`)
            console.log(`The Agent's Bonus in Dollar is: ${bonusInDollar}`)
        }
    }

    async getPenalty(adminToken: string, userId: string, userToken: string, penaltyNumber: number) {
        const apiContext = await request.newContext()
        const api = new Api(apiContext)
        for (let i = 0; i < penaltyNumber; i++) {
            const stream = await api.streamsPage.createStream(apiUrl.qaEnvUrl, userToken, 'public', 'lets go')
            await api.moderatorPage.adminModeratorAction(apiUrl.qaEnvUrl, adminToken, stream.myStreamId, 'blockStream', 'adultContent' )
            await api.moderatorPage.setActiveStatus(apiUrl.qaEnvUrl, adminToken, userId)
        }
    }
}