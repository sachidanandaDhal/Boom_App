# 📱 Boom App - Mobile Video Sharing Application

Boom App is a full-stack mobile application built with **React Native (Expo)** for the frontend and **Node.js + Express** for the backend, with **MongoDB** as the database. It supports user authentication, video upload, playback, and like functionality.

---

## 📸 App Screenshots

![4](https://github.com/user-attachments/assets/ce856118-5894-4fac-b526-f5bec73b316e)
![3](https://github.com/user-attachments/assets/5a8faf10-ec2c-4c07-9723-e1a5e923b448)
![2](https://github.com/user-attachments/assets/41f2d994-8b09-4d5f-bdb1-b6e1f77518c0)
![1](https://github.com/user-attachments/assets/ed82e7d3-9248-41b1-b676-3e4c94f5708b)

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js & npm
- MongoDB (local or cloud)
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device (from Play Store / App Store)

---

## 🔧 Installation Guide

### 📁 1. Clone the Repository

https://github.com/sachidanandaDhal/Boom_App.git
cd your-repo-name

### 2.🖥️ Backend Setup
cd video-app-backend

1. 📦 Install Backend Dependencies
npm install

2. ⚙️ Create Environment Variables

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/video-app
JWT_SECRET=sachidananda



## Start Backend Server
npm run dev





------------------------------------------------------
# 📱 Frontend Setup (React Native with Expo)
## Open a new terminal tab and return to the project root:

cd video-app-backend

1. Install dependencies

bash
   npm install


2. 🔧 Step-by-Step: Set IP Address for Local Network Access

Mac/Linux: Run in terminal: ifconfig


Windows: Run in Command Prompt: ipconfig

Update this Address in 
utils -> api.js under 

const API = axios.create({
  baseURL: 'http://172.20.10.6:5000/api', 
});

write your IP Address- eplace 172.20.10.6 with your actual local IP.



3. Start the app
 
bash
   npx expo start


### Install Expo Go on Your Mobile

Go to your phone’s app store:

Android: Google Play Store

iOS: Apple App Store

Search for and install Expo Go.

3. Connect Your Phone to the Same Wi-Fi Network
Make sure your mobile device and your development computer are connected to the same Wi-Fi network.

4. Scan the QR Code
Open the Expo Go app on your phone.

Tap on “Scan QR Code” (or use the built-in scanner).

Scan the QR code shown in your terminal or browser (Expo DevTools).

5. Your App Will Load on Your Phone
Once scanned, Expo Go will download and launch your React Native app on your mobile device.




Tips if It Doesn’t Work
Ensure your firewall isn’t blocking connections.

Restart your computer’s Wi-Fi or try restarting the Expo server.

Try changing the connection type in Expo DevTools from LAN to Tunnel if on different networks.

Make sure the IP address in your app API URLs points to your computer’s local IP.