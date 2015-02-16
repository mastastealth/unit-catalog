Meteor.startup( () => {
	var data = JSON.parse(Assets.getText("units.json"));
	//console.log(data);

	function updateUnitList(u,data) {
		Units.insert({
			name: data[u].name, 
			atk: data[u].atk,
			def: data[u].def,
			cost: data[u].cost,
			desc: data[u].desc,
			filters: data[u].filters
		});
	}

	// Update DB
	if (Units.find().count()) Units.remove({});
	for (let u in data.units) {
		updateUnitList(u,data.units);
	}

	if (Filters.find().count()) Filters.remove({});
	for (let i in data.filters) {
		Filters.insert({ 
			name: data.filters[i].name,
			values: data.filters[i].values
		});
	}

	Meteor.publish('theUnits', function(){
	    return Units.find();
	});

	Meteor.publish('theFilters', function(){
	    return Filters.find();
	});
});