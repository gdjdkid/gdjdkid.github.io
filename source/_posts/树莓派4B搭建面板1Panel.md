---
title: 树莓派4B搭建面板1Panel
date: 2025-12-10 01:34:34
author: Roy Li
tags: [树莓派]
categories: [树莓派]
index_img:
sticky:
---

### 简单介绍
在树莓派上折腾一个面板，像是在一台小小的飞船里加装一套“宇宙驾驶舱”。1Panel 本来面向 x86，但它已经提供了 arm64 的版本，正好吻合树莓派 4B 的架构，所以你完全可以在你的 Pi 上跑起来，让它像台袖珍服务器一样管理得井井有条。

### 准备工作
1. 硬件要求
    - 树莓派4B（2GB或以上内存推荐）
    - MicroSD卡（至少16GB，建议Class 10或更高）
    - 电源适配器、网线或WiFi连接
2. 安装Raspberry Pi OS
    - 请参考 https://tech-roy.uk/2025/06/07/树莓派4B安装Rpi-OS-Legacy-Lite/

### 安装脚本
树莓派上装好 Ubuntu/Debian，然后直接跑 1Panel 官方脚本。脚本会自动检测你当前系统的架构并下载对应版本。如果你现在系统是 64 位（树莓派 OS 默认有 64 位版），那么直接执行下面这段就能装好:
```text
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sudo bash quick_start.sh
```

### 

### 

### 参考材料
- 开源地址：https://github.com/1Panel-dev/1Panel