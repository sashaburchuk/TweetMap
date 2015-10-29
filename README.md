#Tweet Map

This project use's Twitter's API and Google Maps' API to add a marker to a map based on the Tweet's coordinates. I've hardcoded a search term for the sake of testing (at the time of writing, I was searching for tweets containing 'is'). 

##Dependencies

Here are the things that comprise this project. As long as you have Node, running ```npm install``` will automatically install them for you. 

###Node JS
Just using this for package management and to run a server really. More on Node here: https://nodejs.org/en/

###Express
Using Express for routing since it's a very minimal framework: http://expressjs.com/

###Socket.io
Socket.io is awesome and easy to use. It takes all of the mystery of using websockets and abstracts it away. I've used this with Twit to pull in tweet objects from twitter based on whether the tweets have geocoordinates and a given keyword (you can change keyword to hashtag by putting a '#' in front of it). Socket.io then emits the json for these tweets, which gets used to create a Google Maps Marker method and a HeatmapLayer places the marker and adds a heatmap. 

Learn more about socket.io here: http://socket.io/

###Twit
Due to the incredible mystery that Twitter's API has become cloaked in, I found it necessary to use twit, a Twitter API Client for node that supports the REST and Streaming APIs. Twit seems to help set up the tweet object in a way that it becomes a lot easier to read from. 

https://github.com/ttezel/twit

##Google Maps' API
Beautifully documented and easy to use check here to get ideas for how you can customize the code in this repo: https://developers.google.com/maps/?hl=en

##Twitter's API
"Here" is some "documentation". If you are psychic or have mad skillz you might be able to use it. https://dev.twitter.com/overview/documentation

##Setup Instructions
Assuming you have Node installed, after cloning this project, cd in to the root and run ```npm install``` . Once your node modules have been generated, run ```node server``` to start a server at localhost:3000. 

##Honorable mentions
I hardscrabbled this project together based on these two sources:

https://blog.safe.com/2014/03/twitter-stream-api-map/

https://github.com/joshterrill/tracking-tweets

