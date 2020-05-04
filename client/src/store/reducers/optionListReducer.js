const initState = {
    options: [
        {
            id: '1',
            titleStart: 'Cleveland Cavaliers',
            titleFinish: 'Desalination'
        },
        {
            id: '2',
            titleStart: 'Hocus Pocus',
            titleFinish: 'Epcot'
        },
        {
            id: '3',
            titleStart: 'Under Armour',
            titleFinish: 'Ludwig van Beethoven'
        },
        {
            id: '4',
            titleStart: 'Steve Jobs',
            titleFinish: 'Whitney Houston'
        },
        {
            id: '5',
            titleStart: 'Pyramid',
            titleFinish: "McDonald's"
        },
    ],
    loading: false
}

const optionListReducer = (state=initState, action) => {
    switch (action.type) {
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
        case 'START_LOAD_OPTIONS':
            console.log('Starting load options...')
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default optionListReducer