import React, { useMemo, useState } from 'react'
import {SandpackProvider} from '@codesandbox/sandpack-react'
import { detectDependencies } from '../utils/sandpackUtils';

//Watches for file edits inside Sandpack editoy and save changes to DB & live state

const PreviewPanel = ({project,activeFile,showCode}) => {

    const [showErrorOverlay, setShowErrorOverlay] = React.useState(false)
    const [liveFiles, setLiveFiles] = useState(project.files);
    const [prevProjectKey, setPrevProjectkey] = useState(`${project._id}-${project.version}`)

    const currentKey = `${project._id}-${project.version}`
    if(prevProjectKey != currentKey){
      setPrevProjectkey(currentKey);
      setLiveFiles(project.files);
    }

// Convert liveFiles to Sandpack format
    const sandpackFiles = useMemo(()=>{
      const spFiles = {};
      for(const [path, content] of Object.entries(liveFiles)){
        const fileCode = typeof content === "string" ? content : content?.content || ""; 
        spFiles[path] = {
          code: fileCode,
          active: path === activeFile,
        }
      }
      return spFiles;
    },[liveFiles, activeFile])

    // detect dependencies from import statements using liveFiles
    const dependencies = useMemo(()=>{
      return detectDependencies(liveFiles)
    }, [liveFiles])

  return (
    <div className='h-full w-full'>
      <SandpackProvider key={project._id} template='react'
       files={sandpackFiles}
       customSetup={{dependencies}} 
       options={{
        externalResources: [
          "https:cdn.tailwindcss.com",
          "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        ], 
        classes:{
          "sp-wrapper" : "sp-wrapper",
          "sp-layout" : "sp-layout",
          "sp-preview" : "sp-preview",
        },
        logLevel: 0,
       }}
       theme={{
        colors:{
          surface1:"#ffffff",
          surface2:"#f4f4f5",
          surface3: "#e4e4e7",
          clickable:"#71717a",
          base:"#27272a",
          disabled:"#a1a1aa",
          hover:"#52525b",
          accent:"#2563eb",
          error:"#ef4444",
          errorSurface:"#fef2f2",
        },
        font:{
          body:"'Urbanist',system-ui, -apple-system, sans-serif",
          mono:"'Geist Mono', ui-monospace, monospace",
          size: "14px",
          lineHeight: "1.6",
        }
       }}
       >

      </SandpackProvider>
    </div>
  )
}

export default PreviewPanel
