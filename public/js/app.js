angular.module('CoursePlanner', [
    'labeled-inputs',
    'gg.editableText',
    'cfp.hotkeys',
    'CoursePlannerRoutes',
    'HomeController',
    'AuthService',

    'NavbarDirective',
    'RegisterDirective',
    'YearsDirective',
    'CourseDirective'
])

//filters by name, dept, dept-num, num, and description
.filter('courseSearch',function() {
    return function(items,query) {
        var filtered = [];
        query = query.toLowerCase();
        //split the query to see if it matches DEPT-NUM form
        var splitQ = query.split(/[\s\-]+/);
        var item,dept,num;
        for(var i = 0; i < items.length; ++i) {
            item = items[i];
            dept = item.dept.toLowerCase();
            num  = item.num.toLowerCase();
            if(~item.name.toLowerCase().indexOf(query))
                filtered.push(item);
            else if(~dept.indexOf(query))
                filtered.push(item);
            else if(~num.indexOf(query))
                filtered.push(item);
            else if(~item.details.toLowerCase().indexOf(query))
                filtered.push(item);
            //check DEPTNUM form
            else if( ~(dept+num).indexOf(query))
                filtered.push(item);
            //check DEPT-NUM form
            else if(splitQ.length === 2 && ~dept.indexOf(splitQ[0]) && ~num.indexOf(splitQ[1]))
                filtered.push(item);
        }

        return filtered;
    };
})

.run(function(){
    //Prevent browser default keybindings
    $(document).bind('keydown', function(e) {
        //Prevent ctrl+s
        if(e.ctrlKey && (e.which === 83)) {
            e.preventDefault();
        }


        //Prevent ctrl+h
        if(e.ctrlKey && (e.which === 72)) {
            e.preventDefault();
        }
    });
});

