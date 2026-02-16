import express from "express";
import multer from "multer";
import userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const upload = multer({
  limits: {
    fileSize: 3.5 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const allowed = /jpg|jpeg|png/i;
    if (allowed.test(file.originalname) && allowed.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

// Auth Routes
router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", auth, userController.logoutUser);
router.post("/logoutAll", auth, userController.logoutAll);

// Profile
router
  .route("/me")
  .get(auth, userController.getMyProfile)
  .patch(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

// Avatar
router
  .route("/me/avatar")
  .get(auth, userController.showAvatar)
  .delete(auth, userController.deleteAvatar)
  .post(
    auth,
    upload.single("avatar"),
    userController.uploadAvatar
  );

// Address & Phone
router.patch("/:userId/address/:addressId", auth, userController.updateAddressField);
router.patch("/:userId/phone/:phoneId", auth, userController.updatePhoneNumberField);
router.delete("/:userId/address/:addressId", auth, userController.removeAddressField);

export default router;
