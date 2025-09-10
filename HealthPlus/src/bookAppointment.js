// bookAppointment.js
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "./firebase";

export async function bookAppointment(doctorId, time) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  const roomId = `appointment-${Date.now().toString(36)}-${user.uid.slice(0, 6)}`;

  await addDoc(collection(db, "appointments"), {
    patientId: user.uid,
    doctorId,
    time,
    roomId,
    status: "booked",
    createdAt: new Date(),
  });

  return roomId; // ✅ return only data, not JSX
}
