const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const body = req.body;
    const newUser = new User({
      email: body.email,
      password: body.password,
      name: body.name,
      role: body.role,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(404).josn({err})
 }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "secret_Key12345",
      { expiresIn: "24h" }
    );

    res
      .status(200)
      .json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
     res.status(404).josn({err})
  }
};

const listallprofessor= async(req,res)=>{
    try{
      const alluser= await User.find({role:"professor"})
      res.status(200).json(alluser)
    }
    catch (err) {
        res.status(404).josn({err})
     }
}

module.exports = {
  createUser,
  loginUser,
  listallprofessor
};
