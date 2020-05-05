const initState = {
    titleStart: null,
    titleFinish: null,
    _id: null,
    entries: [],
    loading: false
}

const optionReducer = (state=initState, action) => {
    switch (action.type) {
        case 'START_LOAD_OPTION':
            console.log(`Loading option ${action.option._id}: ${action.option.titleStart} >> ${action.option.titleFinish}`)
            return {
                ...state,
                loading: true
            }
        case 'LOAD_OPTION':
            console.log(`Loaded option ${action.option._id}: ${action.option.titleStart} >> ${action.option.titleFinish}`)
            return {
                ...state,
                titleStart: action.option.titleStart,
                titleFinish: action.option.titleFinish,
                _id: action.option._id,
                entries: action.option.entries,
                loading: false
            }
        case 'LOAD_OPTION_ERROR':
            console.log('Load option error:', action.err)
            return state
        case 'ADD_OPTION_ENTRY':
            console.log('Adding new entry to option:', action.payload)
            return {
                ...state,
                entries: [
                    ...state.entries,
                    action.payload
                ]
            }
        default:
            return state
    }
}

export default optionReducer