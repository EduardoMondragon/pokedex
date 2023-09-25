THIS APP WAS CREATED WITH NEXT TOOLS:
React, Node, Express, Typescript and Firestore (Firebase db)

# Getting Started with the Fullstack pokedex project 
To run successfully in dev mode follow the next steps:

________________________________________________________
1. In the terminal go to the /backend folder and run :
### `npm install`  (that will install all backend dependencies)
### `npm run dev`  (that will start the server in port 8000)
Open [http://localhost:8000](http://localhost:8000) to view the server running in the browser.



2. Then in the terminal go to the /frontend folder and run :
### `npm install`  (that will install all frontend dependencies)
### `npm start`  (that will start the client app in port 3000) (for better experience use Chrome)
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Note: Keep this port available for this app because the backend only accepts calls from http://localhost:3000
if see Not Authorized page in client go to /backend/src/config/cors.config.ts and modify the origin: ["http://localhost:3000"] 
with the assigned port for your client app.

Now you can enjoy the Pokemon app 🥳️🥳️🥳️
________________________________________________________
   

## Available Scripts for backend 

In the /backend directory, you can run:

### `npm run dev` 
That will run the server in developer mode

### `npm run start` 
That will compile the typescript code into JS code and host the backend in /build folder

### `npm run test`
Launches the test runner in the interactive watch mode.

### `npm run coverage`
Will run a coverage report available in [http://127.0.0.1:8084](http://127.0.0.1:8084) 
### `npm run eject`

## Available Scripts for frontend 

In the /backend directory, you can run:

### `npm start` 
That will start the app

### `npm run build` 
That will compile the typescript code into JS code and host the frontend in /build folder

