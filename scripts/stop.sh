#!/bin/bash
cd /home/ubuntu/HAKUNA-MATATA/server/bin
sudo pm2 stop www.js 2> /dev/null || true
sudo pm2 delete www.js 2> /dev/null || true