// import models
const Plate = require("./Plates");
const Menu = require("./Menu");
const User = require("./User");
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