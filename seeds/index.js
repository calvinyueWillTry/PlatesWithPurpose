//npm run seed (from package.json)
//throw everything into database for displaying 
const sequelize = require("../config/connection");
const {Menu, Restaurants} = require("../models");
const menuItemOne = require("./menuItem_List1.json");
const menuItemTwo = require("./menuItem_List2.json");
const restaurantItem = require("./restaurants.json");

const seedMenus = async () => {
    await sequelize.sync({ force: true });
    const chosen = await Restaurants.bulkCreate(restaurantItem, {
        individualHooks: true,
        returning: true,
    })
    const viewers = await Menu.bulkCreate(menuItemOne, menuItemTwo, {
        individualHooks: true,
        returning: true,
    });
    console.log(viewers, "menu seed");
    await Restaurants.create({
        ...restaurantItem, ...menuItemOne , ...menuItemTwo,
        user_id: viewers.id
    })
}
seedMenus()
console.log("seeds called");
//module.exports = 