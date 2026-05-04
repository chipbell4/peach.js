/**
 * EventEmitter - A simple event emitter class
 */
export class EventEmitter {
  private listeners: { [key: string]: Function[] };

  constructor() {
    this.listeners = {};
  }

  /**
   * Add an event listener
   * @param name The event name
   * @param callback The callback function to invoke when the event is triggered
   */
  addEventListener(name: string, callback: Function): void {
    this.listeners[name] = this.listeners[name] || [];
    this.listeners[name].push(callback);
  }

  /**
   * Remove an event listener
   * @param name The event name
   * @param callback The callback function to remove
   * @returns true if the listener was removed, false otherwise
   */
  removeEventListener(name: string, callback: Function): boolean {
    if (!this.listeners[name]) {
      return false;
    }
    const index = this.listeners[name].indexOf(callback);
    if (index > -1) {
      this.listeners[name].splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Trigger an event, calling all registered listeners
   * @param name The event name
   * @param data Data to pass to the listeners
   */
  trigger(name: string, data?: any): void {
    if (!this.listeners[name]) {
      return;
    }
    this.listeners[name].forEach((callback) => callback(data));
  }
}
