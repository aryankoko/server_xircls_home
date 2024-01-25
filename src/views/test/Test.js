import React, { useState } from 'react'

const Test = () => {
  const [text, setText] = useState('')

  const handleButtonClick = () => {
    setText(`${text}{{n}}`)
  }

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} cols={50} />
      <br />
      <button onClick={handleButtonClick}>Add asdad end</button>
    </div>
  )
}

export default Test
