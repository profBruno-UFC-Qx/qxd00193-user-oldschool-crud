import { User } from "../models/user"

const users: User[] = [
  {
    id: 1, username: 'fulano', email: 'fulano@mail.com'
  },
  {
    id: 2, username: 'joazinho', email: 'joazinhonota10@mail.com'
  },
  {
    id: 3, username: 'beltrano', email: 'beltrano@mail.com'
  }
]

class UserService {
  constructor() {

  }

  getAll() : User[] {
    return users
  }

  getById(id: number): User | undefined {
    return users.find(u => u.id === id)
  }

  add(user: Omit<User, 'id'>): User {
    const lastId = users.reduce((acc: number, currentUser) => Math.max(acc, currentUser.id), 0)
    const newUser = {
      id: lastId + 1,
      username: user.username,
      email: user.email
    }
    users.push(newUser)
    return newUser
  }

  delete(id: number): User | undefined {
    const index = users.findIndex(u => u.id === id)
    if(index != -1) {  
      return users.splice(index, 1)[0]
    } else {
      return undefined
    }
  }
}

export default UserService;