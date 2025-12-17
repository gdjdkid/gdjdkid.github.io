---
title: NS启动Hekate界面引导加载程序
date: 2025-12-17 18:39:55
author: Roy Li
tags: [游戏机,NS]
categories: [任天堂NS]
index_img: https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/NS%E5%90%AF%E5%8A%A8Hekate%E7%95%8C%E9%9D%A2%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/NS_Startup_Hekate_9.png
sticky:
---

### 简介
以下是一套给2017年初代Nintendo Switch（可进入RCM的那一批）使用的启动链说明。它不是在“教你玩游戏”，而是在教主机怎么被“唤醒”到一个完全不同的启动世界里。
下面我把它拆开讲清楚：它是什么、为什么要这么做、每一步在干嘛、最终能得到什么。

先给一句总览版结论：
这是在利用初代NS的硬件漏洞，把官方系统的“钥匙”暂时放一边，改用一个你自己控制的启动加载器（Hekate），从而运行第三方系统（Atmosphère，大气层）和自制软件。
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/NS%E5%90%AF%E5%8A%A8Hekate%E7%95%8C%E9%9D%A2%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/NS_Startup_Hekate_9.png)

### 名词解释
- 初代NS（2017）
  - 只限 2017 初代 NS 的原因很简单： 这批机器的 Tegra X1 芯片存在不可修补的硬件漏洞（Fusee-Gelee）。 后续版本（2018 后、续航版、Lite、OLED）已经在硬件层面堵死。
  - 这是物理层漏洞，不是软件 bug，所以升级系统没用，重刷系统没用，任天堂也补不了。
  - 这也是为什么它被称为“天生可破解”。
- RCM模式（Recovery Mode）
  - RCM是NVIDIA芯片自带的低级恢复模式，原本是给工厂和维修用的。
  - 在RCM状态下：
    - 主机还没加载任天堂系统
    - 可以从USB接收“启动指令”（payload）
    - 相当于BIOS级别的入口
  - 你整套操作，目的只有一个：让NS进入RCM，并向它注入Hekate。
- 红色金属卡片（RCM Jig）
  - 这东西的作用非常“原始”
    - 短接右Joy-Con插槽里的特定针脚
    - 欺骗主机：你在请求进入RCM
  - 它不含程序、不联网、不存数据，只是一个物理开关。
- RCMloader（蓝灯那个）
  - 这是一个U盘大小的硬件，里面存着payload。
  - 它做的事情：
    - 通过USB把`hekate.bin`送进主机内存
    - 相当于“点火器”
    - 蓝灯 = 已成功注入payload
  - 没有它，你就得用电脑或手机每次手动推送。
- Hekate是什么？
  - Hekate是一个启动引导加载器（Bootloader），地位类似于PC的GRUB。
  - 它能做的事：
    - 启动大气层（Atmosphère）
    - 备份/恢复NAND（系统命根子）
    - 管理emuMMC（虚拟系统）
    - 查看硬件状态
    - 在多个系统之间切换
  - 一句话：Hekate是“系统的系统”。
- 大气层（Atmosphère）
  - 这是当前主流的Switch自制系统环境（CFW）。
  - 它不是一个“替代系统”，而是：
    - 在原系统之上打补丁
    - 解锁原本被禁止的能力
  - 能干嘛：
    - 运行自制软件（Homebrew）
    - 安装插件（如特斯拉浮窗）
    - 使用emuMMC（不碰真实系统）
    - 调试、开发、研究
- 特斯拉浮窗（Tesla Overlay）
  - 这是一个系统级插件框架。
  - 效果类似：
    - 游戏中按组合键
    - 呼出浮窗
    - 实时查看或调整参数
  - 它本身不破解，只是增强体验和可控性。

### 确认设备是否适配
一台受Fusee-Gelee漏洞影响的Nintendo Switch主机，即所谓的“软破机”。若要确认主机是否符合条件，请于主机的官方系统设置中读取主机编号（也可于机身下方白色贴纸上读取），并对照本表进行查询：
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/NS%E5%90%AF%E5%8A%A8Hekate%E7%95%8C%E9%9D%A2%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/NS_Startup_Hekate_8.png)

