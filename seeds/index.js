//npm run seed (from package.json)
//throw everything into database for displaying 
const sequelize = require("../config/connection");
const {Menu, Restaurants} = require("../models");
const menuItemOne = require("./menuItem_List1.json");
const menuItemTwo = require("./menuItem_List2.json");
const restaurantItem = require("./restaurants.json");

const seedMenus = async () => {
    await sequelize.sync({ force: true });
    //"returned {true}, but the message channel closed before a response was received"
    const chosen = await Restaurants.bulkCreate(restaurantItem, {
        individualHooks: true,
        returning: true,
    })
    const viewers = await Menu.bulkCreate(menuItemOne, {
        individualHooks: true,
        returning: true,
    })
    const viewer = await Menu.bulkCreate(menuItemTwo, { //where to call this?
        individualHooks: true,
        returning: true,
    });
    console.log(viewers, "menu seed");
    await Restaurants.create({
        ...restaurantItem, ...menuItemOne ,
        //...restaurantItem and ...menuItemOne+...menuItemTwo displayed in SQL
        user_id: viewers.id
    })
    await Restaurants.create({
        ...restaurantItem, ...menuItemTwo,
        //...restaurantItem and ...menuItemOne+...menuItemTwo displayed in SQL
        user_id: chosen.id
    })
}
seedMenus()
//module.exports = 