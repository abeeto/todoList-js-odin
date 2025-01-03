export const pubsub = {
  events: {},
  subscribe: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
    console.log(`PUBSUB: Someone has subscribed to ${eventName}`);
  },
  unsubscribe: function (eventName, fnToRemove) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (f) => f !== fnToRemove,
      );
      console.log(`PUBSUB: Somebody unsubscribed from ${eventName}`);
    }
  },

  publish: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((event) => event(data));
      console.log(`PUBSUB: ${eventName} was called.`);
    }
  },
};
