"use strict";const h="http://admin-aliyun-test.ludashi.com";let c="http://admin-aliyun-test.ludashi.com/pcgameconsole/ConsoleUserMessages";const g="网络连接异常，请稍后再试",p={getUnreadMsgNum:e=>{e.url=c+"/MessageTotal",i(e)},getMsgList:e=>{e.url=c+"/MessageLists",i(e)},markMsgRead:e=>{e.url=c+"/MessageRead",i(e)}};function i(e){console.log("config: ",e),e.data===void 0&&(e.data={}),e.method=e.method||"get";let t={},o=e.url;t["Content-Type"]="application/json;charset=UTF-8",t.Cookie=e.cookies,o+="?"+I(e.data);let s={method:e.method,headers:t};fetch(o,s).then(n=>n.json()).then(n=>{e.done&&e.done(),e.success&&e.success(n)}).catch(()=>{e.done&&e.done(),e.fail&&e.fail(g)})}function I(e){const t=[];for(const o in e)t.push(`${encodeURIComponent(o)}=${encodeURIComponent(e[o])}`);return t.join("&")}let a=null,y=null,l="",r=!1;const u="msg-query-alarm",d="UserReplyNotification";chrome.runtime.onInstalled.addListener(m);chrome.runtime.onStartup.addListener(m);chrome.runtime.onSuspend.addListener(function(){clearInterval(y)});chrome.runtime.onMessage.addListener((e,t,o)=>{if(e.type=="initPopup")return chrome.cookies.getAll({url:h},s=>{console.log("background res:",s),s&&s.length>0?(l="",a=null,s.forEach(n=>{n.name==="LUP"&&(a=decodeURIComponent(n.value)),l+=`${n.name}=${n.value};`})):(l="",a=null),console.log("发出消息:",a,l),o({userInfo:a,cookieString:l})}),!0;if(e.type=="messageChecked")return console.log("messageChecked: Received!"),r=!1,chrome.action.setBadgeText({text:""}),!0});function m(){chrome.action.setBadgeTextColor({color:"#FFFFFF"}),chrome.action.setBadgeBackgroundColor({color:"#FF0000"}),chrome.alarms.create(u,{delayInMinutes:0,periodInMinutes:1}),console.log("发出警报")}chrome.alarms.onAlarm.addListener(e=>{console.log("监听到的警报信息：",e),e.name===u&&(console.log("1 userInfo：",a),console.log("2 cookieString：",l),console.log("3 suspend: ",r),a&&l&&!r&&p.getUnreadMsgNum({data:{user_name:a},cookies:l,success:t=>{if(console.log("未读消息数获取成功",t),t.errno!==0&&(r=!0),t.data&&t.data.total>0){console.log("有新消息");const o=parseInt(t.data.total)>99?"99+":String(t.data.total);chrome.action.setBadgeText({text:o}),r=!0;const s={type:"basic",iconUrl:"/images/app.png",title:"LDS Admin 消息中心提醒",message:"您有"+t.data.total+"条未读消息！"};chrome.notifications.clear(d),chrome.notifications.create(d,s)}},fail:t=>{console.log("未读消息数获取失败",t)}}))});chrome.notifications.onClicked.addListener(e=>{e===d&&chrome.tabs.create({url:"https://admin-aliyun-test.ludashi.com/pcgameconsole/ConsoleUserMessages/index"})});
