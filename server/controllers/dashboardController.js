import Employee from '../models/Employee.js';
import Department from '../models/Department.js';  // Add this if it's not imported
import Leave from '../models/Leave.js';  // Add this if it's not imported


const getSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();

        const totalDepartments = await Department.countDocuments(); // Corrected typo

        const totalSalaries = await Employee.aggregate([
            { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
        ]);

        const totalSalary = totalSalaries.length > 0 ? totalSalaries[0].totalSalary : 0; // Safe check

        const employeeAppliedForLeave = await Leave.distinct('employeeId');

        const leaveStatus = await Leave.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } } // Corrected "const" to "count"
        ]);

        const leaveSummary = {
            appliedFor: employeeAppliedForLeave.length,
            approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
            rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
            pending: leaveStatus.find(item => item._id === "Pending")?.count || 0,
        };

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalaries: totalSalary,
            leaveSummary,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "get summary server error" });
    }
};

export { getSummary };
