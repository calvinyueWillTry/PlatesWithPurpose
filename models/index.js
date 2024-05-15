const Requests = require("./Requests");
const Restaurant = require("./Restaurants");
const Menu = require("./Menu");
const User = require("./User");
const UserType = require("./userType");
const Restaurants = require("./Restaurants");

//selects Restaurants then Menu (item)
Restaurant.hasOne(Menu, {foreignKey: "menu_id"});
Restaurant.belongsToMany(User, {
    //foreignKey: "restaurant_id",
    through: Requests
});
User.hasMany(Requests);

// Relations
UserType.belongsTo(User, {
    foreignKey: "userType_id",
    onDelete: "CASCADE"
});


module.exports = {Requests, Restaurants, Menu, User, UserType};