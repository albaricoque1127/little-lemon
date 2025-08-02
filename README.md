# Little Lemon Mobile App

A React Native app built with Expo to showcase a dynamic restaurant menu using SQLite and advanced UI techniques. This project combines clean architecture, polished design, and offline-first data handling for a smooth mobile experience.

## 🚀 Tech Stack

- React Native + Expo SDK  
- JavaScript
- SQLite (Expo SQLite)  
- Metro Bundler  
- Figma for UI planning  

## 📦 Setup Instructions

```bash
# Clone the repo and install dependencies
git clone https://github.com/your-username/little-lemon
cd little-lemon
npm install

# Start the local development server
npx expo start
```

Use the QR code with Expo Go on your device, or press `a` or `i` for Android/iOS simulator.

Optional: Run SQLite setup scripts in `App.js` or your data initialization module to seed demo menu items and categories.

## 🎨 Features (in progress)

- [x] Clean project scaffolding using Expo's blank JavaScript template  
- [x] Onboarding screen with `TextInput` validation
- [x] `AsyncStorage` to store user details
- [x] Dynamic menu UI with `SectionList`
- [x] User-selectable profile image with custom default
- [x] Stack navigation
- [x] `Expo SQLite` for local storage  
- [ ] Search/filter logic  

## 🛠 Folder Structure

```
📁 assets/        # Fonts and images  
📁 components/    # Reusable UI widgets  
📁 screens/       # Feature views like Menu, Details  
📁 styles/        # Typography settings
📁 utils/         # AsyncStorage and SQLite logic and schema setup, other functions 
App.js             # Entry point  
```

## 🤝 Contributing

This is a Capstone Project for the Meta React Native Specialization on Coursera. Contributions and feedback welcome/.

---

🔗 Created with ❤️ using Expo CLI  
🗂 Repo structured for scalability and clean Git hygiene  
📱 Designed for both Android and iOS experience parity
