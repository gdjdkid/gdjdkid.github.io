---
title: Installing Android TV on Nintendo Switch using LineageOS
date: 2025-12-17 01:05:26
author: Roy Li
tags: [NS]
categories: [NS]
index_img:
sticky:
---

### Prerequisites
- A modded Nintendo Switch with working Hekate bootloader (recommend using the latest Hekate via fusee or similar; version 6.0.3 or newer required).
- LineageOS for nx (Android TV build) – currently LineageOS 21 (Android 14) or 22.2 (Android 15) depending on the latest available from switchroot / LineageOS.
- SD card formatted as **FAT32** or **exFAT** with enough free space.
- MindTheGapps package for the corresponding Android version and architecture (arm64 ATV variant).
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_0.png)  

### About MindTheGapps
MindTheGapps is a lightweight, custom Google Apps package maintained for LineageOS. For Android TV builds, use the ATV-specific variant (full or minimal). It includes core Google services without the heavy bloat found in stock OpenGApps.

#### Download **MindTheGapps – a custom Google Apps package for Android**
- Website:
  - https://mindthegapps.com/  
    ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_1.png)  

#### Why Choose MindTheGapps?
- Smaller footprint compared to full OpenGApps.
- Better compatibility with LineageOS Android TV builds on Switch hardware.
- Officially recommended on the LineageOS GApps page for recent versions.
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_2.png)  

#### How to Install MindTheGapps?
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_3.png)  

### Installing GApps
If you've already booted into Android TV once without GApps, installing them directly will usually cause bootloops or crashes due to mismatched system properties and missing framework hooks.

#### Recommended procedure
1. Wipe data if the system has already booted once
   2. Boot into Hekate（Hold **Volume Up** while launching **Hekate**） → More Configs → Hold VOL+ to select LineageOS Recovery (or TWRP if using that).
   3. In recovery: Wipe → Factory Reset / Format data / factory reset.
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_4.png)  
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_5.png)  
   4. This clears the Android data and cache partitions only — it does not touch Horizon OS (HOS) or your emuMMC/sysMMC.
2. Download the correct GApps package
   3. Go to https://wiki.lineageos.org/gapps/ or directly to MindTheGapps GitHub releases.
      4. https://github.com/MindTheGapps/14.0.0-arm64-ATV/releases/tag/MindTheGapps-14.0.0-arm64-ATV-20240523_192151
   4. For Android 14 (LineageOS 21): MindTheGapps-14.0.0-arm64-ATV-full-[date].zip
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_6.png)  
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_7.png)  
   5. For Android 15 (LineageOS 22): MindTheGapps-15.0.0-arm64-ATV-[variant].zip
   6. Place the zip on the root of your SD card.
3. Flash GApps in recovery
   4. In LineageOS Recovery: Install → Apply Update → Choose from SWITCH SD (or SD card).
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_8.png)  
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_9.png)  
      ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_10.png)  
   5. Select the MindTheGapps zip.
   6. When you see “Signature verification failed”, choose Yes to proceed (normal for sideloaded packages).
   7. Let it install completely.
4. Reboot
   5. Return to main recovery menu → Reboot system now.
   6. The device should now boot into Android TV with Google services available for the first-time setup.
5. Conclusion
   ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E4%BB%BB%E5%A4%A9%E5%A0%82Switch%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93TV%E7%B3%BB%E7%BB%9F/NS_Install_AndroidTV_11.png)

### Magisk (Root)
#### To gain root access on the Android installation
- For most models (especially OLED / Mariko units), use Magisk v25.2 (newer versions may have compatibility issues with older boot images or SELinux policies on Switch hardware).
- Download: Magisk-v25.2.apk from https://github.com/topjohnwu/Magisk/releases/tag/v25.2
- Install the APK like any app once Android is running, then follow the standard Magisk patching procedure (patch boot image via the app or manually via recovery if preferred).

### Video References
- Dual-boot Atmosphere + Android setup and root guide (older but concepts still apply)
  - 莫老师的附件表
    - https://zxmls.lol/#/?id=ep150-双系统切换！给switch刷入大气层及android11系统，并root
    <div class="video-container">
      <iframe src="https://www.youtube.com/embed/6g0uDHGaRxU?start=30&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
- Recent 2025 Android 15 flashing tutorial
  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/n1zm5zk01hA?start=30&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
- Comprehensive Switch Android install covering OLED compatibility
  <div class="video-container">
    <iframe src="https://www.youtube.com/embed/3LNXBqUFgGY?start=30&rel=0&modestbranding=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>

### Official Resources
- Switchroot downloads
  - https://download.switchroot.org/
- LineageOS device page (nx / nx_tab variants
  - https://download.lineageos.org/devices/nx/builds
- Switchroot LineageOS Downloader tool
  - https://github.com/sthetix/Switchroot-LineageOS-Downloader
- Main documentation
  - https://wiki.switchroot.org/wiki/
  - https://wiki.lineageos.org/
  - https://wiki.lineageos.org/devices/nx/variant4/
  - Android 14/15 builds info: https://wiki.switchroot.org/wiki/android/android-14-15
  - GApps: https://wiki.lineageos.org/gapps/

### Notes
- Always double-check your Switch model (Erista vs Mariko / OLED) and download the matching build variant (nx for TV on some, nx_tab for tablet-style).
- Android TV builds are optimized for docked/controller use; touch works poorly or not at all.
- Backup your SD card contents before repartitioning or major changes.
- If you run into signature mismatches or boot issues after GApps, repeat the data wipe + clean flash sequence.
> This should get you a clean, functional Android TV environment on your Switch. Test thoroughly after first boot.