<script>
    import Fuse from 'fuse.js'
    import { onMount } from 'svelte'
    export let searchList
    let items = []

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

    onMount(()=>{
        const categories = {
            'រឿងខ្មែរ': 'Khmer',
            'រឿងថៃ': 'Thai',
            'រឿងចិន': 'Chinese',
            'រឿងកូរ៉េ': 'Korean',
            'ឯកសារ': 'Documentary'
        }

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
            .slice(0, 24)

        items = posts2
    })
</script>

<section class="Category region">
    <div class="container">
        {#each items as item}
            <div class="wrapper">
                <a href="/post/{item.slug}">
                    <img src={item.data.thumb} />
                    <img class="play-icon" src="/images/play.png" />
                </a>
                <div class="date">{item.data.pudate.toLocaleDateString("it-IT")}</div>
                <a class="title" href="/post/{item.slug}">
                    <div >{item.data.title}</div>
                </a>
            </div>
        {/each}
    </div>
</section>

<style>
.Category .container{
    display: grid;
    grid-template-columns: repeat(4, calc(100% / 4 - 11.25px));
    grid-gap: 30px 15px;
    padding: 30px 0;
}
.Category .container .wrapper a{
    position: relative;
    padding-top: 56.25%;
    overflow: hidden;
    width: 100%;
    display: block;
}
.Category .container .wrapper a img{
    position: absolute;
    width: 100%;
    min-height: 100%;
    top: 0;
    left: 0;
}
.Category .container .wrapper a .play-icon{
    width: auto;
    min-height: auto;
    width: 15%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
.Category .container .wrapper .title{
    padding-top: 0;
}
.Category .container .wrapper .title div{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.Category .pagination{
    display: block;
    text-align: center;
}
@media only screen and (max-width:600px){
    .Category .container{
        grid-template-columns: 100%;
        padding: 30px 10px;
    }
}
</style>
