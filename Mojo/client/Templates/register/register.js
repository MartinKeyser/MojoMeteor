Template.registerTemplate.events({
    'submit #registerForm'(event, instance) {
        event.preventDefault();

		var usernameVar = $("#reg-username").val();
		var emailVar = $("#reg-email").val();
		var passwordVar = $("#reg-password").val();
		var nameVar = $("#reg-firstName").val();
		var lastNameVar = $("#reg-lastName").val();

		Meteor.subscribe('audit');

		Accounts.createUser({
			username: usernameVar,
            email: emailVar,
            password: passwordVar,
            profile: {
                firstName: nameVar,
                lastName: lastNameVar,
				isDeleted: false
            }
		}, function(error) {
            if (error) {
				alert("an error occured");
			}
			else {
				var userObj = Meteor.user();
				Meteor.call('audit', Meteor.userId(), 'users', userObj._id, userObj, 'CREATE', function(error, result) {
					if (error) {
						alert('error');
					}
				});
			}
        });
    },

    'click #returnToLogin'(event, instance) {
		$("#loginEmail").removeClass("invalid");
		$("#loginPassword").removeClass("invalid");
        $("#registerBlade").slideUp(300, function() {
            $("#loginForm").slideDown(300);
        });
    }
});


Template.registerTemplate.rendered = function() {
    $("#registerForm").validate({
                errorClass: 'invalid',
                errorPlacement: function(error, element) {
                    $(element).closest("form").find("label[for='" + element.attr("id") + "']").attr('data-error', error.text());
                },
                rules: {
                    regFirstName: {
                        required: true
                    },
                    regLastName: {
                        required: true
                    },
                    regUsername: {
                        required: true
                    },
                    regEmail: {
                        required: true,
                        email: true
                    },
                    regPassword: {
                        required: true
                    },
                    regVerifyPassword: {
                        required: true,
                        equalTo: "#reg-password"
                    }
                },
                messages: {
                    regFirstName: {
                        required: "Please enter your first name"
                    },
                    regLastName: {
                        required: "Please enter your last name"
                    },
                    regUsername: {
                        required: "Please pick a username"
                    },
                    regEmail: {
                        required: "Please fill out this field",
                        email: "Your email address must be in the format of name@domain.com"
                    },
                    regPassword: {
                        required: "Please enter a password"
                    },
                    regVerifyPassword: {
                        required: "Please confirm your password",
						equalTo: "Your passwords do not match"
                    }
                }
            });

    $(document).ready(function() {
        Materialize.updateTextFields();
    });
}
