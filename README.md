# Intrapology

# Initial Setup
- Download the code in this project and put it somewhere sensible - it will become your project folder
- Download and install Node.js and npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- Create a new project in Firebase: https://console.firebase.google.com/
  - Under "Get started by adding Firebase to your app", click the Web button
  - In your project folder, under "src", find firebase-template.js, rename it to firebase.js, and copy the values that Firebase gives you into the appropriate spots where it says YOUR DATA HERE
  - Under the Build section/menu, click Realtime Database and set one up
    - Create a new database entry with the name "password" and the value whatever you want the moderator password to be
    - Under Rules, set read and write access to "true"
- Open a Command Prompt (Windows) or Terminal (Mac/Linux) window, go to your project folder and type "npm install"

# Run the code
- In the Command Prompt/Terminal, go to your project folder and type "npm start"

# Writing with Ink
- Download Inky: https://www.inklestudios.com/ink/
- Open script.ink to see some examples of what you can do
- At the moment, you can have only two characters: in this example, they are called "Apple" and "Banana"
  - To change the names of these characters, you will also need to change them in Names.js in the "src" folder
- Export your work to JSON, name it "script.ink.json" and put it in the "src" folder

# Export a build to host online
- Create a build with the command "npm run build"
- Copy the contents of the build folder into the relevant location on your website
