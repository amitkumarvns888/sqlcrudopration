import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Singleemp = () => {
    const navigate=useNavigate()
    const { id } = useParams();
    // data fetching all
    const [userData, setUserData] = useState([]);
    const fetchSingleUser = async () => {
        const res = await axios.get(`http://localhost:8085/singleemp/${id}`);
        console.log(res);
        setUserData(res.data);
    };
    useEffect(() => {
        fetchSingleUser();
    }, []);


    //back btn style

    const backbtn=()=>{
      navigate('/')
    }
    return (
        <div className="w-2/3 mx-auto mt-5">
            <div className="relative overflow-x-auto shadow-md">
                <table className="w-full text-lg text-center text-gray-500 ">
                    <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                SN.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                EmployeeName
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Age
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Exprience
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Salary
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                1
                            </th>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {userData.employeename}
                            </th>
                            <td className="px-3 py-2"> {userData.age}</td>
                            <td className="px-3 py-2">{userData.exprience}</td>
                            <td className="px-3 py-2">{userData.salary}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center my-4">
                <button onClick={backbtn} type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
                    Back
                </button>
            </div>
        </div>
    );
};

export default Singleemp;