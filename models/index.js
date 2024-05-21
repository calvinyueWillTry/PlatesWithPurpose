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
Plate.hasMany(User, {
    foreignKey: 'user_id',
  });
  
 User.belongsTo(Plate, {
    foreignKey: 'user_id',
  });

  Plate.hasMany(Menu, {
    foreignKey: 'menu_id',
  });
  
 Menu.belongsTo(Plate, {
    foreignKey: 'menu_id',
  });
  
  
module.exports = {Plate, Menu, User, EmailLog};