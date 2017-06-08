brandGroupCollection = new Mongo.Collection('brandGroups');

Meteor.methods({
	createBrandGroup:function(_userId, _brandGroupName) {
		var newBGRecord = {
			name: _brandGroupName,
			createdDate: new Date().toISOString(),
			isDeleted: false
		};
		var id = brandGroupCollection.insert(newBGRecord);
		var _rowData = brandGroupCollection.findOne({ _id: id });
		Meteor.call('audit', _userId, 'brandGroups', id, _rowData, 'CREATE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	updateBrandGroup:function(_userId, _brandGroupId, _brandGroupName) {
		var response = brandGroupCollection.update(
			{ _id: _brandGroupId, isDeleted: false },
			{ $set: { name: _brandGroupName} }
		);

		if (response == 0) {
			return {
				success: false,
				errorCode: '404',
				errorMessage: 'No brand group record with matching criteria found to be updated.'
			};
		}

		var _rowData = brandGroupCollection.findOne({ _id: _brandGroupId });
		Meteor.call('audit', _userId, 'brandGroups', _brandGroupId, _rowData, 'UPDATE');
		return {
			success: true,
			errorCode: '',
			errorMessage: '',
		};
	},

	deleteBrandGroup:function(_userId, _brandGroupId) {
		var response = brandGroupCollection.update(
			{ _id: _brandGroupId, isDeleted: false },
			{ $set: { isDeleted: true } });

			if (response == 0) {
				return {
					success: false,
					errorCode: '404',
					errorMessage: 'No brand group record with matching criteria found to be deleted.'
				};
			}

		var _rowData = brandGroupCollection.findOne({ _id: _brandGroupId });
		Meteor.call('audit', _userId, 'brandGroups', _brandGroupId, _rowData, 'DELETE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		};
	},

	/* ******************************* */
	/** NB Remember authentication NB **/
	/* ******************************* */
	getBrandGroups:function(_userId) {
		//Return the teams he is linked too.
		var result = brandGroupCollection.find({ isDeleted: false }).fetch();
		if (result == null) {
			return {
				success: false,
				data: null,
				errorCode: '404',
				errorMessage: 'No brandGroups were found for search criteria'
			};
		}

		return {
			success: true,
			data: result,
			errorCode: '',
			errorMessage: ''
		};
	},

	getBrandGroupById:function(_userId, _brandGroupId) {
		var result = brandGroupCollection.findOne({ _id: _brandGroupId, isDeleted: false });
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

})
