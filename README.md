# 🛠️ Notifications & Offline-First POC (React Native / Expo)

This is a **proof-of-concept (POC)** React Native app demonstrating **offline-first architecture** and **push/local notifications** using Expo.

> **Note:** Styling and visual polish were **not the focus** — the goal was to experiment with offline handling, data caching, and notifications.  
> **Also:** There is **no real API connection** — all data is mocked and stored locally using **Expo SQLite**.

---

## 📁 Features

- **Offline-First Functionality**
  - Data persists locally using **Expo SQLite**
  - Works even when the device is offline
  - Caching strategies reduce unnecessary network calls
  - **All data is mocked**; no real API requests

- **Notifications**
  - Basic handling of **push and local notifications**
  - Demonstrates scheduling and reacting to notifications

- **Feature-Based Architecture**
  - Each feature (e.g., Todos) is **self-contained**
  - Screens, hooks, and navigation logic live under `src/features/<feature>`

- **Typed Routes & Navigation**
  - Navigation uses **typed constants**
  - Feature-specific router hooks (e.g., `useTodosRouter`)

- **Screen Wrapper**
  - Handles **SafeAreaView** for all devices
  - Supports scrollable/non-scrollable screens with consistent padding

- **Offline-Ready Data Layer**
  - Uses **React Query** with caching
  - Can prefetch data when starting a feature
  - Local database powered by **Expo SQLite**

---

> All screens are wrapped with a **ScreenWrapper** for safe area and consistent layout.

---

## ⚡ Tech Stack

- **React Native + Expo**
- **Expo Router** (file-based routing)
- **Expo SQLite** for offline storage
- **React Query** (offline-first caching)
- **TypeScript**
- **SafeAreaView wrapper** for consistent layout

---

## 🚀 Getting Started

1. Clone the repo:

```bash
git clone https://github.com/djolosc/expo-offline-first-poc.git
cd expo-offline-first-poc
```

2. Install dependencies:

```bash
npm install
```

3.Run the app:

```bash
npx expo start
```

---

## 📌 Notes

- Styling was minimal; focus is on functionality
- Features are modular and reusable
- Navigation is typed and uses feature-specific hooks
- All data is mocked and stored locally using Expo SQLite — no real API integration
- Notifications are included as a POC, not production-ready

---

## 💡 Future Improvements

- Add full styling/themes
- Extend offline-first with more complex database logic
- Integrate push notifications with backend service
- Add unit and integration tests
