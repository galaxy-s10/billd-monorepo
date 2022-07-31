export class ScratchCanvas {
  constructor(
    /** dom */
    mycanvas: HTMLElement,
    config: {
      id?: string;
      /** 触点大小 */
      pointSize?: number;
      /** 比例 */
      percent?: number;
      /** 遮罩层颜色 */
      coverColor?: string;
      /** 结果图片 */
      resultImg?: string;
      /** 完成回调 */
      onFinsh?: Function;
      /** 结果图片点击 */
      resultImgClick?: Function;
    }
  ) {
    function getStyle(obj, name) {
      if (window.getComputedStyle) {
        // 非ie
        return window.getComputedStyle(obj, null)[name];
      } else {
        // ie
        return obj.currentStyle[name];
      }
    }
    if (getStyle(mycanvas, 'position') === 'static') {
      mycanvas.style.position = 'relative';
    }
    config.id = config.id || 'scratch-js-lib';
    config.pointSize = config.pointSize || 30;
    config.percent = config.percent || 50;
    config.coverColor = config.coverColor || 'gray';
    let isFinish = false; // 是否完成
    const canvas = document.createElement('canvas');
    canvas.id = config.id;
    mycanvas.appendChild(canvas);
    const w = mycanvas.getBoundingClientRect().width;
    const h = mycanvas.getBoundingClientRect().height;
    let mousedown = false; // 鼠标是否按下
    const offsetX = canvas.getBoundingClientRect().left;
    const offsetY = canvas.getBoundingClientRect().top;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    if (config.resultImg) {
      img.src = config.resultImg;
      img.setAttribute(
        'style',
        `position:absolute;top:0;left:0;z-index:-1;width:${w}px;height:${h}px`
        // 'position:absolute;top:0;left:0;z-index:-1;width:${w}px;height:${h}px'
      );
      mycanvas.appendChild(img);
    }
    ctx.fillStyle = config.coverColor;

    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'destination-out'; // 在源图像外显示目标图像。只有源图像外的目标图像部分会被显示，源图像是透明的。

    function eventDown(e) {
      // https://www.uriports.com/blog/easy-fix-for-intervention-ignored-attempt-to-cancel-a-touchmove-event-with-cancelable-false/
      if (e.cancelable) {
        e.preventDefault();
      }
      ctx.beginPath();
      ctx.lineWidth = config.pointSize!;
      ctx.lineJoin = ctx.lineCap = 'round';
      mousedown = true;
    }
    function eventUp(e) {
      e.preventDefault();
      mousedown = false;
      if (getFilledPercentage() > config.percent!) {
        clearCanvas();
        img.style.zIndex = '1';
        img.addEventListener('click', () => {
          config.resultImgClick?.();
        });
      }
    }
    function clearCanvas() {
      if (!isFinish) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isFinish = true;
        config.onFinsh?.();
      }
    }
    const eventMove = (e) => {
      e.preventDefault();
      if (mousedown) {
        // @ts-ignore
        if (e.changedTouches) {
          // 这段不能省
          // eslint-disable-next-line no-param-reassign
          e = e.changedTouches[e.changedTouches.length - 1];
        }
        const x =
            (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
          y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    };
    // 计算已经刮过的区域占整个区域的百分比
    function getFilledPercentage() {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      // imgData.data是个数组，存储着指定区域每个像素点的信息，数组中4个元素表示一个像素点的rgba值
      const pixels = imgData.data;
      const transPixels: any = [];
      for (let i = 0; i < pixels.length; i += 4) {
        // 严格上来说，判断像素点是否透明需要判断该像素点的a值是否等于0，
        // 为了提高计算效率，这儿设置当a值小于128，也就是半透明状态时就可以了
        if (pixels[i + 3] < 128) {
          transPixels.push(pixels[i + 3]);
        }
      }
      return (transPixels.length / (pixels.length / 4)) * 100;
    }

    canvas.addEventListener('touchstart', eventDown);
    canvas.addEventListener('touchend', eventUp);
    canvas.addEventListener('touchmove', eventMove);
    canvas.addEventListener('mousedown', eventDown); // 鼠标按下事件
    canvas.addEventListener('mouseup', eventUp); // 鼠标松开事件
    canvas.addEventListener('mousemove', eventMove); // 鼠标经过事件}
  }
}
