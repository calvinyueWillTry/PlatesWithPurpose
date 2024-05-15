// import models
const Restaurant = require("./Restaurants");
const Plate = require("./Plates");
const Menu = require("./Menu");
const UserType = require("./UserType");
const User = require("./User");

//selects Restaurants then Menu (item)
Restaurant.hasOne(Menu, {foreignKey: "menu_id"});


// Relations
UserType.belongsTo(User, {
    foreignKey: "userType_id",
    onDelete: "CASCADE"
});


module.exports = {Plate, Restaurant, Menu, User, UserType};