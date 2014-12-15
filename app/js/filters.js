angular.module('myFilters',[])

//filters by name, dept, dept-num, num, and description
.filter('courseSearch',function() {
  return function(items,query) {
    var filtered = [];
    query = query.toLowerCase();
    //split the query to see if it matches DEPT-NUM form
    var splitQ = query.split(/[\s\-]+/);
    var item;
    for(var i = 0; i < items.length; ++i) {
      item = items[i];
      if(~item.name.toLowerCase().indexOf(query))
        filtered.push(item);
      else if(~item.dept.toLowerCase().indexOf(query))
        filtered.push(item);
      else if(~item.num.toLowerCase().indexOf(query))
        filtered.push(item);
      else if(~item.details.toLowerCase().indexOf(query))
        filtered.push(item);
      //check DEPT-NUM form
      else if(splitQ.length === 2 &&
              ~item.dept.toLowerCase().indexOf(splitQ[0]) &&
              ~item.num.toLowerCase().indexOf(splitQ[1]))
        filtered.push(item);
    }

    return filtered;
  };
});
