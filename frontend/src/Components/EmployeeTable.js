import React from 'react';
import { Link } from 'react-router-dom';
import { DeleteEmployeeById } from '../api';
import { notify } from '../utils';

function EmployeeTable({
    employees,
    fetchEmployees,
    handleUpdateEmployee
}) {
    const headers = ['Name', 'Email', 'Phone', 'Department', 'Actions'];

    const handleDeleteEmployee = async (id) => {
        try {
            const { success, message } = await DeleteEmployeeById(id);
            if (success) {
                notify(message, 'success');
            } else {
                notify(message, 'error');
            }
            fetchEmployees();
        } catch (err) {
            console.error(err);
            notify('Failed to delete Employee', 'error');
        }
    };

    const TableRow = ({ employee }) => (
        <tr>
            <td>
                <Link to={`/employee/${employee._id}`} className="text-decoration-none">
                    {employee.name}
                </Link>
            </td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{employee.department}</td>
            <td>
                <i
                    className='bi bi-pencil-fill text-warning me-4'
                    role="button"
                    title="Edit"
                    onClick={() => handleUpdateEmployee(employee)}
                ></i>
                <i
                    className='bi bi-trash-fill text-danger'
                    role="button"
                    title="Delete"
                    onClick={() => handleDeleteEmployee(employee._id)}
                ></i>
            </td>
        </tr>
    );

    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {headers.map((header, i) => (
                            <th key={i}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.length === 0 ? (
                            <tr><td colSpan={5} className='text-center'>Data Not Found</td></tr>
                        ) : (
                            employees.map(emp => (
                                <TableRow employee={emp} key={emp._id} />
                            ))
                        )
                    }
                </tbody>
            </table>
        </>
    );
}

export default EmployeeTable;
