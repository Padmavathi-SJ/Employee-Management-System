import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import AuthProvider  from './context/authContext';  // Import AuthProvider
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './Components/AdminSummary';
import DepartmentList from './Components/departments/DepartmentList';
import AddDepartment from './Components/departments/AddDepartment';
import EditDepartment from './Components/departments/EditDepartment';
import EmployeeList from './Components/employees/EmployeeList';
import AddEmployee from './Components/employees/AddEmployee';
import ViewEmployee from './Components/employees/View';
import EditEmployees from './Components/employees/Edit';
import AddSalary from './Components/salary/AddSalary';
import ViewSalary from './Components/salary/ViewSalary';
import Summary from './Components/EmployeeDashboard/Summary';
import LeaveList from './Components/leave/LeaveList';
import AddLeave from './Components/leave/AddLeave';
import Settings from './Components/EmployeeDashboard/Settings';


function App() {
  return (
    <BrowserRouter> {/* BrowserRouter must wrap everything using React Router hooks */}
      <AuthProvider> {/* AuthProvider can use useNavigate since it is inside BrowserRouter */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login page */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin"]}>
                  <AdminDashboard />
                </RoleBaseRoutes>
              </PrivateRoutes>
            }>
              <Route index element={<AdminSummary />}></Route>

              <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
              <Route path="/admin-dashboard/add-department" element={<AddDepartment />}></Route>
              <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>

              <Route path="/admin-dashboard/employees" element={<EmployeeList />}></Route>
              <Route path="/admin-dashboard/add-employee" element={<AddEmployee />}></Route>
              <Route path="/admin-dashboard/employees/:id" element={<ViewEmployee />}></Route>
              <Route path="/admin-dashboard/employees/edit/:id" element={<EditEmployees />}></Route>
              <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />}></Route>

              <Route path="/admin-dashboard/salary/AddSalary" element={<AddSalary />}></Route>

            </Route>

          <Route path="/employee-dashboard" 
          element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
            <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
          } >

            <Route index element={<Summary />}></Route>
            <Route path="/employee-dashboard/profile/:id" element={<ViewEmployee />}></Route>
            <Route path="/employee-dashboard/leaves" element={<LeaveList />}></Route>
            <Route path="/employee-dashboard/add-leave" element={<AddLeave />}></Route>
            <Route path="/employee-dashboard/salary/:id" element={<ViewSalary />}></Route>
            <Route path="/employee-dashboard/settings" element={<Settings />}></Route>
            </Route>
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}


export default App;
