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
3. 更新系统：通过SSH连接树莓派，运行
```shell
sudo apt update && sudo apt upgrade -y
```
4. 安装Docker（1Panel必须依赖Docker）
```shell
sudo apt install curl -y
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER  # 添加当前用户到docker组，重启生效
```
重启树莓派：`sudo reboot`

### 安装脚本
树莓派上装好Ubuntu/Debian，然后直接跑1Panel官方脚本。脚本会自动检测你当前系统的架构并下载对应版本。如果你现在系统是64位（树莓派OS默认有64位版）
1. 运行一键安装脚本
```text
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sudo bash quick_start.sh
```
- 脚本会自动检测ARM架构（树莓派兼容），安装过程约5-10分钟。
- 提示设置安装目录（默认为/opt）、端口（默认36230）、用户名/密码（推荐自定义强密码）。
- 如果提示Docker未安装，它会自动引导修复。





2. 安装完成提示
   - 会出现访问地址，如http://<树莓派IP>:36230

### 访问1Panel

### 

### 参考材料
- 1Panel仓库地址：https://github.com/1Panel-dev/1Panel