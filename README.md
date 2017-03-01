Course Planner
=============

A webapp for planning which courses to take and which year to take them in.


## .env file and Database

1. Create a *.env* text file in the root directory

Example structure:

    DB_SECRET=secret_here
    DB_USER=username_here
    DB_PASS=password_here

2. Create your own DB

Go to: https://mlab.com

Create a sandbox MongoDB Database.

You should get a URL for the following.

3. Add user for the Database

Add a user with a password.

Then add that user and password to the *.env* file.

4. Set url database in *config/config.dev.js*

        url: 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds161179.mlab.com:61179/courseplanner'

 The last part of the URL
    
    @ds161179.mlab.com:61179/courseplanner
    
 Should be changed to your specific URL