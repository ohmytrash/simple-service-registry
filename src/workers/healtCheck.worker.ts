import axios from 'axios'
import logger from '@/config/logger'
import db from '@/config/db'

async function healtCheck() {
  const services = await db.service.findMany()

  for (let i in services) {
    const service = services[i]
    try {
      await axios.get(service.host + '/ping')
    } catch (e) {
      try {
        await db.service.delete({ where: { id: services[i].id } })
      } catch (e) {
        logger.error(e)
      }
    }
  }

  setTimeout(healtCheck, 15000)
}

healtCheck()
