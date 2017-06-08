auditCollection = new Mongo.Collection('audit');

Meteor.methods({
	audit:function(_userId, _tableName, _tableID, _rowData, _event) {
		var newAuditRecord = {
			userId: _userId,
			tableName: _tableName,
			tableId: _tableID,
			createdDate: new Date().toISOString(),
			rowData: _rowData,
			event: _event
		};
		auditCollection.insert(newAuditRecord);
	}
});
