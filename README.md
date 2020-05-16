# carpool-confirmer

Instruções para rodar o aplicativo:

# Install
```
git clone https://github.com/nacho13rojas/carpool-confirmer

cd carpool-confirmer/ && npm install
```

# Android config
```
cd android
```
Create file `local.properties` with the following content

    sdk.dir=/Users/{YOUR_USER}/Library/Android/sdk
    
Generate android `debug.keystore`
```
cd app

keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

cd ../..
```

# Run
```
react-native run-android
```
