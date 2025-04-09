import {List} from "immutable"

export class Model {
   constructor(cursor) {
      this.buffer = List()
      this.cursor = cursor
   }
}

export function appendToBuffer(buffer, char) {
   return buffer.push(char)
}

export function deleteFromBuffer(buffer) {
   return buffer.pop()
}

export function logBuffer(buffer) {
   console.log(buffer)
}
