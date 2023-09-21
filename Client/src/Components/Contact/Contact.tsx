import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Styles from './Contact.module.css';
import { RootState } from "../../redux/actions-types";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Toaster, toast } from 'react-hot-toast';

export default function Contact() {
    const [contactInfo, setContactInfo] = useState({ "id": 0, "phone": 0, "email": "", "whatsapp": "" });
    const Back_Url = process.env.REACT_APP_BACK_URL;
    const languageState = useSelector((state: RootState) => state.language);
    const [buttonstate, setButtonState] = useState(false);
    const [errors, setErrors] = useState({ "email": "", "text": "" });
    const [Data, setData] = useState({
        email: '',
        text: '',
    });
    const errorMessagesByLanguage = {
        en: {
          requiredField: "This field is required",
          invalidEmail: "Invalid email format",
          enterMessage: "Insert your message",
        },
        es: {
          requiredField: "Este campo es requerido",
          invalidEmail: "Formato de correo electrónico no válido",
          enterMessage: "Ingrese su mensaje",
        },
      };

    useEffect(() => {
        getContactInfo();
    }, [])    

    const getContactInfo = async () => {
        try {
            const response = await axios.get(`${Back_Url}/contact`)
            setContactInfo(response.data[0])

        } catch (error:any) {
            toast.error(error.message)
        }
    }

    const validation = () => {
        const error = { email: "", text: "" };
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const currentLanguage = languageState ? "es" : "en";

        if (Data.email.trim().length === 0) {
            error.email = errorMessagesByLanguage[currentLanguage].requiredField;
          } else if (!emailRegex.test(Data.email)) {
            error.email = errorMessagesByLanguage[currentLanguage].invalidEmail;
          }
      
          if (Data.text.trim().length === 0) {
            error.text = errorMessagesByLanguage[currentLanguage].enterMessage;
          }
        return error;

    }

    useEffect(() => {
        const resultForm = validation()
        setErrors(resultForm);
        const hasErrors = Object.values(resultForm).some(error => error !== "");

        if (!hasErrors) {
            setButtonState(true);
        } else {
            setButtonState(false)
        }
        console.log("buttonstate:", buttonstate)
    }, [Data, languageState])


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${Back_Url}/contact/mail`, Data)
            setData({
                email: '',
                text: ''

            })
            toast.success(response.data)
        } catch (error: any) {
            toast.error(error.message)

        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target as HTMLInputElement;;
        setData(Data => ({
            ...Data,
            [name]: value
        }));
    }

    return (
        <div className={Styles.DivMayor}>
            <NavBar />
            <div className={Styles.Divcontainer}>
                < Toaster />
                <div className={Styles.divForm}>
                    <form onSubmit={handleSubmit}>
                        <div className={Styles.labelContainer}>
                            <label className={Styles.label}> {languageState ? "Correo Electrónico" : "Email"} </label>
                            <input type="text" name="email" value={Data.email} onChange={handleChange} />
                            {errors.email && (<p>{errors.email}</p>)}
                        </div>
                        <div className={Styles.labelContainer}>
                            <label className={Styles.label}> {languageState ? "Mensaje" : "Message"} </label>
                            <textarea className={Styles.inputText} name="text" value={Data.text} onChange={handleChange} rows={5} />
                            {errors.text && (<p>{errors.text}</p>)}
                        </div>
                        <div className={Styles.divButton}>
                            {buttonstate && (
                                <button type="submit" >{languageState ? "Enviar" : "Send"}</button>
                            )}
                        </div>
                    </form>
                </div>

            </div>
            <footer className={Styles.Footer}>
                <p>
                    {languageState ? "Teléfono: " : "Phone: "} <FontAwesomeIcon icon={faPhone} />{contactInfo.phone}
                </p>
                <p>
                    {languageState ? "Correo Electrónico: " : "Email: "} <FontAwesomeIcon icon={faEnvelope} />{contactInfo.email}
                </p>
                <p >
                    <a href={contactInfo.whatsapp} target="_blank" rel="noopener noreferrer">
                        WhatsApp: <FontAwesomeIcon icon={faWhatsapp} /> {languageState ? "Chatea conmigo " : "Whatsapp me "}
                    </a>
                </p>
            </footer>
        </div>
    )
}