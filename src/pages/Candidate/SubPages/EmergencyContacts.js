import React, { useEffect, useState } from "react";
import Pencil from "../../../images/pencil.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import {
  resetState,
  setCandidateId,
  setEmergencyContacts,
} from "../../../features/candidate/personalSlice";
import Loader from "../../../components/Loader";
import { createCandidate, createEmergencyContact, updateCandidate, updateEmergencyContact } from "../../../api/candidiate";
import { mapToOption } from "../../../utlis";

const flattenObject = (obj, parentKey = '') => {
  let result = {};

  for (const key in obj) {
    const newKey = key;

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(result, flattenObject(obj[key], newKey));
    } else {
      result[newKey] = obj[key];
    }
  }

  return result;
};

const EmergencyContacts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const candidateId = useSelector(state => state.personal.candidateId);

  const referenceData = useSelector((state) => state.reference);

  const { contactInfo1, contactInfo2 } = useSelector(
    (state) => state.personal.emergencyContacts
  );

  const personalInfo = useSelector((state) => state.personal);

  const [contact1, setContact1] = useState(contactInfo1);
  const [contact2, setContact2] = useState(contactInfo2);

  const handleChange1 = (e) => {
    const { name, value } = e.target;

    setContact1((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;

    setContact2((pervData) => ({
      ...pervData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const parseBody = flattenObject({...personalInfo,emergencyContacts:{}});
    setLoading(true);
    try {
      const response = await (!candidateId ? createCandidate(parseBody) : updateCandidate(parseBody, candidateId));

      // if (candidateId) {
      //   await Promise.all([
      //     updateEmergencyContact(contactInfo1, candidateId, 1),
      //     updateEmergencyContact(contactInfo2, candidateId, 2)
      //   ])
      // }

      if (!candidateId) {
        const candidateId = response.data.data.candidateId
        dispatch(setCandidateId(candidateId));

        await Promise.all([
          createEmergencyContact(contactInfo1, candidateId, 1),
          createEmergencyContact(contactInfo2, candidateId, 2)
        ])
      }


      toast.success('Candidate created sucessfully');
      navigate('/candidate/add-candidate/notes');
    } catch (err) {
      console.log(err, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setEmergencyContacts({ contact1, contact2 }));
  }, [contact1, contact2]);

  return (
    <div className="">
      {isLoading && <Loader />}
      <from className="grid grid-cols-2 gap-6 mt-5 text-sm font-normal text-text-hint">
        <div className="flex flex-col gap-y-6">
          <h3 className="text-text-default">Emergency Contacts 1</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <label className="">
                First Name<span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange1}
                  value={contact1.firstName}
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="outline-none w-full text-black"
                />
                <img src={Pencil} alt="pencil" />
              </div>
            </div>
            <div className="">
              <label className="">
                Last Name<span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange1}
                  value={contact1.lastName}
                  name="lastName"
                  placeholder="Last Name"
                  required
                  className="outline-none w-full text-black"
                />
                <img src={Pencil} alt="pencil" />
              </div>
            </div>
            <div className="">
              <label className="">
                Contacts Phone Number<span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange1}
                  value={contact1.contactPhoneNum}
                  name="contactPhoneNum"
                  placeholder="Contacts Phone Number"
                  required
                  className="outline-none w-full text-black"
                />
                <img src={Pencil} alt="pencil" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="">
                Email<span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange1}
                  value={contact1.email}
                  name="email"
                  placeholder="youremail@gmail.com"
                  required
                  className="outline-none w-full text-black"
                />
                <img src={Pencil} alt="pencil" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <label className="">
                Contacts Relations<span className="text-red-500">*</span>
              </label>
              <select
                onChange={handleChange1}
                value={contact1.contactRelation}
                name="contactRelation"
                className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full "
              >
                {mapToOption(referenceData.relations?.relation, 'type').map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Emergency contact 2 */}

        <div className="flex flex-col gap-y-6">
          <h3 className="text-text-default">Emergency Contacts 2</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <label className="">
                First Name<span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange2}
                  value={contact2.firstName}
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="outline-none w-full text-black"
                />
                <img src={Pencil} alt="pencil" />
              </div>
            </div>
            <div className="">
              <label className="">
                Last Name<span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange2}
                  value={contact2.lastName}
                  name="lastName"
                  placeholder="Last Name"
                  required
                  className="outline-none w-full text-black"
                />
                <img src={Pencil} alt="pencil" />
              </div>
            </div>
            <div className="">
              <label className="">
                Contacts Phone Number<span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange2}
                  value={contact2.contactPhoneNum}
                  name="contactPhoneNum"
                  placeholder="Contacts Phone Number"
                  required
                  className="outline-none w-full text-black"
                />
                <img src={Pencil} alt="pencil" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="">
                Email<span className="text-red-500">*</span>
              </label>
              <div className="flex justify-center items-center px-3 py-2 mt-1 border border-neutral-500 rounded-lg">
                <input
                  onChange={handleChange2}
                  value={contact2.email}
                  name="email"
                  placeholder="youremail@gmail.com"
                  required
                  className="outline-none w-full text-black"
                />
                <img src={Pencil} alt="pencil" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <label className="">
                Contacts Relations<span className="text-red-500">*</span>
              </label>
              <select
                onChange={handleChange2}
                value={contact2.contactRelation}
                name="contactRelation"
                className="flex justify-center items-center text-black focus:ring-0 px-3 py-2 mt-1 border border-neutral-500 rounded-lg outline-none w-full "
              >
                {mapToOption(referenceData.relations?.relation, 'type').map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </from>
      <div className="w-full  py-10 px-8 flex justify-end gap-5">
        <Link
          to={`/candidate/add-candidate/personal/profile`}
          className="text-secondary-700 bg-white border border-secondary-700 py-2 px-5 rounded-full text-base"
        >
          Previous
        </Link>
        <button
          onClick={handleSubmit}
          className="text-white bg-secondary-700 py-2 px-5 rounded-full text-base"
        >
          {!candidateId ? 'Save' : 'Update'} & Next
        </button>
      </div>
    </div>
  );
};

export default EmergencyContacts;
