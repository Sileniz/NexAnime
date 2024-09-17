import styles from './footer.module.css'
import { HiCodeBracket } from "react-icons/hi2";

export default function Footer(){
    return(
        <footer className={styles.FooterItem}>
            <p className={styles.FooterSite}>NexAnime @ 2024. Site desenvolvido com &#10084;</p>
            <div className={styles.footerCredits}>
                <HiCodeBracket />
                <p>Desenvolvido por: <a href="https://github.com/sileniz">
                Walisson(Sileniz)</a></p>
            </div>
        </footer> 
    )
}