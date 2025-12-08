---
title: 创建.bashrc文件  
author: Roy Li  
tags: [树莓派, NAS]  
categories: [树莓派, NAS]  
date: 2025-06-08 11:47:00  
mermaid: true  
---
## 创建.bashrc

```shell
touch /home/roy/.bashrc
```
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Create_bashrc_0.png)
`P.S.: “roy”为用户名，请替换为您的用户名。`

## 进入编辑模式

```shell
cd /home/roy/
sudo nano /home/roy/.bashrc
```
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Create_bashrc_1.png)

## ~./.bashrc

```shell
# 添加用户本地 bin 目录到 PATH
# Global Environment Variable
export PATH="$HOME/.local/bin:$PATH"

# Hexo
alias hexocgd="hexo clean && hexo generate && hexo deploy"
alias hexo4000="hexo clean && hexo generate && hexo server"

# Quickly Command
alias rmd="rm -rf"
#alias e="vim ~/.bashrc"
alias e="nano ~/.bashrc"
alias s="source ~/.bashrc"
alias c="clear" 
alias la="ls -la" 
alias ll="ls -lah --color=auto"
alias grep="grep --color=auto"
alias catbashrc="cat ~/.bashrc"
alias ipcheck="ip route get 8.8.8.8"
alias testgoogle="curl -Iv https://www.google.com --connect-timeout 10"
alias testyoutube="curl -Iv https://www.youtube.com --connect-timeout 10"
alias restartdhcpcd="sudo systemctl restart dhcpcd"
alias dockerrestart="sudo systemctl daemon-reload && sudo systemctl restart docker && sudo systemctl status docker"
alias wificheck="sudo nmcli dev wifi list"
alias editdhcpcdconfig="sudo nano /etc/dhcpcd.conf"
alias rpishutdown="sudo shutdown -h now"
alias rpireboot="sudo reboot"

# Docker command
alias dps='docker ps -a --format "table {{.Names}}\t{{.ID}}\t{{.Status}}\t{{.Image}}"'

# Quickly come to file address
alias ..="cd .."
alias ...="cd ../.."
alias ~="cd /home/roy"

# Functions 
# Create a directory and immediately enter it
mkcd() {
    mkdir -p "$1" && cd "$1"
}
```

## 使其生效
```shell
source /home/roy/.bashrc
```
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Create_bashrc_2.png)

## 查看文件是否创建
```shell
ls -la /home/roy/.bashrc
```
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Create_bashrc_3.png)

## 拥有文件所有权限
```shell
sudo chmod -R 777 /home/roy/.bashrc
```
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/Create_bashrc_4.png)
