interface coverType{
    cover: string 
    title: string
}

import styles from './cover.module.css'

export default function Cover({cover, title}: coverType){
    return(
        <div className={styles.containerCover}>
            <p className={styles.title}>{title}</p>
            <img src={cover} alt={`${title}'s cover`} className={styles.cover}/>
        </div>
    )
}