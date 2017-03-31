import pubsub from 'pubsub-js'
import { namespaceKeys } from 'utilities'

/**
 * An implementation of the Events service using PubSub. This service handles
 * registering messages and subscribers to those messages.
 */
export default class PubSubEventsService {

  /**
   * Set PubSub as the event service.
   * @param  {Object} config Confgiuration for the event service.
   * @return {PubSubService} The pubsub event service.
   */
  constructor (config) {
    this.service = pubsub
    this.config = config
  }

  /**
   * Register events for the service
   * @param  {Object} events An object with channels as keys.
   * @return {undefined}
   */
  register (channels) {
    Object.keys(channels).map(key => {
      return namespaceKeys(key, channels[key])
    }).forEach(channel => {
      this.registerChannel(channel)
    })
  }

  /**
   * Register a channel in the event bus.
   * @param  {Object} channel An object of events, where each key is the message.
   * @param  {Object} context The contextual binding of `this` for the event.
   * @return {undefined}
   */
  registerChannel (channel, context) {
    return Object.keys(channel).map(event => {
      if (typeof context === 'undefined') {
        return this.subscribe(event, channel[event])
      }

      return this.subscribe(event, channel[event].bind(context))
    })
  }

  /**
   * Subscribe to a topic.
   * @param  {string} message The message to subscribe to.
   * @param  {function} subscriber The function to call when a new message is published.
   * @return {string} A token representing the message.
   */
  subscribe (message, subscriber) {
    return this.service.subscribe(message, subscriber)
  }

  /**
   * Alias for publish.
   * @param  {String} message The message to publish
   * @param  {Object} data The data passed to the message
   * @return {boolean} If the message successfully published
   */
  publish (message, data) {
    return this.service.publish(message, data)
  }

  /**
   * Alias for publish.
   * @param  {String} message The message to publish.
   * @param  {Object} data The data passed to the message.
   * @return {boolean} If the message succesfully published.
   */
  fire (message, data) {
    return this.publish(message, data)
  }

  /**
   * Alias for subscribe.
   * @param  {string} message The message to subscribe to.
   * @param  {function} subscriber The function to call when a new message is published.
   * @return {string} A token representing the message.
   */
  on (message, subscriber) {
    return this.subscribe(message, subscriber)
  }

  /**
   * Unsubscribe from a topic.
   * @param  {mixed} value A token, function or topic to unsubscribe.
   * @return {undefined}
   */
  unsubscribe (value) {
    return this.service.unsubscribe(value)
  }

  /**
   * Clear all subscriptions.
   * @return {undefined}
   */
  clearAllSubscriptions () {
    return this.service.clearAllSubscriptions()
  }

  /**
   * Unsubsribe from many event tokens.
   * @param  {array} tokens  The events tokens to unsubscribe.
   * @return {undefined}
   */
  unsubscribeTokens (tokens) {
    tokens.forEach(token => {
      this.unsubscribe(token)
    })
  }

  /**
   * Register the events Vue mixin.
   * @param  {Vue} Vue  The vue object.
   * @return {undefined}
   */
  registerVueMixin (Vue) {
    let events = this

    Vue.mixin({
      created () {
        if (this.$options.events) {
          this.$eventTokens = events.registerChannel(this.$options.events, this)
        }
      },
      // activated () {
      //   if (this.$options.events) {
      //     this.$eventTokens = events.registerChannel(this.$options.events, this)
      //   }
      // },
      // deactivated () {
      //   if (this.$options.events) {
      //     events.unsubscribeTokens(this.$eventTokens)
      //   }
      // },
      beforeDestroy () {
        if (this.$options.events) {
          events.unsubscribeTokens(this.$eventTokens)
        }
      }
    })
  }
}
