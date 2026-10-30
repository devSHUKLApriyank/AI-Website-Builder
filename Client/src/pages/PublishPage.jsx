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
     const {data} = await api.get(`/api/projects/public/${id}`)
      setProject(data)
    }
  }, [id])

  return (
    <div>

    </div>
  )
}

export default PublishPage
