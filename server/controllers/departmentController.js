import Department from '../models/Department.js';

const getDepartments = async (req, res) => { // Added req and res as parameters
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        return res.status(500).json({ success: false, error: "get departments server error" });
    }
};

const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;

        // Ensure that dep_name and description are provided
        if (!dep_name || !description) {
            return res.status(400).json({ success: false, error: 'Department name and description are required.' });
        }

        const newDep = new Department({
            dep_name,
            description
        });

        await newDep.save();
        return res.status(200).json({ success: true, department: newDep });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Failed to add department, server error' });
    }
};

const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);

        if (!department) {
            return res.status(404).json({ success: false, error: 'Department not found' });
        }

        return res.status(200).json({ success: true, department });
    } catch (error) {
        console.error(error); // Log the error to debug
        return res.status(500).json({ success: false, error: 'Server error' });
    }
};


const updateDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const {dep_name, description} = req.body;
        const updateDep = await Department.findByIdAndUpdate(
            id, {
            dep_name,
            description
        });
        return res.status(200).json({ success: true, department: updateDep });
    } catch (error) {
        console.error(error); // Log the error to debug
        return res.status(500).json({ success: false, error: 'update department Server error' });
    }
  }


  const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the department by ID
        const deleteDep = await Department.findById({_id: id}); 
        await deleteDep.deleteOne()
        return res.status(200).json({ success: true, deleteDep });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({ success: false, error: 'delete department Server error' });
    }
};



export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment};
