# MyDash
A simple react-native application with login and a dashboard

# Installation Steps:
#### Ensure you have set-up your React-Native Environment correctly here: https://reactnative.dev/docs/environment-setup
#### Download this repo from GitHub, or extract from .zip file provided and cd into MyDash folder.
#### Once inside the folder, run `npm install` to install required dependencies.
#### If running IOS then run the following `cd ios && pod install && cd ..` to install podfiles.
#### To run for Android, `npx react-native start` and then once the metro bundler is initialised, press the `a` key to start the android build. (Make sure to have an emulator running or a device with USB Debugging enabled connect to your machine).
#### To run on ios open `ios/MyDash.xcworkspace` in Xcode, making sure pods are installed and choose an emulator and click run.


# Assumptions & Decisions
#### Due to the API using mock data from a JSON, the bonus feature of adding a new dashboard item only updates the state rather than manipulate any files, so any new data is lost on reset. Moving the API to a NodeJS server and having a DB would be the next step to then have these addition saved.
#### I wasn't sure on if 'Update the UI accordingly based on the authentication state.' meant i had to listen for changes in Redux state or not but the UI will update when the user is authenticated, and the Redux state is updated to reflect the user being logged in.
#### I assumed there was no need for proper password security with encryption etc.
#### I used a mix of class components and functional components, as i'am more comfortable with Class components but can use functional components just as easily.
#### Prompt was open so added a few things to the dashboard other than items to flesh it out a little bit.

# Example Of Screens
#### Login:
![MyDash-Dashboard](https://github.com/SirTitch/MyDash/assets/35763984/5dcc4136-2adc-4c70-90ce-3ede05595adf)
#### Dashboard:
![MyDashLogin](https://github.com/SirTitch/MyDash/assets/35763984/151fa4c4-2560-4bee-b179-bc78fa1bfe19)
#### Video Demo:
https://github.com/SirTitch/MyDash/assets/35763984/218d6544-05b2-494d-b55e-6ea1edcb1b1e

