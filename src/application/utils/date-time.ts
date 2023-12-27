export default class DateTime {
  alwaysTwoDigits(number: number): string {
    let result: string | number = number;
    if (result < 10) {
      result = `0${result}`;
    }
    return String(result);
  }

  getFullYear(date: null | string = null): number {
    let currentDate = new Date();
    if (date !== null) {
      currentDate = new Date(date);
    }
    return currentDate.getFullYear();
  }

  getMonth(date: null | string = null) {
    let currentDate = new Date();
    if (date !== null) {
      currentDate = new Date(date);
    }
    const month = currentDate.getMonth() + 1;
    return this.alwaysTwoDigits(month);
  }

  getDay(date: null | string = null) {
    let currentDate = new Date();
    if (date !== null) {
      currentDate = new Date(date);
    }
    const day = currentDate.getDate();
    return this.alwaysTwoDigits(day);
  }

  getHours(date: null | string = null) {
    let currentDate = new Date();
    if (date !== null) {
      currentDate = new Date(date);
    }
    const hours = currentDate.getHours();
    return this.alwaysTwoDigits(hours);
  }

  getMinutes(date: null | string = null) {
    let currentDate = new Date();
    if (date !== null) {
      currentDate = new Date(date);
    }
    const mins = currentDate.getMinutes();
    return this.alwaysTwoDigits(mins);
  }

  getSeconds(date: null | string = null) {
    let currentDate = new Date();
    if (date !== null) {
      currentDate = new Date(date);
    }
    const secs = currentDate.getSeconds();
    return this.alwaysTwoDigits(secs);
  }

  getDateTimezone(date = null, timeZone = 'Universal') {
    let currentDate: string | undefined | null = date;
    if (date === null) {
      currentDate = new Date().toLocaleString('en-US', {timeZone});
    }
    const year = this.getFullYear(currentDate);
    const month = this.getMonth(currentDate);
    const day = this.getDay(currentDate);
    const hours = this.getHours(currentDate);
    const mins = this.getMinutes(currentDate);
    const secs = this.getSeconds(currentDate);
    return `${year}-${month}-${day} ${hours}:${mins}:${secs}`;
  }

  getDateClear(date: null | string = null) {
    const year = this.getFullYear(date);
    const month = this.getMonth(date);
    const day = this.getDay(date);
    const hours = this.getHours(date);
    const mins = this.getMinutes(date);
    const secs = this.getSeconds(date);
    return `${year}-${month}-${day} ${hours}:${mins}:${secs}`;
  }

  getDate(date: null | string = null) {
    return `[${this.getDateClear(date)}]`;
  }
}
