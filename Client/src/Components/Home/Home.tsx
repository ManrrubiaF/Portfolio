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
            console.error('Server error')
        }
    }


    return (
        <div className={Styles.divmayor}>
            <div className={Styles.divnav}>
                <NavBar />
            </div>
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

                <div className={Styles.imgage}>
                    <img src={foto} alt='Profile/Perfil' />
                </div>
            </div>

        </div>
    )
}

