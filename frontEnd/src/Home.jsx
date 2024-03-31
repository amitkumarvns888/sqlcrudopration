import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './App.css'
const Home = () => {
    const [employeeCount, setEmployeeCount] = useState(0);

    const navigate = useNavigate()

    // const [inputUser, setInputUser] = useState({
    //     employeename: "",
    //     age: "",
    //     exprience: "",
    //     salary: "",
    // });





    // data fetching all
    const [userData, setUserData] = useState([]);
    const fetchAllUser = async () => {
        const res = await axios.get("http://localhost:8085/employee");
        console.log(res);
        setUserData(res.data);
        setEmployeeCount(res.data.length);

    };
    useEffect(() => {
        fetchAllUser();
    }, []);

    const handleDelete = async (id) => {
        console.log(id)
        const res = await axios.delete(`http://localhost:8085/deleteemp/${id}`);
        if (res.status === 200) {
            fetchAllUser();
        }
    };

    const addbtn = () => {
        navigate('/addemployee')
    }

    const singlebtn = (item) => {
        navigate(`/newtable/${item.id}`)
        // console.log(item.id)
    }

    return (
        <div className="w-2/3 mx-auto mt-5">
            <h1 style={{ fontSize: "40px", fontWeight: "bold", position: "relative", top: "-50px" }}>Employee Details</h1>
            <div className="text-center mt-4 text-gray-600 countbtn"> {employeeCount}</div>
            {/* creating form */}



            <div className="relative overflow-x-auto shadow-md">
                <table className="w-full text-lg text-center text-gray-500 ">
                    <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Employee Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Age
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Exprience
                            </th>
                            <th scope="col" className="px-6 py-3">
                                salary
                            </th>
                            {/* <th scope="col" className="px-3 py-0 readhead">
                                Read
                            </th> */}
                            <th scope="col" className="px-6 py-3 edithead">
                                Edit
                            </th>
                            <th scope="col" className="px-6 py-3 deletethead">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.map((item, i) => (
                            <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700" key={item.id}>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {item.id}
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {/* /newtable${item.id}" */}
                                    <button onClick={() => singlebtn(item)} style={{ color: "blue" }}> {item?.employeename}  </button>
                                </th>
                                <td className="px-6 py-4"> {item?.age}</td>
                                <td className="px-6 py-4"> {item?.exprience}</td>
                                <td className="px-6 py-4"> {item?.salary}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-x-4 justify-center">
                                        {/* <NavLink
                                            to={`/singleemp/${item._id}`}
                                            className=" readbtn font-medium text-green-600 dark:text-blue-500 hover:underline"
                                        >
                                            Read
                                        </NavLink>   */}
                                        <NavLink
                                            to={`/updateemp/${item.id}`}
                                            className="font-medium text-yellow-400 dark:text-blue-500 hover:underline editbtn"
                                        >
                                            Edit
                                        </NavLink>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="font-medium text-red-500  hover:underline deletebtn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center my-4">
                <button onClick={addbtn} type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
                    Add Employee
                </button>
            </div>



        </div>
    );
};

export default Home;

