import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate } from "react-router-dom";
import createGroup from "./createGroup.js";
import "../../styles/groups.css";

const Groups = () => {

    const {store, actions}= useContext(Context);
    const navigate = useNavigate();

    const handleButton=()=>{
        navigate("/createGroup");
    };

    const handleDetails=(groupId)=>{
        navigate(`/group/${groupId}`);
    };

    const handleDelete=(groupId)=>{
        const success = actions.deleteGroup(groupId);
        if (success) {
            console.log("bien");
            window.location.reload(false);
        } else {
            console.log("mal");
        }
    };

    useEffect(() => {
        actions.getUserGroups();
        actions.getUserMyGroups();
    }, []);

    return (
        <div>
            <button onClick={handleButton} className="btn btn-outline-primary">+ Create new group</button>
            <tr/>
            <h2>Yous groups</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Nº Members</th>
                        <th scope="col">Nº Eventos</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {store.groups.length > 0 ? (
                        store.groups.map((group, index) => (
                            <tr key={index}>
                                <td>{group.name}</td>
                                <td>{group.members.length}</td>
                                <td>..........</td>
                                <td>
                                    <button onClick={() => handleDelete(group.id)} className="btn btn-outline-danger" type="buttom"> - Delete group </button>
                                    <button onClick={() => handleDetails(group.id)} className="btn btn-outline-primary" type="buttom"> - Details group </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>.............</td>
                            <td>.............</td>
                            <td>.............</td>
                            <td>.............</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
        </div>
    );
};

export default Groups;