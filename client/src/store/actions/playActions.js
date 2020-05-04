import wiki from 'wikijs'

export const resetPlaySession = () => {
    return (dispatch, getState) => {
        dispatch({type: 'RESET_PLAY_SESSION'})
    }
}

export const addPageToPlaySession = (title) => {
    return (dispatch, getState) => {
        dispatch({type: 'START_LOAD_PAGE', title})
        wiki()
            .page(title)
            // .findById(60341080)
            .then(page => {
                var pageData = {
                    pageid: page.raw.pageid,
                    title: page.raw.title,
                    url: page.raw.canonicalurl
                }
                if (title === getState().option.titleFinish) {
                    // Complete play session if submitted page equals the target (finish) page
                    pageData.links = []
                    dispatch({type: 'ADD_PAGE', pageData})
                    dispatch({type: 'COMPLETE_PLAY_SESSION'})
                    // Call API here to add completed session entry to database, and generate entry uuid
                    // RETURN NEW UUID FROM PROMISE TO SO COMPONENT CAN REDIRECT TO 'EXPLORE' PAGE WITH :entryid PARAM
                } else {
                    // Get additional page data (links, content html, etc.)
                    // console.log(page)
                    // console.log(page.url())
                    page.links()
                    .then(links => {
                        pageData.links = links
                        dispatch({type: 'ADD_PAGE', pageData})
                    })
                    .catch(err => {
                        console.log(err)
                        dispatch({type: 'ADD_PAGE_ERROR', err})
                    })
                }
            })
            .catch(err => {
                console.log(err)
                dispatch({type: 'ADD_PAGE_ERROR', err})
            })
    }
}

// export const completePlaySession = () => {
//     return (dispatch, getState) => {
//         dispatch({type: 'COMPLETE_PLAY_SESSION'})
//         // Call API here to add completed session entry to database, and generate entry uuid
//         // RETURN NEW UUID FROM PROMISE TO SO COMPONENT CAN REDIRECT TO 'EXPLORE' PAGE WITH :entryid PARAM
//     }
// }