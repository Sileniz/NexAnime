import Image from 'next/image'
import styles from './seasonIcon.module.css'

export default function SeasonIcon({season, image, onClick}: any){
    return(
        <div className={styles.containerSeason} onClick={onClick}>
            <Image src={image} className={styles.imageSeason} alt="image" width={30} height={30}/>
            <p className={styles.season} >{season}</p>
        </div>
    )
}