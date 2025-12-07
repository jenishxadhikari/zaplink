import { Router } from 'express'

import { validation } from '@/middlewares/validation'
import { authentication } from '@/middlewares/authentication'

import { UrlSchema } from './url.schema'
import { UrlController } from './url.controller'

const router = Router()

router
.route('/urls')
.post(authentication, validation(UrlSchema.createUrlSchema), UrlController.createUrl)

router.route('/urls').get(authentication, UrlController.getUrls)

router.route('/urls/:shortUrlKey').get(authentication, UrlController.getUrl)
router.route('/urls/:shortUrlKey').patch(authentication, UrlController.updateUrl)
router.route('/urls/:shortUrlKey').delete(authentication, UrlController.deleteUrl)

router.route('/:shortUrlKey').get(UrlController.redirectToOriginalUrl)

export { router as UrlRouter }
