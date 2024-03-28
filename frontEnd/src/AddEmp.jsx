import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './App.css'

const AddEmp = () => {
    const navigate = useNavigate()

    const [userData, setUserData] = useState([]);


    const fetchAllUser = async () => {
        const res = await axios.get("http://localhost:8085/employee");
        console.log(res);
        setUserData(res.data);
    };
    useEffect(() => {
        fetchAllUser();
    }, []);


    const [inputUser, setInputUser] = useState({
        employeename: "",
        age: "",
        exprience: "",
        salary: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(inputUser);
        const res = await axios.post("http://localhost:8085/insertemp", inputUser);
        console.log(res);
        fetchAllUser();

        navigate('/')
    };


    const handleChnage = (event) => {
        setInputUser({
            ...inputUser,
            [event.target.name]: event.target.value,
        });
    };

    // navigate

    // const submitbtn=()=>{
    // navigate('/')
    // }


    const cancelbtn=()=>{
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 style={{ fontSize: "40px", position: "relative", top: "-25px" }}>Create Employee</h1>
                <div className="">
                    <label className=" text-sm text-gray-500 ">Employee Name</label>
                    <input
                        type="text"
                        name="employeename"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter Employee Name"
                        required
                        value={inputUser.employeename}
                        onChange={handleChnage}
                    />
                </div>
                <div className="">
                    <label className=" text-sm text-gray-500 ">Age</label>
                    <input
                        type="number"
                        name="age"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter Age "
                        required
                        value={inputUser.age}
                        onChange={handleChnage}
                    />
                </div>
                <div className="">
                    <label className=" text-sm text-gray-500 ">Exprience</label>
                    <input
                        type="text"
                        name="exprience"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter Exprience "
                        required
                        value={inputUser.exprience}
                        onChange={handleChnage}
                    />
                </div>


                <div className="">
                    <label className=" text-sm text-gray-500 ">Salary</label>
                    <input
                        type="text"
                        name="salary"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter salary "
                        required
                        value={inputUser.salary}
                        onChange={handleChnage}
                    />
                </div>

                <div className="flex justify-center my-4">
                    <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
                        Submit
                    </button>
                </div>

                <div className="flex justify-center my-4">
                    <button onClick={cancelbtn} type="submit" style={{position:"relative", top:"-57px", left:"120px"}} className="px-4 py-2 bg-yellow-400 rounded-sm">
                        Cancel
                    </button>
                </div>


            </form>

        </div>


    )
}

export default AddEmp
