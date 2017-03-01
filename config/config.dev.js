module.exports = {
    db: {
        local_url: 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@ds161179.mlab.com:61179/courseplanner',
        production_url: '',
        secret: process.env.DB_SECRET
    }
};