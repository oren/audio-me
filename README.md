audio-me
========

 我的音频

 ## Usage
 ````
 npm install
 npm run build-js
 npm start
 ````

 In your browser visit: [http://localhost:3000](http://localhost:3000)

## installing cordova

    wget http://dl.google.com/android/android-sdk_r22.3-macosx.zip
    tar android-sdk_r22.3-macosx.zip
    export PATH=${PATH}:/Users/ogolan/apps/android-sdk-macosx/platform-tools:/Users/ogolan/apps/android-sdk-macosx/tools
    type 'android' and add whatever missing libraries

    sudo npm install -g cordova
    cordova create Hello com.example.hello "Hello"
    cd Hello
    cordova platform add android
