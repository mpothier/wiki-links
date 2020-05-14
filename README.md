# Wikinexus

Wikinexus is an open-source project seeking to explore cognitive and cultural associations within our shared world of knowledge. We aim to find and map patterns emergent in the way humans draw connections across concepts, using Wikipedia as a vehicle for research.

Check out the WIP application deployed on Heroku: https://wikinexus.herokuapp.com/

Stage 1 (current implementation) focuses on collecting and aggregating data. It features a "game play" mode for visitors to connect otherwise unrelated concepts through Wikipedia links alone, as well as a mode to view visualizations and metrics of aggregated data contributed by all visitors.

Stage 2 (after enough data has been collected) will focus on exploring the data and looking for patterns. This remains open-ended but aims to test ML models to look for patterns with additional extracted metadata (e.g. article category classifications).

-------------
## Application structure
The project is deployed as a single-page application using the MERN stack:
- React + Redux client on the front end
- Express and Node.js running the back end server
- MongoDB (Cloud Atlas) database

Additional front end libraries of note:
- D3 (interactive network visualizations)
- wikijs (API wrapper to interact with Wikimedia/Wikipedia)
- Bootstrap (layout styling)

### Project Directory
NPM entry point is placed at the root folder for compatibility with Heroku's Node buildpack. Thus the `server` lives in the root of the project directory, while the `client` lives in a sub-folder.

The `client` folder follows basic folder structure from `create-react-app` and organizes React components, Redux store actions/reducers, and other utilities.

The root `server` follows MV* style organization, separating concerns of models, routes, controllers in respective folders.

```
├── client                      # React front end
│   ├── build                   # Built, static content served by Node server
│   ├── public                  # SPA entry point (index.html)
│   ├── src                     # React development source files
├── config                      # Environment variable config (including DB URI)
├── controllers                 # Handles interactions with database models
├── models                      # Defines database schemas
├── routes                      # Handles HTTP REST endpoints
├── Procfile                    # Declare process for Heroku dyno to run Node web server
├── server.js                   # Application entry point, defines Express application
```

-------------
## How to Contribute
Feel free to fork this repository, submit pull requests, or suggest other features or improvements.

### Setup/Install
Install server packages:
```
npm install
```

Install client packages:
```
cd client
yarn install
```

### Configure environment variables
Create a `config.env` file under the `config/` folder:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@<HOST:PORT>/<DB_NAMESPACE>?retryWrites=true&w=majority
```
Make sure to replace all the `<...>` placeholders with actual account/cluster data.

### Run Development Servers
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

### Test Deployment Locally
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

### Deploy to Heroku
Set MongoDB URI (if needed/updated):
```
heroku config:set MONGODB_URI=<enter_uri_here>
```

Push git changes to app after committing to master:
```
git push heroku master
```

A `"postbuild"` npm script will have Heroku build the client upon deployment.