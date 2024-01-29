const updateParametersList = (message) => {
    const regex = /{{\s*(\d+)\s*}}/g
    const matches = message.match(regex)

    if (matches) {
        // Extract unique parameter ids from the message
        const uniqueIds = [...new Set(matches.map(match => parseInt(match.match(/\d+/)[0])))]

        // Create a map of existing parameters for efficient lookup
        const existingParametersMap = parametersList.reduce((map, param) => {
            map[param.id] = param.value
            return map
        }, {})

        console.log('uniqueIds', uniqueIds)
        console.log('existingParametersMap', existingParametersMap)

        // Create a new parametersList, preserving existing values and replacing existing IDs with the next available ones
        const newParametersList = parametersList.map(param => {
            if (uniqueIds.includes(param.id)) {
                let newId = param.id
                while (existingParametersMap[newId] !== undefined) {
                    newId++
                }
                return {
                    id: newId,
                    value: existingParametersMap[param.id] !== undefined ? existingParametersMap[param.id] : ''
                }
            } else {
                return param
            }
        })

        console.log('newParametersList', newParametersList)

        // Set the new parametersList
        setParametersList(newParametersList)
    } else {
        // If no parameters found, reset the parametersList
        setParametersList([])
    }
}




  //  handle template message changes
  const handleMsgBodyChange = (value) => {
    const regex = /\{\{(\d+)\}\}/g
    const matches = []
    let match

    while ((match = regex.exec(value)) !== null) {
      matches.push(match[1])
    }
  
    const seen = new Set()
    let lastIndex = -1
  
    for (let i = 0; i < matches.length; i++) {
      const id = matches[i]
  
      if (seen.has(id)) {
        lastIndex = i
      }
  
      seen.add(id)
    }
  
    if (lastIndex !== -1) {
      const lastDuplicateId = matches[lastIndex]
      value = value.replace(`{{${lastDuplicateId}}}`, "NAN")
      alert(`Duplicate ID found: ${lastDuplicateId}. Replacing with NAN.`)
      console.log(value)
    }
  
    
    setMsgBody(value)
    updateParametersList(value)
  }