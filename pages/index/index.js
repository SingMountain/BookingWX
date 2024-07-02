// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    display:false,
    url: `http://10.16.45.229:10086?`,//https://wx.bookspaces.cn?|||http://10.16.45.229:10086?前端项目地址
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
  },
  onReady(){
    let that=this;
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: `https://bookspaces.cn/api/weChatLogin/WXLogin?code=${res.code}`,
            success (res) {
              that.setData({
                display:true,
                url:that.data.url+JSON.stringify(res.data) 
              })
              console.log(res.data);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
//   onChooseAvatar(e) {
//     const { avatarUrl } = e.detail
//     const { nickName } = this.data.userInfo
//     this.setData({
//       "userInfo.avatarUrl": avatarUrl,
//       hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
//     })
//   },
//   onInputChange(e) {
//     const nickName = e.detail.value
//     const { avatarUrl } = this.data.userInfo
    
//     this.setData({
//       "userInfo.nickName": nickName,
//       "url":this.data.url+nickName,
//       hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
//     })
    
    
//   },
//   getUserProfile(e) {
//     // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
//     wx.getUserProfile({
//       desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
//       success: (res) => {
//         console.log(res)
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     })
//   },
 })
