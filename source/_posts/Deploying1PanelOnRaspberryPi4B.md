---
title: Deploying 1Panel on Raspberry Pi 4B
date: 2025-12-10 01:34:34
author: Roy Li
tags: [RPI]
categories: [RPI]
index_img: https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_4.png
sticky:
---

### Overview
Running a management panel on a Raspberry Pi feels a bit like adding a cockpit to a tiny spaceship.  
Although **1Panel** was originally designed for x86 servers, it now provides an **ARM64 build**, which works perfectly with the architecture of the **Raspberry Pi 4B**.
That means you can run it directly on your Pi and turn the device into a small, self-hosted server with a clean web management interface.

### Requirements
#### Hardware Requirements
- Raspberry Pi 4B (2GB RAM or more recommended)
- MicroSD card (at least 16GB, Class 10 recommended)
- Power adapter
- Ethernet or WiFi connection

---

#### Install Raspberry Pi OS
Please refer to the following guide:
- [Installing Rpi OS Legacy Lite on Raspberry Pi 4B](https://tech-roy.uk/2025/06/07/InstallingRpiOSLegacyLiteOnRaspberryPi4B/)

---

#### Update the System
Connect to your Raspberry Pi via SSH and run:
```shell
sudo apt update && sudo apt upgrade -y
```

---

#### Install Docker
1Panel depends on Docker, so Docker must be installed first.
```shell
sudo apt install curl -y
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER  # Add the current user to the Docker group. A reboot is required for the change to take effect.
```
Reboot the system:`sudo reboot`

### Installing 1Panel
Once the system is ready, you can install 1Panel using the official script.
The script automatically detects the system architecture and downloads the correct version.
If your system is 64-bit Raspberry Pi OS, it will install the ARM64 build.

#### Run the Installation Script
```text
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sudo bash quick_start.sh
```
During installation:
- The script will detect the ARM architecture automatically.
- The installation process usually takes 5–10 minutes.
- You will be prompted to configure:
  - Installation directory (default: /opt)
  - Panel port (default: 36230)
  - Username and password (strong password recommended)
- If Docker is not installed, the script will prompt you to install or fix it automatically.

![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_0.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_1.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_2.png)  

#### Installation Complete
After installation finishes, the terminal will display the access URL, for example:
- `http://<树莓派IP>:36230`

### Accessing 1Panel
#### Get the Raspberry Pi IP Address
- Run the following command:`hostname -I | awk '{print $1}'`  
   ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_6.png)  

---

#### Open the Web Panel
- In your browser, enter:`http://<RaspberryPi-IP>:PORT/RANDOM_PATH`（Example http://192.168.0.109:36230/roy）
- The random path is a security entry point configured during installation.  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_7.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_8.png)  

---

#### First Login
- Log in using the username and password you configured during installation.  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_4.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_5.png)  

---

#### Retrieve Login Information
- If you forget your username, password, or access path, run:
   ```shell
   sudo 1pctl user-info
   ```
   ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_9.png)  

### Version Information
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE4B%E6%90%AD%E5%BB%BA%E9%9D%A2%E6%9D%BF1Panel/Install_1Panel_3.png)  

### Troubleshooting
- ARM Compatibility
  - Raspberry Pi 4B works well with 1Panel, but some applications require ARM container images.
- Running with CasaOS
  - No conflict as long as different ports are used.
  - CasaOS usually uses port 80, while 1Panel uses a custom port.
- Uninstall
  - `sudo 1pctl uninstall`
- Update
  - `sudo 1pctl update`
  - or update directly inside the panel.
- Performance
  - Raspberry Pi 4B runs smoothly, but if you deploy multiple applications, monitor the temperature and consider adding a heatsink.
- Firewall
  - If ufw is enabled, allow the panel port:`sudo ufw allow <PORT>`
- Port Conflict
  - If the default port is already in use, modify the configuration: `/opt/1panel/config/config.yaml`
  - Then restart the service:`sudo systemctl restart 1panel`
- Change Password
  - `sudo 1pctl update password`

### References
- 1Panel GitHub Repository
  - https://github.com/1Panel-dev/1Panel
- Official Website
  - https://1panel.cn
- Documentation
  - https://1panel.cn/docs