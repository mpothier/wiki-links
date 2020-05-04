import { resetPlaySession, addPageToPlaySession } from './playActions'

export const setOption = (optionId) => {
    return (dispatch, getState) => {
        const currentOptionId = getState().option.id
        const option = getState().optionList.options.filter(opt => (opt.id === optionId))[0]
        if (currentOptionId !== optionId) {
            // Load option if new option differs from current option
            dispatch({type: 'START_LOAD_OPTION', option})
            // call API here to retrieve entries from database
            var optionCopy = {
                ...option,
                entries: [
                    {
                        id: 'test1',
                        links: ['a', 'b', 'c']
                    },
                    {
                        id: 'test2',
                        links: ['a', 'd', 'e', 'c']
                    }
                ]
            }
            dispatch({type: 'LOAD_OPTION', option: optionCopy});
            // Add first page to play session
            dispatch(resetPlaySession())
            dispatch(addPageToPlaySession(option.titleStart))
        } else {
            // Reset existing play session back to initial (start) page IF session has multiple pages
            const currentPageListCount = getState().play.pageList.length
            if (currentPageListCount !== 1) {
                dispatch(resetPlaySession())
                dispatch(addPageToPlaySession(option.titleStart))
            }
        }
    }
}

export const addEntryToOption = (entryId) => {
    return (dispatch, getState) => {
        const payload = {
            id: entryId,
            links: getState().play.pageList.map(page => page.title)
        }
        dispatch({type: 'ADD_OPTION_ENTRY', payload})
    }
}