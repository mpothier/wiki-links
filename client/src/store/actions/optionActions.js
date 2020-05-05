import { resetPlaySession, addPageToPlaySession } from './playActions'
import axios from 'axios'

export const setOption = (optionId) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const currentOptionId = getState().option._id
            const option = getState().optionList.options.filter(opt => (opt._id === optionId))[0]
            if (!option) { reject() }
            if (currentOptionId !== optionId) {
                // Load option if new option differs from current option
                dispatch({type: 'START_LOAD_OPTION', option})
                // call API here to retrieve entries from database
                axios.get('/api/v1/entries', {
                    params: {
                        optionId: optionId
                    }
                }).then(res => {
                    const hydratedOption = {
                        ...option,
                        entries: res.data.data
                    }
                    dispatch({type: 'LOAD_OPTION', option: hydratedOption});
                    // Add first page to play session
                    dispatch(resetPlaySession())
                    dispatch(addPageToPlaySession(option.titleStart))
                    resolve()
                })
            } else {
                // Reset existing play session back to initial (start) page IF session has multiple pages
                const currentPageListCount = getState().play.pageList.length
                if (currentPageListCount !== 1) {
                    dispatch(resetPlaySession())
                    dispatch(addPageToPlaySession(option.titleStart))
                }
                resolve()
            }
        })
    }
}

export const addEntryToOption = (entryId) => {
    return (dispatch, getState) => {
        const payload = {
            _id: entryId,
            pageLinks: getState().play.pageList.map(page => page.title)
        }
        dispatch({type: 'ADD_OPTION_ENTRY', payload})
    }
}