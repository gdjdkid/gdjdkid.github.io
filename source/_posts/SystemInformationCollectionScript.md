---
title: System Information Collection Script
date: 2025-12-14 19:45:11
author: Roy Li
tags: [Windows, Linux, RPI, UtilityScripts]
categories: [UtilityScripts]
index_img:
sticky:
---

### Overview
#### For Windows
- This script is designed to collect detailed system information from Windows machines. 
- It is written in Bash and can run in command-line environments such as Git Bash, Cygwin, or WSL.
- The script retrieves system configuration data by calling native Windows tools and commands.
#### For Linux
- This script is designed for Linux and macOS systems, also written in Bash.
- It leverages typical Linux system features such as the **/proc filesystem** and standard command-line utilities to collect detailed system information.

### Purpose
#### For Windows
- Quick system diagnostics
  - Helps users and IT administrators quickly understand hardware and software configuration.
- System information archiving
  - Records system status before deployment, troubleshooting, or upgrades.
- Remote technical support
  - Allows engineers to collect system details remotely for issue analysis.
- System health monitoring
  - Tracks key system metrics such as memory usage, disk space, and CPU status.
- Network configuration inspection
  - Displays public and private IP addresses, network interface information, and approximate location.
#### For Linux
- Comprehensive system overview
  - Provides a complete snapshot of system information from hardware to software.
- Performance baseline creation
  - Establishes performance baselines for later monitoring and optimization.
- Server status inspection
  - Useful for server administration, especially for uptime and load monitoring.
- Troubleshooting assistance
  - Provides useful diagnostic data for debugging system or performance issues.
- Compatibility validation
  - Checks whether the system meets the requirements for specific software or applications.

### Use Cases
#### For Windows
- IT administrators performing system audits and asset management
- Support engineers collecting client system data for troubleshooting
- Developers verifying hardware configuration of development environments
- Compatibility checks before system migration or upgrades
- Security auditing and compliance verification
#### For Linux
- Server administration and monitoring
- Cloud instance configuration validation
- Base image inspection in container environments
- Environment checks before distributed system deployment
- Performance tuning and capacity planning
- Security hardening and compliance auditing

### Shared Features of Both Scripts
#### Technical Characteristics
- Cross-platform design
  - Both scripts target different operating systems but use standard Bash syntax.
- No additional dependencies
  - The scripts rely only on built-in system tools.
- Colorized output
  - Green-colored output improves readability.
- Modular output structure
  - Information is grouped by category for clarity.
- Basic error handling
  - Handles command failures gracefully.

#### Information Collected
- Basic information
  - Hostname, username, operating system version
- Hardware information
  - CPU model, memory size, disk configuration
- Network information
  - Public and private IP addresses, network interfaces, geolocation
- System status
  - Uptime, boot time, timezone
- Storage information
  - Disk partitions, mount points, usage statistics

#### Benefits
- Improved efficiency
  - Automatically collects system data instead of manual inspection.
- Standardized output format
  - Consistent output makes comparison and analysis easier.
- Historical reference
  - Output can be saved for system change tracking.
- Extensibility
  - Additional checks can be added easily if needed.
- Educational value
  - Helps users understand system structure and configuration.

### Example Output
#### For Windows
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E8%8E%B7%E5%8F%96%E6%9C%AC%E6%9C%BA%E7%B3%BB%E7%BB%9F%E4%BF%A1%E6%81%AF/sysinfo_0.png)  

