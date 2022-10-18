Welcome, this readme file will explain how to run the code which is found in
this project for Let's Get Viral. 

Step 1: Installing NodeJS and Npm
go to https://nodejs.org/en/ and download version 16.18.0 from the website.
Once downloaded open the installer and follow these instructions:
1. Agree to terms of service.
2. Set desired location to install (default is fine) then click next twice.
3. On the tools for native modules page tick the automatically install the necessary tools box (this will install npm) and wait for the installation to complete.
4. Once complete a command window will appear and will ask to install the necessary tools press any key to continue and let it install this may take a while.
5. Once complete open the windows terminal and test to see everything is install run 'node -v' and 'npm -v' if both show a version number they have been installed correctly restart maybe required. 

Step 2: Installing Expo and yarn
Open a terminal and run the command: 'npm install --global yarn' this will install the yarn package manager run 'yarn -v' to check its installed.
Open a terminal and run the command: 'npm i -g expo-cli' or 'sudo npm i -g expo-cli' if on a mac without properly configure permissions. If there are some errors that pop up you could run 'npm install --global --force expo-cli' to do a force install Running 'expo -V' can be used to check the version.
While this is installing on the mobile device that you want to run the app on, go to the app store or the play store and install the Expo Go app

Step 3: Running the app
Unzip the folder with the source code and move into that directory with the code in it. Once in that folder run 'yarn install' this will install the dependencies needed to run the app. Once dependencies are installed run either 'npm start' or 'expo r -c' to start the code running on a server. If you are using an android device with a mac or an iPhone with windows computer run the command 'expo start --tunnel' instead. Now that the code is running a QR code will appear on the screen using the expo go app on your phone scan the QR code and you will be able to use our app. Sometimes the tunnel mode may crash or timeout, if this is the case then continue to try running 'expo start --tunnel' until it works correctly.

Step 4: Enjoy
You now have access to our app and will be able to play Let's Get Viral.
