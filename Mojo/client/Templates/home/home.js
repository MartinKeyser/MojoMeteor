Template.homeTemplate.events({
    'click #logOut'(event, instance) {
        Meteor.logout();
    },

	//////////////////////////////////////////////////////////////////////
	///////////////////////////     BRAND     ////////////////////////////
	//////////////////////////////////////////////////////////////////////

	'click #testBrandInsert'(event, instance) {
		Meteor.subscribe('brand');
		Meteor.call('createBrand', Meteor.userId(), 'wefuse', 'fbid', 'twitterid', 'instagramid', function(error, result) {
			if (error) {
				alert('error occured');
			} else {
				console.log(result);
			}
		});
	},

	'click #testBrandUpdate'(event, instance) {
		Meteor.subscribe('brand');
		Meteor.call('updateBrand',
		Meteor.userId(),
		'chf9EY5Kem89Nwy4A',
		'SOME NAME',
		'SOME FACEBOOK ID',
		'SET twitter',
		'SET instagram',
		function(error, result) {
			if (error) {
				alert('error occured');
			} else {
				console.log(result);
			}
		});
	},

	'click #testBrandDelete'(event, instance) {
		Meteor.subscribe('brand');
		Meteor.call('deleteBrand',
		Meteor.userId(),
		'chf9EY5Kem89Nwy4A',
		function(error, result) {
			if (error) {
				alert('error occured');
			} else {
				console.log(result);
			}
		});
	},

	'click #testBrandGet'(event, instance) {
		Meteor.subscribe('brand');
		Meteor.call('getBrands', Meteor.userId(), function(error, result) {
			if (error) {
				console.log("error occured");
				console.log(error);
			} else {
				// console.log("hello");
				console.log(result);
			}
		});
	},

	'click #testBrandGetById'(event, instance) {
		Meteor.subscribe('brand');
		Meteor.call('getBrandById', Meteor.userId(), 'cfwauxthtbbaZbTuX', function(error, result) {
			if (error) {
				console.log("error occured");
				console.log(error);
			} else {
				// console.log("hello");
				console.log(result);
			}
		});
	},


	//////////////////////////////////////////////////////////////////////
	///////////////////////////     TEAMS     ////////////////////////////
	//////////////////////////////////////////////////////////////////////

	'click #testTeamInsert'(event, instance) {
		Meteor.subscribe('team');
		Meteor.call(
			'createTeam',
			Meteor.userId(),
			'teamWefuse',
			function(error, result) {
				if (error) {
					console.log("error occured");
					console.log(error);
				} else {
					// console.log("hello");
					console.log(result);
				}
			});
	},

	'click #testTeamUpdate'(event, instance) {
		Meteor.subscribe('team');
		Meteor.call(
			'updateTeam',
			Meteor.userId(),
			"YY7iefD2NgvmFp2qc",
			'updatedTeamName',
			function(error, result) {
				if (error) {
					console.log("error occured");
					console.log(error);
				} else {
					// console.log("hello");
					console.log(result);
				}
			});
	},

	'click #testTeamDelete'(event, instance) {
		Meteor.subscribe('team');
		Meteor.call(
			'deleteTeam',
			Meteor.userId(),
			"g5b3tinCqdFR6bx2L",
			function(error, result) {
				if (error) {
					console.log('error occured during deletion LOG CLIENT SIDE');
					console.log(error);
				} else {
					console.log(result);
				}
			});
	},

	'click #testTeamGet'(event, instance) {
		Meteor.subscribe('team');
		Meteor.call('getTeams', Meteor.userId(), function(error, result) {
			if (error) {
				console.log("error occured");
				console.log(error);
			} else {
				// console.log("hello");
				console.log(result);
			}
		});
	},

	'click #testTeamGetById'(event, instance) {
		Meteor.subscribe('team');
		Meteor.call(
			'getTeamById',
			Meteor.userId(),
			'YY7iefD2NgvmFp2qc',
			function(error, result) {
				if (error) {
					console.log("error occured");
					console.log(error);
				} else {
					// console.log("hello");
					console.log(result);
				}
			});
	},

	//////////////////////////////////////////////////////////////////////
	///////////////////////      Brand Group      ////////////////////////
	//////////////////////////////////////////////////////////////////////

	'click #testBrandGroupInsert'(event, instance) {
	Meteor.subscribe('brandGroup');
	Meteor.call(
		'createBrandGroup',
		Meteor.userId(),
		'emerging brands',
		function(error, result) {
			if (error) {
				console.log("error occured");
				console.log(error);
			} else {
				// console.log("hello");
				console.log(result);
			}
		});
},

'click #testBrandGroupUpdate'(event, instance) {
	Meteor.subscribe('brandGroup');
	Meteor.call(
		'updateBrandGroup',
		Meteor.userId(),
		"PLRkg2YYaoNEqxFc6",
		'updated BrandGroupName',
		function(error, result) {
			if (error) {
				console.log("error occured");
				console.log(error);
			} else {
				// console.log("hello");
				console.log(result);
			}
		});
},

'click #testBrandGroupDelete'(event, instance) {
	Meteor.subscribe('brandGroup');
	Meteor.call(
		'deleteBrandGroup',
		Meteor.userId(),
		"EZQyK6DxPGApDt6YA",
		function(error, result) {
			if (error) {
				console.log('error occured during deletion LOG CLIENT SIDE');
				console.log(error);
			} else {
				console.log(result);
			}
		});
},

'click #testBrandGroupGet'(event, instance) {
	Meteor.subscribe('brandGroup');
	Meteor.call('getBrandGroups', Meteor.userId(), function(error, result) {
		if (error) {
			console.log("error occured");
			console.log(error);
		} else {
			// console.log("hello");
			console.log(result);
		}
	});
},

'click #testBrandGroupGetById'(event, instance) {
	Meteor.subscribe('brandGroup');
	Meteor.call(
		'getBrandGroupById',
		Meteor.userId(),
		'fjnjJQF2ABxqXhbtP',
		function(error, result) {
			if (error) {
				console.log("error occured");
				console.log(error);
			} else {
				// console.log("hello");
				console.log(result);
			}
		});
},


	//////////////////////////////////////////////////////////////////////
	///////////////////////     userTeamLinks     ////////////////////////
	//////////////////////////////////////////////////////////////////////

	'click #testUserTeamLinkCreate'(event, instance) {
		// console.log('user team create');
		Meteor.subscribe('links');
		Meteor.call('createUserTeamLink', Meteor.userId(), 'PjXh34xftbnDZNz5t', 'g5b3tinCqdFR6bx2L', function(error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
	},

	'click #testUserTeamLinkDelete'(event, instance) {
		// console.log('user team create');
		Meteor.subscribe('links');
		Meteor.call('deleteUserTeamLink', Meteor.userId(), 'PjXh34xftbnDZNz5t', 'g5b3tinCqdFR6bx2L', function(error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
	},

	'click #testUserBrandLinkCreate'(event, instance) {
		// console.log('user brand create');
		Meteor.subscribe('links');
		Meteor.call('createUserBrandLink', Meteor.userId(), 'PjXh34xftbnDZNz5t', 'RZy5yZPhdq9WDq8YN', function(error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
	},

	'click #testUserBrandLinkDelete'(event, instance) {
		// console.log('user brand create');
		Meteor.subscribe('links');
		Meteor.call('deleteUserBrandLink', Meteor.userId(), 'PjXh34xftbnDZNz5t', 'RZy5yZPhdq9WDq8YN', function(error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
	},

	'click #testUserBrandGroupLinkCreate'(event, instance) {
		// console.log('user brandgroup create');
		Meteor.subscribe('links');
		Meteor.call(
            'createUserBrandGroupLink',
            Meteor.userId(),
            'PjXh34xftbnDZNz5t',
            '5stjL25qcmuRQ4WHc',
            function(error, result) {
    			if (error) {
    				console.log(error);
    			} else {
    				console.log(result);
    			}
    		});
	},

	'click #testUserBrandGroupLinkDelete'(event, instance) {
		// console.log('user brandgroup create');
		Meteor.subscribe('links');
		Meteor.call('deleteUserBrandGroupLink', Meteor.userId(), 'PjXh34xftbnDZNz5t', '5stjL25qcmuRQ4WHc', function(error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
	},

    'click #testTeamBrandLinkCreate'(event, instance) {
		// console.log('team brandgroup create');
		Meteor.subscribe('links');
		Meteor.call(
            'createTeamBrandLink',
            Meteor.userId(),
            'piGttuJSs2duvfyZv',
            'aowW5h6LXZHyCuoiD',
            function(error, result) {
    			if (error) {
    				console.log(error);
    			} else {
    				console.log(result);
    			}
    		});
	},

	'click #testTeamBrandLinkDelete'(event, instance) {
		// console.log('team brandgroup create');
		Meteor.subscribe('links');
		Meteor.call('deleteTeamBrandLink', Meteor.userId(), 'piGttuJSs2duvfyZv', 'aowW5h6LXZHyCuoiD', function(error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
	},

    'click #testTeamBrandGroupLinkCreate'(event, instance) {
		// console.log('team brandgroup create');
		Meteor.subscribe('links');
		Meteor.call(
            'createTeamBrandGroupLink',
            Meteor.userId(),
            'g5b3tinCqdFR6bx2L',
            'EZQyK6DxPGApDt6YA',
            function(error, result) {
    			if (error) {
    				console.log(error);
    			} else {
    				console.log(result);
    			}
    		});
	},

	'click #testTeamBrandGroupLinkDelete'(event, instance) {
		// console.log('team brandgroup create');
		Meteor.subscribe('links');
		Meteor.call('deleteTeamBrandGroupLink', Meteor.userId(), 'g5b3tinCqdFR6bx2L', '5stjL25qcmuRQ4WHc', function(error, result) {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
	}

});
