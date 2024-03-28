import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmp = () => {
    const navigate = useNavigate()
    const [inputUser, setInputUser] = useState({
        employeename: "",
        age: "",
        exprience: "",
        salary: "",
    });

    const { id } = useParams();
    // data fetching single
    const fetchSingleUser = async () => {

        const res = await axios.get(`http://localhost:8085/singleemp/${id}`);
        console.log("edit user details", res.data[0].employeename);
        const data = res.data[0];
        setInputUser({
            employeename: data.employeename,
            age: data.age,
            exprience: data.exprience,
            salary: data.salary,
        });
        console.log("ffh", inputUser)
    };



    useEffect(() => {
        fetchSingleUser();
    }, []);

    const handleChnage = (event) => {
        setInputUser({
            ...inputUser,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputUser);

        const dataforupdate = {
            // Specify the fields you want to update and their new values
            employeename: inputUser.employeename,
            age: inputUser.age,
            salary: inputUser.salary,
            exprience: inputUser.exprience,

            // Add other fields as needed
        };


        try {
            console.log("id value ", id);

            const res = await axios.patch(
                `http://localhost:8085/updateemp/${id}`, dataforupdate

            );
            console.log("getting res value at update")
            console.log(res);
            if (res.status === 200) {
                window.location = "/";
            }

        } catch (error) {
            console.log("error come from db")
        }
        // fetchAllUser();


    };


    // back button working

    const updatebackbtn=()=>{
        navigate('/')
    }

    return (
        <div className="w-2/3 mx-auto mt-5">
            <form onSubmit={handleSubmit}>
                <h1>Update Employee</h1>
                <div className="">
                    <label className=" text-sm text-gray-200 ">Employee Name</label>
                    <input
                        type="text"
                        name="employeename"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter EmployeeName"
                        required
                        value={inputUser.employeename || ''}
                        onChange={handleChnage}
                    />
                </div>
                <div className="">
                    <label className=" text-sm text-gray-500 ">Age</label>
                    <input
                        type="text"
                        name="age"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter Age "
                        required
                        value={inputUser.age || ''}
                        onChange={handleChnage}
                    />
                </div>
                <div className="">
                    <label className=" text-sm text-gray-500 ">Exprience</label>
                    <input
                        type="text"
                        name="exprience"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter exprience "
                        required
                        value={inputUser.exprience || ''}
                        onChange={handleChnage}
                    />
                </div>

                <div className="">
                    <label className=" text-sm text-gray-500 ">Salary</label>
                    <input
                        type="text"
                        name="salary"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter exprience "
                        required
                        value={inputUser.salary || ''}
                        onChange={handleChnage}
                    />
                </div>

                <div className="flex justify-center my-4">
                    <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm ">
                        Update Employee
                    </button>
                </div>

                <div className="flex justify-center my-4">
                    <button onClick={updatebackbtn} style={{position:"relative",top:"-55px", left:"140px"}} type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm backbutton ">
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmp;