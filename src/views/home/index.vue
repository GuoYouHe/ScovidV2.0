<script setup lang="ts">
import { onMounted, defineComponent, h } from "vue";
import WOW from "wow.js";


import TypeIt from "@/components/ReTypeit";
import { useRoute, useRouter } from "vue-router";


const router = useRouter();

import "./assets/css/bootstrap.min.css";
import carousel from "vue-owl-carousel/src/Carousel.vue";
import "./assets/css/fontawesome.css";
import "./assets/css/templatemo-digimedia-v2.css";
import carouseldata from "./homeCarousel.json";
// 引入本地图片
function getImageUrl(url): string {
  return new URL(url, import.meta.url).href;
}

let gl = `${window.$staticUrl}`;

import homepie from "./pieplot/index.vue";

defineOptions({
  name: "Home"
});

onMounted(() => {
  new WOW({
    boxClass: "wow",
    animateClass: "animated",
    offset: 0,
    live: true
  }).init();
});

const remoteScript = defineComponent({
  render() {
    var self = this;
    return h("script", {
      type: "text/javascript",
      src: this.src,
      async: "async"
      // class: { scriptmap: true }
    });
  },

  props: {
    src: {
      type: String,
      required: true
    }
  }
});

const remoteScript2 = defineComponent({
  render() {
    var self = this;
    return h("script", {
      type: "text/javascript",
      src: this.src,
      async: "async"
      // class: { scriptmap: true }
    });
  },

  props: {
    src: {
      type: String,
      required: true
    }
  }
});

function topath2(val) {
  router.push({
    name: val, // 替换为目标路由的名称
    query: {
      id: "1", // 参数名为 id，值为 1
    }
  });
}
</script>
<!-- <style scoped src="./assets/css/bootstrap.min.css"></style> -->
<template>
  <div>
    <div class="contentheight">
      <div class="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
        <div class="titlehome">
          <div class="row">
            <div class="col-lg-12">
              <div class="row">
                <div class="col-lg-6 align-self-center">
                  <div class="left-content show-up header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                    <div class="row">
                      <div class="col-lg-12" style="
                          padding-right: 0px;
                          font-family: 'Times New Roman', Times, serif;
                        ">
                        <h4>Welcome to</h4>
                        <h2>SCovid
                          <TypeIt :className="'type-it2'" :values="['v2.0']" :cursor="false" :speed="500" />
                        </h2>
                        <p style="
                            color: #000;
                            opacity: 0.8;
                            text-align: justify;
                            text-justify: inter-ideograph;
                            font-size: 20px;
                          ">
                          SCovid v2.0 is a comprehensive atlas for revealing the
                          molecular characteristics of COVID-19, which
                          integrates across-tissue and multi-data-type,
                          including data browsing, searching, and downloading.
                          Significantly, we added data from patients with other human coronaviruses for researchers to
                          perform circumferential comparisons.
                        </p>
                      </div>
                      <div class="col-lg-12">
                        <div class="border-first-button scroll-to-section">
                          <a @click="topath2('Singlecell')">Learn More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <!-- <div class="homeimg"/> -->
                  <div class="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                    <img style="margin: auto" src="./assets/images/5152398.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 重新部署时存在错误，修改方法见.md文件 -->
      <div class="our-portfolio section">
        <div class="container wow fadeIn" data-wow-duration="0.5s" data-wow-delay="0.5s">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-heading">
                <h4>See Our <em>Modules</em></h4>
                <div class="line-dec"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="row wow fadeIn" data-wow-duration="1s" data-wow-delay="0.5s">
            <div class="col-lg-12">
              <carousel :autoplay="true" :loop="true" :items="5" :nav="true" :navText="['<', '>']">
                <div class="item" v-for="(item, j) in carouseldata.imgList" :key="j">
                  <a>
                    <div class="portfolio-item">
                      <div class="thumb">
                        <img :src="getImageUrl(gl + 'public/img/' + item.src)" alt="" style="
                            height: 230px;
                            widows: 230px;
                            padding: 30px 30px;
                          " />
                      </div>
                      <div class="down-content">
                        <h4>{{ item.title }}</h4>
                        <span>{{ item.content.substring(0, 60) }}...</span>
                      </div>
                      <div class="display-content">
                        <div class="con">
                          <span>{{ item.content }}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </carousel>
            </div>
          </div>
        </div>
      </div>

      <div class="contact-us section">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="section-heading">
                <h4>See Our <em>Statistics</em></h4>
                <div class="line-dec"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer_container" style="position: relative">
          <div class="row">
            <div class="col-lg-12">
              <div class="fill-form">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="info-post">
                      <div class="icon" style="height: 350px;padding-top: 5px">
                        <h5 style="margin: 5px 0 0 15px; cursor: default">
                          Visits
                        </h5>
                        <div style="display: flex;justify-content: center;">
                          <div>
                            <div class="scriptmap" style="margin-top: 15px;">
                              <remote-script
                                src="//rf.revolvermaps.com/0/0/4.js?i=0wor1qgm4jt&amp;m=0&amp;h=150&amp;c=ff0000&amp;r=0"></remote-script>
                            </div>
                            <div class="scriptmap">
                              <remote-script2
                                src="//rf.revolvermaps.com/0/0/0.js?i=0wor1qgm4jt&amp;d=3&amp;p=0&amp;b=0&amp;w=293&amp;g=2&amp;f=arial&amp;fs=12&amp;r=0&amp;c0=362b05&amp;c1=375363&amp;c2=000000&amp;ic0=0&amp;ic1=0"></remote-script2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5">
                    <div class="info-post">
                      <div class="icon" style="height: 350px;padding-top: 5px">
                        <h5 style="margin: 5px 0 0 15px; cursor: default">
                          Abstract statistics
                        </h5>
                        <homepie />
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="info-post">
                      <div class="icon" style="height: 190px; padding-top: 5px">
                        <h5 style="margin: 5px 0 0 15px; cursor: default">
                          Contact Us
                        </h5>
                        <p style="
                            text-align: left;
                            margin: 5px 0 0 15px;
                            color: #000;
                            opacity: 0.9;
                            cursor: default;
                          ">
                          Liang Cheng, Ph. D.<br />
                          Chief Editor of Current Gene Therapy<br />
                          Professor and PI of Harbin Medical University<br />
                          Mail:<a href="mailto: liangcheng@hrbmu.edu.cn" target="_blank"
                            style="margin-top: 0px; color: #108dff">liangcheng@hrbmu.edu.cn</a>
                        </p>
                      </div>
                    </div>
                    <div class="info-post">
                      <div class="icon" style="height: 150px; padding-top: 5px">
                        <h5 style="margin: 5px 0 0 15px; cursor: default">
                          Release & Version
                        </h5>
                        <el-timeline>
                          <el-timeline-item timestamp="2021/6/25" placement="top">
                            <p style="
                            text-align: left;color: #000;
                            opacity: 0.9;">the SCovid v1.0 was released.</p>
                          </el-timeline-item>
                          <el-timeline-item timestamp="2023/6/1" placement="top">
                            <p style="
                              text-align: left;color: #000;
                            opacity: 0.9;">the SCovid v2.0 was released.</p>
                          </el-timeline-item>
                        </el-timeline>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.item::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  width: 89%;
  height: 92%;
  margin: 0 15px;
  border-radius: 25px;
  background: linear-gradient(to top, #222 100%, transparent);
  z-index: 1;
  opacity: 0;
  transition: 0.5s;
}

