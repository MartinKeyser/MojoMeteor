// This is a testing api to
// It has no function other than testing rest calls

// import { EJSON } from 'meteor/ejson';

class friend {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
};

if (Meteor.isServer)
{
    var Api = new Restivus({
        useDefaultAuth: true,
        prettyJson: true
      });

    //api/ping
    Api.addRoute('ping', {authRequired: false}, {
        post: function() {
            return {status: 'success'};
        }
    })
}
