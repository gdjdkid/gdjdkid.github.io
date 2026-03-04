---
title: Deploying an OpenWrt Bypass Router on Raspberry Pi Using Docker
date: 2025-12-11 11:15:39
author: Roy Li
tags: [RPI]
categories: [RPI]
index_img: 
sticky:
---

### Introduction 
A bypass router architecture allows the main router to continue handling PPPoE dialing and DHCP services, while a Raspberry Pi acts as a secondary gateway within the same LAN.  
By assigning a static IP and configuring routing rules, devices on the network can optionally route their traffic through the Raspberry Pi.  

This approach has several advantages:
- It does not modify the existing network topology.
- The bypass router can be removed at any time without affecting the main network.
- Devices can selectively use the proxy gateway.

### Objective
Run OpenWrt as a bypass gateway (transparent gateway) inside Docker on a Raspberry Pi.
- Network architecture diagram:
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_11.png)  

### Enable Network Interface Promiscuous Mode
- Promiscuous mode allows both the host system and the virtualized OpenWrt instance to receive network packets.
- Choose one of the following depending on your connection type.
  - Wired Connection
    ```shell
    sudo ip link set dev eth0 promisc on
    ```
  - Wi-Fi Connection
    ```shell
    sudo ip link set dev wlan0 promisc on
    ```
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_0.png)  

### Download the OpenWrt Docker Image
- Run the following command to download the image
  ```shell
  docker pull buddyfly/openwrt-aarch64
  ```
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_1.png)  
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_2.png)  
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_3.png)  
- After downloading, verify the image exists
  ```shell
  docker images
  ```
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_4.png)  

### Check Whether a Docker Virtual Network Exists
- Before creating the network, check the existing Docker networks.
  ```shell
  docker network ls
  ```
- If a network with the same name already exists, remove it, e.g.:`macnet`
  ```shell
  docker network rm <network_name>
  ```
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_5.png)  

### Create a Docker Virtual Network
- We will create a macvlan network so that the OpenWrt container can obtain an IP address within the same LAN as the main router.
- Replace the subnet and gateway values with your own network settings.
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_6.png)  
- Example
  ```shell
  docker network create -d macvlan \
  --subnet=10.10.10.0/24 \
  --gateway=10.10.10.1 \
  -o parent=eth0 \
  macnet
  ```
- Example based on a typical home network:
  - Wired Connection
    ```shell
    docker network create -d macvlan \
    --subnet=192.168.0.0/24 \
    --gateway=192.168.0.1 \
    -o parent=eth0 \
    macnet
    ```
  - WiFi Connection
    ```shell
    docker network create -d macvlan \
    --subnet=192.168.0.0/24 \
    --gateway=192.168.0.1 \
    -o parent=wlan0 \
    macnet
    ```
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_7.png)  

### How to Check Your Router Gateway (Windows)
>If you are unsure about your router's gateway address and subnet, use one of the following methods.
- Method 1: Router Admin Panel
  - Access your router's management interface and check the LAN settings.
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_8.png)  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_9.png)  
- Method 2: Command Line
  - Press Win + R
  - Enter: `cmd`
  - Run: `ipconfig`
  - Look for the Default Gateway field.  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_12.png)  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_10.png)  

### Verify the Docker Network
- Check whether the macvlan network was successfully created
  - `docker network ls`
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_13.png)  

### Start the OpenWrt Container
- Run the following command
  ```shell
  docker run --restart always -d \
  --network macnet \
  --privileged \
  buddyfly/openwrt-aarch64:latest
  ```
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_14.png)  
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_15.png)  
- This command
  - runs the container in background
  - attaches it to the macvlan network
  - enables privileged mode

### Verify the Running Container
- Check the running OpenWrt container
  ```shell
  docker ps -a | grep openwrt
  ```
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_16.png)  
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_17.png)  

### Modify the OpenWrt Container IP Address
#### Enter the container shell
  ```shell
  docker exec -it <container_id> ash
  ```
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_20.png)  
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_18.png)  
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_19.png)  
#### Edit the network configuration
  ```shell
  sudo nano /etc/config/network
  ```
#### Modify the following fields
  ```shell
  option ipaddr '192.168.0.252'
  option gateway '192.168.0.1'
  option dns '192.168.0.1'
  ```
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_21.png)  
- Explanation
  - ipaddr → the IP address of the bypass router
  - gateway → the main router IP
  - dns → usually the same as the gateway

#### Restart the network service
  ```shell
  /etc/init.d/network restart
  ```
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_22.png)  

### Test Network Connectivity
- Test connectivity with the main router
  ```shell
  ping 192.168.0.1
  ```
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_23.png)  
> If packets are received, the configuration is correct.

### Permanently Enable Promiscuous Mode
- Exit the container and configure the host system.
- Edit the file 
  - `sudo nano /etc/network/interfaces`
- Add one of the following lines.
  - Wired
    ```shell
    up ip link set eth0 promisc on
    ```
  - WiFi
    ```shell
    up ip link set wlan0 promisc on
    ```
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_24.png)  
- Verify the configuration
  - `cat /etc/network/interfaces`  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_25.png)  
- If permission issues occur
  ```shell
  ls -l /etc/network/interfaces
  sudo chmod 644 /etc/network/interfaces
  ```
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_26.png)  

### Access the OpenWrt Gateway
- Open the browser and enter
  ```shell
  http://192.168.0.252
  ```
- Default credentials
  ```shell
  username: root
  password: password
  ```
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_27.png)  
- The first thing you should do is change the default password.
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_28.png)  

### Change the System Theme
>You can customize the OpenWrt interface theme through the system settings panel.

![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_29.png)  

### Configure the Upstream Router
>Navigate to the network configuration page and set the upstream gateway to your main router.

![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_30.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_31.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_32.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_33.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_34.png)  

### Network Acceleration Settings
>Enable hardware or software acceleration options depending on your OpenWrt build.

![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_35.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_36.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_37.png)  

### Configure the Proxy / Global Network Access
>Install and configure the proxy plugin of your choice (for example OpenClash, Passwall, etc.).

![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_38.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_39.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_40.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_41.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_42.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_43.png)  

### Configure Devices to Use the Bypass Gateway
- For devices that should use the proxy
  - Set the network configuration to manual.
  - Assign an IP address within the LAN range.
  - Example
    ```shell
    IP Address: 192.168.0.xxx
    Subnet Mask: 255.255.255.0
    Gateway: 192.168.0.252
    DNS: 192.168.0.252
    ```
>Devices using this gateway will route their traffic through the Raspberry Pi bypass router.

![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E6%A0%91%E8%8E%93%E6%B4%BE%E9%83%A8%E7%BD%B2%E6%97%81%E8%B7%AF%E7%94%B1%E5%AE%9E%E7%8E%B0%E5%85%A8%E5%B1%80%E7%A7%91%E5%AD%A6%E4%B8%8A%E7%BD%91/RaspberryPi_BypassRoute_44.png)  

### Conclusion
By running OpenWrt in Docker with a macvlan network on a Raspberry Pi, we can easily create a **flexible bypass router** that integrates seamlessly with an existing home network.  
This architecture allows selective routing of traffic through a proxy gateway while keeping the main router configuration untouched.  

### Connectivity Test Commands
> Run the following commands on the Raspberry Pi host to verify that the gateway and external network access are working properly.

- `ip route show`
- `ping 8.8.8.8`
- `curl -Iv https://www.youtube.com --connect-timeout 10`
- `curl -Iv https://www.google.com --connect-timeout 10`