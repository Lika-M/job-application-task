# Web-IT Project

This project was provided as a frontend-only task for a technical assessment. To implement the required functionalities (user authentication, navigation, questionnaire and job listing management, and search with filters), it was adapted to work with JSON Server, simulating backend interactions. A new database structure was also set up to support these features effectively.

## Features

- Job search and offering functionality in the IT sector
- User registration and login for both employees and companies
- User data management with Redux and Redux Persist
- Tailwind CSS for styling
- Vite for fast bundling and HMR (Hot Module Replacement)
- JSON Server for simulating a database

## Technologies Used

This project utilizes the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A state management library for managing application state.
- **Redux Persist**: A library that allows you to save Redux state in local storage.
- **Vite**: A build tool that provides a fast development environment and optimizes the build process.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **JSON Server**: A library for creating a mock backend to simulate database interactions.

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- Git

### Cloning the Repository

To get started, clone the repository:

```bash
git clone <repository-url>
```
### Install Dependencies

Run the following command to install the dependencies:

```bash
npm install
```

### Running the Application

To start the development server and the mock JSON server, follow these steps:

1. Open a terminal and run the development server:

```bash
npm run dev
```
2. Open another terminal and run the JSON server:

```bash
npm run json-server
```
### Accessing the Application

Open your browser and navigate to http://localhost:5173 to access the application.

### To-Do List

1. Fix or create page navigation where needed.

2. Correct and validate login and registration features to ensure proper functionality.

3. Implement create and save functionality for questionnaires in the company dashboard.

4. Implement functionality to create, save in the dashboard, and publish a job listing from the company.

5. Implement a job listing search with three filters, allowing searches based on a specific category or subcategory (e.g., backend or Java).


