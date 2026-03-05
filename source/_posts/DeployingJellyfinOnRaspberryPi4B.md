---
title: Deploying Jellyfin On Raspberry Pi 4B
date: 2026-03-05 18:22:12
author: Roy Li
tags: [RPI]
categories: [RPI]
index_img:
sticky:
---

### Overview 
Jellyfin is a free, open-source media server that lets you organize, manage, and stream your personal collection of movies, TV shows, music, and photos. It turns your local files into a clean, Netflix-like library accessible from phones, TVs, browsers, or any compatible client — all without subscriptions, licenses, or paywalls. You own your data completely.  
Key strengths on a Pi 4B: lightweight enough to run 24/7, supports basic transcoding (though CPU-limited), multi-user accounts, plugins for metadata scraping (Douban, TMDb, etc.), and a nice web UI + apps for almost every device.  

### Features at a Glance
- Personal media library with automatic organization
- On-the-fly transcoding (CPU fallback on Pi)
- Clients for Android, iOS, Roku, Fire TV, web, etc.
- Extensible via plugins (metadata, skins, intro skipper, etc.)
- Poster walls, collections, watch lists, live TV/DVR support

### Installation via Docker (Recommended for Pi)
Docker is the cleanest way on Raspberry Pi OS — easy updates, isolated, and portable.  

#### Update the system (always start here)
```shell
sudo apt update && sudo apt upgrade -y
```

#### Create directories for persistent data
Use a dedicated folder under your home dir (or wherever you prefer).
```shell
mkdir -p ~/jellyfin/config ~/jellyfin/cache
```
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingJellyfinOnRaspberryPi4B/Jellyfin_0.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingJellyfinOnRaspberryPi4B/Jellyfin_1.png)  

#### Create and edit docker-compose.yml
```shell
cd ~/jellyfin
sudo nano docker-compose.yml
```
Here's a solid, modern compose file (adjusted for Pi 4B realities):
```yaml
version: "3.8"

services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    restart: unless-stopped
    network_mode: bridge
    ports:
      - 8096:8096       # HTTP
      - 8920:8920       # HTTPS (optional)
    environment:
      - PUID=1000       # your user ID (id -u)
      - PGID=1000       # your group ID (id -g)
      - TZ=Asia/Taipei  # or Asia/Shanghai if preferred
    volumes:
      - ./config:/config
      - ./cache:/cache
      - /mnt/NAS8T/Movies:/media/Movies:ro       # read-only for safety
      - /mnt/NAS8T/TVShows:/media/TVShows:ro
      - /home/roy/shared/JellyfinShows:/media/NetWorkVideo:ro
    # devices:                                # commented out — see note below
    #   - /dev/dri:/dev/dri
```
- Important note on hardware acceleration
  ```markdown
  On Raspberry Pi 4B, hardware transcoding via /dev/dri (VideoCore VI) is deprecated and unreliable in recent Jellyfin versions (10.9+). Official docs dropped support because it was immature, often fell back to CPU anyway, and Pi 5 has no hardware encoder at all.
  Most users on Pi 4B run without it — direct play works fine for compatible clients (e.g., VLC, Infuse). If you force /dev/dri, you might get partial decode but no real gains and possible crashes. Leave it commented unless you're on an older version and have tested it.
  ```

#### Start the container
```shell
cd ~/jellyfin
docker compose up -d
```

### Access the web UI
- Open your browser
  ```shell
  http://<your-pi-ip>:8096 (e.g., http://192.168.0.109:8096)
  ```
> First run → wizard sets up library paths, users, metadata languages, etc.

### Useful Docker Commands (CLI cheatsheet)
```shell
# Follow logs in real time
docker logs -f jellyfin

# Stop / start / restart
docker compose down
docker compose up -d
docker compose restart

# Or single container
docker stop jellyfin
docker start jellyfin
```

### Making Jellyfin Better (Plugins & Tweaks)
Install plugins via Dashboard → Plugins → Catalog

#### Popular ones
- Douban metadata (for Chinese titles, actors, ratings)
- TMDb Box Sets / Collections 
- Intro Skipper (auto-skip TV intros)
- MetaShark or similar for better scraping

#### Recommended reading (Chinese-focused)
Please following articles as below to enhance your Jellyfin
- [Jellyfin影视库插件推荐，各国小姐姐家装、豆瓣刮削、动漫刮削、皮肤美化](https://mp.weixin.qq.com/s/5NWp8q2dQYF8YYLrG-BWjg?poc_token=HNx-qWmj12SK_P0aonIFqtAswVP_16Vx0DPxgsRs)
- [Jellyfin 豆瓣元数据插件](https://xzonn.top/posts/Jellyfin-Plugin-Douban.html)

#### YouTube guides worth watching
- 利用NAS加Jellyfin打造个人影音库
  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/uLkUlWsQeCo?start=30&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>

- Jellyfin实用插件两枚 — MetaShark + intro skipper
  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/mnmKPnx0Sl8?start=30&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>

- 群晖Jellyfin装豆瓣插件
  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/7SgBrzPnBRU?start=30&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>

- 家庭影院一条龙<Jellyfin>开源免费，实现本地视频自动刮削，字幕下载，海报墙展示
  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/P43shuyu6s0?start=30&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>

### Live TV / IPTV Setup
Add an M3U playlist for free channels:
- Subscription URL example: https://garyshare.sharewithyou.dpdns.org/mylist.m3u
- In Jellyfin: Dashboard → Live TV → Add Tuner → M3U Tuner → paste URL → follow wizard for guide data (XMLTV if available).

![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingJellyfinOnRaspberryPi4B/Jellyfin_2.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingJellyfinOnRaspberryPi4B/Jellyfin_3.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingJellyfinOnRaspberryPi4B/Jellyfin_4.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingJellyfinOnRaspberryPi4B/Jellyfin_5.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingJellyfinOnRaspberryPi4B/Jellyfin_6.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingJellyfinOnRaspberryPi4B/Jellyfin_7.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingJellyfinOnRaspberryPi4B/Jellyfin_8.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingJellyfinOnRaspberryPi4B/Jellyfin_9.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingJellyfinOnRaspberryPi4B/Jellyfin_10.png)  
![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/DeployingJellyfinOnRaspberryPi4B/Jellyfin_11.png)  



### References
- Official docs: [Jellyfin Docs](https://jellyfin.org/docs/)
- Docker-specific: [Jellyfin Docker](https://jellyfin.org/docs/general/installation/container/)
- Hardware accel info: [Hardware Acceleration](https://jellyfin.org/docs/general/post-install/transcoding/hardware-acceleration/)

> This setup gives you a rock-solid personal media server on Pi 4B — low power, always-on, and expandable. Direct play is king here; avoid heavy transcoding unless you upgrade to a mini PC later. Hit me up if you run into permission issues with volumes or plugin setup. Enjoy the poster wall! 🍿