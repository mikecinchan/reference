# Reference - AI Prompt Image Library

A simple React application to manage reference images for AI prompts. Store, organize, and quickly copy reference images with tags for easy searching.

## Features

- **User Authentication**: Secure login with Firebase Authentication
- **Add Entries**: Upload images with titles and custom tags
- **Edit Entries**: Modify titles, replace images, and update tags
- **Delete Entries**: Remove unwanted reference images
- **Copy to Clipboard**: Quickly copy images directly to your clipboard
- **Search**: Filter entries by title or tags
- **Grid View**: Beautiful, responsive grid layout

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase
  - Authentication
  - Firestore (Database)
  - Storage (Image hosting)

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use an existing one)
3. Enable the following services:
   - **Authentication**: Enable Email/Password sign-in method
   - **Firestore Database**: Create a database in production mode
   - **Storage**: Enable Firebase Storage

4. Get your Firebase configuration:
   - Go to Project Settings > Your apps > Add app (Web)
   - Copy the Firebase configuration object

5. Update `src/firebase.js` with your configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

### 2. Firestore Security Rules

Set up the following Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /entries/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Storage Security Rules

Set up the following Storage security rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /images/{imageId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

### First Time Setup

1. When you first open the app, you'll see the login screen
2. Click "Don't have an account? Sign up"
3. Create your account with email and password
4. You'll be automatically logged in

### Adding a Reference Entry

1. Click the "+ Add Entry" button
2. Enter a title for your reference
3. Select an image file
4. Add tags by typing and pressing Enter (tags help you search later)
5. Click "Add Entry"

### Searching for Entries

- Use the search bar at the top to filter entries by title or tags
- The results update in real-time as you type

### Copying an Image

1. Hover over any entry card
2. Click the "Copy Image" button that appears
3. The image is now in your clipboard and ready to paste

### Editing an Entry

1. Click the "Edit" button on any entry card
2. Modify the title, replace the image, or update tags
3. Click "Save Changes"

### Deleting an Entry

1. Click the "Edit" button on any entry card
2. Click the "Delete" button
3. Confirm the deletion

## Project Structure

```
src/
├── components/
│   ├── Auth.jsx          # Login/Signup component
│   ├── Dashboard.jsx     # Main dashboard with search
│   ├── AddEntry.jsx      # Add new entry modal
│   ├── EditEntry.jsx     # Edit entry modal
│   └── EntryCard.jsx     # Individual entry card with copy button
├── firebase.js           # Firebase configuration
├── App.jsx              # Main app component with auth state
└── index.css            # Tailwind CSS imports
```

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## Notes

- Only authenticated users can access the application
- All images are stored in Firebase Storage
- The app uses real-time updates from Firestore
- Image copy functionality requires HTTPS in production (works on localhost)
