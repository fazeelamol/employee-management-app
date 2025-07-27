const EmployeeModel = require("../Models/EmployeeModel");

const createEmployee = async (req, res) => {
   try{
    const body = req.body;
    const profileImage = req.file ? req.file.path : null;
    body.profileImage = profileImage;
    console.log(body)
    const emp = new EmployeeModel(body);
    await emp.save()
    res.status(201)
    .json({
        message: "Employee created",
        success: true,
    })

   }catch(err) {
    console.error("Error creating employee:", err);
       res.status(500).json({
        message: "Internal server error",
        success: false,
        error: err
       });
   }
}
const getAllEmployees = async (req, res) => {
    try {

        // Get page and limit from query parameters
        let { page, limit, search } = req.query;

        // Set default values if they are not provided
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Build the search criteria
        let searchCriteria = {};
        if (search) {
            searchCriteria = {
                name: {
                    $regex: search,
                    $options: 'i' // case insensitive
                }
            }
        }
        // Get the total number of employees for pagination info
        const totalEmployees = await EmployeeModel.countDocuments(searchCriteria);

       const emps = await EmployeeModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
       const totalPages = Math.ceil(totalEmployees / limit);
        res.status(200)
            .json({
                message: 'All Employees',
                success: true,
                data: {
                    employees: emps,
                    pagination: {
                        totalEmployees,
                        currentPage: page,
                        totalPages,
                        pageSize: limit
                    }
                }
            });
             } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        });
    }
};
const getEmployeeById = async (req,res) => {
    try {
        const {id} = req.params;
        const emp =await EmployeeModel.find({ _id: id})
        res.status(200)
        .json({
            message: "All Employees fetched successfully",
            success: true,
            data: emp
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err
        });
    }
}
const deleteEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const emp = await EmployeeModel.findByIdAndDelete({ _id: id });
        res.status(200)
            .json({
                message: 'Employee Deleted Successfully',
                success: true
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: err
        })
    }
}

const updateEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, department, salary } = req.body;
        let updateData = {
            name, email, phone, department, salary, updatedAt: new Date()
        };
        console.log('<-- update ---> ', req.file)
        if (req.file) {
            updateData.profileImage = req.file.path;
        }
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200)
            .json({
                message: 'Employee Updated Successfully',
                success: true,
                data: updatedEmployee
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
 
module.exports = {
    createEmployee, getAllEmployees, getEmployeeById, deleteEmployeeById, updateEmployeeById
}