const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const app = express()

const route = require("./route")
const { addUser, findUser, getRoomUsers } = require("./users")

app.use(cors({ origin: "*" }))
app.use(route)

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})



io.on("connection", (socket) => {
  // слушаем событие join и выполняем соотв. манипуляции
  socket.on("join", ({ name, room }) => {
    socket.join(room)
    const { user, isExist } = addUser({ name, room })
    const userMessage = isExist ? `${user.name}, here you go again` : `Hey, my love ${user.name}`
    socket.emit("message", {
      data: { user: { name: "Admin" }, message: userMessage },
    })
    socket.broadcast.to(user.room).emit("message", {
      data: { user: { name: "Admin" }, message: `${user.name} has joined` },
    })
    io.to(user.room).emit("joinRoom", {
      data: {
        users: getRoomUsers(user.room),
      },
    })
  })

  // слушаем событие sendMessage (название события придумали сами) и выполняем соотв. манипуляции
  socket.on("sendMessage", ({ message, params }) => {
    const user = findUser(params)
    if (user) {
      io.to(user.room).emit("message", { data: { user, message } })
    }
  })

  io.on("disconnect", () => {
    console.log("Disconnect")
  })
})



server.listen(4000, () => {
  console.log("Server is running")
})
