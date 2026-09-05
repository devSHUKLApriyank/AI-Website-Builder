import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom';
import BuilderHeader from '../components/BuilderHeader';
import Loading from '../components/Loading';
import { FolderTreeIcon, MessageSquareIcon } from 'lucide-react';

const BuilderPage = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const [leftTab, setLeftTab] = useState("chat");
  const [publishing, setPublishing] = useState(false);
  const [publishUrl, setPublishUrl] = useState(null);

 const {activeProjects, loadingActiveProjects, activeFile , showCode, setActiveFile, setShowCode, loadProject, logout} = useAppContext();

 useEffect(()=>{
    if(!id) return;
    loadProject(id)
 },[id])

 useEffect(()=>{
    if(!id || !activeProjects) return;
    if(activeProjects.status === "pending" || activeProjects.status === "generating"){
      const interval = setInterval(()=>{
        loadProject(id, true)
      },1500)
      return ()=> clearInterval(interval)
    }
 },[id, loadProject , activeProjects])

 const handleOpenPreview = () =>{
  if(!id) return;
  window.open(`/preview/${id}`,"_blank")
 }

 const handlePublish = async () =>{

 }

 const handleDownload = async () =>{

 }

 if(loadingActiveProjects || !activeProjects){
  return <Loading />
 }

  return (
    <div className='h-screen flex flex-col bg-white overflow-hiddden text-zinc-900 relative'>
      {/*Top Bar Header */}
        <BuilderHeader  
        projectName ={activeProjects.name}
        version = {activeProjects.version}
        showCode = {showCode}
        publishing = {publishing}
        onToggleShowCode = {()=> setShowCode(!showCode)}
        onOpenPreview = {handleOpenPreview}
        onPublish = {handlePublish}
        onDownload = {handleDownload}
        onBack = {()=> navigate("/")}
        onLogout = {logout}
        /> 
       
      {/*Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/*Left Sidebar */}
        <div className='w-[320px] shrink-0 flex flex-col border-zinc-200 bg-white'>
          {/*Sidebar Tabs */}
          <div className='flex border-b border-zinc-100'>
            <button onClick={()=> setLeftTab("chat")} className={`flex-1 flex items-center justify-center ap-1.5 py-2.5  text-xs font-medium cursor-pointer ${leftTab == "chat"? "text-zinc-900 border-b-2 border-zinc-900": "text-zinc-400 hover:text-zinc-700"}`}>
              <MessageSquareIcon className='mr-1' size={13}/> Chat
            </button>

            <button onClick={()=> setLeftTab("files")} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium cursor-pointer ${leftTab == "files"? "text-zinc-900 border-b-2 border-zinc-900": "text-zinc-400 hover:text-zinc-700"}`}>
              <FolderTreeIcon size={13}/> Files
            </button>
          </div>
          {/* Sidebar Content */}
          <div className='flex-1 overflow-hidden'>
            {
              leftTab === 'chat' ? (
                <div>Chat panel</div>
              ):(<div>File Explorer</div>)
            }

          </div>
        </div>

        {/*Preview / Code Area */}
      </div>
    </div>
  )
}

export default BuilderPage
