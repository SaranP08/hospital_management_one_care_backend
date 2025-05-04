const Slots = require("../../../models/slots"); // Adjust the path as needed

const findPatientBookingSlots = async (req, res) => {
  try {
    const patientId = req.params.patientId; // Assuming patientId is passed as a parameter

    // Find all slots documents
    const slots = await Slots.find({}).exec();
    console.log(slots);
    // Filter and map the results
    const results = slots.flatMap((slot) =>
      slot.schedule.flatMap((schedule) =>
        schedule.slotSchedule
          .filter(
            (slotSchedule) => slotSchedule.patientId.toString() === patientId
          )
          .map((slotSchedule) => ({
            slotId: slotSchedule._id,
            scheduleId: schedule._id,
            doctorId: slot.doctorId,
            date: schedule.date,
            startTime: slotSchedule.startTime,
            endTime: slotSchedule.endTime,
          }))
      )
    );

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = findPatientBookingSlots;
