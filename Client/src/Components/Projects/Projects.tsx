import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import { RootState } from "../../redux/actions-types";
import Styles from './Projects.module.css';
import { useSelector } from "react-redux";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Project {
    id: number;
    name: string;
    description: string;
    photos: string[];
    video?: string;
    links: string[];
    visible: boolean;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const Back_url = process.env.REACT_APP_BACK_URL;
    const Back_url2 = process.env.REACT_APP_BACK_URL2;
    const languageState = useSelector((state: RootState) => state.language);

    useEffect(() => {
        getProjects(languageState)
    }, [])
    useEffect(() => {
        getProjects(languageState)
    }, [languageState])

    const getProjects = async (languageState: boolean) => {
        for (const baseUrl of [Back_url, Back_url2]) {
            try {
                const response = await axios.get(`${baseUrl}/projects/${languageState}`);
                setProjects(response.data);
                return;
            } catch (err) {
                console.warn(`Server failed: ${baseUrl}`);
            }
        }

        console.error('All servers failed');
    };



    return (

        <div className={Styles.divMayor}>
            <NavBar />
            {projects.length > 0 && (
                <div className={Styles.projectsContainer}>
                    {projects.map((project) => (
                        <div key={project.id} className={Styles.projectCard}>
                            {project.photos.length > 0 && (
                                <img src={project.photos[0]} alt="Project img" />
                            )}
                            <h2>{project.name}</h2>
                            <p>{project.description}</p>
                            <div className={Styles.linksCont}>
                                <h3>Links:</h3>
                                <ul>
                                    {project.video && (
                                        <li>
                                            <a href={project.video}>Video <FontAwesomeIcon icon={faYoutube} /></a>
                                        </li>
                                    )}
                                    {project.links.map((link, index) => (
                                        <li key={index}>
                                            <a href={link} target="_blank" rel="noopener noreferrer">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {projects.length === 0 && (
                <div className={Styles.loadingContainer}>
                    <div className={Styles.loadingSpinner}></div>
                    <p>Loading projects...</p>
                </div>
            )}
        </div>

    )
}