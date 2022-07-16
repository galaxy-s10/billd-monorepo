import { memo } from 'react';
import Wrap from '@/components/componentWrap';
import md from './README.md';

const LibsCommonJs = () => (
  <Wrap name="js通用方法" html={md}>
    <div>封装常用的js方法</div>
    <div>🎉🎉🎉</div>
    <div></div>
  </Wrap>
);
export default memo(LibsCommonJs);
