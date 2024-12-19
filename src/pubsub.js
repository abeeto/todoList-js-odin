
export const pubsub = {
    // subscribers: subscribe to event e.g. "createTask"
    // whenever createTask is ran, it should publish - e.g. pubsub.publish("createTask", () => new Task({formDataEntries}).toString())
    // all objects subscribed to "createTask", will receive the object of interest. Will see if they are the project selected. If not, just ignore, else add task.
    events: {},
    subscribe: function(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
        console.log(`PUBSUB: Someone has subscribed to ${eventName}`)
    },
    unsubscribe: function(eventName, fnToRemove) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(f => f !== fnToRemove)
            console.log(`PUBSUB: Somebody unsubscribed from ${eventName}`)
        }
    },

    publish: function(eventName, data) {
        if( this.events[eventName]) {
            this.events[eventName].forEach(event => event(data));
            console.log(`PUBSUB: ${eventName} was called.`);
        }
    },
};