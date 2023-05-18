import { useRef } from 'react';

import { Button, TextField } from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export default function ContactUs(){
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const questionInputRef = useRef(null);

    const handleClearInputs = () => {
        if (nameInputRef.current) {
          nameInputRef.current.value = '';
        }
        if (emailInputRef.current) {
          emailInputRef.current.value = '';
        }
        questionInputRef.current.value = '';

    };

    return(
        <div className="contact-us" id="contact-us">
            <h1>Контакти</h1>
            <div className="contact-us-wrapper">
                <div className="map-wrapper">
                    <iframe title="MyMap" className="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1495562.5859995647!2d25.819532364768975!3d42.93569098442153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sbg!2sbg!4v1683132153005!5m2!1sbg!2sbg"></iframe>
                </div>
                <div className="form-wrapper">
                    <p className="type-contact">
                        Пишете ни:
                    </p>
                    <div className="names">
                        <DemoItem label="Име:">
                            <TextField className='input' id="outlined-basic" variant="outlined" inputProps={{ ref: nameInputRef }}/>
                        </DemoItem>
                        <DemoItem label="Имейл:">
                            <TextField className='input' id="outlined-basic" variant="outlined" inputProps={{ ref: emailInputRef }}/>
                        </DemoItem>
                    </div>
                    <div className="question">
                        <DemoItem label="Вашият въпрос:">
                            <textarea className="fixed-textarea" rows={3} ref={questionInputRef}/>
                        </DemoItem>
                    </div>
                    <div className='button-wrapper'>
                        <Button className='button-send' variant="contained" onClick={handleClearInputs}>ИЗПРАТИ</Button>
                    </div>
                    <div className='numbers'>
                        <p className="type-contact">
                            Или ни се обадете:
                        </p>
                        <LocalPhoneIcon fontSize='small' className='phone-icon'/><p className='number'>+359 884904162</p>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}
