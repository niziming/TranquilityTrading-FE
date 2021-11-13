import Api from '../../../static/Api.js'
import Utils from './utils.js'
/**
 * websocket请求方法
 */

let webSocket = null
let clientID = null
// 聊天室建立ws连接
const Connection = callback => {
  if (clientID !== null) clientID = Utils.guid()
  webSocket = new WebSocket(Api.tztqWS)
  // 回调函数用于vuex使用
  callback(webSocket)
}

export default {
  Connection
}
