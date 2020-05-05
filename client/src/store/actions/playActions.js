import { addEntryToOption } from './optionActions'
import { saveEntryToLocalStorage } from '../../utils/localStorage'

import wiki from 'wikijs'
import axios from 'axios'

export const resetPlaySession = () => {
    return (dispatch, getState) => {
        dispatch({type: 'RESET_PLAY_SESSION'})
    }
}

export const addPageToPlaySession = (title) => {
    return (dispatch, getState) => {
        dispatch({type: 'START_LOAD_PAGE', title})
        return new Promise((resolve, reject) => {
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
                        // Call API here to add completed session entry to database, and generate entry uuid
                        const optionId = getState().option._id
                        const pageLinks = getState().play.pageList.map(page => page.title)
                        axios.post('/api/v1/entries', {
                            optionId: optionId,
                            pageLinks: pageLinks
                        }).then(res => {
                            const entryId = res.data.data._id
                            dispatch({type: 'COMPLETE_PLAY_SESSION'})
                            // Add new entry to global state for current option entries
                            dispatch(addEntryToOption(entryId))
                            // Save entry to local storage
                            saveEntryToLocalStorage(optionId, entryId, pageLinks)
                            // Resolve promise, returning new UUID so component can redirect to 'explore/:entryid'
                            resolve(entryId)
                        }).catch(err => {
                            console.log(err)
                            reject(err)
                        })
                    } else {
                        // Get additional page data (links, content html, etc.)
                        // console.log(page)
                        // console.log(page.url())
                        page.links()
                        .then(links => {
                            pageData.links = links
                            dispatch({type: 'ADD_PAGE', pageData})
                            resolve()
                        })
                        .catch(err => {
                            console.log(err)
                            dispatch({type: 'ADD_PAGE_ERROR', err})
                            reject()
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    dispatch({type: 'ADD_PAGE_ERROR', err})
                    reject()
                })
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