"use client";
import styles from "./page.module.css";
import summer from 'svg@/summer.svg'
import spring from 'svg@/spring.svg'
import winter from 'svg@/winter.svg'
import fall from 'svg@/fall.svg'
import { useState, useEffect, useRef } from "react";
import fetchSeason from "./libs/fetchSeason";
import Cover from "./components/cover/cover";
import { ParentComponentGenre } from "./components/genre/genre";
import AddionalInfo from "./components/addionalInfo/addionalInfo";
import SeasonIcon from "./components/seasonIcon/seasonIcon";

export default function Home() {
  const [result, setResult] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [season, setSeason] = useState<string>('Fall');
  const [width, setWidth] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const refPages = useRef<number | null>(1)
  const loadinPage = useRef<boolean>(false)
  const nextPage = useRef<boolean>(true);
  const prevSeason = useRef<string>('Fall')
  const objectSeason = { Winter: winter, Spring: spring, Summer: summer, Fall: fall };

  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const heightWindow = window.innerHeight;
      const scrollPosition = window.scrollY;
      if ((heightWindow + scrollPosition >= documentHeight - 1) && nextPage.current && !loadinPage.current) {
        setPage(prev => prev + 1);
        loadinPage.current = true
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
    }
    const handleResizer = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResizer);
    return () => {
      window.removeEventListener("resize", handleResizer);
    };
  }, []);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      loadinPage.current = false
      const seasonData = await fetchSeason(season, page);
      if (seasonData.error || seasonData.data.length == 0) {
        console.error(seasonData.error);
        setError(seasonData.error);
        return;
      }
      nextPage.current = seasonData.next;
      if(season !== prevSeason.current){
        setResult(seasonData.data)
        prevSeason.current = season
        return
      }
      refPages.current = seasonData.pages
      setResult(prev => [...prev, ...seasonData.data]);
    };
    fetchData();
  }, [season, page]);

  if (error) {
    return (
      <main className={styles.main}>
        <h1 className={styles.error}>{error}</h1>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.containerSeason}>
        {Object.entries(objectSeason).map(([key, value], index) => (
          <SeasonIcon 
          id={key} 
          season={key} 
          image={value} 
          onClick={() => {
          setSeason(key), setPage(1)}} 
          key={index} 
          isSelected={season}
          />
        ))}
      </div>
      <div className={styles.Data}>
        {result.map((value, key) => (
          <div className={styles.containerAll} key={key}>
            {width <= 1040 && (
              <AddionalInfo aired={value.aired.string} episodes={value.episodes} synopsis={null} />
            )}
            <div className={styles.containerAnime}>
              <Cover cover={value.images.jpg.large_image_url} title={value.title} />
              <div className={styles.infoAnime}>
                {width >= 1040 ?
                  <AddionalInfo aired={value.aired.string} episodes={value.episodes} synopsis={value.synopsis} /> :
                  <AddionalInfo aired={null} episodes={null} synopsis={value.synopsis} />
                }
                <ParentComponentGenre value={value} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className={styles.pagination}>{`Page ${page} of ${refPages.current}`}</p>
    </main>
  );
}
