This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
Useful commands for testing: `npm test -- [commands]`<br>
 - `--coverage`
Show the coverage for tests
 - `--watchAll=false`
Turn off interactive watch mode, which could be annoying if you Ctrl+S to save a lot. `watchAll=true` will cause tests to rerun each time you save, which could cause your computer to run slow
 - `-u`
Update the snapshot, used whenever you make changes to the components

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Multiple environments deploying

To change the setting for each environments, you can change the `REACT_APP_ENV` setting in `.env` to either `local` or `dev` depends on where you are deploying. You can edit these deploy settings in `src/envConfig/`. For now, only the `API_ROOT` attribute is available and you can change that to alter the URL of API requests.
