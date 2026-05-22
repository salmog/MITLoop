#!/bin/bash
# High-Performance System Daemon Orchestrator Deployment Script

echo "Updating Core Environments..."
sudo apt update && sudo apt install python3-pip python3-venv -y

PROJECT_DIR="/root/MITLoop/mit-loop-live"

echo "Configuring Python Virtual Execution Sandbox inside $PROJECT_DIR..."
cd $PROJECT_DIR
python3 -m venv venv
source venv/bin/activate

echo "Syncing structural code extensions..."
pip install -r requirements.txt

echo "Re-writing System Execution Process Service Units..."
sudo bash -c "cat > /etc/systemd/system/mitloop-live.service <<INNER_EOF
[Unit]
Description=MIT-Loop Live Trading Engine Engine
After=network.target

[Service]
User=root
WorkingDirectory=$PROJECT_DIR
ExecStart=$PROJECT_DIR/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
INNER_EOF"

echo "Reloading system process trackers..."
sudo systemctl daemon-reload
sudo systemctl enable mitloop-live
sudo systemctl restart mitloop-live

echo "✅ Deployment processing successfully executed."
