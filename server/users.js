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

const removeUser = (user) => {
  const found = findUser(user)
  if (found) {
    const index = users.findIndex(
      ({ room, name }) => room === found.room && name === found.name
    )
    users.splice(index, 1)
  }
  return found
}

module.exports = { addUser, findUser, getRoomUsers, removeUser }
