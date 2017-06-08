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

		var brandGroupRecord = brandGroupsCollection.findOne(
			{ _id: _brandGroupId, isDeleted: false });
		if (brandGroupRecord == null ) {
			return {
				success: false,
				errorCode: 404,
				errorMessage: 'Link creation FAILED, No brandGroup matching the criteria was found'
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

		var newRecord = {
			userId: _userId,
			brandgroupId: _brandgroupId,
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
		var result = userBrandGroupLinkCollection.findOne({ userId: _userId, brandgroupId: _brandgroupId });
		if (result == null) {
			return {
		 		success: false,
				errorCode: '404',
				errorMessage: 'This user brandgroup link has already been deleted'
			};
		}
		var id = result._id;
		var result = userBrandGroupLinkCollection.remove({ userId: _userId, brandgroupId: _brandgroupId });
		Meteor.call('audit', _creatorId, 'userBrandGroupLinks', id, null, 'DELETE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	}

});
