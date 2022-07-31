# 简介

刮卡组件

# 安装

```sh
npm install @huangshuisheng/components
```

# 使用

> 该库尚未发布 1.0 版本，api 可能会随时发生变化，请勿用于生产环境！

```ts
import { ScratchCanvas } from '@huangshuisheng/components';
```

# 在浏览器使用

> 该库尚未发布 1.0 版本，api 可能会随时发生变化，请勿用于生产环境！

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      #scratch-canvas {
        width: 300px;
        height: 300px;
      }
    </style>
  </head>
  <body>
    <div id="scratch-canvas"></div>
    <script src="https://cdn.jsdelivr.net/npm/@huangshuisheng/components/index.min.js"></script>
    <script>
      new BilldComponents.ScratchCanvas(
        document.getElementById('scratch-canvas'),
        {
          percent: 30, // 刮到多少比例就清除画布
          coverColor: 'skyblue', // 遮罩层颜色
          resultImg: 'https://resource.hsslive.cn/1578937683585vueblog.webp', // 遮罩层背后的图片
          onFinsh: () => {
            // 刮完后的回调
            console.log('onFinsh');
          },
          resultImgClick: () => {
            // 点击遮罩层背后的图片回调
            console.log('resultImgClick');
          },
        }
      );
    </script>
  </body>
</html>
```
