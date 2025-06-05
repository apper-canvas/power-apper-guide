import bookmarkData from '../mockData/bookmarks.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const bookmarkService = {
  async getAll() {
    await delay(200)
    return [...bookmarkData]
  },

  async getById(id) {
    await delay(150)
    const bookmark = bookmarkData.find(b => b.id === id)
    if (!bookmark) {
      throw new Error('Bookmark not found')
    }
    return { ...bookmark }
  },

  async create(bookmarkItem) {
    await delay(250)
    const newBookmark = {
      ...bookmarkItem,
      id: Date.now().toString()
    }
    bookmarkData.push(newBookmark)
    return { ...newBookmark }
  },

  async update(id, data) {
    await delay(200)
    const index = bookmarkData.findIndex(b => b.id === id)
    if (index === -1) {
      throw new Error('Bookmark not found')
    }
    bookmarkData[index] = { ...bookmarkData[index], ...data }
    return { ...bookmarkData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = bookmarkData.findIndex(b => b.id === id)
    if (index === -1) {
      throw new Error('Bookmark not found')
    }
    const deleted = bookmarkData.splice(index, 1)[0]
    return { ...deleted }
  }
}

export default bookmarkService