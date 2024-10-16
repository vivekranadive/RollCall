import React, { useState } from "react";

// Adjust for Central Daylight Time (CDT is UTC-5)
const timezoneOffset = 5 * 60; // 5 hours in minutes

// Function to format date in desired format
function formatDate(inputDate) {
    const ISOdate = new Date(inputDate);
    const date = new Date(ISOdate.getTime() - timezoneOffset * 60 * 1000);
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 24h to 12h format

    return `${day}, ${month} ${year} at ${formattedHours}:${minutes} ${ampm} CDT`;
}

const CandiDateNewNote = ({ notesData = {} }) => {
    const [isNoteOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`w-full ${isNoteOpen ? "h-44" : "h-32"
                } border border-zinc-100 flex-col justify-start items-start inline-flex`}
        >
            <div className="flex justify-between items-center w-full p-3 text-xs text-text-hint">
                <div className="flex items-center gap-2  ">
                    {isNoteOpen ? (
                        <svg
                            onClick={() => setIsOpen(!isNoteOpen)}
                            width="14"
                            height="9"
                            viewBox="0 0 14 9"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="cursor-pointer"
                        >
                            <path
                                id="Vector 9"
                                d="M13.002 1.35339L7.00195 7.35339L1.00195 1.35339"
                                stroke="#00ABB6"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                        </svg>
                    ) : (
                        <svg
                            onClick={() => setIsOpen(!isNoteOpen)}
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="cursor-pointer"
                        >
                            <g id="icon">
                                <path
                                    id="Vector 9"
                                    d="M5.33545 1.87048L11.3354 7.87048L5.33545 13.8705"
                                    stroke="#00ABB6"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                />
                            </g>
                        </svg>
                    )}

                    <span className="font-normal text-black">Notes</span>

                    <p>By Babu Vasa</p>
                </div>
                <div className="flex gap-2">
                    <span>{formatDate(notesData.created)}</span>
                </div>
            </div>
            {isNoteOpen ? (
                <div className="flex px-8  w-full h-44 overflow-y-auto">
                    <p className=" text-justify pb-4 ">
                        {notesData.notes}
                    </p>
                </div>
            ) : (
                <div className="flex px-8 w-full ">
                    <p className="line-clamp-3 text-justify ">
                        {notesData.notes}
                    </p>
                </div>
            )}
        </div>
    );
};

export default CandiDateNewNote;
