import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import Styles from "./Contact.module.css";
import Footer from "../Footer/Footer";
import { RootState } from "../../redux/actions-types";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Toaster, toast } from "react-hot-toast";

export default function Contact() {
  const Back_Url = process.env.REACT_APP_BACK_URL;
  const Back_Url2 = process.env.REACT_APP_BACK_URL2;
  const languageState = useSelector((state: RootState) => state.language);
  const [buttonstate, setButtonState] = useState(false);
  const [errors, setErrors] = useState({ email: "", text: "" });
  const [Data, setData] = useState({
    email: "",
    text: "",
  });



  const validation = useCallback(() => {
    const error = { email: "", text: "" };
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const currentLanguage = languageState ? "es" : "en";
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

    if (Data.email.trim().length === 0) {
      error.email = errorMessagesByLanguage[currentLanguage].requiredField;
    } else if (!emailRegex.test(Data.email)) {
      error.email = errorMessagesByLanguage[currentLanguage].invalidEmail;
    }

    if (Data.text.trim().length === 0) {
      error.text = errorMessagesByLanguage[currentLanguage].enterMessage;
    }
    return error;
  }, [Data, languageState]);

  useEffect(() => {
    const resultForm = validation();
    setErrors(resultForm);
    const hasErrors = Object.values(resultForm).some((error) => error !== "");

    if (!hasErrors) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [Data, languageState, validation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${Back_Url}/contact/mail`, Data);
      setData({
        email: "",
        text: "",
      });
      toast.success(response.data);
    } catch (error: any) {
      toast.error(error.message);
      try {
        const response = await axios.post(`${Back_Url2}/contact/mail`, Data);
        setData({
          email: "",
          text: "",
        });
        toast.success(response.data);
      } catch (error) {
        console.error('Error en ambos servidores')
      }
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target as HTMLInputElement;
    setData((Data) => ({
      ...Data,
      [name]: value,
    }));
  };

  return (
    <div className={Styles.DivMayor}>
      <NavBar />
      <div className={Styles.Divcontainer}>
        <Toaster />
        <div className={Styles.divForm}>
          <form onSubmit={handleSubmit}>
            <div className={Styles.labelContainer}>
              <label className={Styles.label}>
                {" "}
                {languageState ? "Correo Electrónico" : "Email"}{" "}
              </label>
              <input
                type="text"
                name="email"
                value={Data.email}
                onChange={handleChange}
              />
              {errors.email ? (<p className={Styles.errorText}>{errors.email}</p>) : (<p className={Styles.errorText}></p>)}
            </div>
            <div className={Styles.labelContainer}>
              <label className={Styles.label}>
                {" "}
                {languageState ? "Mensaje" : "Message"}{" "}
              </label>
              <textarea
                className={Styles.inputText}
                name="text"
                value={Data.text}
                onChange={handleChange}
                rows={5}
              />
              {errors.text ? (<p className={Styles.errorText}>{errors.text}</p>) : (<p className={Styles.errorText}></p>)}
            </div>
            <div className={Styles.divButton}>
              {buttonstate && (
                <button type="submit">
                  {languageState ? "Enviar" : "Send"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
