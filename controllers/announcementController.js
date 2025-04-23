const Announcement = require('../models/Announcement');

exports.createAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.create(req.body);
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.findAll();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);
    if (!announcement) return res.status(404).json({ error: 'Not found' });
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const [updated] = await Announcement.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    const updatedAnnouncement = await Announcement.findByPk(req.params.id);
    res.json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const deleted = await Announcement.destroy({
      where: { id: req.params.id },
    });
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
