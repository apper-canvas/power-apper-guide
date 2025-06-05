import moduleData from '../mockData/modules.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const moduleService = {
  async getAll() {
    await delay(300)
    return [...moduleData]
  },

  async getById(id) {
    await delay(200)
    const module = moduleData.find(m => m.id === id)
    if (!module) {
      throw new Error('Module not found')
    }
    return { ...module }
  },

  async create(moduleItem) {
    await delay(400)
    const newModule = {
      ...moduleItem,
      id: Date.now().toString()
    }
    moduleData.push(newModule)
    return { ...newModule }
  },

  async update(id, data) {
    await delay(300)
    const index = moduleData.findIndex(m => m.id === id)
    if (index === -1) {
      throw new Error('Module not found')
    }
    moduleData[index] = { ...moduleData[index], ...data }
    return { ...moduleData[index] }
  },

  async delete(id) {
    await delay(250)
    const index = moduleData.findIndex(m => m.id === id)
    if (index === -1) {
      throw new Error('Module not found')
    }
    const deleted = moduleData.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default moduleService