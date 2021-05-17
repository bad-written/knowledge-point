/** 1. 信号灯控制器
 用 React 实现一个信号灯（交通灯）控制器，要求：
 1. 默认情况下，
 1.1. 红灯亮20秒，并且最后5秒闪烁
 1.2. 绿灯亮20秒，并且最后5秒闪烁
 1.3. 黄灯亮10秒
 1.4. 次序为 红-绿-黄-红-绿-黄
 2. 灯的个数、颜色、持续时间、闪烁时间、灯光次序都可配置，如：
 lights=[{color: '#fff', duration: 10000, twinkleDuration: 5000}, ... ]
 */

import React from 'react';
import ReactDOM from 'react-dom';
const TrafficLightItem = () => {
  return <div>TrafficLightItem</div>;
};
export default TrafficLightItem;

/** 2. 寻找特定 IP
 IPV4 的 IP 地址是32位的二进制数，为增强可读性，通常我们以8位为1组进行分割，
 用十进制来表示每一部分，并用点号连接，譬如 192.168.1.1。显然，存在这样的 IP 地址，
 0到9十个数字各出现一次。具备这样特征的 IP 地址里，表示成二进制数时，二进制数左右对称
 （也就是“回文”，表示成32位二进制不省略0）的情况有几种，分别是哪些？要求性能尽可能高
 */
