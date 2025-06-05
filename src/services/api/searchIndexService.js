import searchIndexData from '../mockData/searchIndex.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const searchIndexService = {
  async getAll() {
    await delay(150)
    return [...searchIndexData]
  },

  async getById(id) {
    await delay(100)
    const searchIndex = searchIndexData.find(s => s.id === id)
    if (!searchIndex) {
      throw new Error('Search index not found')
    }
    return { ...searchIndex }
  },

  async create(searchIndexItem) {
    await delay(200)
    const newSearchIndex = {
      ...searchIndexItem,
      id: Date.now().toString()
    }
    searchIndexData.push(newSearchIndex)
    return { ...newSearchIndex }
  },

  async update(id, data) {
    await delay(200)
    const index = searchIndexData.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Search index not found')
    }
    searchIndexData[index] = { ...searchIndexData[index], ...data }
    return { ...searchIndexData[index] }
  },

  async delete(id) {
    await delay(150)
    const index = searchIndexData.findIndex(s => s.id === id)
    if (index === -1) {
      throw new Error('Search index not found')
    }
    const deleted = searchIndexData.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default searchIndexService