import { handler } from "@tailwindcss/line-clamp";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { createNote } from "../api/candidiate";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const NewNote = ({ isNewNote, setIsNewNote, noteType = 'Candidate', fetchData = null }) => {
  //   const [isNoteOpen, setIsOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const candidateId = useSelector(state => state.personal.candidateId);
  const [note, setNote] = useState({
    author: "babu vasa",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await createNote(note.content, candidateId, noteType);
      fetchData && await fetchData()
      toast.success('Note Added Succesfully');
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!')
    } finally {
      setLoading(false);
    }
    setIsNewNote(false);
  };

  return (
    <div
      className={`w-full ${isNewNote ? "h-44" : "h-32"
        } border border-zinc-100 flex-col justify-start items-start inline-flex`}
    >
      {isLoading && <Loader />}
      <div className="flex justify-between items-center border-b border-zinc-100 w-full p-3 text-xs text-text-hint">
        <div className="flex items-center gap-2  ">
          <svg
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
          <span className="font-normal text-black">Notes</span>

          <p>By Babu Vasa</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="text-xs bg-secondary-700 text-white py-2 px-5 rounded-full"
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex px-6 w-full h-auto">
        {/* <p className="line-clamp-3 text-justify ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
          nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
          error repudiandae fuga? Ipsa laudantium molestias eos sapiente
          officiis modi at sunt excepturi expedita sint? Sed quibusdam
          recusandae alias error harum maxime adipisci amet laborum.
          Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a
          cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit
          doloribus tenetur
        </p> */}
        <textarea
          onChange={handleChange}
          value={note.content}
          name="content"
          className="w-full focus:ring-0 border-none outline-none "
          rows={3}
        ></textarea>
      </div>
    </div>
  );
};

export default NewNote;
