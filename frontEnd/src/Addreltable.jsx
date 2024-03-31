import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import './App.css'

const Addreltable = () => {
    const { id } = useParams()
    console.log(id)
    const navigate = useNavigate()

    const [adddata, setAdddata] = useState([]);


    const fetchAllUser = async () => {
        const res = await axios.get(`http://localhost:8085/relativedata/${id}`);
        console.log("fateching data", res);
        setAdddata(res.data);
    };
    useEffect(() => {
        fetchAllUser();
    }, []);


    const [inputUser, setInputUser] = useState({
        relname: "",
        contact: "",
        relation: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(inputUser);inputUser
        console.log(id)
        const res = await axios.post(`http://localhost:8085/insertreltable/${id}`, inputUser);
        console.log(res);
        fetchAllUser();

        // navigate(`/newtable${id}`)
    };


    const handleChnage = (event) => {
        setInputUser({
            ...inputUser,
            [event.target.name]: event.target.value,
        });
    };

    // navigate

    // const expupbtn=()=>{
    // navigate('/')
    // }


    const cancelbtn = () => {
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1 style={{ fontSize: "40px", position: "relative", top: "-25px" }}>Add Relative</h1>
                <div className="">
                    <label className=" text-sm text-gray-500 ">Name</label>
                    <input
                        type="text"
                        name="relname"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter  Name"
                        required
                        value={inputUser.relname || ''}
                        onChange={handleChnage}
                    />
                </div>
                <div className="">
                    <label className=" text-sm text-gray-500 ">Contact</label>
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
                    <label className=" text-sm text-gray-500 ">Relation</label>
                    <input
                        type="text"
                        name="relation"
                        className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
                        placeholder="Enter Relation "
                        required
                        value={inputUser.relation || ''}
                        onChange={handleChnage}
                    />
                </div>




                <div className="flex justify-center my-4">
                    <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
                        Submit
                    </button>
                </div>

                {/* <div className="flex justify-center my-4">
                    <button onClick={cancelbtn} type="submit" style={{ position: "relative", top: "-57px", left: "120px" }} className="px-4 py-2 bg-yellow-400 rounded-sm">
                        Cancel
                    </button>
                </div> */}


            </form>

        </div>


    )
}

export default Addreltable
