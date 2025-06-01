![Demo](./github/preview.gif)

# Meme Generator

An app that allows you to create memes by uploading an image or adding text. Build whatever you want.

# Getting Started

## Step 1: Install dependencies

First, you need to install the dependencies:

```sh
pnpm install
```

## Step 2: Run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
pnpm run android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
pnpm run ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## 📦 Packages I Used

This app is built with React Native and several powerful open-source libraries to enhance performance, interactivity, and user experience.

### Core Framework

- **`react`**  
  Core library for building user interfaces using components and hooks.

- **`react-native`**  
  Provides native rendering capabilities for React components on iOS and Android.

---

### Navigation & Layout

- **`@react-navigation/native`**  
  Enables navigation between screens using stack, tab, or drawer navigators.

- **`@react-navigation/native-stack`**  
  High-performance stack navigator using native views under the hood.

- **`react-native-screens`**  
  Optimizes memory usage and performance by using native navigation components.

- **`react-native-safe-area-context`**  
  Handles safe area insets (like notches and status bars) for proper UI alignment.

---

### Camvas Drawing

- **`@shopify/react-native-skia`**  
  Brings 2D graphics (drawing, canvas-like rendering) to React Native. Used for building Excalidraw-like canvas experiences.

- **`react-native-gesture-handler`**  
  Provides declarative gesture APIs (like pan, tap, fling) for smooth and native-like gestures.

- **`react-native-reanimated`**  
  Enables highly performant animations and transitions on the UI thread, used in gesture handling and interactive UIs.

---

### UI Components & Styling

- **`@gorhom/bottom-sheet`**  
  Used it for bottom sheet, like add, edit, or start template.

- **`@rneui/themed`**  
  I used this library just because of the `<Slider />` component. It's worked when placed inside `@gorhom/bottom-sheet`, becasue of the `@gorhom/bottom-sheet` uses `react-native-reanimated`.

- **`react-native-feather`**  
  Provides Feather icons as SVG components for React Native.

- **`react-native-svg`**  
  Adds SVG rendering support, used by icon libraries or custom graphics.

---

### Media & File Handling

- **`react-native-image-picker`**  
  Allows the user to pick images or videos from the device gallery or camera.

---

### State Management

- **`immer`**  
  Used to write immutable state logic in a more convenient way (e.g., directly mutating draft objects in reducers).
