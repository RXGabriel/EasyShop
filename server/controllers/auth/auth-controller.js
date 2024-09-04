const User = require("../../models/User");
const bcrypt = require("bcryptjs");

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

module.exports = { registerUser };
