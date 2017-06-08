Template.loginTemplate.events({
    'click #navigateToRegister'(event, instance) {
		event.preventDefault();
		$("#reg-firstName").removeClass("invalid");
		$("#reg-lastName").removeClass("invalid");
		$("#reg-username").removeClass("invalid");
		$("#reg-email").removeClass("invalid");
		$("#reg-password").removeClass("invalid");
		$("#reg-verifyPassword").removeClass("invalid");
		$("#loginForm").slideUp(300, function() {
            $("#registerBlade").slideDown(300);
        });
    },

	'submit #loginForm'(event, instance) {
        event.preventDefault();
        var emailVar = $("#loginEmail").val();
        var passwordVar = $("#loginPassword").val();

        Meteor.loginWithPassword(emailVar, passwordVar, function(error) {
            if (error) {
                alert('error');
            }
        });
    }
});

Template.loginTemplate.rendered = function() {
    $("#loginForm").validate({
                errorClass: 'invalid',
                errorPlacement: function(error, element) {
                    $(element).closest("form").find("label[for='" + element.attr("id") + "']").attr('data-error', error.text());
                },
                rules: {
                    email: {
                        required: true
                        // email: true
                    },
                    password: {
                        required: true
                    }
                },
                messages: {
                    email: {
                        required: "Please fill out this field",
                        email: "Your email address must be in the format of name@domain.com"
                    },
                    password: {
                        required: "Please fill out this field"
                    }
                }
            });
    $(document).ready(function() {
        Materialize.updateTextFields();
    });
}
