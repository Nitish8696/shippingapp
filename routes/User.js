const express = require("express");
const {
  GetAllUser,
  DeleteUser,
  UpdateUser,
  GetSingleUser,
  updateUsername,
  updateEmail,
} = require("../controllers/userController.js");

const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./VerifyToken.js");

const router = express.Router();

router.put("/:id", verifyToken, UpdateUser);
router.put("/email/:id", verifyToken, updateEmail);
router.put("/username/:id", verifyToken, updateUsername);
router.delete("/:id", verifyToken, DeleteUser);
router.get("/find/:id", verifyToken, GetSingleUser);
router.get("/", verifyTokenAndAdmin, GetAllUser);

module.exports = router;
