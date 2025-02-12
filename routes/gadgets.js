const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const {
    getGadgets,
    addGadget,
    updateGadget,
    deleteGadget,
    triggerSelfDestruct,
} = require("../controllers/gadgetController");

router.get("/", authenticateToken, getGadgets);
router.post("/", authenticateToken, addGadget);
router.patch("/:id", authenticateToken, updateGadget);
router.delete("/:id", authenticateToken, deleteGadget);
router.post("/:id/self-destruct", authenticateToken, triggerSelfDestruct);

module.exports = router;
