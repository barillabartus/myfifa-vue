import { crud, http, routes } from '@/api'
import { Loan } from '@/models'

// actions
export const actions = {
  ...crud({
    model: Loan,
    route: 'loans',
    parentId: 'playerId',
    recordId: 'loanId',
    dataName: 'loan'
  }),
  TEAM_FETCH ({ rootState }, { teamId }) {
    return http({
      path: routes.loans.teamIndex,
      pathData: { teamId },
      token: rootState.token,
      success ({ data }) {
        Loan.insert({ data })
      }
    })
  }
}
