import { expect, test, describe } from "bun:test"
import { renderInlineElement, TextFragment, Paragraph, createDocument, addParagraph, addTextFragment, renderParagraph }from "../src/document.js"
import { List } from "immutable"

describe("Create document", () => {
   test("Create a document", () => {
      expect(createDocument()).toBeInstanceOf(List)
   })
   
   test("Add an empty paragraph", () => {
      let document = createDocument()
      expect(addParagraph(document)).toMatchObject(List().push(new Paragraph()))
   })
   
   test("Add text to paragraph", () => {
      let document = createDocument()
      document = addParagraph(document)
   
      let mockParagraph = new Paragraph()
      mockParagraph.inlineElements = mockParagraph.inlineElements.push(new TextFragment("Text"))
      expect(addTextFragment(document.get(0), "Text")).toMatchObject(mockParagraph)
   })
})

describe("Render paragraphs", () => {
   test("Render text fragment", () => {
      let textFragment = new TextFragment("Test")

      expect(renderInlineElement(textFragment)).toBe("Test")
   })

   test("Render paragraph", () => {
      let paragraph = new Paragraph()
      paragraph = addTextFragment(paragraph, "Test")

      expect(renderParagraph(paragraph)).toBe("<p>Test</p>")
   })
})

