import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "./firebase";

const doctorDirectory = {
  derma123: { name: "Dr. Singhania", specialty: "Dermatology" },
  ent123: { name: "Dr. Sharma", specialty: "ENT" },
  ortho123: { name: "Dr. Mehta", specialty: "Orthopedic" },
  dental123: { name: "Dr. Gupta", specialty: "Dental" },
};

export async function bookAppointment(doctorId, time) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const roomId = `appointment-${Date.now().toString(36)}-${user.uid.slice(0, 6)}`;
  const doctor = doctorDirectory[doctorId] || { name: "Doctor", specialty: "General" };

  await addDoc(collection(db, "appointments"), {
    patientId: user.uid,
    patientEmail: user.email || "",
    doctorId,
    doctorName: doctor.name,
    doctorSpecialty: doctor.specialty,
    time,
    roomId,
    status: "booked",
    doctorNotified: false,
    createdAt: serverTimestamp(),
  });

  return roomId;
}
