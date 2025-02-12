const Gadget = require("../models/gadget");
const {
    getRandomSuccessProbability,
    generateCodename,
} = require("../utils/index");

const getGadgets = async (req, res) => {
    try {
        const { status } = req.query;
        const whereClause = status ? { status } : {}; // Build the where clause based on the status query parameter
        const gadgets = await Gadget.findAll({ where: whereClause });
        const gadgetsWithProbability = gadgets.map((gadget) => ({
            ...gadget.toJSON(),
            successProbability: `${getRandomSuccessProbability()}% success probability`,
        }));
        res.set("Content-Type", "application/json");
        res.json(gadgetsWithProbability);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve gadgets" });
    }
};

const addGadget = async (req, res) => {
    try {
        const newGadget = await Gadget.create({
            name: generateCodename(),
            status: "Available",
        });
        res.set("Content-Type", "application/json");
        res.status(201).json(newGadget);
    } catch (error) {
        res.status(500).json({ error: "Failed to add gadget" });
    }
};

const updateGadget = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Gadget.update(req.body, { where: { id } });
        if (updated) {
            const updatedGadget = await Gadget.findOne({ where: { id } });
            res.set("Content-Type", "application/json");
            res.status(200).json(updatedGadget);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update gadget" });
    }
};

const deleteGadget = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Gadget.update(
            { status: "Decommissioned", decommissionedAt: new Date() },
            { where: { id } }
        );
        if (updated) {
            const decommissionedGadget = await Gadget.findOne({
                where: { id },
            });
            res.set("Content-Type", "application/json");
            res.status(200).json(decommissionedGadget);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to decommission gadget" });
    }
};

const triggerSelfDestruct = async (req, res) => {
    try {
        const { id } = req.params;
        const confirmationCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();
        res.set("Content-Type", "application/json");
        res.status(200).json({ confirmationCode });
    } catch (error) {
        res.status(500).json({
            error: "Failed to trigger self-destruct sequence",
        });
    }
};

module.exports = {
    getGadgets,
    addGadget,
    updateGadget,
    deleteGadget,
    triggerSelfDestruct,
};
