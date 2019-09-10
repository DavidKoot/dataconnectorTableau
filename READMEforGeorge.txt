Clone this to your laptop
You should have nodejs installed
In the terminal cd to this folder where you find this file.
run 'npm install' to install all dependencies in a new node_modules folder
run 'npm start' to start up a local server in this folder
Open browser, and go to localhost:8888/Simulator/index.html
In the top of the page, field 'connector URL', fill in '../waiter.html'
Click 'Start Interactive Phase'
New window pops up, with a prompt for an apikey. Pass the GUID type api key that should go in the header of a waiter request
Click 'Get TAUS Connector Data'
You'll be prompted for the same apikey again (I made a quick and dirty adjustment, only in order not to have the apikey in the code on GH)
Click 'Fetch Table Data' near the bottom of the page. This actually makes the request. The code of this request is in waiter.js, line 21 "$.ajax({url:...})". At this point the browser reports an preflight 'OPTION' request to the url that is not found.