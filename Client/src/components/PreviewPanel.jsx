import React, { useState } from 'react'

const PreviewPanel = ({project,activeFile,showCode}) => {

    const [showErrorOverlay, setShowErrorOverlay] = React.useState(false)
    const [liveFiles, setLiveFiles] = useState(project.files);
    const [prevProjectKey, setPrevProjectkey] = useState(`${project._id}-${project.version}`)

    const currentKey = `${project._id}-${project.version}`
    if(prevProjectKey != currentKey){
      setPrevProjectkey(currentKey);
      setLiveFiles(project.files);
    }

  return (
    <div className='h-full w-full'>
      
    </div>
  )
}

export default PreviewPanel
