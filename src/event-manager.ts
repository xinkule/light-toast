type Fn = (data?: any) => void;

interface Event {
  key: number;
  callback: Fn;
}

class EventManager {
  events: {
    [key: string]: Event[];
  } = {};

  subscribe(name: string, callback: Fn): number {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    const event = { key: Date.now(), callback };
    this.events[name].push(event);
    return event.key;
  }

  publish(name: string, data?: any): void {
    if (this.events[name]) {
      this.events[name].forEach(({ callback }): void => {
        callback(data);
      });
    }
  }

  unSubscribe(name: string, key: number): void {
    if (this.events[name]) {
      for (let i = 0; i < this.events[name].length; i++) {
        if (key === this.events[name][i].key) {
          this.events[name].splice(i, 1);
          break;
        }
      }
    }
  }
}

const eventManager = new EventManager();

export default eventManager;
