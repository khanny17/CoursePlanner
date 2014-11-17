SE Course Planner
=============

A webapp for planning which courses one wishes to take and which year they wish to take them in.
The server here: http://khanny17.github.io/CoursePlanner loads the RIT Software Engineering curriculum by default,
but you can save your plans in the form of a JSON file and upload it later if you want to come back to it.


For testing, make sure you have npm installed and run "npm start" from a shell and go to localhost:8000



There have been similar projects in the past which failed, so this project is going to employ a more "hands-off" approach.
We aim to provide a set of tools to enable any user to map out courses in the fastest way possible.

The program is designed for the student, not the college.


Design Focus:
* Should work for any university
* Should not need to be hooked up to any official university databases - this will decrease adaptability and maintainability
* Should be easy to access and intuitive to use
  - Optional registration
  - Export plan or store with account
  - Export plan as loadable file or as a pdf
