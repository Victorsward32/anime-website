import { fallbackImage, slideImagesArr } from "./StaticData";

export function handleImageError(e) {
    e.target.src = fallbackImage;
}

//calculate slide Width 
export function calculateSlideWidth(track) {
    if (!track.current) return window.innerWidth;
    let gapSize = 16;
    if (window.innerWidth >= 768) {
        gapSize = 16; // desktop and tablet
    } else {
        gapSize = 8 // mobile
    }

    return track.current.offsetWidth + gapSize
}

// start Auto Slide 

export function startAutoSlide(autoSliderTimer, setActiveIndex) {
    if (autoSliderTimer.current) {
        clearInterval(autoSliderTimer.current)
    }

    autoSliderTimer.current = setInterval(() => {
        setActiveIndex((currentIndex) => currentIndex === slideImagesArr.length - 1 ? 0 : currentIndex + 1);
    }, 5000)
}

// filter items from an array
export function filteredEntries(entries, searchTerm) {
    return entries.filter(([key, value]) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
}

//random number generator
export const randomNumber = Math.floor(Math.random() * 10000)

//
export function getData(userData, newUpdateduser) {
    const data = userData.map((item, index) => item?.id !== newUpdateduser?.id ? item : newUpdateduser);
    return data
}

//------ get paginated array --//

export const getPaginationPages = (current, total, showPages) => {
    let pages = [];
    const startIndex = current - (Math.floor(showPages / 2))
    const endIndex = current + (Math.floor(showPages / 2))
    const IterationRange = (start, end) => {
        for (let i = start; i <= end; i++) {
            pages.push(i)
        }
    }
    //-------- if our length is shorter than 11 then show all element
    if (total <= 6) {
        return pages = Array.from(Array(total), (_, idx) => idx + 1)
    }
    //------------ starting elements ------------//
    if (current <= showPages) {
        IterationRange(1, showPages + 2, pages)
        pages.push("...", total)
    }
    //----- ending elements------------//
    else if (current >= total - (showPages - 1)) {
        IterationRange(1, showPages - 1, pages)
        pages.push("...")
        IterationRange(total - 3, total, pages)
    }
    //----- middle element range -----------//
    else {
        pages.unshift(1, 2, '...')
        IterationRange(startIndex, endIndex, pages)
        pages.push("...", total)
    }
    return pages
}


//---------- Recently visited item data --------------//



export function saveRecentlyVisitedAnime(item) {
    let visited = JSON.parse(localStorage.getItem('recentlyVisited')) || [];
    const exists = visited?.some((exitedItem) => exitedItem.mal_id === item.mal_id);
    if (!exists) {
        visited.push(item);
    }
    localStorage.setItem("recentlyVisited", JSON.stringify(visited));
}


export function getRecentlyViewed() {
    return JSON.parse(localStorage.getItem('recentlyVisited'))
}

//------------------- Merged two array of object for distinct data -----------------------------//
export const getMergedData = (array1, array2) => {
    const merged = []
    array1.forEach((item, idx) => {
        const index = array2.find((item1) => item?.mal_id === item1?.mal_id)
        if (index) {
            item.images = index.images
            merged.push(item)
        } else {
            merged.push(item)
        }
    })
    return merged
}

//------- stored Home page previous data in session ---------------//
export const saveHomePageData = (item) => {
    console.log(item)
    // let previousData = JSON.parse(sessionStorage.getItem('homePagePreviousData'));
    sessionStorage.setItem('homePagePreviousData', JSON.stringify(item))
}

export const getHomePageSavedData = () => {
    return JSON.parse(sessionStorage.getItem('homePagePreviousData')) || {}
}