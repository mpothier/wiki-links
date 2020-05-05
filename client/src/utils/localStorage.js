export const saveEntryToLocalStorage = (optionId, entryId, pageLinks) => {
    const newEntryObject = {
        _id: entryId,
        pageLinks: pageLinks
    }
    var localEntriesData = localStorage.getItem('entries') ? JSON.parse(localStorage.getItem('entries')) : {}
    var optionEntriesList = localEntriesData[optionId] ? [...localEntriesData[optionId], newEntryObject] : [newEntryObject]
    localEntriesData[optionId] = optionEntriesList
    localStorage.setItem('entries', JSON.stringify(localEntriesData))
}

export const loadEntriesFromLocalStorage = (optionId) => {
    const localEntriesData = localStorage.getItem('entries') ? JSON.parse(localStorage.getItem('entries')) : {}
    const optionEntriesList = localEntriesData[optionId] ? localEntriesData[optionId] : []
    return optionEntriesList
}