import db from '@/config/db'
import ca from '@/shared/catchAsync'
import ApiError from '@/shared/ApiError'

export const addService = ca(async (req, res) => {
  const name = req.body.name
  const host = req.body.host

  if (!host || !name) {
    throw new ApiError(400, 'host and name is required!')
  }

  const service = await db.service.findUnique({ where: { host } })

  if (!service) {
    await db.service.create({ data: { name, host } })
  } else if (service.name !== name) {
    await db.service.update({ where: { host }, data: { name } })
  }

  res.sendStatus(204)
})

export const getServices = ca(async (req, res) => {
  const services = await db.service.findMany()

  let data: { [key: string]: string[] } = {}
  services.forEach((el) => {
    if (data[el.name]) {
      data[el.name].push(el.host)
    } else {
      data[el.name] = [el.host]
    }
  })
  res.json(data)
})
