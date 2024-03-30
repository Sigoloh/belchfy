const { Script } = require("vm");

module.exports = {
    apps: [
        {
            name: "backend",
            script: "./dist/app.js"
        }
    ]
}