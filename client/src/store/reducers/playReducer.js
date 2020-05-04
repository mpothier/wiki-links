const initState = {
    pageList: [],
    currentPageData: {
        pageid: null,
        title: null,
        url: null
    },
    currentPageLinks: [],
    loading: false,
    complete: false
}

const playReducer = (state=initState, action) => {
    switch (action.type) {
        case 'RESET_PLAY_SESSION':
            console.log('Reset play session')
            return initState
        case 'START_LOAD_PAGE':
            console.log('Starting load page: ', action.title)
            return {
                ...state,
                loading: true
            }
        case 'ADD_PAGE':
            console.log('Adding new page to play session: ', action.pageData.title)
            return {
                ...state,
                pageList: [
                    ...state.pageList,
                    {
                        order: state.pageList.length + 1,
                        title: action.pageData.title,
                        pageid: action.pageData.pageid,
                        url: action.pageData.url
                    }
                ],
                currentPageData: {
                    pageid: action.pageData.pageid,
                    title: action.pageData.title,
                    url: action.pageData.url
                },
                currentPageLinks: action.pageData.links,
                loading: false
            }
        case 'ADD_PAGE_ERROR':
            console.log('Add new page error:', action.err)
            return {
                ...state,
                loading: false
            }
        case 'COMPLETE_PLAY_SESSION':
            console.log('Play session completed!')
            return {
                ...state,
                complete: true
            }
        default:
            return state
    }
}

export default playReducer