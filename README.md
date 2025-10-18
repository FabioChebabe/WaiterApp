# WaiterApp

WaiterApp is a tool designed to make the work of waiters easier by streamlining order management and service processes. The goal of the app is to improve efficiency in restaurants, bars, and cafés.

---

## Technologies Used

WaiterApp is a **monorepo** application built using **Turborepo**, containing three main services:

* **Mobile App:** Built with **React Native**, **Expo**, and **TypeScript**.
* **Web Frontend:** Built with **React**, **Vite**, and **TypeScript**.
* **API:** Built with **Node.js**, **Express**, and **TypeScript**.

Additionally, there is a shared package for **ESLint configuration**:

```
packages/eslint-config/
```

---

## Prerequisites

Before running the app, make sure you have installed:

* Node.js (v18+ recommended)
* Yarn (v1.22.22)

---

## Installation

Install all dependencies from the root folder:

```bash
yarn
```

---

## Running in Development Mode

To start all services (API, Web, and Mobile) in development mode simultaneously:

```bash
yarn dev
```

This will:

* Run the **API** locally
* Run the **Web frontend** locally
* Run the **Mobile app** via Expo

---


## Running Each Service Individually

### API

1. Navigate to the API folder:

```bash
cd apps/api
```

2. Install dependencies (if not already done at root):

```bash
yarn
```

3. Run the API in development mode:

```bash
yarn dev
```

**Default port:** `http://localhost:3000` (can be changed via environment variables)

---

### Web Frontend

1. Navigate to the Web folder:

```bash
cd apps/frontend
```

2. Install dependencies (if not already done at root):

```bash
yarn
```

3. Run the web app in development mode:

```bash
yarn dev
```

**Default port:** `http://localhost:5173`

---

### Mobile App (Expo)

1. Navigate to the Mobile folder:

```bash
cd apps/mobile
```

2. Install dependencies (if not already done at root):

```bash
yarn
```

3. Start Expo:

```bash
yarn dev
```
or
```bash
yarn start
```

This will open the Expo DevTools in your terminal. You can run the app on:

* **iOS Simulator** (macOS only)
* **Android Emulator**
* **Physical devices** via QR code using the Expo Go app

---

## Monorepo Structure

The project structure follows Turborepo conventions:

```
/waiterapp
│
├─ apps/
│  ├─ api/       # Node.js + Express backend
│  ├─ web/       # React + Vite frontend
│  └─ mobile/    # React Native + Expo mobile app
│
├─ packages/
│  └─ eslint-config/  # Shared ESLint configuration
│
└─ package.json  # Root configuration and scripts
```

---

## Available Scripts

Currently, the only utility script available is:

* `yarn dev` – Runs all services in development mode

---

## Contact

For questions, suggestions, or contributions, feel free to reach out.

## Screenshots

### Web Frontend
<img width="1920" height="968" alt="image" src="https://github.com/user-attachments/assets/fe2f8113-88f2-4305-9f5e-9b58d93a7ab7" />
<img width="373" height="112" alt="Screenshot 2025-10-17 at 23 26 18" src="https://github.com/user-attachments/assets/1b5ea2e2-3d8b-4a66-9a1a-7e6360d23a78" />

### Mobile App
<img width="350" height="757" alt="IMG_6471" src="https://github.com/user-attachments/assets/ed9ee770-9e6d-4593-a2f3-60295a82a1d2" />
<img width="350" height="757" alt="IMG_6473" src="https://github.com/user-attachments/assets/b14eb79f-814f-47e6-8e12-5d4450070eb9" />
<img width="350" height="757" alt="IMG_6472" src="https://github.com/user-attachments/assets/9e4eff3e-27a5-425f-95be-cea8a1b2d895" />
<img width="350" height="757" alt="IMG_6469" src="https://github.com/user-attachments/assets/b0e10cb3-30a3-4d61-b430-e6c8b85cf367" />
<img width="350" height="757" alt="IMG_6470" src="https://github.com/user-attachments/assets/6804a1c0-0ad1-48ce-8931-9ac0485c8ef1" />
