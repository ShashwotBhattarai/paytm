import express from "express";
import bodyParser from "body-parser";

import connectToDatabase from "./configs/db.config";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../swagger-output.json";
import logger from "./configs/logger.config";

import rootRouter from "./routes/root.router";

const app = express();
app.disable("x-powered-by");
const corsOptions = {
	origin: "http://localhost:3000/",
};
app.use(cors(corsOptions));
const port = 3001;

app.use(bodyParser.json());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

connectToDatabase();
app.use("/api/v1", rootRouter);

app.listen(port, () => {
	logger.info(`Paytm backend Running at port ${port}`);
	logger.info(`API documentation: http://localhost:3001/doc`);
});
