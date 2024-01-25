import React, { useState, useEffect, useRef } from 'react'

const ResizableTextarea = ({ onChange, initialContent = '', maxLength = 99999999, placeholder = '', minHeight = '70px' }) => {
  const [content, setContent] = useState(initialContent)
  const textareaRef = useRef()
  const updateHeight = () => {
    const textarea = textareaRef.current
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.max(textarea.scrollHeight, parseInt(minHeight, 10))}px`
  }

  const handleChange = (event) => {
    const newContent = event.target.value
    setContent(newContent)

    // Call the passed onChange function
    if (onChange) {
      onChange(event)
    }

    updateHeight()
  }


  useEffect(() => {
    updateHeight()
  }, [minHeight])

  return (
    <textarea
      ref={textareaRef}
      style={{ minHeight, resize: 'none', overflow: 'hidden' }}
      value={content}
      className="form-control form-control-lg"
      placeholder={placeholder}

      onChange={handleChange}
      wrap="hard"
      maxLength={maxLength}
    ></textarea>
  )
}

export default ResizableTextarea
