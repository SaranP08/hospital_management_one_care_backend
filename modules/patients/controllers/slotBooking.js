const patient = require("../../../models/login");
const doctor = require("../../../models/doctorRegister");
const slots = require("../../../models/slots");

const slotBooking = async (req, res) => {
  try {
    const patientId = req.params.pid;
    const doctorId = req.params.did;
    const {
      firstName,
      lastName,
      gender,
      age,
      email,
      phone,
      consultingFee,
      bookingDate,
      startTime,
      endTime,
    } = req.body;
    if (!firstName) throw new Error("First name is required");
    if (!gender) throw new Error("Gender is required");
    if (!lastName) throw new Error("Last name is required");
    if (!age) throw new Error("age is required");
    if (age < 0) throw new Error("Age must be non negative");
    if (!email) throw new Error("Email address is requried");
    if (!phone) throw new Error("Phone number field is required");
    if (!consultingFee) throw new Error("Consulting fee is required");
    if (consultingFee < 0) throw new Error("Consulting fee is non negative");
    if (phone.length !== 10) throw new Error("Enter valid phone number");
    const currentDate = new Date();
    const convertedDate = new Date(bookingDate);
    const currentDateString = currentDate.toISOString().split("T")[0];
    const convertedDateString = convertedDate.toISOString().split("T")[0];

    // Compare the date parts
    if (currentDateString === convertedDateString) {
      if (currentDate.getHours() >= new Date(startTime).getUTCHours())
        throw new Error("Enter valid startTime");
    }

    const checkId = await doctor.findOne({ _id: doctorId });
    if (!checkId) throw new Error("Doctor is not available");
    const isDoctor = await slots.findOne({ doctorId: doctorId });

    if (!isDoctor) {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age,
        email: email,
        phone: phone,
        doctorId: doctorId,
        fee: consultingFee,
        schedule: [
          {
            date: bookingDate,
            slotSchedule: [
              {
                startTime: startTime,
                endTime: endTime,
                patientId: patientId,
              },
            ],
          },
        ],
      };

      const bookSlot = new slots(payload);
      await bookSlot.save();

      return res.status(200).json({ status: "Booked successfully", bookSlot });
    } else {
      let slotExist = false;
      let dateFound = false;

      for (const sched of isDoctor.schedule) {
        const schedDate = new Date(sched.date).toISOString().split("T")[0];
        console.log(schedDate);
        console.log(bookingDate);
        if (schedDate === bookingDate) {
          dateFound = true;
          console.log(dateFound);
          for (const slot of sched.slotSchedule) {
            const slotStartTime = new Date(slot.startTime).toISOString();
            const reqStartTime = new Date(startTime).toISOString();
            if (slotStartTime === reqStartTime) {
              slotExist = true;
              break;
            }
          }
          break;
        }
      }
      console.log(slotExist);

      if (slotExist) {
        return res.status(500).json({ status: "Slot not available" });
      } else {
        if (dateFound) {
          const updateSchedule = await slots.updateOne(
            { doctorId: doctorId, "schedule.date": bookingDate },
            {
              $push: {
                "schedule.$.slotSchedule": {
                  startTime: startTime,
                  endTime: endTime,
                  patientId: patientId,
                },
              },
            }
          );

          if (!updateSchedule)
            throw new Error("Error occurred while updating slots");

          return res.status(200).send({ message: "Slot booked successfully" });
        } else {
          isDoctor.schedule.push({
            date: bookingDate,
            slotSchedule: [
              {
                startTime: startTime,
                endTime: endTime,
                patientId: patientId,
              },
            ],
          });
          await isDoctor.save();
          return res.status(200).send({ message: "Slot booked successfully" });
        }
      }
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = slotBooking;
