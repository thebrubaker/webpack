import { auth } from 'app'

/**
 * A directive for disabling an element if auth.allowed returns false.
 * @param  {Vue} Vue  The Vue service.
 * @return {undefined}
 */
export default function install (Vue) {
  Vue.directive('guard', {
    inserted (element, { value, arg }) {
      if (arg === 'allow' || arg !== 'deny') {
        auth.allowed({ allow: value }) ? element.removeAttribute('disabled') : element.setAttribute('disabled', true)
      }

      if (arg === 'deny') {
        auth.allowed({ deny: value }) ? element.removeAttribute('disabled') : element.setAttribute('disabled', true)
      }
    }
  })
}
