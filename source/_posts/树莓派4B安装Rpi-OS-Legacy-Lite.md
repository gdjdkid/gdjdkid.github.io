---
title: 树莓派4B安装Rpi OS Legacy Lite  
author: Roy Li  
tags: [树莓派]  
categories: [树莓派]  
index_img: https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_tool_v1.9.0.jpg  
date: 2025-06-07 22:10:20  
sticky:
---

## 前言
各位看官，此篇是DIY个人NAS的第一篇，首先我们来给树莓派单板机安装RPI OS，然后在此基础上，我们可以安装各种第三方应用来实现NAS的基础服务。  

### 所需设备  
- [x] 树莓派4B型号  
- [x] TF内存卡64G  
- [x] TF读卡器  
- [x] 树莓派电源线  
- [x] 网线  
- [x] HDMI线  
- [x] Mini HDMI线转换头  
- [x] 显示器  

### 步骤
1. 首先我们需要对TF内存卡格式化加安装树莓派OS系统。
2. 把TF内存卡插入到TF读卡器内。  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/TF_reader.png)  
3. 先下载Raspberry Pi Imager（树莓派镜像烧录工具）  
4. 从树莓派官网下载烧录工具imager_1.8.5(下载最新的版本)，不然其他平台很难保证其安全性。  
    4.1 点击 –> ![树莓派官网下载链接](https://www.raspberrypi.com/software/)  
    4.2 进入主页，点击最上面导航栏的’Software’  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_offical_0.jpg)  
    4.3 往下拉，找到’Download for XXX’  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_offical_1.jpg)  
    4.4 下载到本地盘任意位置即可  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/imager_1.8.5.jpg)  
    4.5 下载完后，双击进行安装，一直点击’下一步’即可，或者安装到任意你喜欢的盘符位置  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/imager_0.jpg)  
5. 点击树莓派启动盘制作工具进行烧录树莓派OS系统。  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_tool_v1.9.0.jpg)  
    5.1 点击【树莓派设备·选择设备】参考下面截图，来配置个人需求。  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_tool_select_device.jpg)  
    5.2 点击【操作系统·选择操作系统】  
        ***这里补充一下:***  
        如果要节省功耗，请选择Raspberry Pi OS(Legacy,64-bit)Lite版本，因为此系统无桌面，只有命令行。
        如果不担心功耗，请选择Raspberry Pi OS(Legacy,64-bit)Full版本，此版本是有桌面界面。
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_tool_select_OS_0.jpg)  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_tool_select_OS_1.jpg)  
    5.3 点击【储存设备·选择存储设备】  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_tool_select_TF_card.jpg)  
    5.4 然后点击’下一步’，会出现弹框，点击’编辑设置’  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_tool_config_0.jpg)  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_tool_config_1.jpg)  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_tool_config_2.jpg)  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_tool_config_3.jpg)  
    5.5 最后点击’保存’与’下一步’，会出现警告弹框，再点击’确认’即可，会删除卡内现存数据，如需要，提前做好备份。  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_tool_warning_msg.jpg)  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/rpi_tool_writing_in.jpg)  
6. 烧录完毕，关闭烧录框。  
7. 桌面会出现提示XX格式化的弹框，无需担心，点击’取消’即可。  
8. 把TF卡拔出后插入到树莓派里。  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/RPI4B.png)  
9. 插上MiniHDMI转换器，用HDMI线链接树莓派与显示器。  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Mini_HDMI.png)  
10. 开机，等待几分钟，让树莓派进行系统初始化。  
11. 进入命令行界面后，输入登录用户名和登录密码。  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Login_page.jpg)  
12. 恭喜，此时已经成功安装了树莓派OS系统。  


## 结束语  
完成上面每一步后，接下来我们可以DIY这个乌班图系统，请各位看官们持续关注这个技术博客，感谢~！

“技術分享 技術無界 開源至上”
