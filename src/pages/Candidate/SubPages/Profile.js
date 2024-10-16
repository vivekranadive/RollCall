import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../../../components/StarRating";
import { useDispatch, useSelector } from "react-redux";
import { setProfileInfo } from "../../../features/candidate/personalSlice";
import Pencil from "../../../images/pencil.png";

const options = [
  { value: "", text: "--Choose an option--" },
  { value: 1, text: "option1" },
  { value: 2, text: "option2" },
  { value: 3, text: "option3" },
  { value: 4, text: "option4" },
  { value: 5, text: "option5" },
];

const Profile = () => {
  const dispatch = useDispatch();

  const {
    totalInterviews,
    activeInterviews,
    passedInterviews,
    failedInterviews,
    holdInterviews,
    lastInterviewOn,
    rating,
  } = useSelector((state) => state.personal.profile);

  const candidateId = useSelector(state => state.personal.candidateId);

  const [profileRating, setProfileRating] = useState(rating);

  const [profileData, setProfileData] = useState({
    totalInterviews,
    activeInterviews,
    passedInterviews,
    failedInterviews,
    holdInterviews,
    lastInterviewOn,
    rating,
  });

  const onRatingChange = (rating) => {
    setProfileData((pervData) => ({
      ...pervData,
      rating,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfileData((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(setProfileInfo(profileData));
  }, [profileData, profileRating]);

  return (
    <div className="">
      <div className="mt-5">
        <h3>Rating</h3>
        <StarRating
          fontSize={24}
          initialRating={rating}
          setProfileRating={setProfileRating}
          onRatingChange={onRatingChange}
        />
      </div>
      <from className="flex flex-col gap-y-6 mt-5 text-sm font-normal text-text-hint">
        <div className="grid grid-cols-4 gap-5">
          <div>
            <label>
              Total Interviews<span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                onChange={handleChange}
                value={totalInterviews}
                name="totalInterviews"
                placeholder="totalInterviews"
                required
                disabled={candidateId}
                maxLength={25}
                className="outline-none w-full text-black"
              />
              {!candidateId && <img src={Pencil} alt="pencil" />}
            </div>
          </div>
          <div className="">
            <label className="">
              Active Interviews<span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                onChange={handleChange}
                value={activeInterviews}
                name="activeInterviews"
                placeholder="activeInterviews"
                required
                disabled={candidateId}
                maxLength={25}
                className="outline-none w-full text-black"
              />
              {!candidateId && <img src={Pencil} alt="pencil" />}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <div className="">
            <label className="">
              Passed Interviews<span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                onChange={handleChange}
                value={passedInterviews}
                name="passedInterviews"
                placeholder="passedInterviews"
                required
                disabled={candidateId}
                maxLength={25}
                className="outline-none w-full text-black"
              />
              {!candidateId && <img src={Pencil} alt="pencil" />}
            </div>
          </div>
          <div>
            <label>
              Failed Interviews<span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                onChange={handleChange}
                value={failedInterviews}
                name="failedInterviews"
                placeholder="failedInterviews"
                required
                disabled={candidateId}
                maxLength={25}
                className="outline-none w-full text-black"
              />
              {!candidateId && <img src={Pencil} alt="pencil" />}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <div className="">
            <label className="">
              Interviews on Hold<span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
              <input
                onChange={handleChange}
                value={holdInterviews}
                name="holdInterviews"
                placeholder="holdInterviews"
                required
                disabled={candidateId}
                maxLength={25}
                className="outline-none w-full text-black"
              />
              {!candidateId && <img src={Pencil} alt="pencil" />}
            </div>
          </div>

          <div className="">
            <label className="">
              Last Interviewed on<span className="text-red-500">*</span>
            </label>
            <input
              onChange={handleChange}
              name="lastInterviewOn"
              value={lastInterviewOn}
              type="date"
              disabled={candidateId}
              required
              className="outline-none w-full appearance-none text-black flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg "
            />
          </div>
        </div>
      </from>
      <div className="w-full py-10 px-8 flex justify-end gap-5">
        <Link
          to={`/candidate/add-candidate/personal/professional`}
          className="text-secondary-700 bg-white border border-secondary-700 py-2 px-5 rounded-full text-base"
        >
          Previous
        </Link>
        <Link
          to={`/candidate/add-candidate/personal/emergency-contacts`}
          className="text-white bg-secondary-700 py-2 px-5 rounded-full text-base"
        >
          Next
        </Link>
      </div>
    </div>
  );
};

export default Profile;
