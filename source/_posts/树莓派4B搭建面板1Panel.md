---
title: 树莓派4B搭建面板1Panel
date: 2025-12-10 01:34:34
author: Roy Li
tags: [树莓派]
categories: [树莓派]
index_img: https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_4.png
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

![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_0.png)
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_1.png)
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_2.png)

2. 安装完成提示
   - 会出现访问地址，如`http://<树莓派IP>:36230`

### 访问1Panel
1. 获取树莓派IP
   - 树莓派终端运行`hostname -I | awk '{print $1}'`
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_6.png)
2. 浏览器访问
   - 在电脑的浏览器输入`http://<树莓派IP>:端口号/随机入口`（例如http://192.168.0.109:36230/roy）
   - 随机入口指的是面板安全入口，在安装过程中有设置此配置。
     ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_7.png)
     ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_8.png)
3. 首次登录
   - 使用安装时设置的用户名/密码。
   ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_4.png)
   ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_5.png)
4. 获取信息
   - 如果找不到自己的用户名、密码、入口，可以在终端运行下面的命令进行查看。
   ```shell
   sudo 1pctl user-info
   ```
   ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_9.png)

### 版本信息
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_3.png)

### 常见问题与优化
- ARM兼容：树莓派4B完美支持，但部分应用需ARM版镜像（1Panel会自动选择）。
- 与CasaOS共存：安装在不同端口，不会干扰。CasaOS默认80端口，1Panel用自定义端口。
- 卸载：运行`sudo 1pctl uninstall`
- 更新：面板内自动检查，或终端`sudo 1pctl update`
- 性能：树莓派4B运行流畅，但安装多应用时监控温度（加散热片）。
- 防火墙：如果启用ufw，开放端口：`sudo ufw allow 端口号`
- 端口冲突：如果默认端口被占，安装时指定其他端口，或修改/opt/1panel/config/config.yaml后，重启服务：`sudo systemctl restart 1panel`
- 修改密码：修改密码可执行命令 `sudo 1pctl update password`

### 参考材料
- 1Panel仓库地址：https://github.com/1Panel-dev/1Panel
- 官方网站: https://1panel.cn
- 项目文档: https://1panel.cn/docs