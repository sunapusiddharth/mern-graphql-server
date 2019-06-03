import * as authHandlers from './handleGenerators/auth'
import * as playStoreHandlers from './handleGenerators/playstore'
export default {
    ...authHandlers,
    ...playStoreHandlers
}