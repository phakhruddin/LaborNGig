exports.definition = {
	config: {
		columns: {
		    "name": "TEXT",
		    "firstname": "TEXT",
		    "lastname": "TEXT",
		    "company": "TEXT",
		    "phone": "TEXT",
		    "email": "TEXT",
		    "address": "TEXT",
		    "data1": "TEXT",
		    "data2": "TEXT",
		    "data3": "TEXT",
		    "data4": "TEXT",
		    "data5": "TEXT",
		    "data6": "TEXT",
		    "data7": "TEXT",
		    "data8": "TEXT",
		    "data9": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "client"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			deleteAll : function() {
 
				var collection = this;
				 
				var sql = "DELETE FROM " + collection.config.adapter.collection_name;
				db = Ti.Database.open(collection.config.adapter.db_name);
				db.execute(sql);
				db.close();
				 
				collection.trigger('sync');
				 
				},
				
			deleteName : function(name) {
 
				var collection = this;
				 
				var sql = "DELETE FROM " + collection.config.adapter.collection_name +" WHERE name=\""+name+"\"";
				db = Ti.Database.open(collection.config.adapter.db_name);
				db.execute(sql);
				db.close();
				 
				collection.trigger('sync');
				 
				},
				 
			 saveAll : function() {
				var collection = this;
				 
				var dbName = collection.config.adapter.db_name;
				var table = collection.config.adapter.collection_name;
				var columns = collection.config.columns;
				 
				db = Ti.Database.open(dbName);
				db.execute("BEGIN;");
				 
				collection.each(function(model) {
				 
				if (!model.id) {
				model.id = guid();
				model.attributes[model.idAttribute] = model.id;
				}
				 
				var names = [], values = [], q = [];
				for (var k in columns) {
				names.push(k);
				values.push(model.get(k));
				q.push("?");
				}
				var sqlInsert = "INSERT INTO " + table + " (" + names.join(",") + ") VALUES (" + q.join(",") + ");";
				 
				db.execute(sqlInsert, values);
				 
				});
				 
				db.execute("COMMIT;");
				db.close();
				 
				collection.trigger('sync');
			}
		});

		return Collection;
	}
};