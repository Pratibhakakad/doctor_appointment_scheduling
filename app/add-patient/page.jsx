"use client";

import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { PATIENTS, DOCTORS } from "../../lib/mock";

export default function AddPatientPage() {

  const [selectedPatient, setSelectedPatient] = useState(PATIENTS[0].id);
  const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0].id);

  const [sessionType, setSessionType] = useState("Counselling (1 hour)");
  const [mode, setMode] = useState("inperson");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [onlineLink, setOnlineLink] = useState("");
  const [details, setDetails] = useState("");

  const patient = PATIENTS.find((p) => p.id === selectedPatient);
  const doctor = DOCTORS.find((d) => d.id === selectedDoctor);

  const confirmSession = () => {
    if (!date || !time)
      return alert("Please select a valid date & time");

    const summary = {
      patient,
      doctor,
      sessionType,
      mode,
      date,
      time,
      onlineLink: mode === "online" ? onlineLink : null,
      details,
    };

    console.log("BOOKED SESSION:", summary);

    alert(`Session booked with ${doctor.name} on ${date} at ${time}`);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-4 pt-6">
      <h2 className="text-xl font-semibold mb-4">Schedule Session</h2>


      <label className="text-sm text-gray-600 mb-1 block">Select Patient</label>
      <select
        className="w-full bg-white p-3 rounded-xl shadow-sm mb-4 outline-none"
        value={selectedPatient}
        onChange={(e) => setSelectedPatient(Number(e.target.value))}
      >
        {PATIENTS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} — {p.phone}
          </option>
        ))}
      </select>


      <div className="bg-white rounded-xl p-3 flex items-center shadow-sm mb-4">
        <Image
          src={patient.image}
          alt={patient.name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
          sizes="48px"
        />
        <div className="ml-3">
          <p className="font-semibold">{patient.name}</p>
          <p className="text-xs text-gray-500">{patient.phone}</p>
        </div>
      </div>


      <label className="text-sm text-gray-600 mb-1 block">Assign Practitioner</label>
      <select
        className="w-full bg-white p-3 rounded-xl shadow-sm mb-4 outline-none"
        value={selectedDoctor}
        onChange={(e) => setSelectedDoctor(Number(e.target.value))}
      >
        {DOCTORS.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name} — {d.specialization}
          </option>
        ))}
      </select>


      <div className="bg-white rounded-xl p-3 flex items-center shadow-sm mb-4">
        <Image
          src={doctor.image}
          alt={doctor.name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-3">
          <p className="font-semibold">{doctor.name}</p>
          <p className="text-xs text-gray-500">{doctor.specialization}</p>
        </div>
      </div>


      <label className="text-sm text-gray-600 mb-1 block">Session Type</label>
      <select
        className="w-full bg-white p-3 rounded-xl shadow-sm mb-4 outline-none"
        value={sessionType}
        onChange={(e) => setSessionType(e.target.value)}
      >
        <option>Counselling (1 hour)</option>
        <option>Therapy (45 min)</option>
        <option>Consultation (30 min)</option>
      </select>


      <label className="text-sm text-gray-600 mb-1 block">Session Mode</label>
      <div className="flex items-center gap-6 mb-4">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "inperson"}
            onChange={() => setMode("inperson")}
          />
          <span className="text-sm font-medium">In-Person</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={mode === "online"}
            onChange={() => setMode("online")}
          />
          <span className="text-sm font-medium">Online</span>
        </label>
      </div>


      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-sm text-gray-600 mb-1 block">Session Date</label>
          <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              className="w-full outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 mb-1 block">Session Time</label>
          <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <input
              type="time"
              className="w-full outline-none"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
      </div>


      {mode === "online" && (
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-1 block">Online Link</label>
          <input
            type="text"
            placeholder="Add Online Session Link or WhatsApp Number"
            className="w-full bg-white p-3 rounded-xl shadow-sm outline-none"
            value={onlineLink}
            onChange={(e) => setOnlineLink(e.target.value)}
          />
        </div>
      )}


      <div className="mb-5">
        <label className="text-sm text-gray-600 mb-1 block">Session Details (Optional)</label>
        <textarea
          placeholder="Enter session details here"
          className="w-full bg-white p-3 rounded-xl shadow-sm outline-none h-24"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>


      <div className="flex items-center justify-between gap-4">
        <button className="w-1/2 py-3 rounded-xl border border-gray-400 text-gray-700">
          Cancel
        </button>
        <button
          onClick={confirmSession}
          className="w-1/2 py-3 rounded-xl bg-pink-300 text-white font-semibold"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
