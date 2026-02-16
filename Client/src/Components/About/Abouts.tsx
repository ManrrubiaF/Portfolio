import Styles from './About.module.css'
import axios from 'axios'
import { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/actions-types'
import NavBar from '../NavBar/NavBar'

export default function About() {
    const languageState = useSelector((state: RootState) => state.language)
    const [about, setAbout] = useState('')
    const Back_Url = process.env.REACT_APP_BACK_URL;
    const Back_Url2 = process.env.REACT_APP_BACK_URL2;
    const paragraphs = about.split('\n').filter(p => p.trim() !== '')

    
    const getAbout = useCallback(async () => {
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
    },[Back_Url,Back_Url2,languageState])

    useEffect(() => {
        getAbout()
    }, [getAbout])

    return (
        <div className={Styles.divmayor}>
            <NavBar />
            <div className={Styles.divcontainer}>
                {about !== '' ? (
                    <div className={Styles.textabout}>
                        
                            {paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        
                    </div>
                ) : (
                    <div className={Styles.loadingContainer}>
                        <div className={Styles.loadingSpinner}></div>
                        <p>Loading...</p>
                    </div>
                )}

            </div>
        </div>
    )
}

