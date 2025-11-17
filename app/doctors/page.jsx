"use client";

import { FiSearch, FiFilter, FiGrid, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { DOCTORS } from "../../lib/mock";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [openDoctor, setOpenDoctor] = useState(null);

  const filteredDoctors = DOCTORS.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#DFDAFB] to-[#F9CCC5] p-6 flex justify-center">
      <div className="w-[390px]">

        <div className="mt-4 flex flex-row items-center gap-[10px]">


          <div
            className="
              w-[263px] h-[40px]
              bg-white/80 border border-black/10
              rounded-[10px]
              flex items-center
              px-[16px] py-[11px]
              gap-[10px]
            "
          >
            <FiSearch className="text-gray-700 text-[18px]" />
            <input
              className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-600"
              placeholder="Search Psychologists..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>


          <div
            className="
              w-[42px] h-[42px]
              bg-white/80 border border-black/10
              rounded-[10px]
              flex items-center justify-center
            "
          >
            <FiGrid className="text-gray-700 text-[20px]" />
          </div>

          <div
            className="
              w-[42px] h-[42px]
              bg-white/80 border border-black/10
              rounded-[10px]
              flex items-center justify-center
            "
          >
            <FiFilter className="text-gray-700 text-[20px]" />
          </div>
        </div>


        <div className="mt-[10px] flex flex-col gap-[12px] w-[358px]">

          {filteredDoctors.map((doctor) => {
            const isOpen = openDoctor === doctor.id;

            return (
              <div
                key={doctor.id}
                className={`
                  bg-white/80 border border-black/10 rounded-[12px]
                  transition-all duration-300 overflow-hidden
                  ${isOpen ? "h-[279px]" : "h-[76px]"}
                  w-[358px]
                `}
              >

                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src="/doc_img.JPG"
                        alt={doctor.name}
                        width={48}
                        height={48}
                        className="rounded-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col leading-tight">
                      <span className="font-semibold text-gray-900 text-[15px]">{doctor.name}</span>
                      <span className="text-xs text-gray-600">{doctor.phone}</span>
                      <span className="text-xs text-gray-600">{doctor.specialization}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setOpenDoctor(isOpen ? null : doctor.id)}
                    className="text-gray-700"
                  >
                    {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
                  </button>
                </div>

                {isOpen && (
                  <div className="px-4 pb-4 mt-2 text-[13px] text-gray-700">

                    <div className="mt-3 grid grid-cols-2 gap-3 text-[13px] text-gray-700">

                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">Expertise</span>
                        <span>{doctor.specialization} </span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">Gender</span>
                        <span>{doctor.gender}</span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">Session Time</span>
                        <span>{doctor.sessionTime}</span>
                      </div>

                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">Session Fee</span>
                        <span>₹{doctor.fee}</span>
                      </div>

                    </div>



                    <Link href={`/schedule?doctor=${doctor.id}`}>
                      <button className="mt-4 w-full py-2 bg-[#D399FF] text-white font-medium rounded-xl shadow">
                        Book Now
                      </button>
                    </Link>
                  </div>
                )}

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
