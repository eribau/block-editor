import {List} from "immutable"

type Text = List<string>

interface InlineElement {
   tag?: string
   text?: Text
}

export class TextFragment implements InlineElement {
   text: Text

   constructor(text: string) {
      this.text = List(text.split(""))
   }
}

interface BlockElement {
   tag: string;
   inlineElements: List<InlineElement>
}

export class Paragraph implements BlockElement {
   tag: string
   inlineElements: List<InlineElement>;

   constructor() {
      this.tag = "p"
      this.inlineElements = List()
   }
}

type Document = List<BlockElement>

export function createDocument(): Document {
   return List()
}

export function addParagraph(document: Document): Document {
   return document.push(new Paragraph())
}

export function addTextFragment(paragraph: Paragraph, text: string): Paragraph {
   paragraph.inlineElements = paragraph.inlineElements.push(new TextFragment(text))
   return paragraph
}

export function renderInlineElement(element: InlineElement): string {
   let tagStart = ""
   let tagEnd = ""
   let text = ""
   if (element.tag) {
      tagStart = "<" + element.tag + ">"
      tagEnd = "</" + element.tag + ">"
   }
   if (element.text) {
      text = element.text.join("")
   }
   return tagStart + text + tagEnd
}

export function renderParagraph(paragraph: Paragraph): string {
   return "<p>" + paragraph.inlineElements.map(renderInlineElement).join("") + "</p>"
}