const express = require("express");
const routes = require("./routes/postRoutes"); 
const cors = require("cors"); // Require cors middleware
const app = express();

app.use(cors()); // Use cors middleware
app.use(express.json());
app.use(routes);

app.listen(6001, () => {
    console.log("Server is listening on port 6000");
});
