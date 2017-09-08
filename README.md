# Stream 2 Project, Code Institute - David Ryan

# Introduction
This project is titled "The Rise of Bitcoin". It's build with Python in a Flask framework.  The data visualisation elements are built in javascript using d3.js, dc.js crossfilter.js and queue.js.
Mike Bostock's work provided inspiration and knowledge. Data was sourced from Quandl and Bitcoin.org and manually put into a spreadsheet.  The thought process
was to enable comparisons to be made between the value of Bitcoin, Oil and Gold for example.  In doing so the data was "cleaned" too much and has made the charts look a little straightforward.  
The learning gained is to allow the richness of the data to come through on the graphs without overly simplifing the data.

The Agency theme from startbootstrap.com (https://startbootstrap.com/template-overviews/agency/) was used to style the app - unrequired elements were removed and neccessary elements were adjusted to suit the needs of this project. Navbar tags and locations were adjusted along with the addition of relevant images.
The colour palette of the template was maintained.An embedded Twitter feed from BitcoinMagazine was used to add richness to the presentation of app for UX purposes.  Background information pertaining to Bitcoin, sourced from The Telegraph was put into the FAQ section.
A timeline was embedded from historyofbitcoin.org to provide strong visual presentation on the site.  Unfortunately once the site was deployed to Heroku there was a clash between the HTTPS of Heroku and HTTP of the embedded timeline.
The SSL certifcate would not allow the timeline to be presented.  A number of workarounds were attempted including redirecting the link through google, but to no avail. The timeline was replaced with an embeded video from youtube explaining bitcoin instead.



## Live Demo

The project has been deployed on Heroku here https://pristine-sequoia-50301.herokuapp.com/ 

## Built with 
1. Flask 
2. Python
2. HTML
3. CSS
4. Bootstrap
5. MongoDB database
6. JavaScript Libraries:
    * d3.js
    * dc.js
    * crossfilter.js
    * queue.js
7. A dataset was compiled from data from Quandl and bitcoin.org

## Components

#### Flask
A Python micro-framework that was used to serve the data and render the HTML pages for this Application

#### Python
A Python file name threatened_species.py renders a graphs.html template and builds a web server using pymongo to interact with MongoDB

#### MongoDB database
NoSQL database that converts and presents data in JSON format. The dataset was compiled on a spreadsheet and saved on as a csv file. It had many rows of aggregate data i.e. one row that was the product of three other rows, so it was cleaned and sorted in RoboMongo before being used.

#### Queue.js
An asynchronour helper library for JavaScript

#### Crossfilter.js
A Javascript based data manipulation library that enables two way data binding - you will see this in action when a section of a graph is clicked, all the other graphs filter

#### D3.js
A JavaScript based visualisation engine that renders interactive charts and graphs in svg format when given data, which are then passed in to divs in graphs.html

#### DC.js
A Javascript based wrapper library for d3.js - this made plotting the charts easier


## Deployment / Hosting

This Application was deployed and is hosted on Heroku - gunicorn Python package runs the http server for the app, the Procfile gives Heroku the information to run the app and requirements.txt is a file that conains all the Python packages (pip installs) required to run the app. mLab MongoDB was chosen to host the dataset on the server.


## Installation

Follow the below instructions to get this project up & running on Mac (commands will be slightly different for Windows)

1. Download MongoDB & Robomongo
2. Go to folder you want to put the cloned project in your terminal & type:
    `$ git clone https://github.com/davidjryan2000/stream2_project.git`
3. Create & Activate a new Virtual Environment in terminal:
    Create: `$ python3 -m venv ~/virtualenvs/name_of_environment`
    Activate: `$ source ~/virtualenvs/name_of_environment/bin/activate`
4. Install the project dependancies:
    `$ pip install -r requirements.txt`
5. Get Mongod running
    `$ mongod --config config/mongoConfig.conf`
6. Open the folder in vscode and use the internal Terminal type python main.py or step 7.
7. Navigate to the 'main.py', right click and select 'Run python file in terminal'
8. You should see it running below - go to your browser and type '127.0.0.1:5000' into the address bar and the application should appear


## Testing
This Application tested my patience on numerous occassions.





