import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
// import WebSocket, { WebSocketServer } from "ws";


const app = express();
app.use(cors())
const port = 8080;
app.use(bodyParser.json());

app.use('/api/v1/users', userRoutes);

const httpServer = app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
