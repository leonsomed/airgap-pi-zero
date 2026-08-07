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

Remember to follow instructions in each repo to install dependencies:

- Download https://github.com/leonsomed/selfcrypt 
- Download https://github.com/leonsomed/seed-qr
- Download https://github.com/leonsomed/bip39-symbols
- Download https://github.com/leonsomed/qr-scanner-py

### Create .img

Use the following commands to get an image out of the current SD card.

```bash
lsblk # this shows you the device name to paste in the next command
sudo dd if=/dev/$DEVICE_NAME of=/path/to/image.img status=progress
```

You can then use Pi Imager to burn this image to a new SD card so make sure to backup this .img file in the cloud for later use.

### Done

You are ready to use your pi zero. For example you can use qr-scanner-py you can use a USB camera or a pi zero camera to scan a selfcrypt QR code then decrypt it with selfcrypt and then feed it to seed-qr to load into a wallet:

```bash
cd ~/Desktop/qr-scanner-py
python scan.py # or python pi-camera2.py
selfcrypt -i blob.json -do
# copy seed and pass phrases
cd ../seed-qr
seedqr --interactive --output-dir wallet-a
```
