import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import {
  FaBuilding,
  FaMoneyBillWave,
  FaUsers,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import SummaryCard from "./SummaryCard";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/summary', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log('Summary Data:', response.data);  // Log the response data
        setSummary(response.data);
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response); // Log the full error response
          alert(error.response.data.error); // Show error message
        }
      }
    };

    
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text="Total Employees"
          number={summary.totalEmployees || 0} // Fallback to 0 if null
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text="Total Departments"
          number={summary.totalDepartments || 0} // Fallback to 0 if null
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={summary.totalSalaries || 0} // Fallback to 0 if null
          color="bg-red-600"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <SummaryCard
          icon={<FaFileAlt />}
          text="Leave Applied"
          number={summary.leaveSummary?.appliedFor || 0} // Fallback to 0 if null
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaCheckCircle />}
          text="Leave Approved"
          number={summary.leaveSummary?.approved || 0} // Fallback to 0 if null
          color="bg-green-600"
        />
        <SummaryCard
          icon={<FaHourglassHalf />}
          text="Leave Pending"
          number={summary.leaveSummary?.pending || 0} // Fallback to 0 if null
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaTimesCircle />}
          text="Leave Rejected"
          number={summary.leaveSummary?.rejected || 0} // Fallback to 0 if null
          color="bg-red-600"
        />
      </div>
    </div>
  );
};

export default AdminSummary;
