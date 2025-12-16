---
title: 任天堂Switch安装安卓TV系统
date: 2025-12-17 01:05:26
author: Roy Li
tags: [游戏机,NS]
categories: [任天堂NS]
index_img:
sticky:
---

### 前期准备
- 用泡泡龙电玩版Hekate
- 用LineageOS的安卓TV15版本固件
- 确保SD卡格式化为FAT32或exFAT
- 确保Hekate版本大于等于6.0.3
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_0.png)

### MindTheGapps 简介
- Download MindTheGapps: Custom Google Apps Package for Android
  - 链接：https://mindthegapps.com/
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_1.png)
- Why Choose MindTheGapps?
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_2.png)
- How to Install MindTheGapps
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_3.png)

### 安装Gapps（安卓TV14系统内部没有）
1. 确认Android TV系统已安装但尚未首次启动.
   1. 你提到已经“安装好了 Android TV 14 系统并进入过一次”，这属于已首次启动系统的状态。此时直接安装GApps会很可能引发系统崩溃。因此，需要先重置数据，再安装GApps。
2. 启动到Recovery并执行Data清空。
   1. 长按 音量上 + 启动 Hekate → More Configs → 持 Volume Up 选 LineageOS Recovery，进入恢复模式。
   2. 在 Recovery 菜单中执行 Factory Reset → Format data / factory reset，清除 Android 的 data 和 cache 分区（不会影响 HOS 或 Switch 原系统）
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_4.png)
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_5.png)
   3. 下载合适的GApps包
      1. 根据你的系统版本（LineageOS 21 – Android 14）和架构（Switch v1 是 ARM64），选择对应的 GApps 包。对于 Android TV，推荐使用适配 TV 的包类型（如 MindTheGapps 或 OpenGApps TV stock）
      2. 下载这个包 → MindTheGapps-14.0.0-arm64-ATV-full-20240523_192016.zip
         ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_6.png)
         ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_7.png)
      3. 下载官网
         - https://wiki.lineageos.org/gapps/
         - https://github.com/MindTheGapps/14.0.0-arm64-ATV/releases/tag/MindTheGapps-14.0.0-arm64-ATV-20240523_192151
   4. 通过Choose from SWITCH SD安装GApps
      1. 在Recovery中点击Apply Update → Choose from SWITCH SD
         ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_8.png)
         ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_9.png)
         ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_10.png)
      2. 当看到“Signature verification failed”提示时选择“Yes”继续安装（这是正常情况）
   5. 回到Recovery主界面并重启
      1. 安装完毕后，选择Recovery中的“Back”或返回箭头，然后点击Reboot system now，系统将进入首次带GApps的Android TV
   6. 总结
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_11.png)

### Magisk
- 目的：让NS的ATV解锁ROOT模式。
- 针对OLED型号推荐v25.2
- 下载这个“Magisk-v25.2.apk”
  - https://github.com/topjohnwu/Magisk/releases
  - https://github.com/topjohnwu/Magisk/releases/tag/v25.2

### Youtube教学参考
- 双系统切换！给Switch刷入大气层及Android11系统，并Root
  - 莫老师的附件表
    - https://zxmls.lol/#/?id=ep150-双系统切换！给switch刷入大气层及android11系统，并root
    <div class="video-container">
      <iframe src="https://www.youtube.com/embed/6g0uDHGaRxU?start=30&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
- 任天堂SWITCH游戏机最新2025刷最新安卓15系统教程，Nintendo SWITCH game console latest 2025 flash latest Android 15
  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/n1zm5zk01hA?start=30&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
- 小亮电玩 switch全系列支持刷安卓11教程，支持oled版，这个安卓确实惊喜比较大
  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/3LNXBqUFgGY?start=30&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>

### References
- Switchroot下载地址
  - https://download.switchroot.org/
- LineageOS下载地址
  - https://download.lineageos.org/devices/nx/builds
- Switchroot LineageOS Downloader
  - https://github.com/sthetix/Switchroot-LineageOS-Downloader
- 各个组织官网
  - https://wiki.switchroot.org/wiki/
  - https://wiki.lineageos.org/
- 两个组织提供的成功可支持NS的安卓版本
  - https://wiki.lineageos.org/devices/nx/variant4/
  - https://wiki.switchroot.org/wiki/android/android-14-15