// import models
const Plate = require("./Plates");
const Menu = require("./Menu");
const User = require("./user");
const EmailLog = require("./EmailLog");

// Relations
// Products belongsTo Category
User.hasMany(Plate);
Plate.belongsTo(User);

Menu.hasMany(Plate);
Plate.belongsTo(Menu);

module.exports = {Plate, Menu, User, EmailLog};