import { useEffect, useState } from "react";
import { userList } from "../../service/UserService";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        userList(
            (data) => {
                setListUser(data);
            },
            (error) => {
                console.log(error);
            }
        )
    })
    return (
        <table className="w-full text-sm text-left mt-3 ">
            <thead className="text-xs uppercase bg-gray-100 ">
                <tr>
                    <th className="px-6 py-3">Id</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {listUser.map((dta) => (
                    <tr>
                        <td className="px-6 py-4">{dta.id}</td>
                        <td className="px-6 py-4">{dta.name}</td>
                        <td className="px-6 py-4">{dta.email}</td>
                        <td className="px-6 py-4 flex space-x-3"><Link to={`/user/${dta.id}`} className="bg-yellow-200 rounded-md p-3">Edit </Link>
                            <button className="bg-red-200 rounded-md p-3" onClick={(e) => {
                                axios
                                    .delete(`http://localhost:8082/api/users/delete/${dta.id}`)
                                    .then((res) => {
                                        console.log(res);
                                    })
                                    .catch((err) => {
                                        console.log(err.message);
                                    });
                            }}>
                                <button className="btn" type="submit">Delete</button>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
export default UserList;