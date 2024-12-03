export const stripHtmlTags = (html: string): string => {
  // Create a temporary div element
  const temp = document.createElement('div')
  temp.innerHTML = html

  // Get text content (strips HTML but preserves spacing)
  const textContent = temp.textContent || temp.innerText

  // Clean up extra whitespace
  return textContent
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim() // Remove leading/trailing whitespace
}
