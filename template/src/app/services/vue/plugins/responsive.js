import ResizeSensor from 'css-element-queries/src/ResizeSensor'

/**
* A directive for disabling an element if auth.allowed returns false.
* @param  {Vue} Vue  The Vue service.
* @return {undefined}
*/
export default function install (Vue) {
  Vue.directive('responsive', {
    inserted (element, { value }) {
      if (!value) return

      const breakpoints = Object.keys(value).sort((a, b) => b - a)

      let sensor = new ResizeSensor(element.parentElement, () => {
        // if large, remove medium and small, add large
        breakpoints.reduce((alreadyMatched, breakpoint) => {
          let breakpointMet = element.parentElement.clientWidth >= breakpoint
          if (alreadyMatched || !breakpointMet) {
            element.classList.remove(value[breakpoint])
            return alreadyMatched
          }
          element.classList.add(value[breakpoint])
          return true
        }, false)
      })

      element.parentElement.resizedAttached.call()

      return sensor
    },

    /**
     * Remove the sensor when the component is unbound.
     * @param {object} element DOM element with ResizeSensor event attached
     * @return {undefined}
     */
    unbind (element) {
      ResizeSensor.detach(element)
    }
  })
}
