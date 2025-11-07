import User from "../models/users.js";

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.genAuthToken()
    await user.save();
    res.status(201).send({user, token});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getMyUsers = async (req, res) => {
  res.send(req.user)
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

const updateUserById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    updates.forEach(update => user[update] = req.body[update]);
    await user.save();
    
    res.send(user);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.genAuthToken()
    res.send({user, token})
  } catch (e) {
    res.status(400).send('Invalid Login')
  }
}

export { createUser, getMyUsers, getUserById, updateUserById, deleteUser, loginUser };