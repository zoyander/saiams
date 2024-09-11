# Intrapology

# How to get started (or start again)
- Depending on the situation, you might need to start by installing Create React App. Instructions for this can be found at https://create-react-app.dev
- Copy all folders except for node_modules to the new location
- In the new location, install the dependencies with the command npm install
- Start the local server with the command npm start

# Set up the Firebase server
- If you are starting a new server on Firebase for this, you need to get the right credentials for it by creating a new Web App in a Firebase project.
- Update firebase.js with the credentials of the Firebase server (Realtime Database) you are using. These will be displayed during the new Web App setup process, or can be found in "APIs and services" on Google Cloud.
- Keep the firebase server in "testing mode" and set read and write access to "true". Google hates this and you'll have to change it to something more secure at some point but I don't yet know anything about it.
- Create a new data entry on the server with the name "password" and the value whatever you want the moderator password to be.

# Export a build for the website
- You need to set a url that corresponds to the expected location of the webpage somewhere, I can't remember where.
- Create a build with the command npm run build
- Copy the contents of the build folder into the relevant location on the website.