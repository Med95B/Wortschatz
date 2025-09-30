import User from "../models/User.js";
import jwt from "jsonwebtoken";
import activationMail from "../services/userActivationMail.js";

const generateToken = (user, time) => {
  return jwt.sign({user} , process.env.JWT_SECRET, { expiresIn: time });
};

// Inscription avec envoi mail
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const newUser = { username, email, password};

    // Generer token deactivation
    const activationToken = generateToken(newUser, "5m");
    const activationUrl = `${process.env.FRONT_URI}activation/${activationToken}`;

    // Envoi mail
    await activationMail({
      email: newUser.email,
      subject: "Activez votre compte",
      message: `Bonjour ${newUser.username}, cliquez ici pour activer votre compte : ${activationUrl}`,
    });

    res.status(201).json({
      message: `Vérifiez votre email (${newUser.email}) pour activer votre compte !`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Activation user
export const activation = async (req, res) => {
  const { token } = req.body;

  try {
    const newUser = jwt.verify(token, process.env.JWT_SECRET);

    if (!newUser) {
      return res.status(400).json({ message: "Token invalide" });
    }

    const { username, email, password } = newUser.user;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    user = new User({ username, email, password });
    const savedUser = await user.save();

    res.status(201).json({
      message: "Compte activé avec succès, vous pouvez maintenant vous connecter",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Connexion
export const login = async (req, res) => {
  
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
     
      const token = generateToken(user, "30d");
       
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        token
      });
    } else {
      res.status(400).json({ message: "Identifiants invalides" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Obtenir les infos du user connecte
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

