require("./configs/mongodb.js")
  .connectDB()
  .then(() => {
    console.log(`\x1b[32m(PLAIN) Successfuly connected to database server\x1b[0m`);

    const express = require("express");
    const bodyParser = require("body-parser");
    const cors = require("cors");

    const bookRoute = require("./routes/book-route.js");

    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    app.use("/book", bookRoute);
    app.use("/home", (req, res) => res.json({ msg: "HELLO" }));

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`\x1b[32m(PLAIN) Server listening on port ${port}\x1b[0m`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
