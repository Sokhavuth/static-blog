import Fuse from 'fuse.js'
import { useState, useEffect } from 'react'

const options1 = {
	keys: ['data.categories'],
	includeMatches: true,
	minMatchCharLength: 2,
	threshold: 0,
}

const options2 = {
	keys: ['data.title'],
	includeMatches: true,
	minMatchCharLength: 2,
	threshold: 0.5,
}

function Search({ searchList }){
    let [items, setItems] = useState([])
    const categories = {
        'រឿងខ្មែរ': 'Khmer',
        'រឿងថៃ': 'Thai',
        'រឿងចិន': 'Chinese',
        'រឿងកូរ៉េ': 'Korean',
        'ឯកសារ': 'Documentary'
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(document.location.search)
        const q = searchParams.get('q')
        const category = searchParams.get('category')
		const fuse1 = new Fuse(searchList, options1)
        const posts1 = fuse1
		    .search(categories[category])
		    .map((result) => result.item)

        const fuse2 = new Fuse(posts1, options2)
        const posts2 = fuse2
            .search(q)
            .map((result) => result.item)
            .slice(0, 15)

        setItems(posts2)
    }, [])
       
    return(
        <p>{items.map((post)=>(<p>{post.data.title}</p>))}</p>
    )
}

export default Search