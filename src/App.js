import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Dashboard from "./pages/Dashboard";
import Candidate from "./pages/Candidate";
import CandidateLayout from "./layouts/CandidateLayout";
import CandidPersonalLayout from "./layouts/CandidPersonalLayout";
import Notes from "./pages/Candidate/Notes";
import Interviews from "./pages/Candidate/Interviews";
import Projects from "./pages/Candidate/Projects";
import CandidateTrainings from "./pages/Candidate/CandidateTrainings";
import Documents from "./pages/Candidate/Documents";
import Basic from "./pages/Candidate/SubPages/Basic";
import Professional from "./pages/Candidate/SubPages/Professional";
import Profile from "./pages/Candidate/SubPages/Profile";
import EmergencyContacts from "./pages/Candidate/SubPages/EmergencyContacts";
import CandidMarketLayout from "./layouts/CandidMarketLayout";
import MarketingHistory from "./pages/Candidate/SubPages/MarketingHistory";
import MarketingList from "./pages/Candidate/SubPages/MarketingList";
import MarketingNotes from "./pages/Candidate/SubPages/MarketingNotes";
import MarketingJobs from "./pages/Candidate/SubPages/MarketingJobs";
import Login from "./pages/Login/Login";
import RootLayout from "./layouts/RootLayout";
import CheckAuth from "./components/CheckAuth";
import SignUp from "./pages/SignUp/SignUp";
import Subscribe from "./pages/Subscribe/Subscribe";
import SalesLayout from "./layouts/SalesLayout";
import JobLeads from "./pages/Sales/JobLeads/JobLeads";
import SalesInterviews from "./pages/Sales/Interviews/SalesInterviews";
import Vendors from "./pages/Sales/Vendors/Vendors";
import SalesContacts from "./pages/Sales/Contacts/SalesContacts";
import Technologies from "./pages/Sales/Technologies/Technologies";
import SalesTeams from "./pages/Sales/SalesTeams/SalesTeams";
import SalesProjects from "./pages/Sales/Projects/SalesProjects";
import VendorsLayout from "./layouts/VendorsLayout";
import Files from "./pages/Sales/Vendors/Subpages/Files";
import VendorSummaryLayout from "./layouts/VendorSummaryLayout";
import VendorDetailsLayout from "./layouts/VendorDetailsLayout";
import AccountInfo from "./pages/Sales/Vendors/Subpages/AccountInfo";
import Contacts from "./pages/Sales/Vendors/Subpages/Contacts";
import BillingAddress from "./pages/Sales/Vendors/Subpages/BillingAddress";
import CompanyProfile from "./pages/Sales/Vendors/Subpages/CompanyProfile";
import CompanyPreference from "./pages/Sales/Vendors/Subpages/CompanyPreference";
import BillingTerms from "./pages/Sales/Vendors/Subpages/BillingTerms";
import Description from "./pages/Sales/Vendors/Subpages/Description";
import Home from "./pages/Home/Home";
import TrainingLayout from "./layouts/TrainingLayout";
import Classes from "./pages/Training/Classes";
import Faculty from "./pages/Training/Faculty";
import AdminLayout from "./layouts/AdminLayout";
import Account from "./pages/Administration/Account";
import Users from "./pages/Administration/Users";
import UserRoles from "./pages/Administration/UserRoles";
import Settings from "./pages/Administration/Settings";
import Trainings from "./pages/Training/Trainings";
import { useSelector } from "react-redux";
import '@aws-amplify/ui-react/styles.css'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const [isAuth, setIsAuth] = useState(true);
  const isAuth = useSelector((state) => state.user.isAuth);
  //useApiInterceptor();
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth isAuth={isAuth}>
              <Home />
            </CheckAuth>
          }
        />
        <Route path="login" element={!isAuth ? <Login /> : <Home />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="subscribe" element={<Subscribe />} />
        <Route
          element={
            <CheckAuth isAuth={isAuth}>
              <RootLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="candidate"
            element={
              <CheckAuth isAuth={isAuth}>
                <Candidate />
              </CheckAuth>
            }
          />
          <Route path="candidate/add-candidate"
            element={
              <CheckAuth isAuth={isAuth}>
                <CandidateLayout />
              </CheckAuth>
            }
          >
            <Route path="personal" element={<CandidPersonalLayout />}>
              <Route index element={<Basic />} />
              <Route path="basic" element={<Basic />} />
              <Route path="professional" element={<Professional />} />
              <Route path="profile" element={<Profile />} />
              <Route
                path="emergency-contacts"
                element={<EmergencyContacts />}
              />
            </Route>
            <Route path="notes" element={<Notes />} />
            <Route path="marketing" element={<CandidMarketLayout />}>
              <Route index element={<MarketingHistory />} />
              <Route path="marketing-history" element={<MarketingHistory />} />
              <Route path="marketing-list" element={<MarketingList />} />
              <Route path="notes" element={<MarketingNotes />} />
              <Route path="jobs" element={<MarketingJobs />} />
            </Route>
            <Route path="interviews" element={<Interviews />} />
            <Route path="projects" element={<Projects />} />
            <Route path="trainings" element={<CandidateTrainings />} />
            <Route path="documents" element={<Documents />} />
          </Route>
          <Route path="sales" element={<SalesLayout />}>
            <Route path="job-leads" element={<JobLeads />} />
            <Route path="interviews" element={<SalesInterviews />} />
            <Route path="projects" element={<SalesProjects />} />
            <Route path="vendors" element={<Vendors />} />

            <Route path="vendors/new-vendor" element={<VendorsLayout />}>
              <Route path="summary" element={<VendorSummaryLayout />}>
                <Route index element={<AccountInfo />} />
                <Route path="account-info" element={<AccountInfo />} />
                <Route path="contact" element={<Contacts />} />
                <Route path="billing" element={<BillingAddress />} />
              </Route>
              <Route path="details" element={<VendorDetailsLayout />}>
                <Route index element={<CompanyProfile />} />
                <Route path="company-profile" element={<CompanyProfile />} />
                <Route
                  path="company-preference"
                  element={<CompanyPreference />}
                />
                <Route path="billing-terms" element={<BillingTerms />} />
                <Route path="description" element={<Description />} />
              </Route>
              <Route path="files" element={<Files />} />
            </Route>
            <Route path="contacts" element={<SalesContacts />} />
            <Route path="technologies" element={<Technologies />} />
            <Route path="sales-teams" element={<SalesTeams />} />
          </Route>
          <Route path="training" element={<TrainingLayout />}>
            <Route path="classes" element={<Classes />} />
            <Route path="faculty" element={<Faculty />} />
            <Route path="trainings" element={<Trainings />} />
          </Route>
          <Route path="admin" element={<AdminLayout />}>
            <Route path="account" element={<Account />} />
            <Route path="users" element={<Users />} />
            <Route path="user-roles" element={<UserRoles />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        {/* <Route path="/*" errorElement={<ErrorPage />} /> */}
      </Routes>
      {/* <RootLayout /> */}
    </>
  );
}

export default App;
