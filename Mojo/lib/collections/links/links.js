import { userTeamLinkCollection } from './linksCollection.js';
import { userBrandLinkCollection } from './linksCollection.js';
import { userBrandGroupLinkCollection } from './linksCollection.js';

import { brandBrandGroupLinkCollection } from './linksCollection.js';
import { teamBrandLinkCollection } from './linksCollection.js';
import { teamBrandGroupLinkCollection } from './linksCollection.js';

import { teamsCollection } from '../teams/teamsCollection.js';
import { brandsCollection } from '../brands/brandsCollection.js';
// import { brandGroupsCollection } from '../brandGroups/brandGroupsCollection.js';
import { brandGroupsCollection } from '../brandGroups/brandGroupsCollection.js';

// usersCollection = new Mongo.Collection.get('users');
// teamsCollection = new Mongo.Collection('teams');

Meteor.methods({
	createUserTeamLink:function(_creatorId, _userId, _teamId) {
		var result = userTeamLinkCollection.findOne({ userId: _userId, teamId: _teamId });
		if (result != null) {
			return {
				success: false,
				errorCode: '205',
				errorMessage: 'This link already exists, cannot recreate it'
			};
		}

		var userRecord = Meteor.users.findOne({ _id: _userId, 'profile.isDeleted': false });
		if (userRecord == null) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No user matching the criteria was found'
			};
		}

		var teamRecord = teamsCollection.findOne({ _id: _teamId, isDeleted: false });
		if (teamRecord == null ) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No team matching the criteria was found'
			};
		}

		var newRecord = {
			userId: _userId,
			teamId: _teamId,
			createdDate: new Date().toISOString()
		};
		var id = userTeamLinkCollection.insert(newRecord);
		var _rowData = userTeamLinkCollection.findOne({ _id: id });
		Meteor.call('audit', _creatorId, 'userTeamLinks', id, _rowData, 'CREATE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	deleteUserTeamLink:function(_creatorId, _userId, _teamId) {
		// var result = userTeamLinkCollection.remove
		var result = userTeamLinkCollection.findOne({ userId: _userId, teamId: _teamId });
		if (result == null) {
			return {
		 		success: false,
				errorCode: '404',
				errorMessage: 'This user team link has already been deleted'
			};
		}

		var id = result._id;
		var result = userTeamLinkCollection.remove({ userId: _userId, teamId: _teamId });
		if (result == 0) {
			return {
		 		success: false,
				errorCode: '500',
				errorMessage: 'No records were deleted from userTeamLinks'
			};
		}

		Meteor.call('audit', _creatorId, 'userTeamLinks', id, null, 'DELETE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	createUserBrandLink:function(_creatorId, _userId, _brandId) {
		var result = userBrandLinkCollection.findOne({ userId: _userId, brandId: _brandId });
		if (result != null) {
			return {
				success: false,
				errorCode: '205',
				errorMessage: 'This link already exists, cannot recreate it'
			};
		}

		var userRecord = Meteor.users.findOne({ _id: _userId, 'profile.isDeleted': false });
		if (userRecord == null) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No user matching the criteria was found'
			};
		}

		var brandRecord = brandsCollection.findOne({ _id: _brandId, isDeleted: false });
		if (brandRecord == null ) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No brand matching the criteria was found'
			};
		}

		var newRecord = {
			userId: _userId,
			brandId: _brandId,
			createdDate: new Date().toISOString()
		};
		var id = userBrandLinkCollection.insert(newRecord);
		var _rowData = userBrandLinkCollection.findOne({ _id: id });
		Meteor.call('audit', _creatorId, 'userBrandLinks', id, _rowData, 'CREATE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	deleteUserBrandLink:function(_creatorId, _userId, _brandId) {
		// var result = userBrandLinkCollection.remove
		var result = userBrandLinkCollection.findOne({ userId: _userId, brandId: _brandId });
		if (result == null) {
			return {
		 		success: false,
				errorCode: '404',
				errorMessage: 'This user brand link has already been deleted'
			};
		}

		var id = result._id;
		var result = userBrandLinkCollection.remove({ userId: _userId, brandId: _brandId });
		if (result == 0) {
			return {
		 		success: false,
				errorCode: '500',
				errorMessage: 'No records were deleted from userBrandLinks'
			};
		}

		Meteor.call('audit', _creatorId, 'userBrandLinks', id, null, 'DELETE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	createUserBrandGroupLink:function(_creatorId, _userId, _brandGroupId) {
		var result = userBrandGroupLinkCollection.findOne({ userId: _userId, brandGroupId: _brandGroupId });
		if (result != null) {
			return {
				success: false,
				errorCode: '205',
				errorMessage: 'This link already exists, cannot recreate it'
			};
		}

		var userRecord = Meteor.users.findOne({ _id: _userId, 'profile.isDeleted': false });
		if (userRecord == null) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No user matching the criteria was found'
			};
		}

		var brandGroupRecord = brandGroupsCollection.findOne(
			{ _id: _brandGroupId, isDeleted: false });
		if (brandGroupRecord == null ) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No brandGroup matching the criteria was found'
			};
		}

		var newRecord = {
			userId: _userId,
			brandGroupId: _brandGroupId,
			createdDate: new Date().toISOString()
		};
		var id = userBrandGroupLinkCollection.insert(newRecord);
		var _rowData = userBrandGroupLinkCollection.findOne({ _id: id });
		Meteor.call('audit', _creatorId, 'userBrandGroupLinks', id, _rowData, 'CREATE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	deleteUserBrandGroupLink:function(_creatorId, _userId, _brandgroupId) {
		// var result = userBrandGroupLinkCollection.remove
		var result = userBrandGroupLinkCollection.findOne({ userId: _userId, brandGroupId: _brandgroupId });
		if (result == null) {
			return {
		 		success: false,
				errorCode: '404',
				errorMessage: 'This user brandgroup link has already been deleted'
			};
		}
		var id = result._id;
		var result = userBrandGroupLinkCollection.remove({ userId: _userId, brandGroupId: _brandgroupId });
		if (result == 0) {
			return {
		 		success: false,
				errorCode: '500',
				errorMessage: 'No records were successfully deleted'
			};
		}
		Meteor.call('audit', _creatorId, 'userBrandGroupLinks', id, null, 'DELETE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	createTeamBrandGroupLink:function(_creatorId, _teamId, _brandGroupId) {
		var result = teamBrandGroupLinkCollection.findOne({ teamId: _teamId, brandGroupId: _brandGroupId });
		if (result != null) {
			return {
				success: false,
				errorCode: '205',
				errorMessage: 'This link already exists, cannot recreate it'
			};
		}

		var teamRecord = teamsCollection.findOne({ _id: _teamId, isDeleted: false });
		if (teamRecord == null) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No team matching the criteria was found'
			};
		}

		var brandGroupRecord = brandGroupsCollection.findOne(
			{ _id: _brandGroupId, isDeleted: false });
		if (brandGroupRecord == null ) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No brandGroup matching the criteria was found'
			};
		}

		var newRecord = {
			teamId: _teamId,
			brandGroupId: _brandGroupId,
			createdDate: new Date().toISOString()
		};
		var id = teamBrandGroupLinkCollection.insert(newRecord);
		var _rowData = teamBrandGroupLinkCollection.findOne({ _id: id });
		Meteor.call('audit', _creatorId, 'teamBrandGroupLinks', id, _rowData, 'CREATE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	deleteTeamBrandGroupLink:function(_creatorId, _teamId, _brandgroupId) {
		// var result = teamBrandGroupLinkCollection.remove
		var result = teamBrandGroupLinkCollection.findOne({ teamId: _teamId, brandGroupId: _brandgroupId });
		if (result == null) {
			return {
		 		success: false,
				errorCode: '404',
				errorMessage: 'This team brandgroup link has already been deleted'
			};
		}
		var id = result._id;
		var result = teamBrandGroupLinkCollection.remove({ teamId: _teamId, brandGroupId: _brandgroupId });
		if (result == 0) {
			return {
		 		success: false,
				errorCode: '500',
				errorMessage: 'No records were successfully deleted'
			};
		}
		Meteor.call('audit', _creatorId, 'teamBrandGroupLinks', id, null, 'DELETE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	createTeamBrandLink:function(_creatorId, _teamId, _brandId) {
		var result = teamBrandLinkCollection.findOne({ teamId: _teamId, brandId: _brandId });
		if (result != null) {
			return {
				success: false,
				errorCode: '205',
				errorMessage: 'This link already exists, cannot recreate it'
			};
		}

		var teamRecord = teamsCollection.findOne({ _id: _teamId, isDeleted: false });
		if (teamRecord == null) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No team matching the criteria was found'
			};
		}

		var brandRecord = brandsCollection.findOne(
			{ _id: _brandId, isDeleted: false });
		if (brandRecord == null ) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No brand matching the criteria was found'
			};
		}

		var newRecord = {
			teamId: _teamId,
			brandId: _brandId,
			createdDate: new Date().toISOString()
		};
		var id = teamBrandLinkCollection.insert(newRecord);
		var _rowData = teamBrandLinkCollection.findOne({ _id: id });
		Meteor.call('audit', _creatorId, 'teamBrandLinks', id, _rowData, 'CREATE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	deleteTeamBrandLink:function(_creatorId, _teamId, _brandgroupId) {
		// var result = teamBrandLinkCollection.remove
		var result = teamBrandLinkCollection.findOne({ teamId: _teamId, brandId: _brandgroupId });
		if (result == null) {
			return {
		 		success: false,
				errorCode: '404',
				errorMessage: 'This team brand link has already been deleted'
			};
		}
		var id = result._id;
		var result = teamBrandLinkCollection.remove({ teamId: _teamId, brandId: _brandgroupId });
		if (result == 0) {
			return {
		 		success: false,
				errorCode: '500',
				errorMessage: 'No records were successfully deleted'
			};
		}
		Meteor.call('audit', _creatorId, 'teamBrandLinks', id, null, 'DELETE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	createBrandBrandGroupLink:function(_creatorId, _brandId, _brandGroupId) {
		var result = brandBrandGroupLinkCollection.findOne({ brandId: _brandId, brandGroupId: _brandGroupId });
		if (result != null) {
			return {
				success: false,
				errorCode: '205',
				errorMessage: 'This link already exists, cannot recreate it'
			};
		}

		var brandRecord = brandsCollection.findOne({ _id: _brandId, isDeleted: false });
		if (brandRecord == null) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No brand matching the criteria was found'
			};
		}

		var brandGroupRecord = brandGroupsCollection.findOne(
			{ _id: _brandGroupId, isDeleted: false });
		if (brandGroupRecord == null ) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No brandGroup matching the criteria was found'
			};
		}

		var newRecord = {
			brandId: _brandId,
			brandGroupId: _brandGroupId,
			createdDate: new Date().toISOString()
		};
		var id = brandBrandGroupLinkCollection.insert(newRecord);
		var _rowData = brandBrandGroupLinkCollection.findOne({ _id: id });
		Meteor.call('audit', _creatorId, 'brandBrandGroupLinks', id, _rowData, 'CREATE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	deleteBrandBrandGroupLink:function(_creatorId, _brandId, _brandgroupId) {
		// var result = brandBrandGroupLinkCollection.remove
		var result = brandBrandGroupLinkCollection.findOne({ brandId: _brandId, brandGroupId: _brandgroupId });
		if (result == null) {
			return {
		 		success: false,
				errorCode: '404',
				errorMessage: 'This brand brandgroup link has already been deleted'
			};
		}
		var id = result._id;
		var result = brandBrandGroupLinkCollection.remove({ brandId: _brandId, brandGroupId: _brandgroupId });
		if (result == 0) {
			return {
		 		success: false,
				errorCode: '500',
				errorMessage: 'No records were successfully deleted'
			};
		}
		Meteor.call('audit', _creatorId, 'brandBrandGroupLinks', id, null, 'DELETE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	}

});
