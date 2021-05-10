const auth = require("basic-auth");

const admin = {
    "dbdesign": { password: process.env.ENTRY_KEY }
};

module.exports = (request, response, next) => {
    const user = auth(request);
    if (!user || !admin[user.name] || admin[user.name].password !== user.pass) {
        response.set('WWW-Authenticate', 'Basic realm="example');
        return response.status(401).send();
    }
    return next();
};