### 操作步骤
> 仅限2017初代NS适用
1. 把NS内存卡取出后，在电脑里格式化为FAT32格式。
2. 把”大气层1.9.2+20.2.0固件纯净版[含特斯拉浮窗]“里的文件全部拷贝到NS内存卡里。
3. 把NS内存卡插入到NS机子里，拿下右手柄。
4. 先普通开机，不要进入主页面。
5. 插入红色金属卡片，插入RCMloader，灯为蓝色。
6. 再长按开关机键直接关机。
7. 长按音量加键，然后轻点一下NS开机键。
8. 即可进入Hekate界面

![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/NS%E5%90%AF%E5%8A%A8Hekate%E7%95%8C%E9%9D%A2%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/NS_Startup_Hekate_10.png)

### Hekate界面详细介绍
- HOME 主页
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/NS%E5%90%AF%E5%8A%A8Hekate%E7%95%8C%E9%9D%A2%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/NS_Startup_Hekate_0.png)
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/NS%E5%90%AF%E5%8A%A8Hekate%E7%95%8C%E9%9D%A2%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/NS_Startup_Hekate_1.png)
- TOOLS 界面
  > 注意：使用SD Card功能，将SD挂载为U盘，使用完之后，必须在电脑弹出U盘，等close选项亮起以后才能拔线。
  
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/NS%E5%90%AF%E5%8A%A8Hekate%E7%95%8C%E9%9D%A2%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/NS_Startup_Hekate_2.png)
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/NS%E5%90%AF%E5%8A%A8Hekate%E7%95%8C%E9%9D%A2%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/NS_Startup_Hekate_3.png)
- USB TOOLS
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/NS%E5%90%AF%E5%8A%A8Hekate%E7%95%8C%E9%9D%A2%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/NS_Startup_Hekate_4.png)
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/NS%E5%90%AF%E5%8A%A8Hekate%E7%95%8C%E9%9D%A2%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/NS_Startup_Hekate_5.png)
- Console Info 主机信息
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/NS%E5%90%AF%E5%8A%A8Hekate%E7%95%8C%E9%9D%A2%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/NS_Startup_Hekate_6.png)
- Options 选项
  > 建议改为：自动启动虚拟系统，并设置合适的启动延迟时间
  
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/NS%E5%90%AF%E5%8A%A8Hekate%E7%95%8C%E9%9D%A2%E5%BC%95%E5%AF%BC%E5%8A%A0%E8%BD%BD%E7%A8%8B%E5%BA%8F/NS_Startup_Hekate_7.png)

### 整套流程的真正目的是什么？
不是“为了折腾”。 而是三件事：
- 控制启动权
  - 谁控制启动，谁控制系统。
  - Hekate 把这个权力从官方手里暂时借过来。
- 系统隔离（emuMMC）
  - 一个干净的官方系统（联网、正版）
  - 一个完全隔离的实验系统（自制、插件）
  - 这不是作恶，而是工程上的风险隔离。
- 自由探索硬件
  - Switch本质是一台ARM Linux设备。
  - 这套流程让它：
    - 像一台真正的“个人计算机”
    - 而不是只能按按钮的黑盒

### 参考资料
- Hekate官方源代码与文档
  - https://github.com/CTCaer/hekate
- Atmosphere官方源代码与文档
  - https://github.com/Atmosphere-NX/Atmosphere
- Hekate界面详细介绍
  - https://docs.qq.com/doc/DVVpQcmd1RFNpUnNL
- NH Switch Guide（最权威的入门文档）
  - https://switch.hacks.guide/
- Nintendo Switch破解原理:详解Fusée Gelée漏洞
  - https://github.com/Ginurx/fusee_gelee_explained_in_chinese
- 万物皆可 Android：给任天堂 Switch 掌机刷上 LOS 17.1
  - https://www.ithome.com/0/534/885.htm
- 游戏机黑客词汇表
  - http://gledos.science/hacking-game-console-word-list.html#%E5%9B%BD%E4%BA%A7%E8%8A%AF%E7%89%87
- 任天堂Switch的破解史
  - https://xmper.cc/2023/02/21/Switch-jailbreaking-history/
- Tesla - The Nintendo Switch Overlay Menu
  - https://gbatemp.net/threads/tesla-the-nintendo-switch-overlay-menu.557362/
- Tesla-Menu官方源代码与文档
  - https://github.com/WerWolv/Tesla-Menu
- Tesla-Menu
  - https://switch.hacks.guide/homebrew/tesla-menu.html