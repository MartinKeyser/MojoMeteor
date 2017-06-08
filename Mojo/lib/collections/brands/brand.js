import { brandsCollection } from './brandsCollection.js';

Meteor.methods({
	createBrand:function(_userId, _name, _facebookId, _twitterId, _instagramId) {
		var newBrandRecord = {
			name: _name,
			createdDate: new Date().toISOString(),
			isDeleted: false,
			facebookId: _facebookId,
			twitterId: _twitterId,
			instagramId: _instagramId
		};
		var id = brandsCollection.insert(newBrandRecord);
		var _rowData = brandsCollection.findOne({_id: id});
		Meteor.call('audit', _userId, 'brands', id, _rowData, 'CREATE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		}
	},

	updateBrand:function(_userId, _brandId, _name, _facebookId, _twitterId, _instagramId) {
		var response = brandsCollection.update(
			{ _id: _brandId, isDeleted: false },
			{ $set: {
				name: _name,
				facebookId: _facebookId,
				twitterId: _twitterId,
				instagramId: _instagramId
				}
		});
		if (response == 0) {
			return {
				success: false,
				errorCode: '404',
				errorMessage: 'No brands witch matching criteria were found during update'
			}
		}

		var _rowData = brandsCollection.findOne({_id: _brandId});
		Meteor.call('audit', _userId, 'brands', _brandId, _rowData, 'UPDATE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		};
	},

	deleteBrand:function(_userId, _brandId) {
		var response = brandsCollection.update(
			{ _id: _brandId, isDeleted: false },
			{ $set: { isDeleted: true } });
		if (response == 0) {
			return {
				success: false,
				errorCode: '404',
				errorMessage: 'No brands witch matching criteria were found during deletion'
			}
		}
		var _rowData = brandsCollection.findOne({ _id: _brandId });
		Meteor.call('audit', _userId, 'brands', _brandId, _rowData, 'DELETE');
		return {
			success: true,
			errorCode: '',
			errorMessage: ''
		};
	},

	/* ******************************* */
	/** NB Remember authentication NB **/
	/* ******************************* */
	getBrands:function(_userId) {
		var result = brandsCollection.find({ isDeleted: false }).fetch();
		if (result == null) {
			return {
				success: false,
				data: null,
				errorCode: '404',
				errorMessage: 'No brands were found matching the search criteria'
			};
		}

		return {
			success: true,
			data: result,
			errorCode: '',
			errorMessage: ''
		};
	},

	getBrandById:function(_userId, _brandId) {
		var result = brandsCollection.findOne({ _id: _brandId, isDeleted: false });
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
