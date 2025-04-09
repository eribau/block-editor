import * as model from "./src/model.js"

class BlockEditor extends HTMLElement {
   static formAssociated = "ElementInternals" in window 

   constructor() {
      super()
      this.controller = new Controller(this)
   }
   
   connectedCallback() {
      this.setAttribute("contenteditable", "")
   }
}

class Controller {
   constructor(editor) {
      this.editor = editor
      this.model = new model.Model(0)

      this.editor.addEventListener("focus", () => {console.log(this.getCursorLocation(this.editor))})
      this.editor.addEventListener("blur", () => {})
      this.editor.addEventListener("input", (event) => {this.inputHandler(event)})
      this.editor.addEventListener("keypress", (event) => {console.log(event)})
   }

   inputHandler(event) {
      if (event.inputType === "insertText") {
         this.model.buffer = model.appendToBuffer(this.model.buffer, event.data)
         model.logBuffer(this.model.buffer)
      }
      else if (event.inputType === "deleteContentBackward") {
         this.model.buffer = model.deleteFromBuffer(this.model.buffer)
         model.logBuffer(this.model.buffer)
      }
   }

   getCursorLocation(element) {
      const selection = window.getSelection()
      const range = selection.getRangeAt(0)
      const clonedRange = range.cloneRange()
      clonedRange.selectNodeContents(element)
      clonedRange.setEnd(range.endContainer, range.endOffset)

      return clonedRange.toString().length
   }
}

customElements.define('block-editor', BlockEditor)
