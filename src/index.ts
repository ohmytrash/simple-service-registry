import './alias'
import '@/workers/healtCheck.worker'
import Application from '@/app'

const application = new Application()

application.listen()
