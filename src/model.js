import {List} from "immutable"
import { Document } from "./document"

export class Model {
   constructor(cursor) {
      this.buffer = List()
      this.cursor = cursor
      this.document = new Document()
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

