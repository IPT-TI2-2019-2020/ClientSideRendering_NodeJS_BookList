const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const bookRoute = require("./routes/book-route.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/hello", (req, res) => res.send('HELLO WORLD'));
app.use("/book", bookRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`\x1b[32m(PLAIN) Server Listening on Port ${port}\x1b[0m.`);
})