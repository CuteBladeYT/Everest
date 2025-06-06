import * as http from "http";
import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
// const http = require("http");
// const express = require("express");
// const socketio = require("socket.io");
// const path = require("path");
const __dirname: string = path.resolve("./");

const SERVER_PORT = 3003;
const SERVER_URL = `http://127.0.0.1:${SERVER_PORT}`;

const app = express();
const httpserver = new http.Server(app);
const io = new socketio.Server(httpserver);

const sitedir = path.join(__dirname, "static");

app.use(express.static(sitedir));

httpserver.listen(SERVER_PORT);

console.log(`Server listened on ${SERVER_URL}`);

io.on("connection", async (socket) => {
    
});