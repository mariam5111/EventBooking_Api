const express = require("express");
const cors = require("cors");


const userRouter = require("./routes/user.routes");
const eventRouter = require("./routes/event.routes");
const bookingRouter = require("./routes/booking.routes");


const errorHandler = require("./middleware/errorHandler");
const AppError = require("./utils/appError");

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/bookings", bookingRouter);


app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(errorHandler);

module.exports = app;