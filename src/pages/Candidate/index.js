import React, { useEffect, useState } from "react";
import { RxReload } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import StarRating from "../../components/StarRating";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import Filter from "../../components/Filter";
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import axiosInstance from '../../api/axiosInstance';
import { getUserInfoDetails } from "../../utlis";
import { resetState, setBasicInfo, setCandidateId, setProfessionalInfo, setProfileInfo } from "../../features/candidate/personalSlice";
import { useDispatch } from "react-redux";
const { companyId, clientId } = getUserInfoDetails();

function convertDateFormat(inputDate) {
  console.log(inputDate);
  if (!inputDate || typeof inputDate !== 'string') {
    // Handle false values or invalid input
    return inputDate;
  }

  const parts = inputDate.split('/');
  if (parts.length === 3) {
    const [month, day, year] = parts;
    return `${year}-${month}-${day}`;
  } else {
    // Handle invalid input
    return inputDate;
  }
}

const Candidate = () => {
  const [isLoading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const getCandidates = async (page) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/candidates', {
        params: { company: companyId, client: clientId, pageNum: page, pageSize: 10 }
      });
      console.log(res.data.data);
      setCandidates(res.data.data.records);
      setTotalPages(res.data.data.totalRecords);
    } catch (err) {
      console.log(err, 'in Api call');
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = page => {
    getCandidates(page);
    setCurrentPage(page);
  }

  useEffect(() => { getCandidates(1) }, [])

  const clickOnUser = r => {
    dispatch(setBasicInfo({
      firstName: r.first_name,
      lastName: r.last_name,
      middleName: r.middle_name,
      gender: r.gender ? r.gender.toLowerCase() : r.gender,
      maritalStatus: r.marital_status ? r.marital_status.toLowerCase() : r.marital_status,
      dob: convertDateFormat(r.dob),
      email: r.email_id,
      address1: r.address1,
      address2: r.address2,
      phone: r.phone,
      alternatePhoneNum: r.mobile
    }));
    dispatch(setProfessionalInfo({
      jobTitle: r.job_title,
      salesPerson: r.sales_person_id,
      technology: r.division || '', //Not coming from response
      workPermitStatus: r.status,
      workStatusIssueDate: convertDateFormat(r.work_status_issue_date),
      workStatusEndDate: convertDateFormat(r.work_status_enddate),
      SSN: r.ssn,
      employmentStatus: r.status,
      referredBy: r.referred_by
    }));
    dispatch(setProfileInfo({
      totalInterviews: r.total_interviews,
      activeInterviews: r.total_active_interviews,
      passedInterviews: r.total_passed_interviews,
      failedInterviews: r.total_failed_interviews,
      holdInterviews: r.total_onhold_interviews,
      lastInterviewOn: convertDateFormat(r.last_interview_on),
      rating: r.rating
    }));
    dispatch(setCandidateId(r.candidate_id));

    navigate(`add-candidate/personal/basic`);
  }

  const addCandidate = () => {
    dispatch(resetState());
    navigate(`add-candidate/personal/basic`);
  }

  return (
    <div className="p-5 ">
      {isLoading && <Loader />}
      <div className="flex items-center justify-between">
        <h5>Candidate</h5>
        <button
          onClick={addCandidate}
          className="bg-secondary-700  text-white py-2 px-4 rounded-full"
        >
          Add Candidate
        </button>
      </div>
      <div className="border border-gray-300 mt-5 rounded-lg ">
        <div className="flex items-center gap-2 p-3">
          <RxReload size={20} />
          {/* <SettingsPopUp /> */}
          <BsThreeDotsVertical size={20} />
          <div className="flex items-center gap-3 flex-grow p-3 border-2 border-gray-200 bg-gray-100 rounded-lg ">
            <FiSearch color="gray" size={20} />
            <input
              className="outline-none w-full h-full bg-gray-100"
              placeholder="search"
            />
          </div>
          <Dropdown />

          <Filter />
          {/* <div className="flex items-center text-teal-500 gap-2 py-2 px-4 border border-teal-500 rounded-full">
            <RiSoundModuleLine />
            <p>Filter</p>
          </div> */}
        </div>
        <div className="w-full overflow-x">
          <table class="table-auto overflow-scroll w-full">
            {/* Table headings */}
            <thead className="w-full">
              <tr className="grid grid-cols-9 text-left py-3 pl-3 pr-6 bg-secondary-50 text-base">
                <th className="col-span-2">Candidate Info</th>
                <th>Tehnology</th>
                <th>Job Title</th>
                <th>Work Status</th>
                <th>Sales Persons</th>
                <th>Interviews</th>
                <th>Marketing</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* table content/data */}
            <tbody
              className="flex flex-col items-center justify-between overflow-y-scroll w-full h-screen"
            // style={{ height: "90vh" }}
            >
              {candidates.map((r) => (
                <tr className="grid grid-cols-9 justify-center items-center py-2 px-3 gap-1 border border-gray-200 text-left w-full text-sm">
                  <td className="col-span-2">
                    <h3
                      className="text-auxiliary-800 text-base hover:cursor-pointer hover:underline"
                      onClick={() => clickOnUser(r)}>
                      {`${r.first_name} ${r.middle_name} ${r.last_name}`}
                    </h3>
                    <p>{r.email_id}</p>
                    <p>{r.mobile}</p>
                    <StarRating initialRating={r.rating || 0} fontSize={18} />
                  </td>
                  <td className="">{r.division}</td>
                  <td className="break-all">{r.job_title}</td>
                  <td className="py-2 border border-success-700 text-success-700 text-xs rounded-full flex justify-center items-center">
                    {r.legal_status}
                  </td>
                  <td className="text-center">{r.sales_person_id}</td>
                  <td className={`py-2 ${r.total_interviews ? 'border border-info-700' : ''} text-info-700 rounded-full flex justify-center items-center text-xs`}>
                    {r.total_interviews}
                  </td>
                  <td className="py-2 border border-success-700 text-success-700 text-xs rounded-full flex justify-center items-center">
                    {r.marketing_group_id}
                  </td>
                  <td className="py-2 border border-success-700 text-success-700 text-xs rounded-full flex justify-center items-center">
                    {r.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination currentPage={currentPage} totalRecords={totalPages} pageSize={10} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Candidate;
