const mongoose = require('mongoose')

//创建模型，用户信息模型
const userSchema = mongoose.Schema({
  openid: String,
  nickname: String,
  sex: Number,
  province: String,
  city: String,
  country: String,
  headimgurl: String,
  privilege: Object,
  equipmentID: Number,
  time: String
})

//微信公众号信息模型，WOA(WeChat Official Accounts)
const qrcodeSchema = mongoose.Schema({
  qrcodeUrl: String,
  WOAname: String,
  active: Boolean,
  time: String
})

//绑定模型
const userInfo = mongoose.model('userInfo',userSchema)
const qrcodeInfo = mongoose.model('qrcodeInfo',qrcodeSchema)

//导出模型
module.exports = {
  userInfo,
  qrcodeInfo
}