<template>
  <div class="login-container">
    <img src="../../assets/images/snow.png" id="bg" style="display:none" />
    <img src="../../assets/images/snow1.png" id="imgs1" style="display:none" />
    <img src="../../assets/images/snow2.png" id="imgs2" style="display:none" />
    <img src="../../assets/images/snow3.png" id="imgs3" style="display:none" />
    <img src="../../assets/images/snow4.png" id="imgs4" style="display:none" />
    <img src="../../assets/images/tree1.jpg" id="tree1" style="display:none" />
    <img src="../../assets/images/tree2.jpg" id="tree2" style="display:none" />
    <img src="../../assets/images/tree3.jpg" id="tree3" style="display:none" />
    <img src="../../assets/images/tree4.jpg" id="tree4" style="display:none" />
    <canvas id='myCanvas' ></canvas>
    <div id="form_box">
      <el-form ref="form" :model="form" label-width="80px" class="login-form">
      <h2 class="login-title">登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="login-button">登录</el-button>
      </el-form-item>
    </el-form>
      </div>
    <div class="wrapper">
      <div class="text" data-text="2020">Merry Christmas</div>
    </div>
  </div>  
</template>
<script>
let canvas;
let context;
let winW;
let winH;
let last_snow_created_time;
let snows = [];
let back_image;
let tree1;
export default {
  data() {
    return{
      form:{
        username:"",
        password:""
      }
    }
  },
  mounted() {
    winW = window.innerWidth
    winH = window.innerHeight
    last_snow_created_time = new Date()
    
    this.initCavas()
    window.onresize = () => {
      this.initCanvas()
    }
  },
  methods:{
    initCavas() {
      console.log("初始化canvas")
      canvas = document.getElementById("myCanvas") //找到cancas元素；
      context = canvas.getContext("2d"); // 创建context对象；getContext() 方法返回一个用于画布上绘图环境；参数 ‘2d’ 指定了画布上绘制的类型，它指定了二维绘图，并且导致这个方法返回一个环境对象，该对象导出一个二维绘图API。了解别的参数查看MDN文档。
      // context.fillStyle = '#000'  //设置fillStyle属性可以是CSS颜色，渐变，或图案。
      // const bg = document.getElementById("bg")
      //  tree1 = document.getElementById("tree4")
      canvas.width = winW
      canvas.height = winH
       back_image = document.getElementById("imgs1")
      
      setInterval(() => {
        this.drawFrame()
      }, 100);
    },
    drawFrame() {
       setInterval(() => {
          var index = parseInt(4* Math.random())+1
          back_image = document.getElementById("imgs" + index)
       },500)
      context.clearRect(0,0, winW, winH);
      this.createSnow(back_image)
      //  context.drawImage(tree1,0,winH-200,200,200)
      snows.forEach(function(snow,index) {
        
        snow.y += snow.radius / 3;
        if (snow.y > winH) {
          snows.splice(index,1)
        } else {
          snow.draw(snow)
        }
      })
    },
    createSnow(images) {
      let now = new Date()
      if (now - last_snow_created_time > snows.length - now.getMinutes() && snows.length < 1500) {
        const radius = Math.random() * 5 + 2;
        let snow = {x: 0, y: 0, radius: radius, color: "",draw: this.draw,img: images}
        snow.x =  Math.random() * winW + 1;
        snow.color = '#ffffff';
        snows.push(snow);
        last_snow_created_time = now;
      }
    },
    draw(snow) {
      context.save();
      context.translate(snow.x, snow.y);
      context.lineWidth = this.lineWidth;
      context.fillStyle = '#fff'
      context.beginPath();
      context.drawImage(snow.img,0,0,13,13)
      context.stroke();
      context.closePath();
      context.fill();
      context.restore(); // 这个是动态
    },
    onSubmit() {
      if(this.form.username === "admin" && this.form.password === "1") {
        alert("登录成功")
      }else {
        alert("您输入的账号密码有误，请重新输入")
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-form{
  background-color: rgb(255, 255, 255, 0.5);
  padding: 30px;
  border-radius: 20px;
}
#form_box {
  position: absolute;
  left: 60%;
  top: 28%;
  width: 32%;
  z-index: 999;
}
.login-container {
  position: absolute;
  background: url("../../assets/images/snow.png");
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
.login-title {
  color: #303133;
  text-align: center;
}
.login-button {
  float: right;
  margin-left: 10px;
}
.login-register {
  background-color: gray;
}
.wrapper{
  position: absolute !important;
  left: 50%;
  top: -35%;
  background: radial-gradient(#e8001c,#f22e45);
  background: transparent;
  height: 97vh;
  border-radius: 5px;
  position: relative;  
}
.text{
  flex: 0 0 100%;
  font-size: 12rem;
  font-weight: 800;
  color: #00000000;
  text-align: center;
  font-family: 'Lato', sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  // border-bottom: 1px solid #d4d7ff;
  // border-top: 1px solid #d4d7ff;
  background: url("../../assets/images/source.gif");
  width: 80%;
  height: 80%;
  -webkit-background-clip: text;
}
  
 .text:after{
   content: attr(data-text);
   -webkit-text-stroke: 1.5px #d4d7ff;
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -48%);
   background: url("../../assets/images/source.gif");
   -webkit-background-clip: text;
   background-size: 33%;

}
</style>>
