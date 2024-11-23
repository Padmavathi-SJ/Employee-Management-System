import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add file extension
    },
});

const upload = multer({ storage });

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
        } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? `uploads/${req.file.filename}` : "",
        });
        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
        });

        await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employee created" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server error in addEmployee" });
    }
};

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate("userId", "name email profileImage")
            .populate("department", "dep_name");

        if (!employees || employees.length === 0) {
            return res.status(200).json({ success: true, employees: [] });
        }
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error fetching employees" });
    }
};


const getEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findById(id)
            .populate("userId", "name email profileImage")
            .populate("department", "dep_name");
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }
        return res.status(200).json({ success: true, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error fetching employee" });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            name,
            maritalStatus,
            designation,
            department,
            salary,
        } = req.body;

        const employee = await Employee.findById({_id: id})
        if(!employee) {
            return res.status(404).json({ success: false, error: "employee not found" });
        }

        const user = await User.findById({_id: employee.userId})
        if(!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const updateUser = await User.findByIdAndUpdate({_id: employee.userId}, {name})
        const updateEmployee = await Employee.findByIdAndUpdate({_id: id}, {
            maritalStatus,
            designation, 
            salary,
            department
        })

        if(!updateEmployee || !updateUser){
            return res.status(404).json({ success: false, error: "document not found" });
        }

        return res.status(200).json({success: true, message: "Employee updated"});
    }
    catch(error){
        return res.status(500).json({ success: false, error: "update employees server error" });
    }
}

const fetchEmployeesByDepId = async (req, res) => {
    const { id } = req.params;
    try {
        const employees = await Employee.find({ department: id }).populate('userId', 'name');
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Error fetching employees by department ID" });
    }
};

export { addEmployee, upload, getEmployees, getEmployee, updateEmployee, fetchEmployeesByDepId };


