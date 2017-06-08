// teamsCollection = new Mongo.Collection('teams');

import { teamsCollection } from './teamsCollection.js';

Meteor.methods({
	createTeam:function(_userId, _teamName) {
		var newTeamRecord = {
			name: _teamName,
			createdDate: new Date().toISOString(),
			isDeleted: false
		};
		var id = teamsCollection.insert(newTeamRecord);
		var _rowData = teamsCollection.findOne({ _id: id });
		Meteor.call('audit', _userId, 'teams', id, _rowData, 'CREATE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	updateTeam:function(_userId, _teamId, _teamName) {
		var response = teamsCollection.update(
			{ _id: _teamId, isDeleted: false },
			{ $set: { name: _teamName } }
		);

		if (response == 0) {
			return {
				success: false,
				errorCode: '404',
				errorMessage: 'Update FAILED, no teams matching the criteria were found.'
			};
		}

		var _rowData = teamsCollection.findOne({ _id: _teamId });
		Meteor.call('audit', _userId, 'teams', _teamId, _rowData, 'UPDATE');
		return {
			success: true,
			errorCode: '',
			errorMessage: '',
		};
	},

	deleteTeam:function(_userId, _teamId) {
		var response = teamsCollection.update( { _id: _teamId, isDeleted: false },
			{ $set: { isDeleted: true } });

		if (response == 0) {
			return {
				success: false,
				errorCode: '404',
				errorMessage: 'No record with matching criteria found to be deleted.'
			};
		}

		var _rowData = teamsCollection.findOne({ _id: _teamId });
		Meteor.call('audit', _userId, 'teams', _teamId, _rowData, 'DELETE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		};
	},

	/* ******************************* */
	/** NB Remember authentication NB **/
	/* ******************************* */
	getTeams:function(_userId) {
		//Return the teams he is linked too.
		var result = teamsCollection.find({ isDeleted: false }).fetch();
		if (result == null) {
			return {
				success: false,
				data: null,
				errorCode: '404',
				errorMessage: 'No team was found for search criteria'
			};
		}

		return {
			success: true,
			data: result,
			errorCode: '',
			errorMessage: ''
		};
	},

	getTeamById:function(_userId, _teamId) {
		var result = teamsCollection.findOne({ _id: _teamId, isDeleted: false });
		if (result == null) {
			return {
				success: false,
				data: null,
				errorCode: '404',
				errorMessage: 'No team was found for search criteria'
			};
		}

		return {
			success: true,
			data: result,
			errorCode: '',
			errorMessage: ''
		};
	}

});
