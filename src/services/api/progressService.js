import progressData from '../mockData/progress.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const progressService = {
  async getAll() {
    await delay(250)
    return [...progressData]
  },

  async getById(id) {
    await delay(200)
    const progress = progressData.find(p => p.id === id)
    if (!progress) {
      throw new Error('Progress not found')
    }
    return { ...progress }
  },

  async create(progressItem) {
    await delay(300)
    const newProgress = {
      ...progressItem,
      id: Date.now().toString()
    }
    progressData.push(newProgress)
    return { ...newProgress }
  },

  async update(id, data) {
    await delay(300)
    const index = progressData.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Progress not found')
    }
    progressData[index] = { ...progressData[index], ...data }
    return { ...progressData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = progressData.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Progress not found')
    }
    const deleted = progressData.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default progressService