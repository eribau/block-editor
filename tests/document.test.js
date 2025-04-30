import { expect, test, describe } from "bun:test"
import { renderInlineElement, TextFragment, Paragraph, createDocument, addParagraph, addTextFragment, renderParagraph, BoldText, addBoldText, renderDocument }from "../src/document.js"
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

   test("Render bold fragment", () => {
      let boldText = new BoldText("Bold")

      expect(renderInlineElement(boldText)).toBe("<b>Bold</b>")
   })

   test("Render paragraph with regular text", () => {
      let paragraph = new Paragraph()
      paragraph = addTextFragment(paragraph, "Test")

      expect(renderParagraph(paragraph)).toBe("<p>Test</p>")
   })

   test("Render paragraph with regular and bold text", () => {
      let paragraph = new Paragraph()
      paragraph = addTextFragment(paragraph, "Test")
      paragraph = addBoldText(paragraph, "Bold")

      expect(renderParagraph(paragraph)).toBe("<p>Test<b>Bold</b></p>")
   })
})

describe("Render documents", () => {
   test("Render document with one paragraph", () => {
      let document = createDocument()
      document = addParagraph(document)
      document.set(0, addTextFragment(document.get(0), "Text"))

      expect(renderDocument(document)).toBe("<p>Text</p>")
   })
})


