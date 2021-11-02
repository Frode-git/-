// import msg from '../../msg';
// 不建议使用 ../ 从里往外查找，而是 使用 @ 从外往里查找 （注意：@ 需要在 webpack 中配置）
import msg from '@/msg.js';

console.log(msg);
