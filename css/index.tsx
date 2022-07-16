import Wrap from '@/components/componentWrap';
import readme from './README.md';
// import style from './utils.less';
import style from './scss/index.scss';

export default function index() {
  const text = `
   Vue (读音 /vjuː/，类似于 view)
  是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue
  被设计为可以自底向上逐层应用。Vue
  的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue
  也完全能够为复杂的单页应用提供驱动。
  `;
  return (
    <Wrap name="css常用样式">
      <div>封装常用的css</div>
      <div>随心所欲</div>
      <div>
        <div className={style['flex-wrap']}>
          单行省略号：
          <div className={style.singleEllipsis} style={{ width: '600px' }}>
            {text}
          </div>
        </div>
        <div className={style['flex-wrap']}>
          多行省略号：
          <div className={style.txt1} style={{ width: '600px' }}>
            {text}
          </div>
        </div>
        <div className={style['flex-wrap']}>
          长文本折行：
          <div style={{ width: '100px' }} className={style['long-text']}>
            https://www.hsslive.cn
          </div>
        </div>
        <div className={style['flex-wrap']}>
          <div>箭头：</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '300px',
            }}
          >
            左箭头：
            <span
              className={style['left-arrow']}
              style={{ width: '8px', height: '8px' }}
            ></span>
            右箭头：
            <span
              className={style['right-arrow']}
              style={{ width: '8px', height: '8px' }}
            ></span>
            上箭头：
            <span
              className={style['top-arrow']}
              style={{ width: '8px', height: '8px' }}
            ></span>
            下箭头：
            <span
              className={style['bottom-arrow']}
              style={{ width: '8px', height: '8px' }}
            ></span>
          </div>
        </div>
        <div className={style['flex-wrap']}>
          自定义滚动条：
          <div
            style={{ width: '100px', height: '100px', overflowY: 'scroll' }}
            className={style.hideScrollbar}
          >
            {text}
          </div>
        </div>
        <div className={style['flex-wrap']}>
          带颜色文字：
          <span className={style['color-text1']}>Beautiful</span>，
          <span className={style['color-text2']}>perfect</span>，
          <span className={style['color-text3']}>colorful</span>
        </div>
        <div className={style['flex-wrap']}>
          图片闪光：
          <div className={style['img-flash']}>
            <img
              style={{ width: '100px' }}
              src="https://img.cdn.hsslive.cn/1613141138717Billd.jpg"
              alt=""
            />
          </div>
        </div>
        <div className={style['flex-wrap']}>
          文字闪光：
          <div className={style['text-flash']}>
            <span className={`${style['color-text1']}`}>
              https://www.hsslive.cn
            </span>
          </div>
        </div>
        <div className={style['flex-wrap']}>
          高斯模糊：
          <img
            className={style.blur1}
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            src="https://img.cdn.hsslive.cn/1613141138717Billd.jpg"
            alt=""
          />
        </div>
        <div className={style['flex-wrap']}>
          置灰：
          <img
            className={style.grayscale}
            style={{ width: '100px' }}
            src="https://img.cdn.hsslive.cn/1613141138717Billd.jpg"
            alt=""
          />
        </div>
        <div className={style['flex-wrap']}>
          阴影：
          <img
            className={style.shadow1}
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            src="https://img.cdn.hsslive.cn/1613141138717Billd.jpg"
            alt=""
          />
        </div>

        <div className={style['flex-wrap']}>
          加载中1：
          <span className={style.loading1}></span>
          <span className={style.loading2}></span>
          <span className={style.loading3}></span>
          <span className={style.loading4}></span>
        </div>
        <div className={style['flex-wrap']}>
          加载中2：
          <span className={style.loading5}></span>
          <span className={style.loading6}></span>
          <span className={style.loading7}></span>
          <span className={style.loading8}></span>
        </div>
      </div>
    </Wrap>
  );
}
