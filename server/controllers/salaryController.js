import Employee from '../models/Employee.js';
import Salary from '../models/Salary.js';


const addSalary = async  (req, res) => {
    try {
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body
        
        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions)

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate,
        })

        await newSalary.save()

        return res.status(200).json({success: true});
    }
    catch(error){
        return res.status(500).json({success: false, error: "salary add server error"});
    }

}


const getSalary = async (req, res) => {
    try {
        const { id } = req.params; // `id` could be an employeeId or userId
        let salary;

        // First, try to fetch salaries by employeeId
        salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');

        // If no salaries are found, attempt to resolve employeeId using userId
        if (!salary || salary.length < 1) {
            const employee = await Employee.findOne({ userId: id }); // Ensure `userId` exists in Employee
            if (employee) {
                salary = await Salary.find({ employeeId: employee._id }).populate('employeeId', 'employeeId');
            }
        }

        // Return response
        if (!salary || salary.length < 1) {
            return res.status(404).json({ success: false, error: "No salary records found" });
        }

        return res.status(200).json({ success: true, salary });
    } catch (error) {
        console.error("Error fetching salary:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};


export {addSalary, getSalary}