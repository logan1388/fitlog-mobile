# fitbook-mobile

## Development environment setup (Only mac)

### Install homebrew

Paste the below code in macOS terminal

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

### Install Node and Watchman

```
brew install node
```

```
brew install watchman
```

### Install XCode

Ensure a simulator is also installed.

### Install CocoaPods

```
sudo gem install cocoapods
```

### Generate debug.keystore for Android

```
keytool -genkey -v -keyalg RSA -keysize 2048 -validity 10000 -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android
```

### Running iOS

```
yarn ios
```

### Running Android

```
yarn android
```
