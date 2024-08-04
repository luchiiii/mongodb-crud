const http = require("http");
const app = require("./app")
const httpServer = http.createServer(app);
const { PORT } = require("./config/index");
const connectDb = require("./helpers/dbConfig.js");

const startServer = async () => {
    await connectDb();
    httpServer.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`);
    });
};

startServer();