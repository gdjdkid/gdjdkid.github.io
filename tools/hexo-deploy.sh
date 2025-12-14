#!/usr/bin/env bash
echo -e "\e[32m"
set -e

echo "=== Hexo Deploy Start ==="
hexo clean
hexo g
hexo d
echo "=== Deploy Success ==="