#### For Linux
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E8%8E%B7%E5%8F%96%E6%9C%AC%E6%9C%BA%E7%B3%BB%E7%BB%9F%E4%BF%A1%E6%81%AF/sysinfo_1.png)  
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E8%8E%B7%E5%8F%96%E6%9C%AC%E6%9C%BA%E7%B3%BB%E7%BB%9F%E4%BF%A1%E6%81%AF/sysinfo_2.png)  
  ![](https://pub-ed71167c1a14475cbc305b5afb0e5173.r2.dev/PicGo/%E8%8E%B7%E5%8F%96%E6%9C%AC%E6%9C%BA%E7%B3%BB%E7%BB%9F%E4%BF%A1%E6%81%AF/sysinfo_3.png)  

### Windows Version Script
#### Collect Windows System Information
```shell
#!/bin/bash

# Windows 主机系统信息收集脚本
# 颜色设置
echo -e "\e[32m"

echo "=== Windows主机系统信息 ==="

# 主机名和用户名
echo "主机名: $(hostname)"
echo "用户名: ${USERNAME:-$USER}"

# 网络地址信息
echo "=== 网络地址信息 ==="

# 公网IP
if command -v curl &>/dev/null; then
public_ip=$(curl -s --max-time 5 ifconfig.me 2>/dev/null || curl -s --max-time 5 ipinfo.io/ip 2>/dev/null || echo "无法获取")
else
public_ip="无法获取 (curl未安装)"
fi
echo "公网IP地址: $public_ip"

# IP地理位置
if command -v curl &>/dev/null && [[ "$public_ip" != "无法获取" && "$public_ip" != "无法获取 (curl未安装)" ]]; then
echo -n "IP地理位置: "
location=$(curl -s --max-time 3 "ipinfo.io/$public_ip/json" 2>/dev/null | grep -E '"city"|"region"|"country"' | \
sed 's/.*: "//;s/",//' | tr '\n' ' ' | sed 's/ $//')
[[ -n "$location" ]] && echo "$location" || echo "未知"
else
echo "IP地理位置: 需要网络连接"
fi

# 内网IP地址
echo "内网IP地址:"
ipconfig 2>/dev/null | grep -E "(IPv4|IP.v4)" | grep -v "169.254." | while read line; do
interface=$(echo "$line" | cut -d' ' -f1 | tr -d ':')
ip=$(echo "$line" | cut -d: -f2 | sed 's/^[ \t]*//')
[[ -n "$ip" ]] && echo "  $interface: $ip"
done

# 系统详细信息
echo "=== 系统详细信息 ==="

if command -v systeminfo &>/dev/null; then
sysinfo=$(systeminfo 2>/dev/null)

    # 操作系统版本
    os_version=$(echo "$sysinfo" | grep "OS Name" | head -1 | cut -d: -f2 | sed 's/^[ \t]*//')
    echo "操作系统版本: $os_version"
    
    echo "内核版本: $(uname -r)"
    
    # 启动设备
    boot_device=$(echo "$sysinfo" | grep -i "Boot Device" | head -1 | cut -d: -f2- | sed 's/^[ \t]*//')
    [[ -n "$boot_device" ]] && echo "启动设备: $boot_device"
    
    # 时区
    time_zone=$(echo "$sysinfo" | grep -i "Time Zone" | head -1 | cut -d: -f2- | sed 's/^[ \t]*//')
    [[ -n "$time_zone" ]] && echo "时区: $time_zone"
    
    # 系统运行时间
    boot_time=$(echo "$sysinfo" | grep -i "System Boot Time" | head -1 | cut -d: -f2- | sed 's/^[ \t]*//')
    if [[ -n "$boot_time" ]]; then
        echo "系统启动时间: $boot_time"
        
        # 计算运行时间
        boot_date=$(date -d "$boot_time" "+%s" 2>/dev/null || echo "")
        if [[ -n "$boot_date" ]]; then
            current_date=$(date "+%s")
            uptime_seconds=$((current_date - boot_date))
            days=$((uptime_seconds / 86400))
            hours=$(( (uptime_seconds % 86400) / 3600 ))
            minutes=$(( (uptime_seconds % 3600) / 60 ))
            echo "系统运行时间: ${days}天 ${hours}小时 ${minutes}分钟"
        fi
    fi
else
echo "操作系统版本: 无法获取 (systeminfo未找到)"
echo "内核版本: $(uname -r)"
fi

# CPU信息
echo "=== CPU信息 ==="

if command -v wmic &>/dev/null; then
cpu_info=$(wmic cpu get name 2>/dev/null | tail -2 | head -1 | sed 's/^[ \t]*//;s/[ \t]*$//')
[[ -n "$cpu_info" && ! "$cpu_info" =~ "Name" ]] && echo "CPU型号: $cpu_info" || echo "CPU型号: 无法获取"
else
echo "CPU型号: 无法获取 (wmic未找到)"
fi

# 内存信息
echo "=== 内存信息 ==="

if command -v wmic &>/dev/null; then
memory_bytes=$(wmic computersystem get TotalPhysicalMemory 2>/dev/null | grep '[0-9]' | awk '{print $1}')
if [[ -n "$memory_bytes" ]]; then
memory_gb=$(echo "$memory_bytes" | awk '{printf "%.2f", $1/1024/1024/1024}')
echo "内存大小: ${memory_gb}GB"

        # 获取可用内存
        free_bytes=$(wmic OS get FreePhysicalMemory 2>/dev/null | grep '[0-9]' | awk '{print $1 * 1024}')
        if [[ -n "$free_bytes" ]]; then
            free_gb=$(echo "$free_bytes" | awk '{printf "%.2f", $1/1024/1024/1024}')
            used_gb=$(echo "$memory_bytes $free_bytes" | awk '{printf "%.2f", ($1-$2)/1024/1024/1024}')
            echo "内存使用: 已用 ${used_gb}GB / 可用 ${free_gb}GB"
        fi
    else
        echo "内存大小: 无法获取"
    fi
else
echo "内存大小: 无法获取 (wmic未找到)"
fi

# 磁盘信息
echo "=== 磁盘分区信息 ==="

echo "逻辑磁盘信息:"
if command -v wmic &>/dev/null; then
wmic logicaldisk where "drivetype=3" get deviceid,size,freespace,volumename /format:list 2>/dev/null | \
tr -d '\r' | awk -F'=' '
/DeviceID/ {drive=$2}
/Size/ {size=$2/1024/1024/1024}
/FreeSpace/ {free=$2/1024/1024/1024; used=size-free}
/VolumeName/ {volumename=$2}
/^$/ && drive {
if (volumename == "") volumename="本地磁盘";
printf "  %s (%s): 总大小=%.2fGB, 已用=%.2fGB, 可用=%.2fGB\n",
drive, volumename, size, used, free;
drive=""; volumename=""
}
'
else
echo "  WMIC命令不可用"
fi

# 使用DF命令查看挂载点（备选方法）
if command -v df &>/dev/null; then
echo -e "\n使用DF命令查看挂载点:"
df -h 2>/dev/null | grep -E "^[A-Z]:" | while read line; do
echo "  $line" | awk '{
printf "  %s: 总大小=%s, 已用=%s, 可用=%s, 使用率=%s",
$1, $2, $3, $4, $5;
if (NF > 5) {
printf ", 挂载点=";
for(i=6;i<=NF;i++) printf "%s ", $i;
}
print ""
}'
done
fi

echo -e "\n=== 物理磁盘信息 ==="
if command -v wmic &>/dev/null; then
wmic diskdrive get model,size /format:list 2>/dev/null | \
tr -d '\r' | awk -F'=' '
/Model/ {model=$2}
/Size/ {size=$2/1024/1024/1024; printf "  %s: %.2fGB\n", model, size}
' | head -10
else
echo "  WMIC命令不可用"
fi

# 用户信息
echo -e "\n=== 当前登录用户 ==="
echo "  当前用户: ${USERNAME:-$USER}"

echo -e "\e[0m"
```

### Linux Version Script
#### Collect Linux System Information
```shell
#!/bin/bash

# Linux/macOS 主机系统信息收集脚本
# 颜色设置
echo -e "\e[32m"

# 检测是Linux还是macOS
if [[ "$(uname)" == "Darwin" ]]; then
    OS_TYPE="macOS"
else
    OS_TYPE="Linux"
fi

echo "=== ${OS_TYPE}主机系统信息 ==="

# 主机名和用户名
echo "主机名: $(hostname)"
echo "用户名: $USER"

# 网络地址信息
echo "=== 网络地址信息 ==="

# 公网IP
if command -v curl &>/dev/null; then
    public_ip=$(curl -s --max-time 5 ifconfig.me 2>/dev/null || curl -s --max-time 5 ipinfo.io/ip 2>/dev/null || echo "无法获取")
else
    public_ip="无法获取 (curl未安装)"
fi
echo "公网IP地址: $public_ip"

# IP地理位置
if command -v curl &>/dev/null && [[ "$public_ip" != "无法获取" && "$public_ip" != "无法获取 (curl未安装)" ]]; then
    echo -n "IP地理位置: "
    location=$(curl -s --max-time 3 "ipinfo.io/$public_ip/json" 2>/dev/null | grep -E '"city"|"region"|"country"' | \
        sed 's/.*: "//;s/",//' | tr '\n' ' ' | sed 's/ $//')
    [[ -n "$location" ]] && echo "$location" || echo "未知"
else
    echo "IP地理位置: 需要网络连接"
fi

# 内网IP地址
echo "内网IP地址:"
if command -v ip &>/dev/null; then
    ip -4 addr show 2>/dev/null | grep -v "127.0.0.1" | grep inet | awk '{print "  "$NF": "$2}'
elif command -v ifconfig &>/dev/null; then
    ifconfig 2>/dev/null | grep -E "inet " | grep -v "127.0.0.1" | awk '{print "  "$1": "$2}'
else
    echo "  无法获取网络接口信息"
fi

# 系统详细信息
echo "=== 系统详细信息 ==="

if [[ "$OS_TYPE" == "macOS" ]]; then
    echo "操作系统: macOS $(sw_vers -productVersion 2>/dev/null || echo '未知')"
elif [[ -f /etc/os-release ]]; then
    source /etc/os-release
    echo "操作系统: $NAME $VERSION"
else
    echo "操作系统: 无法确定"
fi

echo "内核版本: $(uname -r)"
echo "系统架构: $(uname -m)"

# 系统运行时间
echo "=== 系统运行时间 ==="

if [[ "$OS_TYPE" == "macOS" ]]; then
    # macOS获取运行时间
    if command -v sysctl &>/dev/null; then
        boot_time=$(sysctl -n kern.boottime 2>/dev/null | awk '{print $4}' | sed 's/,//')
        if [[ -n "$boot_time" ]]; then
            current_time=$(date +%s)
            uptime_seconds=$((current_time - boot_time))
            days=$((uptime_seconds / 86400))
            hours=$(( (uptime_seconds % 86400) / 3600 ))
            minutes=$(( (uptime_seconds % 3600) / 60 ))
            seconds=$((uptime_seconds % 60))
            
            echo "系统运行时间: ${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒"
            
            # 显示启动时间
            boot_date=$(date -r $boot_time "+%Y-%m-%d %H:%M:%S" 2>/dev/null)
            [[ -n "$boot_date" ]] && echo "系统启动时间: $boot_date"
        else
            echo "系统运行时间: 无法获取"
        fi
    else
        echo "系统运行时间: 无法获取 (sysctl命令不可用)"
    fi
else
    # Linux获取运行时间
    if [[ -f /proc/uptime ]]; then
        uptime_seconds=$(awk '{print $1}' /proc/uptime 2>/dev/null)
        if [[ -n "$uptime_seconds" ]]; then
            days=$((uptime_seconds / 86400))
            hours=$(( (uptime_seconds % 86400) / 3600 ))
            minutes=$(( (uptime_seconds % 3600) / 60 ))
            seconds=$((uptime_seconds % 60))
            echo "系统运行时间: ${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒"
            
            # 显示启动时间
            current_time=$(date +%s)
            boot_time=$((current_time - ${uptime_seconds%.*}))
            boot_date=$(date -d "@$boot_time" "+%Y-%m-%d %H:%M:%S" 2>/dev/null)
            [[ -n "$boot_date" ]] && echo "系统启动时间: $boot_date"
        else
            echo "系统运行时间: 无法获取"
        fi
    else
        echo "系统运行时间: 无法获取 (/proc/uptime不存在)"
    fi
fi

# 显示uptime命令的输出作为补充
if command -v uptime &>/dev/null; then
    echo -n "uptime命令输出: "
    uptime_output=$(uptime 2>/dev/null)
    [[ -n "$uptime_output" ]] && echo "$uptime_output" || echo "无法获取"
fi

# 时区信息
echo "=== 时区信息 ==="

if [[ -f /etc/timezone ]]; then
    echo "时区: $(cat /etc/timezone)"
elif command -v timedatectl &>/dev/null; then
    timezone=$(timedatectl show --property=Timezone --value 2>/dev/null)
    [[ -n "$timezone" ]] && echo "时区: $timezone"
elif [[ -f /etc/localtime ]]; then
    # 尝试从/etc/localtime推断时区
    if [[ "$OS_TYPE" == "Linux" ]]; then
        timezone_link=$(readlink /etc/localtime 2>/dev/null)
        if [[ -n "$timezone_link" ]]; then
            timezone=$(echo "$timezone_link" | sed 's|.*/zoneinfo/||')
            echo "时区: $timezone"
        fi
    fi
fi

# 显示当前时间
echo "当前时间: $(date '+%Y-%m-%d %H:%M:%S')"

# CPU信息
echo "=== CPU信息 ==="

if [[ "$OS_TYPE" == "macOS" ]]; then
    cpu_info=$(sysctl -n machdep.cpu.brand_string 2>/dev/null || echo "未知")
    echo "CPU型号: $cpu_info"
    echo "CPU核心数: $(sysctl -n hw.ncpu 2>/dev/null || echo "未知")"
elif [[ -f /proc/cpuinfo ]]; then
    cpu_model=$(grep -m1 "model name" /proc/cpuinfo 2>/dev/null | cut -d: -f2 | sed 's/^[ \t]*//')
    cpu_cores=$(grep -c "^processor" /proc/cpuinfo 2>/dev/null || echo "未知")
    echo "CPU型号: ${cpu_model:-未知}"
    echo "CPU核心数: $cpu_cores"
    
    # 显示CPU频率（如果可用）
    cpu_mhz=$(grep -m1 "cpu MHz" /proc/cpuinfo 2>/dev/null | cut -d: -f2 | sed 's/^[ \t]*//')
    [[ -n "$cpu_mhz" ]] && echo "CPU频率: ${cpu_mhz} MHz"
else
    echo "CPU型号: 无法获取"
fi

# 内存信息
echo "=== 内存信息 ==="

if [[ "$OS_TYPE" == "macOS" ]]; then
    memory_bytes=$(sysctl -n hw.memsize 2>/dev/null)
    if [[ -n "$memory_bytes" ]]; then
        memory_gb=$(echo "$memory_bytes" | awk '{printf "%.2f", $1/1024/1024/1024}')
        echo "内存大小: ${memory_gb}GB"
    fi
elif [[ -f /proc/meminfo ]]; then
    total_memory=$(grep -m1 "MemTotal" /proc/meminfo 2>/dev/null | awk '{print $2}')
    if [[ -n "$total_memory" ]]; then
        memory_gb=$(echo "$total_memory" | awk '{printf "%.2f", $1/1024/1024}')
        echo "内存大小: ${memory_gb}GB"
        
        free_memory=$(grep "MemAvailable" /proc/meminfo 2>/dev/null | awk '{print $2}')
        if [[ -n "$free_memory" ]]; then
            free_gb=$(echo "$free_memory" | awk '{printf "%.2f", $1/1024/1024}')
            used_gb=$(echo "$total_memory $free_memory" | awk '{printf "%.2f", ($1-$2)/1024/1024}')
            use_percent=$(echo "$total_memory $free_memory" | awk '{printf "%.1f", 100-($2*100/$1)}')
            echo "内存使用: 已用 ${used_gb}GB / 可用 ${free_gb}GB (使用率: ${use_percent}%)"
        fi
    fi
else
    echo "内存大小: 无法获取"
fi

# 磁盘信息
echo "=== 磁盘分区信息 ==="

echo "磁盘使用情况:"
if command -v df &>/dev/null; then
    df -h 2>/dev/null | grep -E "^/dev/" | while read line; do
        echo "  $line" | awk '{
            printf "  %s: 总大小=%s, 已用=%s, 可用=%s, 使用率=%s, 挂载点=", 
                   $1, $2, $3, $4, $5;
            for(i=6;i<=NF;i++) printf "%s ", $i;
            print ""
        }'
    done
else
    echo "  df命令不可用"
fi

echo -e "\n=== 物理磁盘信息 ==="

if [[ "$OS_TYPE" == "macOS" ]]; then
    if command -v diskutil &>/dev/null; then
        diskutil list 2>/dev/null | grep -A5 "/dev/disk" | while read line; do
            if [[ "$line" =~ /dev/disk ]]; then
                echo "  $line"
            fi
        done
    else
        echo "  diskutil命令不可用"
    fi
elif command -v lsblk &>/dev/null; then
    lsblk -d -o NAME,SIZE,TYPE,MODEL 2>/dev/null | grep disk | head -5
elif [[ -f /proc/partitions ]]; then
    cat /proc/partitions 2>/dev/null | grep -v "major" | grep -E "^[[:space:]]*[0-9]" | awk '{print $4, $3}' | while read name size; do
        if [[ "$name" =~ ^[hs]d[a-z]$ ]] || [[ "$name" =~ ^nvme ]]; then
            size_gb=$(echo "$size" | awk '{printf "%.2f", $1/1024/1024}')
            echo "  $name: ${size_gb}GB"
        fi
    done
fi

# 用户信息
echo -e "\n=== 当前登录用户 ==="
echo "  当前用户: $USER"
if command -v who &>/dev/null; then
    users=$(who 2>/dev/null | awk '{print $1}' | sort | uniq)
    user_count=$(echo "$users" | wc -w 2>/dev/null)
    [[ "$user_count" -gt 1 ]] && echo "  其他登录用户: $(echo "$users" | tr '\n' ' ')"
    
    # 显示登录终端和登录时间
    echo -e "\n  登录会话详情:"
    who 2>/dev/null | head -5 | while read line; do
        echo "    $line"
    done
fi

# 系统负载信息
echo -e "\n=== 系统负载信息 ==="
if [[ -f /proc/loadavg ]]; then
    load=$(cat /proc/loadavg 2>/dev/null)
    [[ -n "$load" ]] && echo "  系统负载: $load" || echo "  系统负载: 无法获取"
elif command -v sysctl &>/dev/null && [[ "$OS_TYPE" == "macOS" ]]; then
    load=$(sysctl -n vm.loadavg 2>/dev/null)
    [[ -n "$load" ]] && echo "  系统负载: $load" || echo "  系统负载: 无法获取"
fi

echo -e "\e[0m"
```