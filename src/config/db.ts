import mongoose,{ConnectOptions,connect} from "mongoose";

const DB_NAME = process.env.DB_DBNAME || "";
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";

const url = `${DB_HOST}:${DB_PORT}/${DB_NAME}`;
console.log(url)

if (!DB_HOST) {
    console.error("DB_URI not found in environment variables!");
    process.exit(1);
  }

  mongoose.connection.on("connected", () => {
    console.log("Connected to database", DB_NAME);
  });

  mongoose.connection.on("error", (err) => {
    console.error(`Database connection error: ${err}`);
    process.exit(1);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from database");
  });
  

  const connectToDb = async (): Promise<void> => {
    try {
      const options: ConnectOptions = {
        auth: {
            username: DB_USERNAME,
            password: DB_PASSWORD
        },
          retryWrites: false
      };
      await mongoose.connect(url,options as any).then(res => console.log(`dbconfig: connected to cosmos DB: ${url}`));
    } 
    catch (error) {
      console.error("Error connecting to MongoDB:", error);
      process.exit(1);
    }
  };
  

// const connectToDb =()=>{
//     return mongoose.connect(url).then(res => console.log(`dbconfig: connected to cosmos DB: ${url}`));

// }
  export default connectToDb;