const { Attendance } = require("../models");

const createAttendance = async (req, res) => {
  console.log("🟢 Creating attendance with:", req.body);
  try {
    const { employeeId, date, status, checkIn, checkOut } = req.body;
    const attendance = await Attendance.create({ employeeId, date, status, checkIn, checkOut });
    console.log("✅ Attendance created:", attendance.toJSON());
    res.status(201).json(attendance);
  } catch (error) {
    console.error("❌ Error in createAttendance:", error);
    res.status(500).json({ message: "Failed to create attendance", error: error.message });
  }
};

const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.findAll();
    console.log("✅ All Attendance Fetched:", records.length);
    res.json(records);
  } catch (error) {
    console.error("❌ Error in getAllAttendance:", error);
    res.status(500).json({ message: "Failed to fetch attendance records", error: error.message });
  }
};

const getAttendanceById = async (req, res) => {
  try {
    const record = await Attendance.findByPk(req.params.id);
    if (!record) {
      console.warn("⚠️ Attendance record not found");
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.json(record);
  } catch (error) {
    console.error("❌ Error in getAttendanceById:", error);
    res.status(500).json({ message: "Failed to fetch attendance", error: error.message });
  }
};

const updateAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Attendance record not found" });

    const { status, checkIn, checkOut } = req.body;
    await record.update({ status, checkIn, checkOut });
    console.log("✅ Attendance updated:", record.toJSON());
    res.json(record);
  } catch (error) {
    console.error("❌ Error in updateAttendance:", error);
    res.status(500).json({ message: "Failed to update attendance", error: error.message });
  }
};

const deleteAttendance = async (req, res) => {
  try {
    const record = await Attendance.findByPk(req.params.id);
    if (!record) return res.status(404).json({ message: "Attendance record not found" });

    await record.destroy();
    console.log("✅ Attendance deleted");
    res.json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    console.error("❌ Error in deleteAttendance:", error);
    res.status(500).json({ message: "Failed to delete attendance", error: error.message });
  }
};

module.exports = {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};
