import { Model } from '@vuex-orm/core'

export default class Loan extends Model {
  static entity = 'loans'

  static fields () {
    return {
      // Primary/Foreign keys
      id: this.number(null),
      player_id: this.number(null),

      // Database fields
      start_date: this.string(''),
      end_date: this.string(''),
      destination: this.string(''),
      returned: this.boolean(false)
    }
  }
}
