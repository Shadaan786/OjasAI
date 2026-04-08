import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "./firebase";

const doctorDirectory = {
  derma123: { name: "Dr. Singhania", specialty: "Dermatology" },
  ent123: { name: "Dr. Sharma", specialty: "ENT" },
  ortho123: { name: "Dr. Mehta", specialty: "Orthopedic" },
  dental123: { name: "Dr. Gupta", specialty: "Dental" },
};

export async function bookAppointment(doctorId, time, options = {}) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const roomId = `appointment-${Date.now().toString(36)}-${user.uid.slice(0, 6)}`;
  const doctor =
    doctorDirectory[doctorId] || { name: "Doctor", specialty: "General" };

  const [datePart, timePart] = (time || "").split(" ");
  const [year, month, day] = (datePart || "").split("-").map(Number);
  const [hour, minute] = (timePart || "").split(":").map(Number);

  const isDatePartValid =
    Number.isInteger(year) &&
    Number.isInteger(month) &&
    Number.isInteger(day) &&
    year >= 2000 &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 31;

  const isTimePartValid =
    Number.isInteger(hour) &&
    Number.isInteger(minute) &&
    hour >= 0 &&
    hour <= 23 &&
    minute >= 0 &&
    minute <= 59;

  if (!isDatePartValid || !isTimePartValid) {
    throw new Error("Please select a valid date and time slot.");
  }

  const appointmentDate = new Date(year, month - 1, day, hour, minute);

  if (Number.isNaN(appointmentDate.getTime())) {
    throw new Error("Unable to parse appointment date. Please reselect date and time.");
  }

  if (appointmentDate.getTime() <= Date.now()) {
    throw new Error("Appointment must be scheduled for a future time.");
  }

  try {
    const notifyDoctorOnBooking = Boolean(options.notifyDoctorOnBooking);

    await addDoc(collection(db, "appointments"), {
      patientId: user.uid,
      patientEmail: user.email || "",
      doctorId,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      time,
      appointmentDate: appointmentDate.toISOString(),
      appointmentAt: Timestamp.fromDate(appointmentDate),
      roomId,
      status: "booked",
      doctorNotified: notifyDoctorOnBooking,
      doctorNotificationRequestedAt: notifyDoctorOnBooking
        ? serverTimestamp()
        : null,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    const firebaseCode = error?.code || "";

    if (firebaseCode.includes("permission-denied")) {
      console.warn(
        "Firestore booking write denied. Continuing with direct room entry.",
        error
      );
      return roomId;
    }

    throw error;
  }

  return roomId;
}
