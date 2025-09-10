let users = []

const addUser = (user) => {
  const userName = user.name.trim().toLowerCase()
  const userRoom = user.room.trim().toLowerCase()

  const isExist = users.find(
    (item) =>
      item.name.trim().toLowerCase() === userName &&
      item.room.trim().toLowerCase() === userRoom
  )
  !isExist && users.push(user)

  const currentUser = isExist || user
  return {
    isExist: !!isExist,
    user: currentUser,
  }
}

module.exports = { addUser }
