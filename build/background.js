"use strict";const u="http://admin.ludashi.com";let c="http://admin.ludashi.com/pcgameconsole/ConsoleUserMessages";const g="网络连接异常，请稍后再试",p={getUnreadMsgNum:e=>{e.url=c+"/MessageTotal",i(e)},getMsgList:e=>{e.url=c+"/MessageLists",i(e)},markMsgRead:e=>{e.url=c+"/MessageRead",i(e)}};function i(e){console.log("config: ",e),e.data===void 0&&(e.data={}),e.method=e.method||"get";let o={},t=e.url;o["Content-Type"]="application/json;charset=UTF-8",o.Cookie=e.cookies,t+="?"+I(e.data);let n={method:e.method,headers:o};fetch(t,n).then(s=>s.json()).then(s=>{e.done&&e.done(),e.success&&e.success(s)}).catch(()=>{e.done&&e.done(),e.fail&&e.fail(g)})}function I(e){const o=[];for(const t in e)o.push(`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`);return o.join("&")}let a=null,M=null,l="",r=!1;const m="msg-query-alarm",d="UserReplyNotification";chrome.runtime.onInstalled.addListener(h);chrome.runtime.onStartup.addListener(h);chrome.runtime.onSuspend.addListener(function(){clearInterval(M)});chrome.runtime.onMessage.addListener((e,o,t)=>{if(e.type=="initPopup")return chrome.cookies.getAll({url:u},n=>{console.log("background res:",n),n&&n.length>0?(l="",a=null,n.forEach(s=>{s.name==="LUP"&&(a=decodeURIComponent(s.value)),l+=`${s.name}=${s.value};`})):(l="",a=null),console.log("发出消息:",a,l),t({userInfo:a,cookieString:l})}),!0;if(e.type=="messageChecked")return console.log("messageChecked: Received!"),r=!1,chrome.action.setBadgeText({text:""}),!0});function h(){chrome.action.setBadgeTextColor({color:"#FFFFFF"}),chrome.action.setBadgeBackgroundColor({color:"#FF0000"}),chrome.alarms.create(m,{delayInMinutes:0,periodInMinutes:1}),console.log("发出警报")}chrome.alarms.onAlarm.addListener(e=>{console.log("监听到的警报信息：",e),e.name===m&&(console.log("1 userInfo：",a),console.log("2 cookieString：",l),console.log("3 suspend: ",r),a&&l&&!r&&p.getUnreadMsgNum({data:{user_name:a},cookies:l,success:o=>{if(console.log("未读消息数获取成功",o),o.errno!==0&&(r=!0),o.data&&o.data.total>0){console.log("有新消息");const t=parseInt(o.data.total)>99?"99+":String(o.data.total);chrome.action.setBadgeText({text:t}),r=!0;const n={type:"basic",iconUrl:"/images/app.png",title:"LDS Admin 消息中心提醒",message:"您有"+o.data.total+"条未读消息！"};chrome.notifications.clear(d),chrome.notifications.create(d,n)}},fail:o=>{console.log("未读消息数获取失败",o)}}))});chrome.notifications.onClicked.addListener(e=>{e===d&&chrome.tabs.create({url:`${u}/pcgameconsole/ConsoleUserMessages/index`})});
