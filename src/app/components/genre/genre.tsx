interface GenreProps {
    genre: string;
}
import styles from './genre.module.css'
export default function Genre({genre}: GenreProps){
    return(
        <div className={styles.containerGenre}>
            <p className={styles.genre}>{genre}</p>
        </div>
    )
}

export function ParentComponentGenre({value}: any) {
    return (
        <div className={styles.containerInfo}>
            <p className={styles.labelInfo}>Genres:</p>
            <div className={styles.tagsContainer}>
            {value.genres.map((genre: any, genreKey: number) => (
              <Genre genre={genre.name} key={genreKey}/>
            ))}
          </div>
          <p className={styles.labelInfo}>Themes:</p>
          <div className={styles.tagsContainer}>
            {value.themes.map((genre: any, genreKey: number) => (
              <Genre genre={genre.name} key={genreKey}/>
            ))}
          </div>
        </div>
    );
}