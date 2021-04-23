import express from 'express'
import './database'
import {createServer } from 'http'
import { Server, Socket } from "socket.io"
import { routes } from './routes'
import path from "path"
const app = express();
const http = createServer(app)
const io = new Server(http)


app.use(express.static(path.join(__dirname, ".." ,"public")))
app.set("views", path.join(__dirname, '..' ,'public'))
app.engine("html", require("ejs").renderFile)
app.set("view engine", "html")
app.use(express.json())
app.use(routes)

io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id)
})




app.get("/pages/client", (request, response) => {
    return response.render("html/client.html")
})
app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html")
})

export {http, io}