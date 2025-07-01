import express from "express";
const router = express.Router();

router.get("/ping", (req, res) => {
  res.status(200).send("Backend is alive ✅");
});
router.head("/ping", (req, res) => {
  res.status(200).send();
});

export default router;
