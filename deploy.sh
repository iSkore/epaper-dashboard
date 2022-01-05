TARGET_DEPLOYMENT=$1

echo "WARNING - THIS SCRIPT ASSUMES PM2 AND WiringPi ARE ALREADY INSTALLED ON THE HOST"

#npm --prefix ./ui run build
cp -r ./ui/dist ./static
tar -cvf ./build.tar ./index.js ./ecosystem.config.js ./package.json ./package-lock.json ./static
rm -rf ./static

ssh pi@$TARGET_DEPLOYMENT "mkdir app"
scp ./build.tar pi@$TARGET_DEPLOYMENT:/home/pi/app
ssh pi@$TARGET_DEPLOYMENT "tar -xvf /home/pi/app/build.tar -C /home/pi/app"
ssh pi@$TARGET_DEPLOYMENT "ls -laGF /home/pi/app"
ssh pi@$TARGET_DEPLOYMENT "npm --prefix /home/pi/app install"
ssh pi@$TARGET_DEPLOYMENT "pm2 delete all"
ssh pi@$TARGET_DEPLOYMENT "cd /home/pi/app; pm2 start ecosystem.config.js"
ssh pi@$TARGET_DEPLOYMENT "pm2 save"
