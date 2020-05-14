import { WIKIPEDIA_API_CONFIG } from '../../utils/wikipediaApiObject'
import axios from 'axios'
import wiki from 'wikijs'

export const loadOptions = () => {
    return (dispatch, getState) => {
        dispatch({type: 'START_LOAD_OPTIONS'})
        return new Promise((resolve, reject) => {
            axios.get('/api/v1/options')
                .then(res => {
                    dispatch({type: 'LOAD_OPTIONS', options: res.data.data})
                    resolve()
                })
                .catch(err => {
                    dispatch({type: 'LOAD_OPTIONS_ERROR', err})
                    reject(err)
                })
        })
    }
}

async function verifyPage(title) {
    try {
        const page = await wiki(WIKIPEDIA_API_CONFIG).page(title)
        return page.raw.title
    } catch {
        return null
    }
}

export const addOption = (titleStart, titleFinish) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            const verifiedTitleStart = await verifyPage(titleStart)
            const verifiedTitleFinish = await verifyPage(titleFinish)
            if (verifiedTitleStart && verifiedTitleFinish) {
                // Add new option to database (server will check for duplicate option)
                try {
                    const res = await axios.post('/api/v1/options', {
                        titleStart: verifiedTitleStart,
                        titleFinish: verifiedTitleFinish
                    })
                    // Add new option to global state
                    const newOption = res.data.data
                    dispatch({type: 'ADD_OPTION', option: newOption})
                    resolve({verifiedTitleStart, verifiedTitleFinish})
                } catch(err) {
                    reject(err.response.data.error)
                }
            } else {
                reject({verifiedTitleStart, verifiedTitleFinish})
            }
        })
    }
}