const appointments = [];

const addAppointment = (doctor, patient, date, time, symptoms) => {
  const appointment = {
    id: appointments.length + 1,
    doctor,
    patient,
    date,
    time,
    symptoms,
    status: 'pending',
  };
  appointments.push(appointment);
  return appointment;
};

const getAppointments = () => appointments;

const getAppointmentById = (id) => appointments.find((app) => app.id === id);

module.exports = {
  addAppointment,
  getAppointments,
  getAppointmentById,
};
