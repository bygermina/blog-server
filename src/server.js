const express = require('express');

const webserver = express();

webserver.use(express.json());

const PORT = process.env.NODE_ENV === "development" ? 3050 : 7780;

webserver.listen(PORT, () => {
    console.log("web server running on port " + PORT);
});
