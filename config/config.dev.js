module.exports = {
    db: {
        url: 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds063546.mlab.com:63546/course-planner',
        secret: process.env.DB_SECRET
    }
};
