const express = require("express");
const sequelize = require("./config/database");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const gadgetRoutes = require("./routes/gadgets");
const userRoutes = require("./routes/users");

app.use("/gadgets", gadgetRoutes);
app.use("/users", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize.sync({ alter: true }).then(() => {
    console.log("Database synced successfully");
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
