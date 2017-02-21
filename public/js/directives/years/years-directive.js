angular.module('YearsDirective', ['as.sortable'])

    .directive('years', [function() {
        return {
            restrict:'E',
            templateUrl: 'js/directives/years/years-directive.html',
            scope: {
                plan: '=',
                readonly: '='
            },
            link: function(scope, elem, attrs) {
                //Handle readonly version
                if(scope.readonly === true) {
                    scope.sortableOptionsYear = {
                        disabled: true
                    };

                    scope.sortableOptions = {
                        disabled: true
                    };

                    scope.hasPrereqs = function() { return true; }; //squelch prereq errors
                    return; //Don't config any of the functions
                }

                scope.maxSemesters=4; //TODO config?

                scope.sortableOptions = {
                    accept: function (sourceItemHandleScope, destSortableScope) {
                        return true;
                    },//override to determine drag is allowed or not. default is true.
                    itemMoved: function (event) {//Do what you want
                    },
                    orderChanged: function(event) {//Do what you want
                    },
                    containment: '.connectedSortable'
                };

                scope.sortableOptionsCourse = {
                    //'placeholder': 'course',
                    'connectWith': '.connectedSortable'
                };

                scope.addYear = function() {
                    scope.plan.years.push({
                        title: 'Year ' + (scope.plan.years.length + 1),
                        semesters: [{ classes: [] }, { classes: [] }] //initialize with two semesters
                    });
                };

                scope.removeYear = function(index) {
                    //Show a warning if there are classes in any of the semesters
                    var danger = false;
                    scope.plan.years[index].semesters.forEach(function(semester){
                        if(semester.classes.length > 0) {
                            danger = true;
                        }
                    });

                    if(danger) {
                        if(confirm("Delete year \"" + scope.plan.years[index].title + "\" ?")){
                            scope.plan.years.splice(index,1);
                        }
                    } else {
                        scope.plan.years.splice(index,1);
                    }
                };

                scope.removeSemester = function(year,index) {
                    if(year.semesters[index].classes.length > 0) {
                        if(confirm("Delete semester \"" + index+1 + "\" ?")){
                            year.semesters.splice(index,1);
                        }
                    } else {
                        year.semesters.splice(index,1);
                    }
                };

                scope.addSemester = function(year) {
                    if(year.semesters.length < scope.maxSemesters) {
                        year.semesters.push({
                            classes: []
                        });
                    }
                };

                scope.addCourse = function(semester) {
                    semester.classes.push({
                        name: "A New Course",
                        dept: "DEPT",
                        num: "000",
                        credits: 0,
                        prereqs: []
                    });
                };

                scope.deleteCourse = function(course) {
                    scope.plan.years.forEach(function(year) {
                        year.semesters.forEach(function(semester) {
                            for(i = 0; i < semester.classes.length; ++i) {
                                if(semester.classes[i] == course) {
                                    semester.classes.splice(i,1);
                                }
                            }
                        });
                    });
                };

                scope.hasPrereqs = function(course) {

                    //This is ugly
                    //Go through all the courses, year by year, semester by semester
                    //Find the passed course's semester, and it's prereq's semesters
                    //If a prereq comes after the course, we have a problem
                    //If it isnt found at all, thats also a problem
                    //if the passed course isnt found... idek really...
                    //Probably a bad thing though
                    var courseYear = -1;
                    var courseSemester = -1;
                    var prereqTimes = [];
                    scope.plan.years.forEach(function(year, yearIndex){
                        if(prereqTimes.length === course.prereqs.length &&
                            courseYear !== -1 && courseSemester !== -1) {
                            return false; //Stop looping
                        }

                        year.semesters.forEach(function(semester, semesterIndex){
                            semester.classes.forEach(function(c) {
                                if(c === course) {
                                    courseYear = yearIndex;
                                    courseSemester = semesterIndex;
                                } else if(function(prereqs, searchingFor){
                                    var result = false;
                                    prereqs.forEach(function(p){
                                        if(p.dept === searchingFor.dept && p.num === searchingFor.num) {
                                            result = true;
                                        }

                                    });
                                    return result;
                                }(course.prereqs, c)) {
                                    prereqTimes.push({
                                        prereq: c,
                                        year: yearIndex,
                                        semester: semesterIndex
                                    });
                                }
                            });
                        });
                    });


                    if(courseYear === -1 || courseSemester === -1) {
                        console.log('da fuq');
                        return true;
                    }

                    if(prereqTimes.length !== course.prereqs.length) {
                        return false;
                    }

                    var result = true;
                    prereqTimes.forEach(function(pT){
                        if(pT.year > courseYear) {
                            result = false;
                            return false; //This exits loop early
                        } else if(pT.year === courseYear && pT.semester >= courseSemester) {
                            result = false;
                            return false; //This exits loop early
                        }
                    });
                    return result;
                };
            }
        };
    }]);
