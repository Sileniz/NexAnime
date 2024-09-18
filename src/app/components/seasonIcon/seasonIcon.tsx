import Image from 'next/image'
import styles from './seasonIcon.module.css'

export default function SeasonIcon({season, image, onClick, isSelected}: any){
    return(
        <div className={`${isSelected == season ? styles.selected : styles.containerSeason}`} onClick={onClick}>
            <Image src={image} className={`${isSelected == season ? styles.selectedImage : styles.imageSeason}`} alt="image" width={30} height={30}/>
            <p className={styles.season}>{season}</p>
        </div>
    )
}