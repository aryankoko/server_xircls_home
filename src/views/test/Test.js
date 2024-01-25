import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

function Test() {
  const [userInput, setUserInput] = useState('')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleSubmit = () => {
    // Perform any additional actions on submit
    openModal()
  }

  return (
    <div>
      <h1>User Input Example</h1>
      <textarea
        id="userInput"
        placeholder="Enter your text"
        value={userInput}
        onChange={handleInputChange}
      />
      <Button color="primary" onClick={handleSubmit}>Submit</Button>

      <Modal isOpen={modalIsOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>User Input</ModalHeader>
        <ModalBody style={{ whiteSpace: 'pre-wrap' }}>
          <p>User Input: {userInput}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={closeModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Test
