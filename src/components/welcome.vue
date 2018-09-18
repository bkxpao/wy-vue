<template>
    <div>
          <div class="header">
            <div class="top-nav">
              <div class="w1200">
                <span class="f12 float-right"><a href="login">登陆</a>
                &nbsp;|&nbsp;
                <a href="regin">注册</a>
                </span>
              </div>
            </div>
            <div class="menu w1200">
              <a style="display: inline-block;vertical-align: bottom;line-height: 0;" href="/"><img class="logo" src="../assets/header-logo.png"></a>
              <span style="color:#666666">沐融科技旗下应收账款融资平台，全力助力中小企业融资！</span>
              </div>
           </div>
        
  <div class="content w1200">
        <keep-alive>
         <router-view></router-view>
        </keep-alive>
    </div>
    <div class="footer w1200">
    <div class="feature-container">
      <div class="feature-item">
        <img src="../assets/icons/icon_cart.png" alt="">
        <h2>融资，是件容易的事<span>专业顾问/1000家核心企业</span></h2>
      </div>
      <div class="feature-item">
        <img src="../assets/icons/icon_plane.png" alt="">
        <h2>安全担保，诚融天下<span>区块链融资打破信任壁垒</span></h2>
      </div>
      <div class="feature-item">
        <img src="../assets/icons/icon_windmill.png" alt="">
        <h2>玩转金链<span>新人帮助/企业入驻</span></h2>
      </div>
    </div>
    <div>
      <a href="about" target="_blank">关于金链</a> | <a href="contact" target="_blank">联系我们</a>
    </div>
    <div>京ICP备15000632号-1 Copyright @ 北京沐融信息科技股份有限公司</div>
    <div class="cert-holder">
      <a  href="http://si.trustutn.org/info?sn=295170208026776324741&amp;certType=1" target="_Blank">
      <img src="../assets/real-name.png" alt="安全联盟认证" width="124" height="47" style="border: none;"></a>
    </div>
  </div>
    </div>
</template>

<script>    
</script>


<style>
    body, div, ul, ol, li, h1, h2, h3, h4, h5, h6, p, dd, dl, dt {
        padding: 0;
        margin: 0;
        -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
    }
    ul, ol, li {
        list-style: none;
    }
    body {
    font-family: "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
    color: #333;
    -webkit-font-smoothing: antialiased;
    min-width: 1000px;
    background: #f8f8f8;
    }

    div {
        display: block;
    }    

    a, a:active, a:link, a:visited, a:hover {
    text-decoration: none;
    }

    a {
    color: #999;
    }
    .header .top-nav {
        padding: 7px 0;
        background: #fafafa;
    }
    .w1200 {
        width: 1200px;
        margin: auto;
        overflow: hidden;
    }
    .float-right {
    float: right;
    }
    .f12 {
        font-size: 12px;
    }
    .header .menu {
    padding: 27px 0;
    }
    .header .menu .logo {
    display: inline-block;
    width: 166px;
    }
    .dialog-container * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    }
    .form-container {
    width: 360px;
    height: 350px;
    padding: 30px;
    background: #f8fafe;
    float: right;
    margin-right: 10px;
    margin-top: 60px;
    -webkit-border-radius: 4px;
    -webkit-background-clip: padding-box;
    -moz-border-radius: 4px;
    -moz-background-clip: padding;
    border-radius: 4px;
    background-clip: padding-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    }
    img {
    border: 0;
    display: block;
    height: auto;
    max-width: 100%;
    margin: auto;
    }
    .content {
    min-height: 500px;
    width: 100%!important;
    }
    .fr {
    float: right;
    }
    .footer {
        padding-bottom: 30px;
        padding-top: 30px;
        color: #6f6f71;
        font-size: 12px;
    }
    .footer .feature-container {
        padding-bottom: 20px;
        border-bottom: #e1e1e1 1px solid;
        margin-bottom: 30px;
    }
    .footer .feature-container > div {
        text-align: left;
        display: inline-block;
        padding: 20px 85px;
        border-left: 1px solid #ccc;
    }
    .footer .feature-container > div:first-child {
        border-left: 0;
    }
    .footer div {
        text-align: center;
    }
    .footer .feature-container h2 {
        color: #474747;
        font-size: 16px;
        display: inline-block;
        vertical-align: middle;
    }
    .footer .feature-container h2 span {
        color: #999999;
        font-size: 14px;
        display: block;
    }
    .footer .feature-container img {
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
    }
    .cert-holder {
        margin-top: 15px;
    }
    .footer a {
        color: inherit;
        display: inline-block;
        margin: 0 10px;
        margin-bottom: 15px;
    }

</style>