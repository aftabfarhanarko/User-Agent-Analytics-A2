let users = [
  { id: 100002, name: "Aftab Farhan" },
  { id: 2, name: "Rahim Ahmed" },
  { id: 3, name: "Karim Hasan" },
  { id: 4, name: "Sakib Hossain" },
  { id: 5, name: "Nusrat Jahan" },
];

// READ: Get all users
const readAllUser = (req, res) => {
  res.json(users);
};

// READ: Get single user
const readSingleUser = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
};

// CREATE: Add a new user
const postUser = (req, res) => {
  const { id, name } = req.body;

  if (
    typeof id !== "number" ||
    !Number.isInteger(id) ||
    typeof name !== "string" ||
    !name.trim()
  ) {
    return res.status(400).json({
      message: "Valid numeric id and name are required",
    });
  }

  if (users.some((u) => u.id === id)) {
    return res.status(409).json({
      message: "User ID already exists",
    });
  }

  const newUser = {
    id,
    name: name.trim(),
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully",
    user: newUser,
  });
};

// UPDATE: Update an existing user
const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const { name } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      message: "Valid name is required",
    });
  }

  user.name = name.trim();

  res.json({
    message: "User updated successfully",
    user,
  });
};

// DELETE: Remove a user
const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.json({
    message: "User deleted successfully",
    user: deletedUser,
  });
};
module.exports = {
  readAllUser,
  readSingleUser,
  postUser,
  updateUser,
  deleteUser,
};
