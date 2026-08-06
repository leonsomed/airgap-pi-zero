## How to set it up
- Buy a Pi 4 and a Pi zero
- Flash an SD card with Raspbian OS 32 bit (the default for pi zero)
- Boot the pi zero from the SD card
(optional) Disable the display keyboard in control center https://www.raspberrypi.com/documentation/accessories/touch-display-2.html#on-screen-keyboard 
- Shut down Pi zero and boot from the same SD card into the Pi 4
- Connect an ethernet cable on the Pi 4 and install all software you need:


### Install Node.js v22 or later
Turns out pi zero only supports v22 due to armv6 node builds not being available after v22
I actually ended up installing it with this guide https://hassancorrigan.com/blog/install-nodejs-on-a-raspberry-pi-zero/


```bash
wget https://unofficial-builds.nodejs.org/download/release/v22.23.2/node-v22.23.2-linux-armv6l.tar.xz
tar xvfJ node-v22.23.2-linux-armv6l.tar.xz
sudo cp -R node-v22.23.2-linux-armv6l/* /usr/local
rm -rf node-*
sudo reboot
```


### Install drivers for Brother printer like HL-L2300D
To use a Brother printer like HL-L2300D (the one I have) follow this guide https://github.com/pdewacht/brlaser 
Clone or download the repo and run:


```bash
sudo apt-get install cmake
sudo apt install libcups2-dev
# follow the repo readme for cmake commands and such
```

Afterwards you can open the control center to add a printer.

### Download files

- Download https://github.com/leonsomed/selfcrypt 
- Download https://github.com/leonsomed/qr-file-transfer 
- Setup python following this guide in the pi4 https://raspberrytips.com/install-opencv-on-raspberry-pi/ but can be summarized as:

```bash
sudo apt update
sudo apt upgrade
pip install --upgrade pip setuptools wheel
sudo apt install libjpeg-dev zlib1g-dev
sudo apt-get install libopenblas-dev
```

### Download bitcoin helper page

TODO: this is the page that lets you show QR codes from BIP 39 and pass phrases

### Create .img

Using Raspberry Pi OS (SD Card Copier) to get an .img file out of the current system. Backup the file in case you need to flash another SD card you don’t need to repeat the whole process.

### Done

You are ready to use your pi zero

Connect the camera module. It is enabled automatically. Take a picture: 

```bash
rpicam-still -o ~/Desktop/image.jpg
```

