const db = require("../models");
const Holiday = db.Holiday;

exports.createHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.create(req.body);
    res.status(201).json(holiday);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.findAll();
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHolidayById = async (req, res) => {
  try {
    const holiday = await Holiday.findByPk(req.params.id);
    if (!holiday) return res.status(404).json({ error: "Holiday not found" });
    res.json(holiday);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findByPk(req.params.id);
    if (!holiday) return res.status(404).json({ error: "Holiday not found" });

    await holiday.update(req.body);
    res.json(holiday);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findByPk(req.params.id);
    if (!holiday) return res.status(404).json({ error: "Holiday not found" });

    await holiday.destroy();
    res.json({ message: "Holiday deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
