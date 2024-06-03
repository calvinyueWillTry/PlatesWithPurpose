# Plates With Purpose [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description 
Plates With Purpose is an innovative platform that acts as a cross between a food bank and a takeout restaurant. It brings together individuals who want to help others in need by providing them with essential food items and those who are seeking assistance with their food requirements. Our platform facilitates the process of connecting receivers and gifters, ensuring that those in need receive the support they require.

## Functions overview
The models were designed to not only allow primary Keys to be the autoincremented ids, and correlated to each other through foreignKey relationships, but also for speicifc items for each model to be created, and processed as such. For example, Menu.js (presumably from the specific restaurant) has the menu's name, description, price, time_to_prepare, cost (to restaurant), and file_name. This way, from the specific menu, because Menu.hasMany(Plate); the Plate.js which features the individual items avaiable (pulled from menuitem_List1.json within the seeds folder, into the Menu via the seeds index), will appear from underneath the Menu (its foreignKey relationships to Menu and User are established in its model). While they have a few common columns (description and cost), delivered, paid_for and date_order establish if the order was delivered, was it paid for, and the date it occurred. Then after going through the routes (controllers folder, which also correlate the other index.js folders), it reaches the front end handlebars (script files listed) through the JS folder within Public. These ensure that the functions of the handlebars sections operate the way that they're supposed to. 

## Features
 - **Receiver and Gifter Login:** Users can log in to the platform either as receivers, who are seeking assistance, or as gifters, who are willing to donate food items or funds to help others.

 - **Post Needs:** Receivers can post their food requirements on the platform, detailing the type of items they need and any specific preferences they have.

 - **Browse Options:** Gifters can browse through a variety of options posted by receivers, ranging from specific food items to monetary contributions.

 - **Choose Contributions:** Gifters can select the contributions they would like to make, either by purchasing specific food items or by providing financial support.

 - **Delivery Service:** Our platform offers a delivery service to ensure that the contributions made by gifters reach the receivers in need efficiently and effectively.

 - **Partnership with Restaurants:** In the long term, we aim to establish partnerships with restaurants to source leftover food and distribute it to our clients in need, thereby reducing food waste and feeding the community.
  
## Long term project
 - **Expansion of Resources:** We strive to expand our network of gifters and receivers, reaching out to more individuals in need and providing them with essential food items and support.
 - **Collaboration with Restaurants:** By collaborating with restaurants, we aim to increase the variety and quantity of food items available on our platform, further enhancing our ability to serve the community.
 - **Reduction of Food Waste:** Our ultimate goal is to contribute to the reduction of food waste going into landfills by redirecting surplus food from restaurants to those who need it most.
   
## Deployment
<img width="1438" alt="Screenshot 2024-05-20 at 23 32 13" src="https://github.com/Kevins-Trove/PlatesWithPurpose/assets/156174614/1dec5930-a9db-4d21-a712-73ef980f809a">

## Installation 
 You can clone the respsitory 

 - git clone [https://github.com/Kevins-Trove/PlatesWithPurpose](https://github.com/Kevins-Trove/PlatesWithPurpose)

 - cd PlatesWithPurpose

 - node server.js

## Credits 
  
  This project relies on the NodeJS ecosystem and we greatfully thank the developers of these libraries for their contributions to the open-source community! 
  Trusty collaborators on this project include:
 - Calvin Yue: [https://github.com/calvinyueWillTry]
 - Rueben Villalobos: [https://github.com/Rubenvill0811]
 - Kevin Roper: [https://github.com/Kevins-Trove]
 - Joseph Collins: [https://github.com/collinsjosephj]

## License 
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 
