// const PORT = process.env.PORT || 3001;
const router = require('express').Router();
const Restaurants = require("../models/Restaurants");
const Menu = require("../models/Menu");
const menuItems = require("../seeds/menuItem_List1.json");//program to run data

    router.get("/:id", async (req, res) => { // "/:id" is the specific restaurant
        try {
            //const restaurants = fetch("https://themealdb.com/api/json/v1/1/search.php?s");
            //still being fetched because it's a global scope
            //console.log(restaurants);//Promise { <pending> }
            const restaurantSelection = await Restaurants.findAll();
            const resturantInquiry = restaurantSelection.map((restaurant) => {
                return restaurant.get({ plain: true });
            });
            //console.log(resturantInquiry);//[ ]
            //need the Seeds routes running to run this to fetch data?
            // menuItems.findAll().catch((err)=>{
            //     res.json(err)
            // });
            // console.log(menuItems);
            res.render("restaurant", { resturantInquiry });//can't render inside of map function?
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }); //http://localhost:3001/restaurants/1

    router.get("/menu/:id", async (req, res)=> {
        try {
            const menuSelection = await Restaurants.findAll({where: {id: req.params.id}, include: {model: Menu}}
            );
            const menuInquiry = menuSelection.map((menu)=>{
                return menu.get({ plain: true });
            });
            console.log(menuInquiry);
            res.render("restaurant", {menuInquiry});
        } catch(error) {
            console.error(error);
            res.status(500).json({ err: "Internal Server Error" })
        }
    }); //http://localhost:3001/restaurants/menu/1

module.exports = router;

//this is the API (500 uses)
// const axios = require('axios');//Axios library to make HTTP requests.
// const options = {
//   method: 'GET',
//   url: 'https://tasty.p.rapidapi.com/recipes/list',
//   params: {//parameters for the request
//     from: '0',
//     size: '30',
//     tags: 'under_30_minutes'
//   },
//   headers: {//RapidAPI key and host
//     'X-RapidAPI-Key': '26511eb0c8msh9a936f52c528507p15d7e2jsnbfe72db82e95',
//     'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
//   }
// };
// try {
// 	const response = await axios.request(options);//makes the request asynchronously
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }