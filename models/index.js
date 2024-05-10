const Requests = require("./Requests");
const Restaurant = require("./Restaurants");
const Menu = require("./Menu");
const User = require("./user");
const userType = require("./user_Type");
const Restaurants = require("./Restaurants");

//selects Restaurants then Menu (item)
Restaurant.hasOne(Menu);
Restaurant.belongsToMany(User, {
    through: Requests
});
User.hasMany(Requests);
User.hasOne(userType);


module.exports = {Requests, Restaurants, Menu, User, userType};