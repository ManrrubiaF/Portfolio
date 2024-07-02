import NavBar from '../NavBar/NavBar'
import Styles from './Home.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/actions-types'
import foto from '../../assets/foto-cv-removebg-preview.jpg'





export default function Home() {
    const languageState = useSelector((state: RootState) => state.language);
    const [about, setAbout] = useState("")
    const Back_Url = process.env.REACT_APP_BACK_URL;
    const Back_Url2 = process.env.REACT_APP_BACK_URL2;

    useEffect(() => {
        getAbout()
    }, [])
    useEffect(() => {
        getAbout()
    }, [languageState])

    const getAbout = async () => {
        try {
            const response = await axios.get(`${Back_Url}/about/${languageState}`)
            setAbout(response.data[0].text);
        } catch (error) {
            console.error('Error en el servidor principal, intentando con el servidor de respaldo');
            try {
                const response = await axios.get(`${Back_Url2}/about/${languageState}`);
                setAbout(response.data[0].text);
            } catch (backupError) {
                console.error('Error en el servidor de respaldo también');
            }
        }
    }


    return (
        <div className={Styles.divmayor}>
            <NavBar />
            <div className={Styles.divcontainer}>
                {about !== '' ? (
                    <div className={Styles.textContainer}>
                        <h3 className={Styles.textabout}>
                            {about}
                        </h3>
                    </div>
                ) : (
                    <div className={Styles.loadingContainer}>
                        <div className={Styles.loadingSpinner}></div>
                        <p>Loading...</p>
                    </div>
                )}

                <div className={Styles.image}>
                    <img src={foto} alt='Profile/Perfil' />
                </div>
            </div>
        </div>
    )
}

