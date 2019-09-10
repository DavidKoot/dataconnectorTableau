(function () {
	var myConnector = tableau.makeConnector();

	myConnector.getSchema = function (schemaCallback) {
		var cols = [
			{ id : "targetLanguage", alias : "Target Langauge", dataType : tableau.dataTypeEnum.string },
			{ id : "Time", alias : "Time", columnRole: "dimension", dataType : tableau.dataTypeEnum.int }
		];

		var tableInfo = {
			id : "Productivityperlanguage",
			alias : "Productivity in the industry per language",
			columns : cols
		};


		schemaCallback([tableInfo]);
	};

	myConnector.getData = function(table, doneCallback) {
		$.ajax({
			url: 'https://data-connector.stag.taus.net/v3/timeSpent/industry?groupBy=targetLanguage',
			type: 'GET',
//			accepts: {
//				mycustomtype: 'text/jsonp'
//			},
//			crossDomain: true,
//			dataType: 'jsonp',
//			dataType: 'mycustomtype',
			dataType: 'json',
//			jsonp: 'callback',
			success: function(resp) {
				var groups = resp,
					tableData = [];

				for (var j = 0, len = groups.length; j < len; j++) {
					tableData.push({
						"targetLanguage": groups[j].group.targetLanguage,
						"Time": groups[j].totalTime
					})
				}

				table.appendRows(tableData);
				doneCallback();

			},
			error: function() { alert('Error with fetching data'); },
			beforeSend: setHeader
		});

		function setHeader(xhr) {
			xhr.setRequestHeader('apiKey', apikey);
		}
	};

	tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
	$("#submitButton").click(function () {
		tableau.connectionName = "TAUS connector service Feed";
		tableau.submit();
	});
});
