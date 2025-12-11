---
title: 树莓派4B安装CasaOS
author: Roy Li
tags: [树莓派]
categories: [树莓派]
date: 2025-12-09 22:25:35
index_img: https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85CasaOS/Install_CasaOS_2.png
sticky:
---

### 简单介绍
CasaOS是一个开源的家庭云系统，基于Docker生态设计，专为家庭场景打造。它提供简洁的Web界面，支持一键安装NAS、媒体服务器、智能家居等应用，非常适合树莓派4B作为家庭服务器使用。CasaOS完全兼容Raspberry Pi OS（推荐使用64位版本），安装过程简单，只需几分钟。

### 准备工作
1. 硬件要求
   - 树莓派4B（2GB或以上内存推荐）
   - MicroSD卡（至少16GB，建议Class 10或更高）
   - 电源适配器、网线或WiFi连接
2. 安装Raspberry Pi OS
   - 请参考 https://tech-roy.uk/2025/06/07/树莓派4B安装Rpi-OS-Legacy-Lite/

### 安装系统依赖（更新系统）
- 使用SSH连接树莓派
  - （默认用户：pi，密码：raspberry）
- 运行以下命令更新软件包
   ```shell
   sudo apt update && sudo apt upgrade -y
   ```
- 安装curl（如果未安装）
   ```shell
   sudo apt install curl -y
   ```

### 运行CasaOS脚本
CasaOS支持一键安装脚本。打开终端，运行以下命令：
```text
curl -fsSL https://get.casaos.io | sudo bash
```
- 脚本会自动下载并安装CasaOS，包括Docker依赖。
- 安装过程会提示设置CasaOS管理员用户名和密码（默认用户名：casaos，密码：casaos，可自定义）。
- 安装完成后，CasaOS会自动启动。

备选命令（如果curl不可用）
```text
wget -qO- https://get.casaos.io | sudo bash
```
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85CasaOS/Install_CasaOS_0.png)
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85CasaOS/Install_CasaOS_1.png)

### 访问CasaOS Web界面
1. 查找IP地址
   - 在树莓派终端运行：`hostname -I`（获取本地IP，如192.168.x.x）
2. 浏览器访问
   - 在同一网络的电脑/手机浏览器输入：`http://<树莓派IP>:80`（例如：http://192.168.0.109）
   - 登录CasaOS（使用刚才设置的用户名/密码）
   - 首次登录会引导设置，之后即可浏览应用商店，一键安装如Nextcloud、Plex、Home Assistant等应用。

![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85CasaOS/Install_CasaOS_2.png)
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85CasaOS/Install_CasaOS_3.png)

### 卸载CasaOS（可选）
打开终端，运行以下命令：
```text
curl -fsSL https://get.casaos.io/uninstall | sudo bash
```

### 常见问题与提示
- 端口冲突：默认使用80端口，如果已占用（如Apache），可编辑CasaOS配置文件修改端口。
- 性能优化：树莓派4B运行CasaOS流畅，但安装应用时监控CPU/内存使用。建议使用SSD外接存储以提升速度。
- 更新CasaOS：在Web界面“设置”中检查更新，或终端运行`casaos-ctl update`。
- 防火墙：如果启用ufw，确保开放80端口：`sudo ufw allow 80`。