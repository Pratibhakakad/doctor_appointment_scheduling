"use client";
import { useState,useEffect } from "react";
import { DOCTORS, PATIENTS } from "../../lib/mock";
import Image from "next/image";
import SessionTimeModal from "../../components/SessionTimeModal";

export default function SchedulePage() {
  const [selectedDoctor] = useState(DOCTORS[0].id);
  const [selectedPatient] = useState(PATIENTS[0].id);
  const [sessionType, setSessionType] = useState("In-Person");
  const [date, setDate] = useState("2025-11-20");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
  if (openModal) {
   
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [openModal]);

  return (
    <div
      className="w-[390px] h-[844px] mx-auto bg-gradient-to-b from-[#DFDAFB] to-[#F9CCC5] relative overflow-y-auto"
    >

      <div className="absolute top-[50px] left-0 w-[390px] h-[40px] flex items-center px-4">
        <button className="mr-4">&larr;</button>
        <h2 className="font-quicksand font-medium text-[16px] leading-[16px] text-black">
          Schedule Session
        </h2>
      </div>


      <div className="absolute top-[99.5px] left-[16px] w-[360px] flex flex-col gap-[27px]">

        <div className="flex flex-col gap-[6px] w-[358px]">
          <span className="text-black opacity-50 font-quicksand font-medium text-[14px] leading-[16px]">
            Patient
          </span>
          <div className="flex items-center justify-between w-[358px] h-[58px] bg-white rounded-[10px] p-2">
            <div className="flex items-center gap-[12px]">
              <Image
                src={PATIENTS.find((p) => p.id === selectedPatient).photo}
                alt="patient"
                width={42}
                height={42}
                className="rounded-[20px]"
              />
              <div className="flex flex-col gap-[5px]">
                <span className="font-quicksand font-semibold text-[14px] leading-[16px] w-[97px]">
                  {PATIENTS.find((p) => p.id === selectedPatient).name}
                </span>
                <span className="font-quicksand font-medium text-[11px] leading-[14px] text-[#6D6A5D]">
                  {PATIENTS.find((p) => p.id === selectedPatient).phone}
                </span>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-[8px]">
          <span className="font-quicksand font-medium text-[14px] leading-[16px] text-black opacity-50">
            Assign Practitioner
          </span>
          <div className="flex items-center justify-between w-[359.75px] h-[58px] bg-white rounded-[12px] p-2">
            <div className="flex items-center gap-[12px]">
              <Image
                src={DOCTORS.find((d) => d.id === selectedDoctor).photo}
                alt="doctor"
                width={42}
                height={42}
                className="rounded-[20px]"
              />
              <div className="flex flex-col gap-[5px]">
                <span className="font-quicksand font-semibold text-[14px] leading-[16px] w-[97px]">
                  {DOCTORS.find((d) => d.id === selectedDoctor).name}
                </span>
                <span className="font-quicksand font-medium text-[11px] leading-[14px] text-[#6D6A5D]">
                  {DOCTORS.find((d) => d.id === selectedDoctor).phone}
                </span>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col gap-[8px]">
          <span className="font-quicksand font-medium text-[14px] leading-[16px]">
            Session Type
          </span>
          <select
            className="w-[360px] h-[39px] bg-white rounded-[8px] px-2"
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
          >
            <option value="Counselling">Counselling</option>
            <option value="Checkup">Checkup</option>
            <option value="Consultation">Consultation</option>
          </select>
        </div>


        <div className="flex flex-col gap-[8px] w-[209px]">
          <span className="font-quicksand font-medium text-[14px] leading-[16px]">
            Session Mode
          </span>
          <div className="flex gap-[16px]">
            {["In-Person", "Online"].map((t) => (
              <label key={t} className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={sessionType === t}
                  onChange={() => setSessionType(t)}
                />
                <span className="font-quicksand font-medium text-[14px]">
                  {t}
                </span>
              </label>
            ))}
          </div>
        </div>


        <div className="flex gap-[8px]">
          <div className="flex flex-col gap-2 mt-2">
            <span
              className="font-quicksand font-medium text-sm leading-4 text-black opacity-50"
              style={{ width: "100px", minHeight: "16px" }}
            >
              Session Date
            </span>
            <input
              type="date"
              className="w-full max-w-[180px] h-[44px] md:h-[48px] bg-white rounded-lg px-3 border border-gray-300"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <span
              className="font-quicksand font-medium text-sm leading-4 text-black"
              style={{ minWidth: "115px", minHeight: "16px" }}
            >
              Session Time
            </span>
            <button
              onClick={() => setOpenModal(true)}
               className="w-full max-w-[170px] h-[44px] md:h-[48px] bg-white rounded-lg px-3 border border-gray-300 text-left"
            >
              {selectedSlot ? selectedSlot : "HH:MM"}
            </button>
          </div>

        </div>

        <div className="flex flex-col h-full py-4">
          {sessionType === "Online" && (
            <div className="flex flex-col gap-[8px]">
              <span
                className="font-quicksand font-medium text-[14px] leading-[16px] text-black opacity-50"
                style={{ width: "125px", height: "16px" }}
              >
                Online Session Link
              </span>

              <input
                type="text"
                placeholder="Enter session link"
                className="w-[360px] h-[39px] bg-white rounded-[7.26px] px-2"
              />
            </div>
          )}

          <div className="w-[360px] h-[124px] flex flex-col gap-[4px] mb-4
           mt-[4px]">
            <span className="font-quicksand font-medium text-[14px] leading-[16px]">
              Session Details (Optional)
            </span>
            <textarea
              placeholder="Add notes..."
              className="w-[360px] h-[100px] bg-white rounded-[7.26px] p-2"
            />
          </div>
          <div className="flex gap-[12px] w-[358.22px] h-[45.5px] mt-auto mx-auto">
            <button
              className="w-[173px] h-[45px] bg-gray-400 rounded-[8px] opacity-50 text-white font-quicksand font-semibold"
              onClick={() => console.log("Cancel")}
            >
              Cancel
            </button>
            <button
              className="w-[173px] h-[45px] bg-purple-600 rounded-[8px] text-white font-quicksand font-semibold"
              onClick={() => console.log("Confirm")}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      {openModal && (
  <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm overflow-y-auto flex justify-center">
    <div className="mt-auto mb-0 w-[390px] bg-white shadow-lg rounded-t-2xl">
      <SessionTimeModal
        onClose={() => setOpenModal(false)}
        onConfirm={(time) => {
          setSelectedSlot(time);
          setOpenModal(false);
        }}
      />
    </div>
  </div>
)}



    </div>
  );
}
