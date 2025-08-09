# Little Lemon Mobile App
A React Native mobile application for Little Lemon, a family-owned Mediterranean restaurant. The app allows users to log in, browse the menu, and manage their profile.

## 🚀 Tech Stack

- React Native + Expo SDK  
- JavaScript
- SQLite (Expo SQLite)  
- Figma for UI planning (see the assets folder for the wireframe)

## 🎨 Features

- User authentication and profile management
- Menu browsing with search and category filters
- Profile picture upload functionality
- Email notification preferences
- Responsive design for iOS and Android
- Offline data persistence using SQLite

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd little-lemon
```

2. Install dependencies:
```bash
npm install
```

3. Install specific Expo packages:
```bash
npx expo install @expo/vector-icons@^14.1.0 @react-navigation/native @react-navigation/native-stack react-native-safe-area-context expo-font expo-image-picker expo-sqlite @react-native-async-storage/async-storage
```

4. Start the development server:
```bash
npx expo start
```

5. Use the QR code with Expo Go on your device, or press `a` or `i` for Android/iOS simulator.

## 🛠 Project Structure

```
📁 assets/        # Fonts and images, Figma wireframes  
📁 components/    # Avatar.js, Button.js, Categoryfilter.js, EmailNotifications.js, Footer.js, Header.js, Hero.js, RootNavigator.js
📁 screens/       # Menu.js, Onboarding.js, Profile.js
📁 styles/        # typography.js
📁 utils/         # database.js, storage.js, notificaitons.js
App.js             # Entry point  
```

## Dependencies

- Navigation: @react-navigation/native, @react-navigation/native-stack
- Expo core: expo, vector-icons
- Data storage: @react-native-async-storage/async-storage, expo-sqlite
- UI/Features: expo-font, expo-image-picker
- React core: react, react-native, react-native-safe-area-context

## Typography

The app uses two main typefaces:
- Markazi Text (Medium, Regular) for display titles
- Karla (Regular, Medium, Bold, ExtraBold) for body text and UI elements

## Color Palette

- Primary Green: #495E57
- Primary Yellow: #F4CE14
- Secondary Orange: #EE9972
- Background: #FFFFFF
- Text: #333333

## Development

### Running on iOS
```bash
npx expo run:ios
```

### Running on Android
```bash
npx expo run:android
```

## Testing

Currently, the project does not include automated tests. This would be a good area for future improvement.

## Future Enhancements

- Implement order processing
- Add payment integration
- Include unit tests
- Add tablet layout support
- Implement push notifications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

---

🔗 Created with ❤️ using Expo CLI
