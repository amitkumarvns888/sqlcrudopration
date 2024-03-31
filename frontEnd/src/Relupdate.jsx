import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RelUpdate = () => {
    const navigate = useNavigate()
    const [inputUser, setInputUser] = useState({
        company: "",
        year: "",
        fromtoperiod: "",
    });

    const { id } = useParams();
    console.log(id)  // getting id for frontEnd 
    // data fetching single
    const fetchSingleUser = async () => {
        console.log(id)  //correct getting data

        const res = await axios.get(`http://localhost:8085/singlerelativedata/${id}`);
        console.log("edit user details", res);
        const data = res.data[0];
        setInputUser({
            relname: data.name,
            contact: data.contact,
            relation: data.relation,
        });
        console.log("ffh", inputUser)
    };



    useEffect(() => {
        fetchSingleUser();
    }, []);

    const handleChnage = (event) => {
        console.log(event.target.value)
        setInputUser({
            ...inputUser,
            [event.target.name]: event.target.value
        });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputUser.fromtoperiod)
        const dataforupdate = {
            // Specify the fields you want to update and their new values
            name: inputUser.relname,
            contact: inputUser.contact,
            relation: inputUser.relation

            // Add other fields as needed
        };
        console.log(dataforupdate)
        alert("okk");

        try {
            console.log("id value ", id);
            console.log(dataforupdate)
            const res = await axios.patch(
                `http://localhost:8085/relativeupdate/${id}`, dataforupdate

            );
            console.log("getting res value at update")
            console.log(res);
            // if (res.status === 200) {
            //     window.location = "/";
            // }

        } catch (error) {
            console.log("error come from db")
        }
        // fetchAllUser();


    };


    // back button working

    const updatebackbtn = () => {
        navigate('/')
    }

    return (
        <div className="w-2/3 mx-auto mt-5">
            <form onSubmit={handleSubmit}>
                <h1>Update Relative</h1>
                <div className="">
                    <label className=" text-sm text-gray-200 ">Name</label>
                    <input
                        type="text"
                        name="relname"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter Relative Name"
                        required
                        value={inputUser.relname || ''}
                        onChange={handleChnage}
                    />
                </div>
                <div className="">
                    <label className=" text-sm text-gray-500 ">Year</label>
                    <input
                        type="text"
                        name="contact"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter Contact "
                        required
                        value={inputUser.contact || ''}
                        onChange={handleChnage}
                    />
                </div>
                <div className="">
                    <label className=" text-sm text-gray-500 ">FromToPeriod</label>
                    <input
                        type="text"
                        name="relation"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter relation "
                        required
                        value={inputUser.relation || ''}
                        onChange={handleChnage}
                    />
                </div>



                <div className="flex justify-center my-4">
                    <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm ">
                        Update Relative
                    </button>
                </div>

                {/* <div className="flex justify-center my-4">
                    <button onClick={updatebackbtn} style={{ position: "relative", top: "-55px", left: "140px" }} type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm backbutton ">
                        Back
                    </button>
                </div> */}
            </form>
        </div>
    );
};

export default RelUpdate;