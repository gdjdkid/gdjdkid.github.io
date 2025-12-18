---
title: Docker镜像备份到U盘实操
date: 2025-12-18 10:33:11
author: Roy Li
tags: [树莓派, Linux]
categories: [树莓派]
index_img: 
sticky:
---

### 简介
在树莓派等ARM设备上运行Docker时，镜像体积往往不小，而系统又多部署在TF卡或小容量SSD 上。一旦需要重装系统、迁移环境，或者做一次“真正可靠”的离线备份，如何把Docker镜像安全、完整地导出到U盘，就成了一个绕不开的问题。

本文基于我在树莓派4B + Linux环境下的真实操作记录，完整展示了Docker镜像从系统导出到`exFAT`格式U盘、再导回新系统的全过程，并重点说明了挂载方式、权限设置等容易踩坑的细节，确保备份文件可写、可读、可恢复。

### 目的
本文的目的在于整理并验证一套在 Linux（树莓派）环境下可重复、可复用的 Docker 镜像备份流程，具体包括：

- 将已有Docker镜像完整导出为本地`.tar`文件，实现脱离网络的离线备份
- 使用`exFAT`格式U盘作为备份介质，解决默认自动挂载带来的权限与写入问题
- 在新系统或新设备上通过`docker load`原样恢复镜像，确保镜像标签与`IMAGE ID`不发生变化

通过该流程，可以在系统重装、设备迁移或故障恢复时，快速还原Docker运行环境，避免重复拉取镜像或依赖外部网络。

### 导出Docker镜像到U盘
1. 插入U盘，查看设备名（通常是sda1或sdb1）
   1. 执行命令 `lsblk`
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Docker%E9%95%9C%E5%83%8F%E5%A4%87%E4%BB%BD%E5%88%B0U%E7%9B%98%E5%AE%9E%E6%93%8D/Docker_IMG_Backup_0.png)
2. 先卸载devmon的挂载
   1. 执行 `sudo umount /media/devmon/DockerIMGs`
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Docker%E9%95%9C%E5%83%8F%E5%A4%87%E4%BB%BD%E5%88%B0U%E7%9B%98%E5%AE%9E%E6%93%8D/Docker_IMG_Backup_1.png)
3. 准备一个“正式”的挂载点
   1. 执行 `sudo mkdir -p /mnt/docker-usb`
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Docker%E9%95%9C%E5%83%8F%E5%A4%87%E4%BB%BD%E5%88%B0U%E7%9B%98%E5%AE%9E%E6%93%8D/Docker_IMG_Backup_2.png)
4. 用exFAT正确姿势挂载（关键在这里）
   1. 执行
      ```shell
      sudo mount -t exfat \
      -o uid=1000,gid=1000,umask=022 \
      /dev/sdb1 /mnt/docker-usb
      ```
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Docker%E9%95%9C%E5%83%8F%E5%A4%87%E4%BB%BD%E5%88%B0U%E7%9B%98%E5%AE%9E%E6%93%8D/Docker_IMG_Backup_3.png)
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Docker%E9%95%9C%E5%83%8F%E5%A4%87%E4%BB%BD%E5%88%B0U%E7%9B%98%E5%AE%9E%E6%93%8D/Docker_IMG_Backup_4.png)
5. 创建备份文件夹
   1. 进入操作目录 `cd /mnt/docker-usb`
   2. 创建备份文件夹 `sudo mkdir docker_images_backup`
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Docker%E9%95%9C%E5%83%8F%E5%A4%87%E4%BB%BD%E5%88%B0U%E7%9B%98%E5%AE%9E%E6%93%8D/Docker_IMG_Backup_5.png)
6. 导出镜像到U盘
   1. 执行备份命令
   2. 请替换为你的实际目录路径与镜像名
      ```shell
      sudo docker save -o /mnt/docker-usb/docker_images_backup/transmission_latest.tar lscr.io/linuxserver/transmission:latest
      sudo docker save -o /mnt/docker-usb/docker_images_backup/cloudreve_4.10.1-arm.tar cloudreve:4.10.1-arm
      ```
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Docker%E9%95%9C%E5%83%8F%E5%A4%87%E4%BB%BD%E5%88%B0U%E7%9B%98%E5%AE%9E%E6%93%8D/Docker_IMG_Backup_6.png)
7. 出完成后检查文件大小
   1. 执行 `ls -lh /mnt/docker-usb/docker_images_backup`
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Docker%E9%95%9C%E5%83%8F%E5%A4%87%E4%BB%BD%E5%88%B0U%E7%9B%98%E5%AE%9E%E6%93%8D/Docker_IMG_Backup_7.png)
8. 安全卸载U盘
   1. 执行 `sudo umount /mnt/docker-usb`

### 导回Docker镜像到Linux系统
1. 插入U盘
   - 系统会自动挂载（通常到/mnt/docker-usb或类似路径，你之前就是这个）
2. 确认U盘挂载路径并查看备份文件
   1. 执行 `lsblk`
   2. 或 `ls /mnt/docker-usb/docker_images_backup`
3. 导入镜像到Docker
   1. 执行 
      ```shell
      sudo docker load -i /media/devmon/ImgBackU/docker_images_backup/openwrt-aarch64.tar
      ```
   2. 导入过程中会看到类似输出 `Loaded image: buddyfly/openwrt-aarch64:latest`
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Docker%E9%95%9C%E5%83%8F%E5%A4%87%E4%BB%BD%E5%88%B0U%E7%9B%98%E5%AE%9E%E6%93%8D/Docker_IMG_Backup_8.png)
4. 验证镜像是否成功导入
   1. 执行查看 `sudo docker images`
   2. 你应该能看到 `buddyfly/openwrt-aarch64:latest` 和其他镜像又回来了，和以前一模一样（包括IMAGE ID）
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Docker%E9%95%9C%E5%83%8F%E5%A4%87%E4%BB%BD%E5%88%B0U%E7%9B%98%E5%AE%9E%E6%93%8D/Docker_IMG_Backup_9.png)
5. 完成后可以安全卸载U盘（可选）
   1. 执行 `sudo umount /mnt/usb`
   2. 然后拔掉U盘

### 参考资料
- [Docker官方文档 - docker save](https://docs.docker.com/reference/cli/docker/image/save/)
- [Docker官方文档 - docker load](https://docs.docker.com/reference/cli/docker/image/load/)
- [Linux mount exFAT 文件系统](https://wiki.archlinux.org/title/ExFAT)（解释uid/gid/umask参数用法）