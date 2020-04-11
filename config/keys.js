if (process.env.NODE_ENV == "production"){
    console.log('am on production');
    module.exports = require('./prod')
} else {
    console.log('am on test');
    module.exports = require('./dev')
}
