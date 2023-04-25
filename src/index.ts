import express, { Request, Response } from "express";
import { router } from "./routes/routes";
import { publicRouter } from "./routes/public";
const app = express();
import bodyParser from 'body-parser';
import config from "./config";
import connectToDb from "./config/db";
import cors from 'cors';

var cron = require('node-cron');
import {CronHelper} from './helpers/cron.helpers';
connectToDb()
  .then(async () => {
    app.use(bodyParser.urlencoded({ extended: false }));
    
    const corsOptions = {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: [
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Accept",
          "Authorization",
          "X-Domain"
      ],
      optionsSuccessStatus: 200
    };
    
    app.use(
      cors(corsOptions),
      bodyParser.json()
      
    );
    app.use("/api/",router);
    app.use("/auth/",publicRouter);

    app.get("/", (req: Request, res: Response): void => {
      res.json({
        data: "Welcome Home",
      });
    });


    cron.schedule('5 * * * *', () => {
      console.log("running generate news cron every  minutes.", '');
      CronHelper.generatePlantFinderJSON();
  });
  //  // Schedule Cron
  //  cron.schedule('*/24 * * *', () => {
  //     console.log("running generate news cron every 120 minutes.", '');
  //     CronHelper.generatePlantFinderJSON();
  //   });
  
  //   // Schedule Cron
  //   cron.schedule('0 5 * * *', () => {
  //    console.log("running generate news cron every everyday at 5 AM.", '');
  //     CronHelper.generatePlantFinderJSON();
  //   });
    app.listen(config.SERVER_PORT, (): void => {
      console.log("server is running on " + config.SERVER_PORT);
    });

  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
