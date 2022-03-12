from pyngrok import ngrok, conf
import os, requests

TOKEN = os.getenv("TOKEN", "")
PORT = int(os.getenv("PORT", 25565))
PROTO = os.getenv("PROTO", "tcp")
REGION = os.getenv("REGION", "")
TARGET = os.getenv("TARGET", "")

conf.get_default().auth_token = TOKEN
if REGION != "":
    conf.get_default().region = REGION

print("Login to ngrok ...")
tunnel = ngrok.connect(PORT, PROTO, "my-tunnel")

print("Tunnel URL:", tunnel.public_url)

print("Post public url ...")
res = requests.post(TARGET, {
    "target": tunnel.public_url
})

while True:
    pass
