import React, { useState } from "react";

const Note = () => {
  const [isNoteOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full ${
        isNoteOpen ? "h-44" : "h-32"
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
          <span>23,</span>
          <span>july</span>
          <span>2023</span>
          <span>at</span>
          <span>1:06</span>
          <span>AM</span>
          <span>CDT</span>
        </div>
      </div>
      {isNoteOpen ? (
        <div className="flex px-8  w-full h-44 overflow-y-auto">
          <p className=" text-justify pb-4 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
            eius earum ut molestias architecto voluptate aliquam nihil, eveniet
            aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur
            error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias
            eos sapiente officiis modi at sunt excepturi expedita sint? Sed
            quibusdam recusandae alias error harum maxime adipisci amet laborum.
            Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates
            a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius
            fugit doloribus tenetur
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
            eius earum ut molestias architecto voluptate aliquam nihil, eveniet
            aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur
            error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias
            eos sapiente officiis modi at sunt excepturi expedita sint? Sed
            quibusdam recusandae alias error harum maxime adipisci amet laborum.
            Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates
            a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius
            fugit doloribus tenetur
          </p>
        </div>
      ) : (
        <div className="flex px-8 w-full ">
          <p className="line-clamp-3 text-justify ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            mollitia, molestiae quas vel sint commodi repudiandae consequuntur
            voluptatum laborum numquam blanditiis harum quisquam eius sed odit
            fugiat iusto fuga praesentium optio, eaque rerum! Provident
            similique accusantium nemo autem. Veritatis obcaecati tenetur iure
            eius earum ut molestias architecto voluptate aliquam nihil, eveniet
            aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur
            error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
            quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias
            eos sapiente officiis modi at sunt excepturi expedita sint? Sed
            quibusdam recusandae alias error harum maxime adipisci amet laborum.
            Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates
            a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius
            fugit doloribus tenetur
          </p>
        </div>
      )}
    </div>
  );
};

export default Note;
