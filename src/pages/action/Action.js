import React from 'react'
import '../../components/style.css'
import { Language } from "../../lang/Languages";
import { useSelector } from "react-redux";



 function Action() {    
    const { lang } = useSelector((state) => state.lang);

    const {
        aksia,
    } = Language;

    return(
        <React.Fragment> 
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="aksia">
                            <div className="circle">
                                <h1 className='acH1'>
                                {aksia[lang]}
                                </h1>
                                </div>
                            </div>
                    </div>
                </div>
                </div>   
        </React.Fragment>
    )
}
export default Action;