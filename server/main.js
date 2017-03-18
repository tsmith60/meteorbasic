import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
    Meteor.methods({//Handles the sign up form from client
        'users.insert'(users) {

            var e = users.email;
            var p = users.password;
            console.log(" The users var has "+users.email+" with password "+p);


            const userExists = Accounts.findUserByEmail(e);

            if(!userExists){
                Accounts.createUser({ email: e, password: p });
                return true;
            }
            return false;

        }});
});
