/**
 * Created by tedsmithiii on 3/18/17.
 */
Router.configure({layout: 'dash'});

Router.map(function(){


    this.route('dash', {path: '/'});

    this.route('login', {path: '/login'} )
    this.route('signup', {path: '/signup'} )
});


//Enforces the access control for non signed in users
var mustBeSignedIn = function(pause) {
    if (!(Meteor.user() || Meteor.loggingIn())) {
        Router.go('login');
    }else if(!(Meteor.user() || Meteor.loggingIn())){
        Router.go('login');
    } else {
        this.next();
    }
};
//Enforces the access control for  signed in users
var goToDashboard = function(pause) {
    if (Meteor.user()) {


        Router.go('dash');
    } else {
        this.next();
    }
};
//These are the only pages that the user can access without logging in
Router.onBeforeAction(mustBeSignedIn, {except: ['login','signup']});
//If the user shouldn't access a page while signed in, add to the list below
Router.onBeforeAction(goToDashboard, {only: ['login','signup']});

