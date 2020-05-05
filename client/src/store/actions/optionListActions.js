import axios from 'axios'

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