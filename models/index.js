// import models
//const Restaurant = require("./Restaurants");
const Plate = require("./Plates");
const Menu = require("./Menu");
//const UserType = require("./UserType");
const User = require("./User");

//selects Restaurants then Menu (item)
//Restaurant.hasOne(Menu, {foreignKey: "menu_id"});
const EmailLog = require("./EmailLog");

// Relations
// Categories have many Products
User.belongsToMany(Menu,{
  through:{
    model:Plate,
    unique:false
  }
})
Menu.belongsToMany(User,{
  through:{
    model:Plate,
    unique:false
  }
})
Plate.hasMany(User)
  
  
module.exports = {Plate, Menu, User, EmailLog};