const initState = {
    options: [],
    loading: false
}

const optionListReducer = (state=initState, action) => {
    switch (action.type) {
        case 'START_LOAD_OPTIONS':
            console.log('Starting load options...')
            return {
                ...state,
                loading: true
            }
        case 'LOAD_OPTIONS':
            console.log('Loaded options:', action.options)
            return {
                ...state,
                options: action.options,
                loading: false
            }
        case 'LOAD_OPTIONS_ERROR':
            console.log('Load options error:', action.err)
            return state
        case 'ADD_OPTION':
            console.log(`Adding option ${action.option._id}: ${action.option.titleStart} >> ${action.option.titleFinish}`)
            return {
                ...state,
                options: [
                    ...state.options,
                    action.option
                ]
            }
        default:
            return state
    }
}

export default optionListReducer