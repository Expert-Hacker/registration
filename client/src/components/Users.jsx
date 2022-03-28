import React, { useEffect, useState } from 'react'
import '../users.css'
import Edituser from './Edituser';
function Users() {
    const[users,setUsers]=useState([])
    const[editShow,seteditShow]=useState(false)
    const[details,setDtails]=useState()

    const[fname,setfname]=useState();
    const[phone,setPhone]=useState();
    const[email,setEmail]=useState()

    const[jType,setJType]=useState("")
    const[date,setDate]=useState("")

    const[location1,setLocation1]=useState("")
    const[location2,setLocation2]=useState("")
    const[location3,setLocation3]=useState("")
    useEffect(() => {
        fetchAllusers();
    }, [users])

    const fetchAllusers=async()=>{
        let resp=await fetch('/fetchAllusers',{
            method:"GET",
            headers:{
                "Content-Type":"appliaction/json"
            }
        })
        let data=await resp.json();
        setUsers(data)
        console.log(data)

    }
    let detailses
    // async function edituser(fullname,mobile,email,jobtype, dob,preflocation1,preflocation2,preflocation3)
    async function edituser(id)
    { 
        // setfname(fullname)
        // setPhone(mobile)
        // setEmail(email)
        // setJType(jobtype)
        // setDate(dob)
        // setLocation1(preflocation1)
        // setLocation2(preflocation2)
        // setLocation3(preflocation3)
        setDtails(id)
        seteditShow(true)
        
       
    }

    async function deteuser(id)
    {
        try {
            let resp=await fetch(`/deteteuser/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(resp.status==200)
            {
                alert("User Deleted Successfully")
                fetchAllusers();
            }
            else if(resp.status==400)
            {
                alert("Unable to delete user")
            }
        } catch (error) {
            alert("Unable to Complete the operation!")
        }
    }
    function handleClose()
    {
        seteditShow(false)
    }
    
  return (
    <div className='users-container container my-2'>
        {users.length == 0 ? <h4 className='p-4'>No users found!</h4> : <table  class="table-bordered bg-light table-striped table table-responsive ">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">DOB</th>
                    <th scope="col">Job Type</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody >
                    {users.map((user,index)=>(
                        <tr>
                            <td>{user.fullname}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.dob}</td>
                            <td>{user.jobtype}</td>
                            {/* <td><p  className='editDelete' onClick={()=>edituser(user.fullname,user.mobile,user.email,user.jobtype, user.dob,user.preflocation1,user.preflocation2,user.preflocation3)}>Edit</p><p className='editDelete' onClick={()=>deteuser(user._id)}>Delete</p></td> */}
                            <td><a href={`http://localhost:5000/${user.path.replace('/client/public/images/','')}`} target="_blank" className='editDelete'>Pic</a><p  className='editDelete' onClick={()=>edituser(user._id)}>Edit</p><p className='editDelete' onClick={()=>deteuser(user._id)}>Delete</p></td>
                        </tr>
                    ))}
            </tbody>
        </table>}
{/* <Edituser show={editShow} handleClose={handleClose} fname={fname}  phone={phone} email={email} jType={jType} dob={date} location1={location1} location2={location2} location3={location3}/> */}
<Edituser show={editShow} handleClose={handleClose} details={details}/>
    </div>
  )
}

export default Users

{/* <img src={`http://localhost:5000/${user.path.replace('/client/public/images/','')}`} alt="profile" height="30px" /> */}