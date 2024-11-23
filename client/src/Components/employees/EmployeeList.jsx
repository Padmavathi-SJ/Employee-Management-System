import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployee] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log(response.data); // Log the raw response

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department?.dep_name || "No Department",
            name: emp.userId?.name || "No Name",
            dob: emp.dob ? new Date(emp.dob).toDateString() : "Unknown DOB",
            profileImage: emp.userId?.profileImage ? (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:5000/uploads/${emp.userId.profileImage}`}
                alt="profile"
              />
            ) : (
              "No Image"
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));

          console.log("Processed Employees:", data); // Log processed data
          setEmployee(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  return (
    <div>
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by department name"
          className="px-4 py-0.5"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add new Employee
        </Link>
      </div>

      <div className="mt-6">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          progressPending={empLoading}
          pagination
        />
      </div>
    </div>
  );
};

export default EmployeeList;
