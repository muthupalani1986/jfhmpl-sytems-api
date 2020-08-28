import http from "http";
import app from "./app";

//Use system configuration for port or use 6004 by default.
const port = process.env.port || 6004;

//Create server with exported express app
const server = http.createServer(app);
server.listen(port,()=>{
	console.log(`Express is running on port ${port}`);
});
