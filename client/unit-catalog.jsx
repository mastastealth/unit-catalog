//Meteor.startup(function() {

	// Search Filter Object to filter cards
	Session.set('selectedFilter', {});

	// Get the subscriptions
	Meteor.subscribe('theUnits');
	Meteor.subscribe('theFilters');

	// Search Filter Object Update
	function updateSearchFilter(f) {
		Session.set('selectedFilter', f);
	}

	// Iterate filter dropdowns in nav bar
	Template.nav.helpers({
		filters: function() {
			return Filters.find();
		}
	});

	// Iterate filter options per filter dropdown
	Template.singleFilter.helpers({
		filterOpt: function() {
			return this.values;
		}
	});

	// Return option values
	Template.filterOption.helpers({
		values: function() { return this; }
	});

	// Listener for dropdown changes
	Template.singleFilter.events({
		'change select': function(e){
			console.log(e.target);
			var x = parseInt(e.target.value) ? parseInt(e.target.value) : e.target.value
			var y = e.target.getAttribute('data-filter');
			var f = {}; f['filters.'+y] = x;

			if (e.target.value != "-1") {
				updateSearchFilter(f);
			} else { 
				updateSearchFilter({}); 
			}
		},
	});

	// Listener for global name search
	Template.nav.events({
	    'change .name': function(e){
			console.log(e.target.value);
	        Session.set('selectedFilter', {'name': {$regex: e.target.value, $options: 'i'} });
	    }
	});

	// Iterate through cards displayed in catalog
	Template.unitCatalog.helpers({  
		units: function() {    
			console.log( Session.get('selectedFilter') );
			return Units.find(Session.get('selectedFilter'));
		}
	});

	// Clicking on stuff in the catalog
	Template.unitCatalog.events({
		'click .card': function(){
			console.log('Click');
	    }
	});

	// Iterate filter options per filter dropdown
	Template.singleTag.helpers({
		tags: function() {
			return this+' ';
		}
	});
//});