---
title: Installing Rpi OS Legacy Lite on Raspberry Pi 4B
author: Roy Li  
tags: [RPI]  
categories: [RPI]  
index_img: https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_tool_v1.9.0.jpg
date: 2025-06-07 22:10:20  
sticky:
---

## Introduction  
Hi guys, this is the first article in my DIY Raspberry Pi NAS series. In this post, we will install Raspberry Pi OS on a Raspberry Pi single-board computer. After that, we will use it as the foundation to install various third-party applications and build the basic services of a NAS.  

### Required Equipment  
- [x] Raspberry Pi 4B  
- [x] 64GB microSD card  
- [x] microSD card reader  
- [x] Raspberry Pi power supply  
- [x] Ethernet cable  
- [x] HDMI cable  
- [x] Mini HDMI adapter  
- [x] Monitor  

### Procedure  
1. First, format the microSD card and prepare it for installing Raspberry Pi OS.  
2. Insert the microSD card into the card reader.  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/TF_reader.png)  
3. Download Raspberry Pi Imager, the official image flashing tool for Raspberry Pi.  
4. Download the latest version (for example, imager_1.8.5) from the official Raspberry Pi website to ensure security, rather than downloading it from third-party platforms.  
    4.1 Click here –> [Raspberry Pi official website download link](https://www.raspberrypi.com/software/)  
    4.2 Go to the homepage and click "Software" in the top navigation bar.  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_offical_0.jpg)  
    4.3 Scroll down and find "Download for XXX".  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_offical_1.jpg)  
    4.4 Download the file to any location on your local disk.  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/imager_1.8.5.jpg)  
    4.5 After the download is complete, double-click the installer to start the installation. Click "Next" until the installation is finished, or choose any drive you prefer for installation.  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/imager_0.jpg)  
5. Open Raspberry Pi Imager and start flashing Raspberry Pi OS.  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_tool_v1.9.0.jpg)  
    5.1 Click "Choose Device" and select your Raspberry Pi model according to your needs.  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_tool_select_device.jpg)  
    5.2 Click "Choose OS".  
        ***Notes:***  
        If you want to reduce power consumption, select **Raspberry Pi OS (Legacy, 64-bit) Lite**, which does not include a desktop environment and only provides a command-line interface.  
        If power consumption is not a concern, select **Raspberry Pi OS (Legacy, 64-bit) Full**, which includes a graphical desktop environment.  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_tool_select_OS_0.jpg)
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_tool_select_OS_1.jpg)
    5.3 Click "Choose Storage" and select your storage device.  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_tool_select_TF_card.jpg)  
    5.4 Click "Next". A pop-up window will appear. Click "Edit Settings".  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_tool_config_0.jpg)  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_tool_config_1.jpg)  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_tool_config_2.jpg)  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_tool_config_3.jpg)  
    5.5 Finally, click "Save" and then "Next". A warning dialog will appear. Click "Confirm". This will erase all existing data on the card, so make sure to back up your data if necessary.  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_tool_warning_msg.jpg)  
        ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/rpi_tool_writing_in.jpg)  
6. After the flashing process is complete, close the Raspberry Pi Imager.  
7. A system prompt may appear on your desktop asking to format the drive. Do not worry—just click "Cancel".  
8. Remove the microSD card and insert it into the Raspberry Pi.  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/RPI4B.png)  
9. Connect the Mini HDMI adapter, and use an HDMI cable to connect the Raspberry Pi to the monitor.  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/Mini_HDMI.png)  
10. Power on the Raspberry Pi and wait a few minutes for the system to initialize.  
11. When the command-line interface appears, enter the login username and password.  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E5%AE%89%E8%A3%85RpiOSLegacyLite/Login_page.jpg)  
12. Congratulations! Raspberry Pi OS has now been successfully installed.  


## Conclusion
After completing the steps above, we can move on to DIY this Ubuntu system on the Raspberry Pi.  
Please stay tuned to this technical blog for the upcoming articles. Thank you!