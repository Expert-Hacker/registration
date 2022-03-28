import React, { useEffect, useState } from 'react'
import '../registration.css'
import Users from './Users';
import axios from 'axios'
function Registration() {
  const[fname,setfname]=useState();
  const[phone,setPhone]=useState();
  const[email,setEmail]=useState()

  const[jType,setJType]=useState("")
  const[date,setDate]=useState("")

  const[location1,setLocation1]=useState("")
  const[location2,setLocation2]=useState("")
  const[location3,setLocation3]=useState("")

  const[file1,setFile]=useState(null)

    let name, value;
    function handlefname(e)
    {
       setfname(e.target.value)
    }
    function handleemail(e)
    {
        setEmail(e.target.value)
    }
    function handlephone(e)
    {
        setPhone(e.target.value)
    }
    //job Type
    function handleRadio(e)
    {
        setJType(e.target.value)
    }
    function handleDate(e)
    {
        setDate(e.target.value)
    }
    function handleCheckbox1(e)
    {
        setLocation1(e.target.value)
    }
    function handleCheckbox2(e)
    {
        setLocation2(e.target.value)
    }
    function handleCheckbox3(e)
    {
        setLocation3(e.target.value)
    }
    const register =async(e)=>{
        e.preventDefault()
        let fd=new FormData();

        fd.append("fullname",fname)
        fd.append("mobile",phone)
        fd.append("email",email)
        fd.append("jobtype",jType)
        fd.append("dob",date)
        fd.append("preflocation1",location1)
        fd.append("preflocation2",location2)
        fd.append("preflocation3",location3)
        fd.append("profile",file1);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        // axios----------start

        axios.post("/upload",fd,config)
        .then((responce)=>{
            console.log(responce)
            alert("User Created Successfully!")
        }).catch((er)=>{
            alert(`${er.response.data}`)
        });
        
    }
    function handleprofilepic(e)
    {
        setFile(e.target.files[0])
    }

  return (
     
        <div className="registration">
            <p className='pt-2 caption-1'>Registration</p>
            <div className="inputs-container shadow-lg">
                <div className='child-1  child-flex'>
                    <span className='full-name'>Full Name</span>
                    <input onChange={handlefname}  className='form-control w-50' type="text" name='fullname'/>
                </div>
                <div className='child-2 child-flex'>
                    <span className='profile-pic'>Profile Picture</span>
                    <input onChange={handleprofilepic} className='form-control w-50' type="file" name="profile" id="" />
                </div>
                <div className='child-3 child-flex'>
                    <span className='mobile-no'>Mobile</span>
                    <input  onChange={handlephone}  className='form-control w-50' type="Number" name='mobile'/>
                </div>
                <div className='child-4 child-flex'>
                    <span className='email ' >Email</span>
                    <input onChange={handleemail} type="email" className='form-control w-50' name='email'/>
                </div>
                <div className='radios-tit-conatiner'>
                    <span className='email'>Job Type</span>
                    <div className="radios-container">
                        <div className='radio'>
                            <span>FT</span>
                            <input type="radio" value="FT" name="job" id="" className='' onChange={handleRadio}/>
                        </div>
                        <div className='radio'>
                            <span>PT</span>
                            <input type="radio" value="PT" name="job" id="" className='' onChange={handleRadio}/>
                        </div>
                        <div className='radio'>
                            <span>Consultant</span>
                            <input type="radio" value="Consultant" name="job" id="" className='' onChange={handleRadio}/>
                        </div>
                    </div>
                </div>
                <div className="child-6 child-flex">
                    <span>DOB</span>
                    <input onChange={handleDate} type="date" name="dob" id="" className='form-control w-50'/>
                </div>
                <div className="radios-tit-conatiner" >
                    <span>Pref. location</span>
                    <div className='radios-container'>
                        <div className="radio">
                            <span>Chennai</span>
                            <input type="checkbox" onChange={handleCheckbox1} value="Chennai" name="location1" id="" className=''/>
                        </div>
                        <div className='radio'>
                            <span>Banglore</span>
                            <input type="checkbox" onChange={handleCheckbox2} value="Banglore" name="location2" id="" className=''/>
                        </div>
                        <div className="radio">
                            <span>Pune</span>
                            <input type="checkbox" onChange={handleCheckbox3} value="Pune" name="location3" id="" className=''/>
                        </div>
                    </div>
                </div>
                <div className="child-8 child-flex">
                    <button className='btnn' onClick={register}>ADD</button>
                </div>
               
            </div>
            <Users/>
            {/* CUSTOM CODE OF USERS */}

    {/* CUSTOM CODE OF USERS END */}
        </div>
  )
}

export default Registration