"use client";

import Link from "next/link";
import Image from "next/image";
import { DOCTORS, PATIENTS } from "../lib/mock";
import { useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState(false);

  const upcoming = {
    time: "11:00 AM",
    date: "Tuesday, March 6, 2025",
    doctor: DOCTORS[0],
    duration: "01:00 Hr",
    mode: "Online",
  };

  const pastSessions = [
    {
      time: "12:00 AM",
      doctor: DOCTORS[1].name,
      date: "Monday, March 5, 2025",
    },
    {
      time: "10:30 AM",
      doctor: DOCTORS[2].name,
      date: "Monday, March 5, 2025",
    },
    {
      time: "09:30 AM",
      doctor: DOCTORS[3]?.name ?? "Dr. Neeta Singh",
      date: "Tuesday, Feb 25, 2025",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#D7C8FF] to-[#FFC7C7] p-6 flex justify-center">
      <div className="w-[390px]">


        <div className="mt-2 flex items-center justify-between w-full">
          <div className="flex flex-col">
            <p className="text-[14px] text-gray-700">Good morning,</p>
            <h2 className="text-[20px] font-semibold text-gray-900">
              {PATIENTS[0].name}
            </h2>
          </div>
          <div
            className="
        w-[86.74px] h-[32px]
        rounded-[10px]
        flex items-center justify-center
        gap-[16px]
      "
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="/doc_img.JPG"
                alt="Patient Profile"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-row items-center gap-[10px]">
          <div className="w-[290px] h-[40px]
        bg-white/80
        border border-black/10
        rounded-[10px]
        flex items-center
        px-[16px] py-[11px]
        gap-[10px]
      ">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Psychologists..."
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-600"
            />
            <FiSearch className="text-gray-700 text-xl" />
          </div>
          <div
            className="
        w-[42px] h-[42px]
        flex items-center justify-center
        bg-white/80
        border border-black/10
        rounded-[10px]
        px-[16px] py-[11px]
      "
          >
            <FiFilter className="text-gray-700 w-[24px] h-[20px]" />

          </div>
        </div>

        <h3 className="mt-6 text-gray-700 font-semibold text-[15px]">
          Upcoming Session
        </h3>

        <div className="mt-3 w-[342px] flex flex-col bg-white/50 backdrop-blur-lg rounded-[16px] p-4 gap-3 shadow">

          <div className="flex items-center justify-between">
            <p className="text-[18px] font-bold">{upcoming.time}</p>

            <div className="flex items-center gap-2">
              <Image
                src={upcoming.doctor.image}
                alt={upcoming.doctor.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <p className="font-medium text-gray-800">{upcoming.doctor.name}</p>
            </div>
          </div>


          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-700">
              Session Duration: {upcoming.duration}
            </p>
            <p className="text-sm text-gray-700">
              Session Mode: {upcoming.mode}
            </p>
          </div>



          <div className="flex flex-row items-center justify-between mt-2">

            <button
              disabled={completed}
              onClick={() => setCompleted(true)}
              className={`
      w-[138px]
      py-2 px-4
      rounded-[8px]
      font-quicksand font-semibold
    text-[12px] leading-[16px]
    text-[#0000001A]    /* 10% opacity */
      ${completed ? "bg-green-500" : "bg-gradient-to-r from-[#BBA3E4] to-[#E7A1A0]"}
    `}
            >
              {completed ? "Completed" : "Mark as Completed"}
            </button>
            <div className="flex flex-col">
              <span className="text-[13px] text-gray-600 leading-none">
                Previous Session:
              </span>
              <span className="text-xs text-gray-500">
                {upcoming.date}
              </span>
            </div>

          </div>

        </div>


        <h3 className="mt-6 text-gray-700 font-semibold text-[15px]">
          Past Sessions
        </h3>

        <div className="space-y-3 mt-2">
          {pastSessions.map((s, idx) => (
            <div
              key={idx}
              className="w-[342px] h-[65px] bg-white/50 backdrop-blur-lg rounded-[12px]
                       px-3 py-2 flex flex-col justify-center"
            >
              <div className="w-full flex items-center justify-between">


                <span className="w-[56px] text-center font-semibold text-[13px]">
                  {s.time}
                </span>


                <div className="flex flex-col gap-[3px]">
                  <span className="font-medium text-[15px]">{s.doctor}</span>
                  <span className="text-[13px] text-gray-600 leading-none">Previous Session:</span>
                  <span className="text-xs text-gray-500">{s.date}</span>
                </div>

              </div>
            </div>
          ))}
        </div>


        <Link href="/schedule">
          <button className="mt-6 top-[772px] 
      left-[24px]
      w-[342px] 
      h-[45px] bg-gradient-to-r from-[#B0A4F5] to-[#EDA197]
text-white py-3 rounded-xl shadow-md text-[16px]">
            Schedule Now
          </button>
        </Link>

      </div>
    </div>
  );

}