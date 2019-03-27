import { Model } from '@vuex-orm/core'

export default class Injury extends Model {
  static get entity () {
    return 'injuries'
  }

  static fields () {
    return {
      // Primary/Foreign keys
      id: this.number(0),
      player_id: this.number(0),

      // Database fields
      start_date: this.string(''),
      end_date: this.string('').nullable(),
      description: this.string(''),
      recovered: this.boolean(false)
    }
  }
}
