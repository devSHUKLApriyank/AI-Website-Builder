import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const PublishPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) return;

    const fetchPublicProject = async () => {
     try {
      const {data} = await api.get(`/api/projects/public/${id}`)
      setProject(data)
     } catch (err) {
      console.error("failed to load public project:", err);
      setError(err?.response?.data?.error || "This website is not available or is not published yet.")
     }finally{
      setLoading(false)
     }
    }

    fetchPublicProject();

  }, [id])

  if(loading){
    return <Loading />
  }

  if(error || !project){
    return (
      <div>
        
      </div>
    )
  }

  return (
    <div>

    </div>
  )
}

export default PublishPage
