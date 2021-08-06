import mongoose, { Connection } from "mongoose"

const DBURL: string = `mongodb+srv://${process.env.MONGOOSE_USERNAME}:${process.env.MONGOOSE_PASSWORD}@cluster0.jpduk.mongodb.net/${process.env.MONGOOSE_DATABASE_NAME}?retryWrites=true&w=majority`

var database: Connection

export const mongooseconnection = () => {
    mongoose.connect(DBURL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    database = mongoose.connection;
    database.once("open", () => {
        console.log(`${process.env.MONGOOSE_DATABASE_NAME} Database Connected..`)
    })
    database.on("error", (error) => {
        console.log(`Error connecting to ${process.env.MONGOOSE_DATABASE_NAME} database` + error);
    });
}

export const mongoosedisconnect = () => {
    console.log(`${process.env.MONGOOSE_DATABASE_NAME} Database disconnected..`)
    mongoose.disconnect();
};
