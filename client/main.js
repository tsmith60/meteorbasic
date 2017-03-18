import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';



Template.signup.events({

'click #buttonSignup': function(event) {

    console.log("Clicked sign up");
    var emailV = $("#emailSignup").val();
    var passwordV = $("#passwordSignup").val();
    var confirmPasswordV = $("#passwordSignupConfirm").val();
    console.log(" Email: " + emailV + " Pass: " + passwordV + " Confirm: " + confirmPasswordV);

    if (passwordV == confirmPasswordV) {

    const userSet = {
        email: emailV,
        password: passwordV

    };
    Meteor.call('users.insert', userSet, function (error, result) {//contacts server for finishing the sign up
        if (error) {
            alert('Error'+error.toString());

        } else {

//Session.set("data", result)
            console.log(" Succ was " + result);

            if (result) {
                // If user adddition is successful
                Meteor.loginWithPassword(emailV, passwordV);
                Router.go("/");
                console.log("User signed up successfully");
            } else {
                //User already exists
                alert("User already exists");
            }
        }
    });
}else{
        //Come here if the password and confirmation password do not match
        alert(" Your passwords do not match");
        $("#passwordSignup").css("background-color","red");
       $("#passwordSignupConfirm").css("background-color","red");

    }
},
    'click #loginLink': function(event){
        event.preventDefault();
        Router.go("login");
    }
});

Template.login.onRendered(
    function(event, t){

        console.log("Rendered");
      /*  if(Meteor.user()){
            //User is logged in, go to dashboard
            console.log(" should have went to dash")
            Router.go('/');

        }*/

    });
Template.login.events({


    'click #buttonLogin': function(event){

        console.log("Clicked login");
        var emailV = $("#emailLog").val();
        var passwordV = $("#passwordLog").val();
        Meteor.loginWithPassword(emailV, passwordV);
        if (! Meteor.user()) {
            Router.go('/');
            console.log("User logged in");
        }else{
            console.log("User already logged in");
        }
    },
    'click #signupLink':function(event){
        event.preventDefault();
        Router.go("signup");
    }
});

Template.dash.onRendered(
    function(event, t){


        if(Meteor.user()){
            //User is not logged in, go to login page

            Router.go("login");
        }else{

            //User is logged in
        }




});

Template.dash.events({


    'click #logoutButton': function(event){

        console.log("Clicked logout");
        if (Meteor.user()) {
            //User is logged in

            Meteor.logout();
        }else{
            //User is not logged in
            console.log("User already logged in");
        }
    }
});