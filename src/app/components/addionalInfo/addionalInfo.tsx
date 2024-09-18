import styles from './addionalInfo.module.css'
interface info{
    aired: string | null
    episodes: string | null
    synopsis: string | null
}
export default function AddionalInfo({ aired, episodes, synopsis }: info) {
    return (
        <>
            {aired ? <div className={styles.info}>
                <p>{aired} | {episodes} episodes</p>
            </div> : null}
            <p className={styles.synopsis}>{synopsis}</p>
            {synopsis ?  <hr className={styles.hrA} /> : null}
        </>
    )
}