import React, {useEffect, useState} from 'react';
import axios from "axios";
import {MainApi} from "../../api/index"
import {Button, Result} from "antd";
import {useSelector} from "react-redux";
import {Language} from "../../lang/Languages";
import {toast} from "react-toastify";
import LogoutComponent from "../../components/logoutComponent/logoutComponent";

function InfoComp(props) {
    const [data, setData] = useState(undefined)
    const [file, setFile] = useState(undefined)
    const {lang} = useSelector(state => state.lang)
    const {send,success,file_needed , delete2} = Language;

    const showModal = (a) => {
        window.location.replace(data?.find(i => i._id === a).photo[0])
    };

    useEffect(() => {
        axios.get(`${MainApi}/exel/all`).then(res => {
            setData(res?.data?.data)
        })
    }, [])

    // function delPost(_id){
    //     axios.delete(`${MainApi}/exel/${_id}`)
    //     .then(()=>{
    //         console.log("deleted")
    //     })
    // }

    const delPost = async (_id) => {
        await fetch(`${MainApi}/exel/63d26900b3d4c7595196ec37`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json"
          }
        })
    
        // await setPeople(people.filter(person => person._id !== _id))
      }

    const handleSubmit = () => {
        if (!!file) {
            const formData = new FormData
            formData.append("photo", file)
            axios.post(`${MainApi}/exel/add`, formData).then(res => {
               toast.success(success[lang])
            }).
                catch(err => toast.error("Error"))
        }
        else {
            toast.warn(file_needed[lang])
        }
    }

    return (
        <div className="excelWr">
            <div className="pinfo">
                <LogoutComponent/>
            </div>
            <input type="file" onChange={event => setFile(event?.target?.files[0])}/>
            <div>
                <Button type="primary" onClick={() => handleSubmit()}>
                    {send[lang]}
                </Button>

                <Button type="reset" onClick={delPost} style={{transform:"translateX(10px)"}}>
                    {delete2[lang]}
                </Button>

            </div>
            {
                data?.map((i, k) => {
                    return (
                        <div key={k} className="excelRow">
                            <Button onClick={() => showModal(i?._id)}>Yuklab olish</Button>
                            <div className="m-l-10">
                                {i?.photo[0]}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default InfoComp;

