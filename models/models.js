const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  openid: String,
  nickname: String,
  sex: Number,
  province: String,
  city: String,
  country: String,
  headimgurl: String,
  coin: Number,
  time: String
})

const qrcodeSchema = mongoose.Schema({
  qrcodeUrl: String,
  WOA: String,
  active: Boolean,
  time: String
})

const tokenSchema = mongoose.Schema({
  appid: String,
  openid: String,
  token: String,
  used: Boolean,
  time: String
})

const userInfo = mongoose.model('userInfo',userSchema)
const qrcodeInfo = mongoose.model('qrcodeInfo',qrcodeSchema)
const tokenInfo = mongoose.model('tokenInfo',tokenSchema)

module.exports = {
  userInfo,
  qrcodeInfo,
  tokenInfo
}