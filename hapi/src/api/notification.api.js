const { hasuraUtils } = require('../utils')

const INSERT_NOTIFICATION = `
  mutation insert($notification: notification_insert_input!) {
    insert_notification_one(object: $notification) {
      id
      account_from
      account_to
      title
      description
      type
      payload
      created_at
      updated_at
    }
  }
`

const GET_ONE = `
  query ($where: notification_bool_exp) {
    notification(where: $where, limit: 1) {
      id
      account_to
      account_from
      title
      description
      type
      payload
      created_at
    }
  }
`

const insert = notification => {
  return hasuraUtils.request(INSERT_NOTIFICATION, { notification })
}

const getOne = async (where = {}) => {
  console.log('WHERE', where)
  const { notification } = await hasuraUtils.request(GET_ONE, { where })

  console.log('NOTIFICATIONS-GET-ONE', notification)

  if (notification && notification.length > 0) return notification[0]

  return null
}

module.exports = {
  insert,
  getOne
}
