import userService from "../services/user.services";
import bcrypt from "bcrypt";
var jwt = require("jsonwebtoken");
import { v4 as uuidv4 } from "uuid";
const signUp = async (req: any, res: any) => {
  try {
    let { username, email, password } = req.body;
    let requestObject: any = {
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 9),
    };
    let user = await userService.signUp(requestObject);
    if (user) {
      return res.status(200).json({
        status: 200,
        message: "ok",
        data: user,
      });
    }
  } catch (err: any) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
};

const login = async (req: any, res: any) => {
  try {
    let { email, password } = req.body;
    let user: any = await userService.getUserByEmailId(email);
    if (!user) {
      res.status(404).json({
        status: 404,
        data: { message: "User Not found." },
      });
    }

    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      // return res.status(401).send({
      //   accessToken: null,
      //   message: "Invalid Password!"
      // });
      return res.status(401).json({
        status: 401,
        data: { accessToken: null, message: "Invalid Password!" },
      });
    }
    var token = jwt.sign({ id: user._id }, process.env.JWTSECRATE, {
      expiresIn: process.env.JWTEXPIRATION
    });

    res.status(200).json({
      status: 200,
      data: {
        accessToken: token,
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err: any) {
    res.status(500).send({
      status: 500,
      message: err.message,
    });
  }
};

export { signUp, login };
