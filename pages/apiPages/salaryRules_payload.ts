export class SalaryRulesPayloads {
    static createRule(myStreamerId: string) {
        const query = {
            streamerType: 'Official',
            streamerIds: [`${myStreamerId}`],
            periods: [
                {
                    amount: 14,
                    period: 'Hours',
                },
                {
                    amount: 7,
                    period: 'Days',
                },
            ],
            status: 'Active',
            operatorPeriod: 'AND',
            timeLimitAmount: 90,
            timeLimitPeriod: 'Days',
            dimondsLimit: 18950,
        }
        return query
    }

    static updateRule(myStreamerId: string, botRuleId: string) {
        const query = {
            _id: `${botRuleId}`,
            streamerType: 'Official',
            streamerIds: [`${myStreamerId}`],
            periods: [
                {
                    amount: 0,
                    period: 'Hours',
                },
                {
                    amount: 7,
                    period: 'Days',
                },
            ],
            status: 'Active',
            operatorPeriod: 'AND',
            timeLimitAmount: 90,
            timeLimitPeriod: 'Days',
            dimondsLimit: 100000,
        }
        return query
    }

    static createBotRule(botRuleId: string) {
        const query = {
            streamerType: 'Official',
            status: 'Active',
            salaryRuleIds: [`${botRuleId}`],
            streamsAmount: {
                from: 0,
                to: 100,
            },
            timeInStreams: {
                from: 0,
                to: 10,
                period: 'Hours',
            },
            sort: 'beginning',
        }
        return query
    }

    static updateBotRule(secondBotRuleId: string, botRuleId: string) {
        const query = {
            _id: `${secondBotRuleId}`,
            streamerType: 'Official',
            status: 'Active',
            salaryRuleIds: [`${botRuleId}`],
            streamsAmount: {
                from: 0,
                to: 1000,
            },
            timeInStreams: {
                from: 0,
                to: 1,
                period: 'Hours',
            },
            sort: 'beginning',
        }
        return query
    }
}