.item:hover::before {
  opacity: 0.6;
}

.display-content {
  cursor: default;
  position: absolute;
  top: 0%;
  margin: 0 4%;
  color: transparent;
  z-index: 50;
  height: 90%;
  width: 80%;

  .con {
    // position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    span {
      justify-self: center;
      width: 100%;
      // text-align: justify; //字母两侧对齐
      // align-self: center ; //文本垂直居中
      // color: #fff;
    }
  }
}



.display-content:hover {
  cursor: default;
  color: #fff;
}
</style>
<style lang="scss" scoped>
.imhgmap {
  margin-left: 0px;
}

.scriptmap {
  // margin-left: 16px;
  margin-top: 30px;
}

.main-banner {
  padding: 50px 0px 16px 0px;
}

:deep(.owl-dots) {
  display: none;
}

:deep(.our-portfolio) {
  .owl-nav {
    right: 45px;
  }
}

:deep(.el-timeline-item__timestamp.is-top) {
  text-align: left;
}

:deep(.el-timeline-item) {
  padding-bottom: 10px;
}

.item {
  height: 350px;
  width: 266px;
}

.main-banner .left-content h4 {
  font-size: 26px;
  font-weight: 700;
  color: #fe664e;
}

footer {
  background-color: #fff;
}

.footer_container {
  padding-top: 60px;
}

.footer_container::after {
  background-image: url(./assets/images/contact-bottom-right-v3.png);
  position: absolute;
  right: 0;
  bottom: 0;
  width: 532px;
  height: 106px;
  background-repeat: no-repeat;
  content: "";
  z-index: 1;
}

.footer_container::before {
  background-image: url(./assets/images/contact-top-right-v3.png);
  transform: rotateY(180deg);
  position: absolute;
  left: 0;
  top: 0;
  width: 726px;
  height: 78px;
  background-repeat: no-repeat;
  content: "";
  z-index: 1;
}

.fill-form .info-post {
  margin-bottom: 10px;
}

.fill-form .icon img {
  max-width: 660px;
  margin: 0 auto;
}
</style>
