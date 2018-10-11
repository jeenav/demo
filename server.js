console.log("");
console.log("//************************* Solow  **************************//");
console.log("");




//Import Config
var res = require('dotenv').config();
const config = require('./lib/config'); 
config.dbConfig(config.cfg, (err) => {
    if (err) {
        console.error(err, 'exiting the app.');
        return;
    }

    // load external modules
    const express = require("express");

    // init express app
    const app = express();

    // set server home directory
    app.locals.rootDir = __dirname;

    // config express
    config.expressConfig(app, config.cfg.environment);
    if(err)return res.json(err)

    // attach the routes to the app
    require("./lib/route")(app);

    // start server
    app.listen(config.cfg.port, () => {
        console.info(`Express server listening on ${config.cfg.port}, in ${config.cfg.TAG} mode`);
    });

});
