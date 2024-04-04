import { Request, Response } from "express"
import UserService from "../services/userService"

export function getUsers(_: Request, res: Response){
  const userService = new UserService()
  res.render('index', {
    pageTitle: 'Users list',
    users: userService.getAll()
  })
}

export function addUserForm(_: Request, res: Response){
  res.render('form', {
    pageTitle: 'Add a new user'
  })
}

export function addUser(req: Request, res: Response){
  const { name, email } = req.body
  if(name && email) {
    const userService = new UserService()
    userService.add({ username: name, email: email})
    res.redirect("/users")
  } else {
    res.render('form', {
      pageTitle: 'Users added',
      user: { name, email },
      error: "The email field is mandatory"
    })
  }
}

export function getUser(req: Request, res: Response){
  const id = parseInt(req.params.id);

  const userService = new UserService();
  const user = userService.getById(id);

  if (user) {
    res.render("form", {
      pageTitle: "Update information",
      user: user,
    });
  } else {
    res.render("notFound");
  }
}

export function updateUser(req: Request, res: Response){
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const userService = new UserService();
  const user = userService.getById(id);

  if (user) {
    if (name && email) {
      user.username = name;
      user.email = email;
      res.redirect("/users");
    } else {
      res.render("form", {
        pageTitle: "Edit user",
        user: user,
        error: "The email field is mandatory",
      });
    }
  } else {
    res.redirect("/404");
  }
}

export function deleteUser(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const userService = new UserService();
  if (userService.delete(id)) {
    res.redirect("/users/");
  } else {
    res.redirect("/404");
  }
}