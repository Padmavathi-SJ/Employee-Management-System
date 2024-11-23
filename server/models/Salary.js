import mongoose from 'mongoose'
import { Schema } from 'mongoose';

const salarySchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true},
    basicSalary: { type: Number, required: true},
    allowances: {type: Number, required: true},
    deductions: {type: Number, required: true},
    netSalary: {type: Number, required: true},
    payDate: {type: Date, required: true},
    createdAt: {type: Date,  default: Date.now},
    updatedAt: {type: Date, default: Date.now},

});

const Salary = mongoose.model('Salary', salarySchema);
export default Salary;