# Rick and Morty Explorer

A Vue.js application built with Vite, Pinia, and TypeScript to explore characters, locations, and episodes from the Rick and Morty API.

## Features
- Browse a list of characters.
- View characters details.
- View location details (origin and current location).
- Display episode information.
- Scrollable modals for long content.
- Loading states for asynchronous data fetching.
- Type-safe code with TypeScript.

## Prerequisites
- Node.js (v16.x or later recommended)
- npm (comes with Node.js)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/diogoplima/rick-and-morty-api.git
cd rick-and-morty-api
```

### 2. Install Dependencies
Run the following command to install all required packages:
```bash
npm install
```

### 3. Configure Environment
No need for environment configuration as the url used is a public API so I simplified it a bit.

### 4. Run the Development Server
Start the app in development mode:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the port specified in the console).

### 5. Run Tests
Set up and run tests using Vitest and Vue Test Utils:
```bash
npm test
```
For watch mode:
```bash
npm run test:watch
```
For test coverage:
```bash
npm run test:coverage
```

## Project Structure
- `src/components/`: Vue components.
- `src/directives/`: Directives to be binded to Vue components.
- `src/lib/`: Helpers highly reused.
- `src/router/`: Router file.
- `src/services/`: TypeScript files that handle api calls.
- `src/stores/`: Pinia stores.
- `src/types/`: TypeScript type definitions.
- `src/views/`: Vue components that are associated to the routes.

## Technologies
- **Framework**: Vue.js 3
- **Build Tool**: Vite
- **State Management**: Pinia
- **Typing**: TypeScript
- **CSS**: Tailwind CSS
- **API**: Rick and Morty API
- **Testing**: Vitest

## Acknowledgments
- Data sourced from the [Rick and Morty API](https://rickandmortyapi.com).
- Built using Vue and Vite