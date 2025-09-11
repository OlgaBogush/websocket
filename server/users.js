let users = []

const findUser = (user) => {
  const userName = user.name.trim().toLowerCase()
  const userRoom = user.room.trim().toLowerCase()

  return users.find(
    (item) =>
      item.name.trim().toLowerCase() === userName &&
      item.room.trim().toLowerCase() === userRoom
  )
}

const addUser = (user) => {
  const isExist = findUser(user)

  !isExist && users.push(user)

  const currentUser = isExist || user
  return {
    isExist: !!isExist,
    user: currentUser,
  }
}

const getRoomUsers = (room) => {
  return users.filter((item) => item.room === room)
}

module.exports = { addUser, findUser, getRoomUsers }
