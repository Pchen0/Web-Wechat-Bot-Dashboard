<h1 align="center">Web Wechat Bot 控制台</h1>

「Web Wechat Bot」是一个基于Wechaty、可通过网页远程登录管理、可接入讯飞星火、ChatGPT、通义千问等大语言模型的微信聊天机器人，使用微信网页版协议。你可以通过网页登录微信、设置回复规则、配置API接口等。

此仓库为「Web Wechat Bot」的前端页面，不包含后端程序。如果你想直接使用Web Wechat Bot而不需要对前端页面进行更改，请前往：[https://github.com/Pchen0/Web-Wechat-Bot](https://github.com/Pchen0/Web-Wechat-Bot)。



## 🖥主要技术构成

- Vue3

- Vue-router

- ElementPlus

  

## 💡项目文件结构

```
Web-WechatBot-Dashboard      
├─ public                               
│  └─ index.html             
├─ src                                 
│  ├─ router                 
│  │  └─ index.js            
│  ├─ views                         
│  │  ├─ acccountConfig.vue  
│  │  ├─ apiConfig.vue       
│  │  ├─ Chat.vue            
│  │  ├─ Config.vue          
│  │  ├─ Header.vue          
│  │  ├─ History.vue         
│  │  ├─ Home.vue            
│  │  ├─ Login.vue           
│  │  ├─ wxConfig.vue        
│  │  └─ Wxlogin.vue         
│  ├─ App.vue                
│  └─ main.js                
├─ babel.config.js           
├─ jsconfig.json             
├─ LICENSE                   
├─ package.json              
├─ README.md                 
└─ vue.config.js             
```

