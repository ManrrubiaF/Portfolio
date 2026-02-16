import NavBar from "../NavBar/NavBar";
import Styles from "./Skills.module.css";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { RootState } from "../../redux/actions-types";
import { useSelector } from "react-redux";

interface Skills {
  id: number;
  name: string;
  logo: string;
  level: string;
}

export default function ViewSkills() {
  const [skills, setSkills] = useState<Skills[]>([]);
  const Back_url = process.env.REACT_APP_BACK_URL;
  const Back_url2 = process.env.REACT_APP_BACK_URL2;
  const languageState = useSelector((state: RootState) => state.language);

  const getSkills = useCallback(async () => {
    try {
      const response = await axios.get(`${Back_url}/skills`);
      setSkills(response.data);
    } catch (error: any) {
      console.log(error.message);
      try {
        const response = await axios.get(`${Back_url2}/skills`);
        setSkills(response.data);
      } catch (error) {
        console.error('Error en los servidores')
      }
    }
  },[Back_url,Back_url2]);

  const handleDownload = () => {
    let pdfUrl = "";
    let link = document.createElement("a");
    if (languageState) {
      pdfUrl = "/cv/Favio_Manrrubia_desarrollador_Full_Stack.pdf";
      link.download = "Favio_Manrrubia_CV.pdf";
    } else {
      pdfUrl = "/cv/Favio_Manrrubia_cv_english.pdf";
      link.download = "Favio_Manrrubia_Resume.pdf";
    }
    link.href = pdfUrl;
    link.click();
  };
  useEffect(() => {
    getSkills();
  }, [getSkills,languageState]);

  return (
    <div className={Styles.divMayor}>
      <NavBar />
      {skills.length > 0 ? (
        <div>
          <div className={Styles.divDownload}>
            <p>
              {languageState
                ? "Recuerde seleccionar el idioma a descargar"
                : "Remember choose your language"}
            </p>
            <button className={Styles.downloadButton} onClick={handleDownload}>
              {languageState ? "Descargar CV" : "Download Resume"}
            </button>
          </div>
          <div className={Styles.divContainer}>
            {skills.map((skill) => (
              <div key={skill.id} className={Styles.skillCard}>
                <h3>{skill.name}</h3>
                <img src={skill.logo} className={Styles.skillLogo} alt="Logo" />
                <p className={skill.level}> Level: {skill.level}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={Styles.loadingContainer}>
          <div className={Styles.loadingSpinner}></div>
          <p>Loading projects...</p>
        </div>
      )}
    </div>
  );
}
