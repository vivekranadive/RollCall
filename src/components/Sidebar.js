import React from "react";
import SideMenu from "./SideMenu";

const SalesArr = [
  {
    label: "Job Leads",
    to: "/sales/job-leads",
  },
  {
    label: "Interviews",
    to: "/sales/interviews",
  },
  {
    label: "Projects",
    to: "/sales/projects",
  },
  {
    label: "Vendors",
    to: "/sales/vendors",
  },
  {
    label: "Contacts",
    to: "/sales/contacts",
  },
  {
    label: "Technologies",
    to: "/sales/technologies",
  },
  {
    label: "Sales Team",
    to: "/sales/sales-teams",
  },
];

const trainingArr = [
  { label: "Classes", to: "/training/classes" },
  { label: "Faculty", to: "/training/faculty" },
  { label: "Trainings", to: "/training/trainings" },
];

const adminArr = [
  { label: "Account", to: "/admin/account" },
  { label: "Users", to: "/admin/users" },
  { label: "User Roles", to: "/admin/user-roles" },
  { label: "Settings", to: "/admin/settings" },
];
const menuItems = [
  { label: 'Dashboard', to: '/dashboard', icon: '/images/dashboard-icon.svg' },
  { label: 'Candidate', to: '/candidate', icon: '/images/candidate-icon.svg' },
  { label: 'Sales', to: '/sales', icon: '/images/sales-icon.svg', children: SalesArr.map(m => ({ ...m, icon: '/images/child-icon.svg' })) },
  { label: 'Training', to: '/training', icon: '/images/training-icon.svg', children: trainingArr.map(m => ({ ...m, icon: '/images/child-icon.svg' })) },
  { label: 'Admin', to: 'admin', icon: '/images/adminstration-icon.svg', children: adminArr.map(m => ({ ...m, icon: '/images/child-icon.svg' })) },
];


const Sidebar = () => {
  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className="fixed  left-0 overflow-y-hidden w-52 h-full transition-transform -translate-x-full sm:translate-x-0 "
      aria-label="Sidebar"
      rounded-lg
    >
      <SideMenu menuItems={menuItems} />
    </aside>
  );
};

export default Sidebar;
