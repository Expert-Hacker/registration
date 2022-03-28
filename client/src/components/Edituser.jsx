import React, { useEffect, useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import '../edit.css'
function Edituser(props) {
    const[users,setUsers]=useState([])
    const[dobval,setdobval]=useState("")

    const[checkbox1,setcheckbox1]=useState(false)
    const[checkbox2,setcheckbox2]=useState(false)
    const[checkbox3,setcheckbox3]=useState(false)

    const[jtype,setjtype]=useState("");

    const[location1, setlocation1]=useState("")
    const[location2, setlocation2]=useState("")
    const[location3, setlocation3]=useState("")

  useEffect(() => {
        fetchdata()
  }, [])
  function refresh()
  {
      fetchdata()
  }

  async function fetchdata()
  {
    let resp=await fetch(`/getuserdetails/${props.details}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data=await resp.json();
    console.log(data)
    setUsers(data)
    setdobval(data.dob)
    setjtype(data.jobtype)
    let jobtype=data.jobtype
    if(jobtype=="FT")
    {
        document.getElementById('radio1').checked=true
    }
    else if(jobtype=="PT")
    {
        document.getElementById('radio2').checked=true
    }
    else
    {
        document.getElementById('radio3').checked=true
    }
    //
    let preflocaltion1=data.preflocation1;
    let preflocaltion2=data.preflocation2;
    let preflocaltion3=data.preflocation3;
    
    
    if(preflocaltion1!=="")
    {
        document.getElementById('checkbox1').checked=true;
        setlocation1("Chennai")
    }
    else
    {
        document.getElementById('checkbox1').checked=false;
    }
    if(preflocaltion2!=="")
    {
        document.getElementById('checkbox2').checked=true;
        setlocation2("Banglore")
    }
    else
    {
        document.getElementById('checkbox2').checked=false;
        setcheckbox2(false)
    }
    if(preflocaltion3!=="")
    {
        document.getElementById('checkbox3').checked=true;
        setlocation3("Pune")
    }
    else
    {
        document.getElementById('checkbox3').checked=false;
        setcheckbox3(false)
    }
  }

  const[namee,setname]=useState({
    "fullname":""
})
const[email,setemail]=useState({
    "email":""
})
const[phone,setphone]=useState({
    "phone":""
})

function handleRadio(w){
    setjtype(w.target.value)
}


  let name, value
  function handleInput(e)
  {
        name=e.target.name;
        value=e.target.value;
        setUsers({...namee,[name]:value})
  }
  function handleemailInput(e)
  {
        name=e.target.name;
        value=e.target.value;
        setUsers({...email,[name]:value})
  }
  function handlePhoneInput(e)
  {
        name=e.target.name;
        value=e.target.value;
        setUsers({...phone,[name]:value})
  }
  const updateuser =async()=>{
    //   console.log(users.fullname)
    //   console.log(users.phone)
    //   console.log(users.email)
      let{fullname,email,phone}=users;
      console.log(jtype)
      console.log(dobval)

      try {
        
        let resp=await fetch(`/updateuser/${props.details}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            fullname,email,phone,jtype,dobval,location1,location2,location3
        })
    })
    
    if(resp.status==200)
    {
      alert("User Details Updated")
    }
    else if(resp.status==400)
    {
        alert("Error")          
    }
    } catch (error) {
      alert("Error")
    }
  }
   function handleDate(e)
   {
       setdobval(e.target.value)
   }
   function handleCheckbox1(e)
   {
       setlocation1(e.target.value)
   }
   function handleCheckbox2(e)
   {
       setlocation2(e.target.value)
   }
   function handleCheckbox3(e)
   {
       setlocation3(e.target.value)
   }
  
  
  return (
    <>
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><div className='w-100'><h5>Edit details</h5><Button size='small' onClick={refresh}>refresh</Button></div></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <input type="text" value={users.fullname} onChange={handleInput} placeholder='Full name' name='fullname' className='form-control my-3'/>
                <input type="number" value={users.mobile} onChange={handlePhoneInput} placeholder='Phone number' name="phone" className='form-control my-3'/>
                <input type="email" value={users.email} onChange={handleemailInput} placeholder='Email' name="email" className='form-control my-3'/>
                <div>
                    <span>Job Type</span>
                    <div className='d-flex'>
                        <div className='modal-radio'>
                            <p className='pr-2'>FT</p>
                            <input type="radio" name='radio' id='radio1' value="FT"  onChange={handleRadio}/>
                        </div>
                        <div className='modal-radio'>
                            <p className='pr-2'>PT</p>
                            <input type="radio" name='radio' id='radio2' value="PT"  onChange={handleRadio}/>
                        </div>
                        <div className=' modal-radio'>
                            <p className='pr-2'>Consultant</p>
                            <input type="radio" name='radio' id='radio3' value="Consultant"  onChange={handleRadio}/>
                        </div>
                    </div>
                </div>
                <input type="date" value={dobval} className='form-control mb-3' id='date1' onChange={handleDate}/>
                <div>
                    <span>Pref, location</span>
                    <div className='d-flex'>
                        <div className=' modal-radio'>
                            <p>Chennai</p>
                            <input type="checkbox"   onChange={handleCheckbox1} id="checkbox1"/>
                        </div>
                        <div className=' modal-radio'>
                            <p>Banglore</p>
                            <input type="checkbox"  onChange={handleCheckbox2} id="checkbox2"/>
                        </div>
                        <div className=' modal-radio'>
                            <p>Pune</p>
                            <input type="checkbox"  onChange={handleCheckbox3} id="checkbox3"/>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' size='small' onClick={updateuser}>
            UPDATE
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edituser