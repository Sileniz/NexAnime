interface fetchSeason{
    error: string | null
    data: Array<any> | null
}

export default async function fetchSeason(season: string): Promise<fetchSeason>{
    try{
        const fetchData = await fetch(`https://api.jikan.moe/v4/seasons/2024/${season}`)
        if(!fetchData.ok){
            console.error("Houve um erro durante a requisição")
            throw new Error("Houve um erro durante a requisição")
        }
        const parseFetch = await fetchData.json()
        if(parseFetch.status == 400){
            throw new Error(parseFetch.error)
        }
        return { error: null, data: parseFetch.data }
    }catch(e){
        if(e instanceof Error){
            return { error: e.message, data: null }
        }
        return { error: "Erro desconhecido", data: null }
    }
}