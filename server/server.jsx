'use strict'

Meteor.startup( () => {
	var data = JSON.parse(Assets.getText("deck.json"));
	//console.log(data);

	function updateUnitList(u,data) {
		Units.insert({
			name: data[u].name, 
			atk: data[u].atk,
			def: data[u].def,
			bcost: data[u].bcost,
			cost: data[u].cost,
			desc: data[u].desc,
			filters: data[u].filters,
			bt: data[u].bt
		});
	}

	// Update DB
	if (Units.find().count()) Units.remove({});
	for (var u in data.units) {
		updateUnitList(u,data.units);
	}

	if (Filters.find().count()) Filters.remove({});
	for (var i in data.filters) {
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