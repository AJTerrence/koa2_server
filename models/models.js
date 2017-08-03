const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  openid: String,
  nickname: String,
  sex: Number,
  language: String,
  province: String,
  city: String,
  country: String,
  headimgurl: String,
  privilege: Array,
  deviceId: String,
  create_at: Object
})

const qrcodeSchema = mongoose.Schema({
  appid: String,
  qrcodeUrl: String,
  WOA: String,
  active: Boolean,
  create_at: Object
})

const tokenSchema = mongoose.Schema({
  appid: String,
  openid: String,
  token: String,
  active: Boolean,
  time: Number
})

const userCoinSchema = mongoose.Schema({
  openid: String,
  coin: Number,
  create_at: Object
})

const orderSchema = mongoose.Schema({
  account: String,
  deviceId: String,
  total: Number,
  ads:Number,
  coinincome: Number,
  create_at: Object
})

const userInfo = mongoose.model('userInfo',userSchema)
const qrcodeInfo = mongoose.model('qrcodeInfo',qrcodeSchema)
const tokenInfo = mongoose.model('tokenInfo',tokenSchema)
const coinInfo = mongoose.model('coinInfo',userCoinSchema)
const orderInfo = mongoose.model('orderInfo',orderSchema)

module.exports = {
  userInfo,
  qrcodeInfo,
  tokenInfo,
  coinInfo,
  orderInfo
}