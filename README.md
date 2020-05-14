## Setup/Install
Install client packages:
```
cd client
yarn install
```

Install server packages:
```
npm install
```

## Configure environment variables
Create a `config.env` file under the `server/config` folder:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<HOST:PORT>/<DB_NAMESPACE>?retryWrites=true&w=majority
```
Make sure to replace all the `<...>` placeholders with actual account/cluster data.

## Run Development Servers
Run client (React) (port 3000) and server (port 5000) concurrently, with hot-reload functionality:
```
npm run dev
```

Run client only (port 3000):
```
cd client
yarn start
```

Run server only (port 5000):
```
npm run server
```

## Test Deployment Locally
Mimic the Heroku server by serving the built react app using the local server (port 5000):

First make sure the React app is built:
```
cd client
yarn build
```

Then serve the app from the root directory:
```
npm start
```