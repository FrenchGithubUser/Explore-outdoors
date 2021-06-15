# Outside-spots

Note : the design of the website is temporary and WILL change in the future

The goal of this project is to provide a solution to gather spots for various sports in a simple and intuitive way.
The start of this would be creating a website (as it's relatively easy and cross platform) and afterwards, apps that would rely on the same database.

Sports that are currently in mind : cliff diving/jumping, street workout/calisthenics, climbing, biking, football, basketball, handball, volleyball, parkour, children playgrounds

The website will be fully open source and has as only goal to be convenient to use, nice but simple design and not relying on any non FOSS service

Some similar projects already exist, they are amazing and I am very thankful for the work that has been done. The problem is that they are usually unmaintained, the devs aren't reachable, the website/app is buggy/unintuitive/bloated, rely on Google's services, aren't open source etc... The goal of this project is to try to fix those issues.

Making money out of this is NOT a goal of mine, so the website will NEVER contain ads, nor the apps that will come in the future. Although, donations are welcomed as it helps improving the code, and shows your support and the fact that you enjoy what has been made !


# How it works

It uses the data stored on OSM servers to grab all the spots set as "cliff_diving", these spots are grabbed once a day by myself, the coordinates and the name of the spots are extracted and stored into a lighter json file wich is downloaded when the page loads. From that data, the spots can be displayed on the map and more information can be displayed with HTML injection when a pin is clicked.



Roadmap :

x Building the website with OSM integration

x Creating sections for each sports (with subcategories)
- Creating a logo for the project
- Creating the option of adding new spots (with GPS coordinates, pictures, links to videos)
- Adding the option of commenting under the spots and adding informations (with an account ?)
- Adding the posssibility to export the data to make it accessible offline

x Creating sections with informations related to each sport (safety measures, general informations, links to useful documentation etc...)

- Communicate about the app (as it's highly based on community's spots !)
- Making some shirts/sweaters to help financing the project (possibly server costs)
- Make some reusable bags to clean the spots of their waste


Thanks to onlinewebfonts that provided some nice svg images !
