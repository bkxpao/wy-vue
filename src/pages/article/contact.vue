<template>
    <div class="contact-container">
    <div class="title">
        <h1>联系我们</h1>
        <span>Contact Us</span>
    </div>

    <div class="position">
        <ul class="left">
            <li><img src="../../assets/icon_pin.png" alt=""><span>地址：北京市海淀区王庄路1号清华同方科技广场B座10层</span></li>
            <li><img src="../../assets/icon_phone.png" alt=""><span>电话：<span style="font-size: 16px;color: #ff8301;font-weight: bold;">010-82415248-801</span></span></li>
            <li><img src="../../assets/icon_email.png" alt=""><span>邮箱：market@murongtech.com</span></li>
            <li><img src="../../assets/icon_email.png" alt=""><span>邮箱：market@murongtech.com</span></li>
            <li><img src="../../assets/icon_qq.png" alt=""><span>QQ：2327885262</span></li>
        </ul>
        <div class="right map">
            <baidu-map class="map" :center="center" :zoom="zoom" :marker="marker" @ready="handler" :scroll-wheel-zoom="true">
            <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      </bm-marker>
    </baidu-map>
        </div>
    </div>
    
    </div>
</template>

<script>
    export default {
        data() {
            return {
                center: {lng: 0,lat: 0},
                marker: {lng: 0,lat: 0},
                zoom: 3
            }
        },
        methods: {
            handler({BMap, map}) {
                console.log(BMap, map)
                // 116.345797,40.004737
                this.center.lng = 116.345797
                this.center.lat = 40.004737
                this.zoom = 17
            }
        }
    }
</script>


<style>
.contact-container .title {
    background: url(../../assets/title_contact.png) center center no-repeat;
    text-align: center;
    margin-top: 55px;
    margin-bottom: 55px;
}
.contact-container .position {
    width: 1050px;
    margin: auto;
    overflow: hidden;
}
.contact-container .left {
    width: 450px;
    float: left;
}
.contact-container li {
    margin-bottom: 15px;
}
.contact-container span, .contact-container img {
    display: inline-block;
    vertical-align: middle;
}
.contact-container span {
    font-size: 14px;
    color: #373535;
}
.contact-container .right {
    float: right;
}
.map {
  width: 569px;
  height: 281px;
}
</style>