import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom';
import BuilderHeader from '../components/BuilderHeader';

const BuilderPage = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [leftTab, setLeftTab] = useState("chat");
  const [publishing, setPublishing] = useState(false);
  const [publishUrl, setPublishUrl] = useState(null);

 const {activeProject, loadingActiveProject, activeFile , showCode, setActiveFile, setShowCode, loadProject, logout} = useAppContext();

 useEffect(()=>{
    if(!id) return;
 },[id, loadProject])

 useEffect(()=>{
    if(!id || !activeProject) return;
    if(activeProject.status === "pending" || activeProject.status === "generating"){
      const interval = setInterval(()=>{
        loadProject(id, true)
      },1500)
      return ()=> clearInterval(interval)
    }
 },[id, loadProject , activeProject])

 const handleOpenPreview = () =>{
  if(!id) return;
  window.open(`/preview/${id}`,"_blank")
 }

 if(loadingActiveProject || !activeProject){
  return <Loading />
 }

  return (
    <div className='h-screen flex flex-col bg-white overflow-hiddden text-zinc-900 relative'>
      {/*Top Bar Header */}
        <BuilderHeader /> 
        projectName ={activeProject.name}
        version = {activeProject.version}
        showCode = {showCode}
        publishing = {publishing}
        onToggleShowCode = {()=> setShowCode(!showCode)}
        onOpenPreview = {handleOpenPreview}
      {/*Main Layout */}
    </div>
  )
}

export default BuilderPage
