const basePath =
  window.location.href.indexOf('localhost:') >= 0 ||
  window.location.href.indexOf('file://') >= 0
    ? 'http://localhost:8888'
    : 'https://www.example.com/api';

const appId = 'exampleappid';
async function setup() {
  const timestamp = new Date().getTime();
  const nonceStr = 'yourNonceStr';
  const url = window.location.href;
  const { data: ticket } = await axios.get(`${basePath}/getApiTicket`);
  const signStr = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
  const signature = sha1(signStr);
  wx.config({
    beta: true,
    debug: false,
    appId,
    timestamp,
    nonceStr,
    signature,
    jsApiList: [
      // list all wx js apis
      'onMenuShareAppMessage',
      'onMenuShareWechat',
      'onMenuShareTimeline',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'playVoice',
      'pauseVoice',
      'stopVoice',
      'onVoicePlayEnd',
      'uploadVoice',
      'downloadVoice',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage',
      'getLocalImgData',
      'previewFile',
      'getNetworkType',
      'onNetworkStatusChange',
      'openLocation',
      'getLocation',
      'startAutoLBS',
      'stopAutoLBS',
      'onLocationChange',
      'onHistoryBack',
      'hideOptionMenu',
      'showOptionMenu',
      'hideMenuItems',
      'showMenuItems',
      'hideAllNonBaseMenuItem',
      'showAllNonBaseMenuItem',
      'closeWindow',
      'openDefaultBrowser',
      'scanQRCode',
      'selectEnterpriseContact',
      'openEnterpriseChat',
      'chooseInvoice',
      'selectExternalContact',
      'getCurExternalContact',
      'openUserProfile',
      'shareAppMessage',
      'shareWechatMessage',
      'startWifi',
      'stopWifi',
      'connectWifi',
      'getWifiList',
      'onGetWifiList',
      'onWifiConnected',
      'getConnectedWifi',
      'setClipboardData',
      'getClipboardData'
    ]
  });

  wx.ready(function() {
    onWxReady();
  });

  wx.error(console.error);
}

login();
setup();

async function login() {
  const code = getParams().code;
  axios
    .get(`${basePath}/wxLogin?code=${code}`)
    .then(e => {
      window.userInfo = e.data.data.user;
      window.token = e.data.data.token;
      axios.defaults.headers.common['x-token'] = window.token;
    })
    .catch(e => {
      weui.alert('认证失败');
      document.body = document.createElement('body');
      document.body.innerHTML = `<Center><h3 style="margin-top:100px">认证失败</h3>
        <h>${e.toString()}</h>
        </Center>`;
    });
}

async function onWxReady() {
  wx.hideOptionMenu();
  wx.hideMenuItems({
    menuList: ['menuItem:refresh']
  });
}
