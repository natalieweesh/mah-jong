## Mahjong!

now you can play mahjong virtually with your friends! check it out here: https://mahjong.nataliewee.com/

### to run the app

from the client/ directory, run `npm start` and it will open the app on `localhost:3000`

from the server/ directory, run `npm start` and it run the server on localhost:5000

make sure to update the ENDPOINT in client/src/components/Game/Game.js depending on whether you want to connect to the server locally or to the server on heroku

### to deploy the frontend

from the client/ folder

first run `npm run build`

then make sure to copy over the `_redirects` file into the build/ folder (this is for Netlify redirects)

then run `netlify deploy` and when it asks for which folder put `./build`

then run `netlify deploy --prod` and when it asks for which folder put `./build`

### to deploy the backend

from the server/ folder, commit your code and then run `git push heroku master`
