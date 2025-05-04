const slots = require("../../../models/slots");

const cancelBooking = async (req, res) => {
  const { doctorId, slotId, scheduleId } = req.body;
  if (!doctorId) throw new Error("Doctor id is required");
  if (!slotId) throw new Error("Slot id is required");

  const isDoctor = await slots.findOne({ doctorId: doctorId });
  if (!isDoctor) throw new Error("No slots are there to remove");

  const cancelBooking = await slots.updateOne(
    { doctorId: doctorId, "schedule._id": scheduleId },
    {
      $pull: {
        "schedule.$.slotSchedule": {
          _id: slotId,
        },
      },
    }
  );

  if (!cancelBooking)
    throw new Error("Error occured while booking cancellation");

  res.status(200).json({ status: "Cancelled successfully" });
};

module.exports = cancelBooking;
