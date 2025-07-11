const express = require("express");
const router = express.Router();

const {
  createAttendance,
  getAllAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

const { authenticateToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.use(authenticateToken);

router.post('/', (req, res, next) => {
  console.log("➡️  [POST] /api/attendance hit");
  next();
}, createAttendance);

router.get('/', (req, res, next) => {
  console.log("➡️  [GET] /api/attendance hit");
  next();
}, authorizeRoles('admin', 'hr', 'manager'), getAllAttendance);

router.get("/test", (req, res) => {
  console.log("✅ Attendance /test route hit");
  res.send("Attendance route is working");
});

router.get('/:id', (req, res, next) => {
  console.log(`➡️  [GET] /api/attendance/${req.params.id} hit`);
  next();
}, authorizeRoles('admin', 'hr', 'manager'), getAttendanceById);

router.put('/:id', (req, res, next) => {
  console.log(`➡️  [PUT] /api/attendance/${req.params.id} hit`);
  next();
}, authorizeRoles('admin', 'hr'), updateAttendance);

router.delete('/:id', (req, res, next) => {
  console.log(`➡️  [DELETE] /api/attendance/${req.params.id} hit`);
  next();
}, authorizeRoles('admin'), deleteAttendance);

module.exports = router;
