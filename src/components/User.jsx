// import moment from 'moment'
import React, { useContext, useState, useEffect } from 'react'
import acData from './activitiesApi'
import css from '../styles/Login.module.css'
import LogedIn from './context/LogedIn'
import { useLocation } from 'react-router-dom'
import Avatar from 'react-avatar-edit'
import { Dialog } from 'primereact/dialog';
import moment from 'moment/moment'


const getLocalData = () => {
  const actDataList = localStorage.getItem("ezilinActData");
  if (actDataList) {
    return JSON.parse(actDataList);
  } else {
    return acData;
  }
};

const User = (props) => {

  const [imgSrc, setImgSrc] = useState(null)
  const [actData, setActData] = useState(getLocalData())
  const [logedIn, setLogedIn] = useContext(LogedIn)
  const [visible, setVisible] = useState(false)
  const [editMode, setEditMode] = useState({display:"none"})
  const [dataToEdit, setDataToEdit] = useState({
    id: 0,
    date: '',
    userEmail: '',
    userName: '',
    userDuty: ''})

  const location = useLocation()
  const curUser = location.state[0]

  const logOutHandler = () => {
    setLogedIn(false)
  }

  const editItem = (el) =>{
    if (editMode.display === "none"){
      setEditMode({display:"inline"})
    }else{
      setEditMode({display:"none"})
    }
    setDataToEdit(el)
    console.log(el)

    
  }

  const delItem = (i) => {
    if (curUser.role === "admin") {
      const filteredData = actData.filter((el) => {
        if (i.id !== el.id) {
          return el
        }
      })
      setActData(filteredData)
    }
    else {
      alert("sorry You are not an admin only admin can delete the record thannsk")
    }
  }

  const adActData = () => {
    const presentData = {
      id: actData.length + 1,
      date: moment().format('DDMMYYYY'),
      userEmail: curUser.email,
      userName: curUser.name,
      userDuty: "Present"
    }
    const findRec = actData.filter((el) => {

      return el.date === presentData.date && el.userEmail === presentData.userEmail
    })
    if (findRec.length > 0) {
      // console.log("recordFound")
      alert('Only one Record in same data')
    } else {
      setActData([...actData, presentData])
      alert('New Record has beeb added')
    }
  }

  const adAbsData = () => {
    const presentData = {
      id: actData.length + 1,
      date: moment().format('DDMMYYYY'),
      userEmail: curUser.email,
      userName: curUser.name,
      userDuty: "Absent"
    }
    const findRec = actData.filter((el) => {

      return el.date === presentData.date && el.userEmail === presentData.userEmail
    })
    if (findRec.length > 0) {
      // console.log("recordFound")
      alert('Only one Record in same data')
    } else {
      // console.log("Not Found")
      setActData([...actData, presentData])
      alert('New Record has beeb added')
    }
  }


  const cropEvent = (view) => {
    setImgSrc(view)
  }

  useEffect(() => {

    localStorage.setItem("ezilinActData", JSON.stringify(actData));

  }, [actData])


  return (

    <div className={css.detailsWrapper}>
      <div className={css.detailsTop}>
        <div>
          <img src={imgSrc} width={60} height={60} onClick={() => setVisible(true)}/>
          <h3> {curUser.name}</h3>
          <Dialog header="Header" visible={visible} onHide={() => setVisible(false)}
            style={{ width: '50vw',}} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
            <Avatar
              label="+"
              lineWidth={0}
              width={350}
              height={350}
              onCrop={cropEvent}
            />
          </Dialog>
        </div>
        <div>
          <button onClick={adActData}>Present</button>
          <button onClick={adAbsData}>Absent</button>
        </div>
        <button onClick={logOutHandler}>LogOut</button>
      </div>
      <div style={editMode}>

      <input value={dataToEdit.userName} />
      <input type='dropDown' value={dataToEdit.userName} />
      <input value={dataToEdit.userName} />

      </div>
      <div className={css.detailWrapper}>
        <div className={css.detail}>
          <h3>Date</h3>
          <h3>Name</h3>
          <h3>Activity</h3>
          <h3>Edit</h3>
          <h3>Delete</h3>
        </div>

        {

          actData.map((el, i) => {
            if (curUser.role === 'admin') {
              // if(el.userEmail=== curUser.email){
              return (
                <div className={css.detail} key={i}>
                  <h5>{el.date}</h5>
                  <h5>{el.userName}</h5>
                  <h5>{el.userDuty}</h5>
                  <button onClick={() => editItem(el)}>Edit</button>
                  <button onClick={() => delItem(el)}>Delete</button>
                </div>
              )
              // }
            } else {
              if (el.userEmail === curUser.email) {
                return (
                  <div className={css.detail} key={i}>
                    <h5>{el.date}</h5>
                    <h5>{el.userName}</h5>
                    <h5>{el.userDuty}</h5>
                    <h5>Edit</h5>
                    <button onClick={() => delItem(el)}>Delete</button>
                  </div>
                )
              }
            }


          })
        }


      </div>

    </div>



  )
}

export default User