//-----------------------------------------------------------------
// ConstantsClass - Project global constants
//-----------------------------------------------------------------
const { User } = require('../models');

class UserData {
    constructor() {
    }

    async get() {
    
        // Get user info from session
        if (req.session.logged_in) {
            const user = await User.findByPk(req.session.user_id );
            const userData = user.get({ plain: true })
            
            return userData;

        };

    };

};
  
module.exports = new UserData();
  