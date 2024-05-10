// const PORT = process.env.PORT || 3001;
const router = require('express').Router();
const Restaurants = require("../models/Restaurants");
const Menu = require("../models/Menu");
//const sequelize = require("./Models/connection");
//const app = express();

const restaurants = fetch("https://themealdb.com/api/json/v1/1/search.php?s");
    //console.log(restaurants);//Promise { <pending> }
router.get("/restaurants/:id", async (req, res) => {
    try {
        const restaurantSelection = await restaurants.findAll();
        console.log(restaurantSelection)// (Nothing) retrieve all asynchronously 
        const resturantInquiry =  await restaurantSelection.json()
        console.log(resturantInquiry); // (Nothing)
        //how to destructure and render?
        resturantInquiry.render("restaurants", 
        {
            //id: from Models
            menuName: resturantInquiry.menuName,
            description: resturantInquiry.description
        })
        console.log(menuName) // (Nothing)
    } catch(err){
        res.status(500).json(err);
    };  
});

// sequelize.sync({ force: false }).then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
//   });

//This works too
// function fetchData () {
//     fetch("https://foodbukka.herokuapp.com/api/v1/menu").then(response => {
//     const data = response.json();
//     console.log(data);
// }).then(res => {
//     const investigation = res.map(user => {
//         return "name"+user.menuName
//     }).join("")
// })
// } 
// fetchData;