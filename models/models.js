const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  openid: String,
  nickname: String,
  sex: Number,
  province: String,
  city: String,
  country: String,
  headimgurl: String,
  privilege: Object,
  ID: Number,
  time: String
})

const qrcodeSchema = mongoose.Schema({
  qrcodeUrl: String,
  WOA: String,
  active: Boolean,
  time: String
})

const userInfo = mongoose.model('userInfo',userSchema)
const qrcodeInfo = mongoose.model('qrcodeInfo',qrcodeSchema)

module.exports = {
  userInfo,
  qrcodeInfo
}