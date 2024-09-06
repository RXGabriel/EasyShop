const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (checkUser)
      return res.json({
        success: false,
        message: "Usuário já existe com o mesmo email",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashPassword });

    await newUser.save();
    res
      .status(200)
      .json({ success: true, message: "Usuário criado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Ocorreu um erro" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "Usuário não existe! Crie uma conta",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Senha inválida! Tente novamente",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Login realizado com sucesso",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Ocorreu um erro" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Sessão encerrada com sucesso",
  });
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Usuário não autenticado" });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Usuário não autenticado" });
  }
};
module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
