import NavBar from '../NavBar/NavBar'
import Styles from './Home.module.css'
import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/actions-types'
import foto from '../../assets/foto-cv-removebg-preview.jpg'
import { useNavigate } from 'react-router-dom'






export default function Home() {
    const languageState = useSelector((state: RootState) => state.language);
    const Back_Url = process.env.REACT_APP_BACK_URL;
    const Back_Url2 = process.env.REACT_APP_BACK_URL2;
    const navigate = useNavigate()



    const getAbout = useCallback(async () => {
        try {
            const response = await axios.get(`${Back_Url}/about/${languageState}`)
            
        } catch (error) {
            console.error('Error en el servidor principal, intentando con el servidor de respaldo');
            try {
                const response = await axios.get(`${Back_Url2}/about/${languageState}`);
            } catch (backupError) {
                console.error('Error en el servidor de respaldo también');
            }
        }
    }, [Back_Url, Back_Url2, languageState]);

    useEffect(() => {
        getAbout()
    }, [getAbout])


    return (
        <div className={Styles.divmayor}>
            <NavBar />
            <div className={Styles.divcontainer}>
                {languageState ? (
                    <div className={Styles.divHero}>
                        <h1>Favio Manrrubia</h1>
                        <h2>Full Stack Developer · Backend-oriented</h2>
                        <p>
                            Construyo aplicaciones web con foco en arquitectura limpia, datos y backend escalable.
                        </p>
                        <p>
                            Disponible para oportunidades ·{" "}
                            <strong
                                className={Styles.Contact}
                                onClick={() => navigate("/contact")}
                            >
                                Contacto
                            </strong>
                        </p>
                    </div>
                ) : (
                    <div className={Styles.divHero}>
                        <h1>Favio Manrrubia</h1>
                        <h2>Full Stack Developer · Backend-oriented</h2>
                        <p>
                            I build web applications with a strong focus on clean architecture,
                            data, and scalable backend systems.
                        </p>
                        <p>
                            Available for opportunities ·{" "}
                            <strong
                                className={Styles.Contact}
                                onClick={() => navigate("/contact")}
                            >
                                Contact
                            </strong>
                        </p>
                    </div>
                )}

                <div className={Styles.image}>
                    <img src={foto} alt="Profile / Perfil" />
                </div>
            </div>

        </div >
    )
}

