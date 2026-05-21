#!/bin/bash
# MIT-Loop Live Ubuntu Server Setup Script

echo "Updating System..."
sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip python3-venv git -y

PROJECT_DIR="$HOME/mit-loop-live"

echo "Setting up Virtual Environment in $PROJECT_DIR..."
cd $PROJECT_DIR
python3 -m venv venv
source venv/bin/activate

echo "Installing Dependencies..."
pip install -r requirements.txt

echo "Creating Systemd Service..."
sudo bash -c "cat > /etc/systemd/system/mitloop-live.service <<INNER_EOF
[Unit]
Description=MIT-Loop Live Trading Engine
After=network.target

[Service]
User=\$USER
WorkingDirectory=$PROJECT_DIR
ExecStart=$PROJECT_DIR/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
INNER_EOF"

sudo systemctl daemon-reload
sudo systemctl enable mitloop-live
sudo systemctl restart mitloop-live

echo "✅ System Deployed! Engine is running."
