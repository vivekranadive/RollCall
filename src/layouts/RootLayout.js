import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../pages/Dashboard";
import Candidate from "../pages/Candidate";
import CandidateLayout from "./CandidateLayout";
import CandidPersonalLayout from "./CandidPersonalLayout";
import Basic from "../pages/Candidate/SubPages/Basic";
import Professional from "../pages/Candidate/SubPages/Professional";
import Profile from "../pages/Candidate/SubPages/Profile";
import EmergencyContacts from "../pages/Candidate/SubPages/EmergencyContacts";
import Notes from "../pages/Candidate/Notes";
import MarketingHistory from "../pages/Candidate/SubPages/MarketingHistory";
import CandidMarketLayout from "./CandidMarketLayout";
import MarketingList from "../pages/Candidate/SubPages/MarketingList";
import MarketingNotes from "../pages/Candidate/SubPages/MarketingNotes";
import MarketingJobs from "../pages/Candidate/SubPages/MarketingJobs";
import Interviews from "../pages/Candidate/Interviews";
import Projects from "../pages/Candidate/Projects";
import Trainings from "../pages/Candidate/CandidateTrainings";
import Documents from "../pages/Candidate/Documents";
import { useEffect } from "react";

const RootLayout = () => {

  return (
    <>
      <Navbar />
      <div className="w-full flex ">
        <Sidebar />

        <div className="w-full ml-52">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
