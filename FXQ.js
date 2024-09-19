"use strict";

let FXQ = {

  //签章颜色定义
  colors: ['red', 'blue', '#000'],

//签章字体定义
  fonts: ['宋体', 'STSong', 'YouYuan', 'KaiTi'],


  baseConf: {
    color: null,
    font: '宋体',
  },

  commonMethod: function (cType, fType) {

    let color = this.colors[cType];
    if (color === undefined || color === 'undefined') {
      color = this.colors[0];
    }

    let font = this.fonts[fType];
    if (font === undefined || font === 'undefined') {
      font = this.fonts[0];
    }

    this.baseConf.color = color;
    this.baseConf.font = font;

  },

  /**
   *
   * @param company 公司名称
   * @param cType 颜色 0.红  1. 蓝色 2.其他
   * @param fType 字体 0.宋体
   * @param sType 签章类型 0.公章 1.合同专用章
   * @param seaNo  这个是签章的序列号
   */
  companySeal: function (company, cType, fType, sType, seaNo) {

    //获取canvas doc对象
    // let canvas = document.getElementById('canvas');
    let canvas = document.createElement("canvas");

    let context = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 300;

    this.commonMethod(cType, fType);

    let width = canvas.width / 2;
    let height = canvas.height / 2;

    //画圆方法
    drawCircle()

    draw5Start(30, 0)

    drawTitle();

    writeSerNo(seaNo)

    writeFont(company)

    //返回图片base64
    return canvas.toDataURL();


    /**
     * 画圆的方法
     * color : 圆边框的颜色
     * lineWidth: 线条宽度
     */
    function drawCircle() {
      context.translate(0, 0);
      context.lineWidth = 5;
      context.strokeStyle = FXQ.baseConf.color;
      context.beginPath();
      context.arc(width, height, 110, 0, Math.PI * 2);
      context.stroke();
      context.save();
      let data = canvas.toDataURL("image/jpeg")
      console.log(canvas);
    }

    /**
     * 绘制五角星
     */
    function draw5Start() {
      context.save();
      context.fillStyle = FXQ.baseConf.color;
      //移动坐标原点  中心点开始绘制
      context.translate(width, height);
      //旋转
      context.rotate(Math.PI);
      context.beginPath();
      let dig = Math.PI / 5 * 4
      for (let i = 0; i < 5; i++) {
        let x = Math.sin(i * dig);
        let y = Math.cos(i * dig);
        context.lineTo(x * 30, y * 30);
      }
      context.closePath();
      context.stroke();
      context.fill();
      context.restore();
    }


    /**
     * 绘制公章标题
     */
    function drawTitle() {

      let title = '';
      if (sType !== 0) {

        title = '合同专用章';
      }

      // 绘制印章名称
      context.font = 'bolder 20px ' + FXQ.baseConf.font;
      context.textBaseline = 'middle';//设置文本的垂直对齐方式
      context.textAlign = 'center'; //设置文本的水平对对齐方式
      context.lineWidth = 1;
      context.fillStyle = FXQ.baseConf.color;
      context.fillText(title, width, height + 65);
    }

    /**
     * 绘制公司名称
     */
    function writeFont() {
      context.font = 'normal 28px ' + FXQ.baseConf.font;
      let count = company.length;// 字数
      let angle = -4 * Math.PI / (3 * (count - 1));// 字间角度
      let chars = company.split("");
      let trueChars = chars.reverse();
      let c;
      for (let i = 0; i < count; i++) {
        c = trueChars[i];// 需要绘制的字符
        if (i === 0)
          context.rotate(25 * Math.PI / 6.0);
        else
          context.rotate(angle);
        context.save();
        context.translate(95, 0);// 平移到此位置,此时字和x轴垂直，第一个参数是与圆外边的距离，越大距离越近
        context.rotate(Math.PI / 2);// 旋转90度,让字平行于x轴
        context.fillText(c, 0, 5);// 此点为字的中心点
        context.restore();
      }

    }

    /**
     * 绘制签章序列号
     * @param serNo
     */
    function writeSerNo(serNo) {
      context.translate(width, height);
      context.font = 'bolder 8px ' + FXQ.baseConf.font;
      let count = serNo.length;// 字数
      let angle = -2 * Math.PI / (6 * (count - 1));// 字间角度
      let chars = serNo.split("");

      for (let i = 0; i < count; i++) {
        let c = chars[i];// 需要绘制的字符
        if (i === 0)
          context.rotate(10 * Math.PI / 5.95);
        else
          context.rotate(angle);
        context.save();
        context.translate(-95, 5);// 平移到此位置,此时字和x轴垂直，第一个参数是与圆外边的距离，越大距离越近
        context.rotate(Math.PI / 2);// 旋转90度,让字平行于x轴
        context.fillStyle = FXQ.baseConf.color;
        context.fillText(c, 0, 5);// 此点为字的中心点
        context.restore();
      }
    }
  },
  /**
   * 绘制个人签章
   * @param name 姓名
   * @param cType 字体颜色
   * @param fType 字体
   * @param type 类型
   */
  personal: function (name, cType, fType, type, border) {
    this.commonMethod(cType, fType);
    let color = FXQ.baseConf.color;
    let font = FXQ.baseConf.font;
    //获取canvas doc对象
    //let canvas = document.getElementById('canvas');
    let canvas = document.createElement("canvas");
    let context = canvas.getContext('2d');
    canvas.width = 120;
    canvas.height = 120;
    let length = name.length;
    //长方形前面
    if (type === 0) {
      console.log(context.width)
      //要边框
      if (border === 0) {
        context.rect(5, 5, 100, 50);
        context.strokeStyle = color;
        context.lineWidth = 4
        context.stroke();
      }
      // 绘制印章名称
      context.font = '30px ' + font;
      if (length > 3) {
        context.font = '24px ' + font;
      }
      context.textBaseline = 'middle';//设置文本的垂直对齐方式
      context.textAlign = 'center'; //设置文本的水平对对齐方式
      context.lineWidth = 1;
      context.fillStyle = color;
      context.textAlign = 'center'; //设置文本的水平对对齐方式
      context.fillText(name, 55, 30);

    } else {//正方形
      let personal = '';
      switch (name.length) {
        case 3:
          name += '印';
          break;
        case 2:
          name += '之印';
        default:
          break;

      }
      let names = name.split('');
      personal = names[2] + names[0] + names[3] + names[1];
      //要边框
      if (border === 0) {
        context.rect(2, 2, 108, 108);
        context.strokeStyle = color;
        context.lineWidth = 2
        context.stroke();
      }

      // 绘制印章名称
      context.font = '40px ' + font;
      context.fillStyle = color;
      this.wrapText(context, personal, 8, 45, 80, 40)

    }
    //返回图片base64
    return canvas.toDataURL();
  },
  //椭圆签章
  companyEllipse: function (company, serNo, fType, cType) {

    //椭圆长轴半径
    let radiusX = 140;
    //短轴半径
    let radiusY = 90;
    this.commonMethod(cType, fType);
    let color = FXQ.baseConf.color;
    let font = FXQ.baseConf.font;

    //let canvas = document.getElementById('canvas');
    let canvas = document.createElement("canvas");

    canvas.width = 300;
    canvas.height = 300;

    canvas.width = 2 * radiusX + 5;
    canvas.height = 2 * radiusY + 5;

    let context = canvas.getContext('2d');

    writeFont(true, company);
    writeFont(false, serNo);
    writeTitle();
    drawEllipse();

    function writeFont(isTop, words) {

      let totalArcAng = 180;
      font = "20px " + font

      //字体长度
      if (!isTop) {
        totalArcAng = 60;
        font = "10px " + font
      }
      let fontTextLen = words.length;

      let radiusWidth = radiusX + context.lineWidth;
      let radiusHeight = radiusY + context.lineWidth;

      //从边线向中心的移动因子
      let minRat = 0.9;
      //起始角度
      let startAngle = isTop === true ? -90 - totalArcAng / 2 : 90 - totalArcAng / 2;
      let step = 0.5;
      let alCount = Math.ceil(totalArcAng / step) + 1;
      let angleArr = new Array(alCount);
      let arcLenArr = new Array(alCount);
      let num = 0;
      let accArcLen = 0;
      angleArr[num] = startAngle;
      arcLenArr[num] = accArcLen;
      num++;
      let angR = startAngle * Math.PI / 180;
      let lastX = radiusX * Math.cos(angR) + radiusWidth;
      let lastY = radiusY * Math.sin(angR) + radiusHeight;

      for (let i = startAngle + step; num < alCount; i += step) {
        angR = i * Math.PI / 180;
        let x = radiusX * Math.cos(angR) + radiusWidth;
        let y = radiusY * Math.sin(angR) + radiusHeight;
        accArcLen += Math.sqrt((lastX - x) * (lastX - x) + (lastY - y) * (lastY - y));
        angleArr[num] = i;
        arcLenArr[num] = accArcLen;
        lastX = x;
        lastY = y;
        num++;
      }

      let arcPer = accArcLen / fontTextLen;
      for (let i = 0; i < fontTextLen; i++) {
        let arcL = i * arcPer + arcPer / 2;
        let ang = 0;

        for (let p = 0; p < arcLenArr.length - 1; p++) {
          if (arcLenArr[p] <= arcL && arcL <= arcLenArr[p + 1]) {
            ang = (arcL >= ((arcLenArr[p] + arcLenArr[p + 1]) / 2)) ? angleArr[p + 1] : angleArr[p];
            break;
          }
        }
        angR = (ang * Math.PI / 180);
        let x = radiusX * Math.cos(angR) + radiusX;
        let y = radiusY * Math.sin(angR) + radiusY;
        let qxang = Math.atan2(radiusY * Math.cos(angR), -radiusX * Math.sin(angR));
        let fxang = qxang + Math.PI / 2;

        let subIndex = isTop === true ? i : fontTextLen - 1 - i;
        let c = words[subIndex];
        let w = 25;
        let h = 31;

        if (!isTop) {
          w = 2;
          h = 10;
        }

        x += (h * minRat) * Math.cos(fxang);
        y += (h * minRat) * Math.sin(fxang);
        if (isTop) {
          x += -w / 2 * Math.cos(qxang);
          y += -w / 2 * Math.sin(qxang);
        } else {
          x += w / 2 * Math.cos(qxang);
          y += w / 2 * Math.sin(qxang);
        }

        context.save()
        context.translate(x, y);
        if (isTop === true) {
          context.rotate((fxang * 180 / Math.PI - 90) * Math.PI / 180)
        } else {
          context.rotate((fxang * 180 / Math.PI + 180 - 90) * Math.PI / 180)
        }
        context.translate(-x, -y)
        context.fillStyle = color;
        context.font = font;
        context.fillText(c, x, y);
        context.restore();
      }
    }

    function writeTitle() {
      context.fillStyle = color;
      context.font = '20px SimSun';
      context.textAlign = 'center';
      context.fillText('合同专用章', radiusX, radiusY + 20);
      context.restore();
    }

    function drawEllipse() {
      context.ellipse(radiusX + context.lineWidth + 1, radiusY + context.lineWidth + 1, radiusX, radiusY, 0, 0, Math.PI * 2);
      //背景透明
      context.fillStyle = "rgba(255, 255, 255, 0)";
      context.strokeStyle = color;
      context.lineWidth = 3;
      context.fill();
      context.stroke();
    }

    //返回图片base64
    return canvas.toDataURL();
  },
  /**
   * 字体换行
   * */
  wrapText: function (ctx, text, x, y, maxWidth, lineHeight) {
    if (typeof text !== 'string' || typeof x !== 'number' || typeof y !== 'number') {
      return;
    }

    let context = ctx;
    let canvas = context.canvas;

    if (typeof maxWidth === 'undefined') {
      maxWidth = (canvas && canvas.width) || 112;
    }
    if (typeof lineHeight === 'undefined') {
      lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight);
    }

    // 字符分隔为数组
    let arrText = text.split('');
    let line = '';

    for (let n = 0; n < arrText.length; n++) {
      let testLine = line + arrText[n];
      let metrics = context.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(arrText[0], x, y);
        context.fillText(arrText[1], x + 50, y);
        line = arrText[n];
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(arrText[2], x, y + 10);
    context.fillText(arrText[3], x + 50, y + 10);
  }
};
export default FXQ










