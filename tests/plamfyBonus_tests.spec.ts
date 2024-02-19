import { request, test } from '@playwright/test'
import { mongoDBConnect } from '../pages/dataBase/mongoDB_page'
import { apiUrl } from '../utils/apiUrl'
import { Api } from '../pages/Api'

let streamsDB, earningsDB, monthlyBonusesDB, streamer, watcher, admin, currentYear, currentMonth, streamer2, streamer3, streamer4, streamer5

test.describe.skip('Monthly Bonus e2e Tests', () => {
  
    test.beforeEach(async () => {
      const apiContext = await request.newContext()
      const api = new Api(apiContext)

       //Login as Admin 
      admin = await api.loginPage.loginWithAdminUser(apiUrl.qaEnvUrl)

      //Create Streamer and Watcher and Change Streamer Status to Official Host  
      streamer = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      console.log(streamer.id)
      watcher = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer.id, 'OfficialHost')

      //Add Coins to Watcher 
      await api.slackPage.addCoins(watcher.humanReadableId)

      //Connect to MongoDb
      streamsDB = await mongoDBConnect('core', 'streams')
      earningsDB = await mongoDBConnect('core', 'earnings')
      monthlyBonusesDB = await mongoDBConnect('core', 'monthlyBonuses')

      //Generate Array with Dates
      const date = await api.monthlyBonusPage.dateGenerator()
      currentYear = date.currentYear
      currentMonth = date.currentMonth
    })
  
    test.afterEach(async () => {
      const apiContext = await request.newContext()
      const api = new Api(apiContext)
      await api.deleteAccountPage.deleteAccount(apiUrl.qaEnvUrl, streamer.userToken)
      await api.deleteAccountPage.deleteAccount(apiUrl.qaEnvUrl, watcher.userToken)
      await api.deleteAccountPage.deleteAccount(apiUrl.qaEnvUrl, streamer2.userToken)
      await api.deleteAccountPage.deleteAccount(apiUrl.qaEnvUrl, streamer3.userToken)
      await api.deleteAccountPage.deleteAccount(apiUrl.qaEnvUrl, streamer4.userToken)
      await api.deleteAccountPage.deleteAccount(apiUrl.qaEnvUrl, streamer5.userToken)
    })

    test('Check the Monthly Bonus for the Streamer without Penalty', async () => {
      const apiContext = await request.newContext()
      const api = new Api(apiContext)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer.id, streamer.userToken, 120, watcher.userToken, 20000)
      await api.monthlyBonusPage.monthlyBonusesCalculation(apiUrl.qaEnvUrl, admin.adminToken, currentYear, currentMonth)
      await api.monthlyBonusPage.checkStreamerMonthlyBonusItem(monthlyBonusesDB, streamer.id, 'streamer', 379)
    })

    test('Check the Monthly Bonus for the Streamer with 3 Penalty', async () => {
      const apiContext = await request.newContext()
      const api = new Api(apiContext)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer.id, streamer.userToken, 120, watcher.userToken, 20000)
      await api.monthlyBonusPage.getPenalty(admin.adminToken, streamer.id, streamer.userToken, 3)
      await api.monthlyBonusPage.monthlyBonusesCalculation(apiUrl.qaEnvUrl, admin.adminToken, currentYear, currentMonth)
      await api.monthlyBonusPage.checkStreamerMonthlyBonusItem(monthlyBonusesDB, streamer.id, 'streamer', 379)
    })

    test('Check the Monthly Bonus for the Streamer with 4 Penalty', async () => {
      const apiContext = await request.newContext()
      const api = new Api(apiContext)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer.id, streamer.userToken, 120, watcher.userToken, 20000)
      await api.monthlyBonusPage.getPenalty(admin.adminToken, streamer.id, streamer.userToken, 4)
      await api.monthlyBonusPage.monthlyBonusesCalculation(apiUrl.qaEnvUrl, admin.adminToken, currentYear, currentMonth)
      await api.monthlyBonusPage.checkStreamerMonthlyBonusItem(monthlyBonusesDB, streamer.id, 'streamer', 379)
    })

    test('5 Referrals. Streamers without Penalty. Check the Monthly Bonus for the Agent', async () => {
      const apiContext = await request.newContext()
      const api = new Api(apiContext)
      
      //Create 4 Streamers and Agent
      const agent = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      console.log(`The Agent Id -> ${agent.id}`)
      await api.moderatorPage.setAdminProfileAgent(apiUrl.qaEnvUrl, admin.adminToken, agent.id)
      streamer2 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      streamer3 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      streamer4 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      streamer5 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)

      //Set the Type Official Host to each Streamer
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer2.id, 'OfficialHost')
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer3.id, 'OfficialHost')
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer4.id, 'OfficialHost')
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer5.id, 'OfficialHost')


      //Add 5 Referral Streamers to Agent 
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer2.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer3.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer4.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer5.id)

      //Generate Streams and Earnings for 5 Streamers 
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer.id, streamer.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer2.id, streamer2.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer3.id, streamer3.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer4.id, streamer4.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer5.id, streamer5.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.monthlyBonusesCalculation(apiUrl.qaEnvUrl, admin.adminToken, currentYear, currentMonth)
      await api.monthlyBonusPage.checkAgentMonthlyBonusItem(monthlyBonusesDB, '65ce13765e48a264a3a0c1af', 'agent', 379)
    })

    test('6 Referrals. 1 Streamer with 3 Penalty. Check the Monthly Bonus for the Agent', async () => {
      const apiContext = await request.newContext()
      const api = new Api(apiContext)
      
      //Create 5 Streamers and Agent
      const agent = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      console.log(`The Agent Id -> ${agent.id}`)
      await api.moderatorPage.setAdminProfileAgent(apiUrl.qaEnvUrl, admin.adminToken, agent.id)
      streamer2 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      streamer3 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      streamer4 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      streamer5 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      const streamer6 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)

      //Set the Type Official Host to each Streamer
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer2.id, 'OfficialHost')
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer3.id, 'OfficialHost')
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer4.id, 'OfficialHost')
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer5.id, 'OfficialHost')
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer6.id, 'OfficialHost')


      //Add 5 Referral Streamers to Agent 
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer2.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer3.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer4.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer5.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer6.id)

      //Generate Streams and Earnings for 5 Streamers 
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer.id, streamer.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer2.id, streamer2.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer3.id, streamer3.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer4.id, streamer4.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer5.id, streamer5.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.getPenalty(admin.adminToken, streamer6.id, streamer6.userToken, 3)
      await api.monthlyBonusPage.monthlyBonusesCalculation(apiUrl.qaEnvUrl, admin.adminToken, currentYear, currentMonth)
      await api.monthlyBonusPage.checkAgentMonthlyBonusItem(monthlyBonusesDB, agent.id, 'agent', 379)

      //delete the Streamer6
      await api.deleteAccountPage.deleteAccount(apiUrl.qaEnvUrl, streamer6.userToken)
    })

    test('5 Referrals. 1 Streamer with 1 Penalty. Check the Monthly Bonus for the Agent', async () => {
      const apiContext = await request.newContext()
      const api = new Api(apiContext)
      
      //Create 5 Streamers and Agent
      const agent = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      console.log(`The Agent Id -> ${agent.id}`)
      await api.moderatorPage.setAdminProfileAgent(apiUrl.qaEnvUrl, admin.adminToken, agent.id)
      streamer2 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      streamer3 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      streamer4 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)
      streamer5 = await api.loginPage.createNewUser(apiUrl.qaEnvUrl)

      //Set the Type Official Host to each Streamer
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer2.id, 'OfficialHost')
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer3.id, 'OfficialHost')
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer4.id, 'OfficialHost')
      await api.monthlyBonusPage.changeStreamerStatus(apiUrl.qaEnvUrl, admin.adminToken, streamer5.id, 'OfficialHost')
      
      //Add 5 Referral Streamers to Agent 
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer2.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer3.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer4.id)
      await api.referalPage.setReferal(apiUrl.qaEnvUrl, agent.userToken, agent.id, streamer5.id)

      //Generate Streams and Earnings for 5 Streamers 
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer.id, streamer.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer2.id, streamer2.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer3.id, streamer3.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer4.id, streamer4.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.streamAndEarningItemsGenerator(earningsDB, streamsDB, streamer5.id, streamer5.userToken, 120, watcher.userToken, 100000)
      await api.monthlyBonusPage.getPenalty(admin.adminToken, streamer5.id, streamer5.userToken, 3)
      await api.monthlyBonusPage.monthlyBonusesCalculation(apiUrl.qaEnvUrl, admin.adminToken, currentYear, currentMonth)
      await api.monthlyBonusPage.checkAgentMonthlyBonusItem(monthlyBonusesDB, agent.id, 'agent', 379)
    })

})

