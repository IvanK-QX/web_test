export class ReportsPayloads {
    static reportUserPayload(reason: string, userId: string) {
        const query = {
            reportedUserId: `${userId}`,
            reason: `${reason}`,
        }
        return query
    }

    static adminReportPayload(humanId: string) {
        const id = humanId
        const query = {
            itemsPerPage: 100,
            skip: 0,
            sortDateDirection: -1,
            reportedUserId: id,
        }
        return query
    }

    static reportStatusPayload(reportId: string) {
        const query = {
            reportIds: [`${reportId}`],
            status: 'New',
        }
        return query
    }
}
