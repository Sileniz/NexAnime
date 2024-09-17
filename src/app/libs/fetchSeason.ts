interface fetchSeason{
    error: string | null
    data: Array<any> | null
    pages: number | null
    next: boolean
}

export default async function fetchSeason(season: string, page: number): Promise<fetchSeason>{
    try{
        const fetchData = await fetch(`https://api.jikan.moe/v4/seasons/2024/${season}?page=${page}&sfw=true`)
        if(!fetchData.ok){
            console.error("Houve um erro durante a requisição")
            throw new Error("Houve um erro durante a requisição")
        }
        const parseFetch = await fetchData.json()
        if(parseFetch.status == 400){
            throw new Error(parseFetch.error)
        }
        if(parseFetch.pagination.has_next_page == true){
        return { 
            error: null, 
            data: parseFetch.data, 
            pages: parseFetch.pagination.last_visible_page,
            next: true }
        }
        return { 
            error: null, 
            data: parseFetch.data, 
            pages: parseFetch.pagination.last_visible_page,
            next: false }
    }catch(e){
        if(e instanceof Error){
            return { error: e.message, data: null, pages: null, next: false }
        }
        return { error: "Erro desconhecido", data: null, pages: null, next: false }
    }
}