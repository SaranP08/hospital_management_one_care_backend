const slots = require("../../../models/slots");

const availableSlots = async (req, res) => {
  const bookingDate = new Date(req.params.date);
  const doctorId = req.params.did;

  const slot = await slots.findOne(
    { doctorId: doctorId, schedule: { $elemMatch: { date: bookingDate } } },
    { "schedule.$": 1 }
  );
  if (!slot) {
    res.status(200).json({ slots: [] });
  } else {
    let response = [];
    slot.schedule[0].slotSchedule.forEach((sched) => {
      const date = new Date(sched.startTime);

      // Get hours and minutes in UTC
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      response.push(formattedTime);
    });

    res.status(200).json({ slots: response });
  }
};

module.exports = availableSlots;
