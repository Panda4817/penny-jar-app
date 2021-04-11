# React Native Penny jar app

The app lets you keep a virtual "swear jar", which uses AsyncStorage to store the number of pennies in your jar and a list of reasons for adding the penny.

## Requirements
- See package.json

## Run on local machine through wsl2
-  run on windows powershell
```
adb kill-server 
adb -a nodaemon server start
``` 
- run on wsl2 Bash terminal
```
expo start --tunnel
```
- If you see the message `Successfully ran adb reverse`, then everything worked
- Use qr to open on physical device or use link to open on an emulator

## Attribute
Thank you to Udemy's React Native - The Practical Guide [2021 Edition] course.