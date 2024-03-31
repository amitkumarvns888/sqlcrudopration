import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";

const NewTable = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    // data fetching all
    const [userData, setUserData] = useState([]);

    const fetchSingleUser = async () => {
        console.log(id)
        const res = await axios.get(`http://localhost:8085/singleemp/${id}`);
        console.log(res);
        const data = res.data[0];
        setUserData({
            id: data.id,
            employeename: data.employeename,
            age: data.age,
            exprience: data.exprience,
            salary: data.salary,
        });


    };
    useEffect(() => {
        fetchSingleUser();
    }, []);


    // get all exprience table data


    const [getall, setGetall] = useState([]);
    const [getallrel, setGetallrel] = useState([]);
    const fetchexptabledata = async () => {
        console.log("exp table", id)
        const result = await axios.get(`http://localhost:8085/singlexptable/${id}`);
        console.log("exp", result.data);

        setGetall(result.data);

    };

    const fetchreltabledata = async () => {
        console.log("raltin data", id)
        const result = await axios.get(`http://localhost:8085/relativedata/${id}`);
        console.log(result.data);

        setGetallrel(result.data);

    };


    console.log("hello ji", getall);
    console.log("hello ji", getallrel);


    useEffect(() => {
        fetchexptabledata();
    }, []);

    useEffect(() => {
        fetchreltabledata();
    }, []);



    // access delete api

    const handleDelete = async (id) => {
        console.log("foentend", id);
        const res = await axios.delete(`http://localhost:8085/exptabledelete/${id}`);
        if (res.status === 200) {
            fetchexptabledata();
        }
    };






    //back btn style

    const addbtn = (id) => {
        console.log(id)
        navigate(`/addexptable/${id}`)
    }

    const addrelbtn = (id) => {
        console.log(id)
        navigate(`/addreltable/${id}`)
    }
    console.log("single data", userData)
    return (
        <div className="w-2/3 mx-auto mt-5">
            <h2 style={{ fontSize: "22px", fontWeight: "bold", position: "relative", top: "-30px" }}>Single Employee Details</h2>
            <div className="relative overflow-x-auto shadow-md">
                <table className="w-full text-lg text-center text-gray-500 ">
                    <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID.
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
                                {userData.id}
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






            {/* create table for exprience table */}





            {/* <div className="flex justify-center my-4">
                <button onClick={backbtn} type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
                    Back
                </button>
            </div> */}



            {/* create expreience table */}
            {/* create table for exprience table */}

            <h1 style={{ fontSize: "21px", fontWeight: "bold", position: "relative" }}>Exprience Table</h1>
            {/* creating form */}



            <div className="relative overflow-x-auto shadow-md">
                <table className="w-full text-lg text-center text-gray-500 ">
                    <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Company
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Year
                            </th>
                            <th scope="col" className="px-6 py-3">
                                FromToPeriod
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                salary
                            </th> */}
                            {/* <th scope="col" className="px-3 py-0 readhead">
                                Read
                            </th> */}
                            <th scope="col" className="px-6 py-3 edithead">
                                Edit
                            </th>
                            <th scope="col" style={{ position: "relative", }} className="px-6 py-3 deletethead">
                                Delete
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {getall.map((item, index) => {


                            return <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
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
                                    {item.company}

                                </th>
                                <td className="px-3 py-2"> {item.year} </td>
                                <td className="px-3 py-2"> {item.fromtoperiod} </td>



                                <td className="px-6 py-4">
                                    <div className="flex gap-x-4 justify-center">

                                        <NavLink
                                            to={`/expupdate/${item.id}`}
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
                        })}

                    </tbody>
                </table>
            </div>

            <div className="flex justify-center my-4">
                <button onClick={() => addbtn(id)} type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
                    Add Experience
                </button>
            </div>

            {/*relative table start from here */}
            {/* create expreience table */}
            {/* create table for exprience table */}

            <h1 style={{ fontSize: "21px", fontWeight: "bold", position: "relative" }}>Relatives Table</h1>
            {/* creating form */}



            <div className="relative overflow-x-auto shadow-md">
                <table className="w-full text-lg text-center text-gray-500 ">
                    <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Contact
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Relation
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                salary
                            </th> */}
                            {/* <th scope="col" className="px-3 py-0 readhead">
                                Read
                            </th> */}
                            <th scope="col" className="px-6 py-3 edithead">
                                Edit
                            </th>
                            <th scope="col" style={{ position: "relative", }} className="px-6 py-3 deletethead">
                                Delete
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {getallrel.map((item, index) => {


                            return <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
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
                                    {item.name}

                                </th>
                                <td className="px-3 py-2"> {item.contact} </td>
                                <td className="px-3 py-2"> {item.relation} </td>



                                <td className="px-6 py-4">
                                    <div className="flex gap-x-4 justify-center">

                                        <NavLink
                                            to={`/relupdate/${item.id}`}
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
                        })}

                    </tbody>
                </table>
            </div>

            <div className="flex justify-center my-4">
                <button onClick={() => addrelbtn(id)} type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
                    Add Relative
                </button>
            </div>



        </div>
    )
}

export default NewTable;