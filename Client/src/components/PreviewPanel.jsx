import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from '@codesandbox/sandpack-react'
import { detectDependencies } from '../utils/sandpackUtils'
import { useAppContext } from '../context/AppContext'
import SandpackErrorMonitor from './SandpackErrorMonitor'

const SAVE_DEBOUNCE_MS = 800

// Watches for file edits inside the Sandpack editor, syncs them to live state,
// and saves changes to the DB (debounced).
function SandpackFileWatcher({ project, onLiveFilesChange }) {
  const { sandpack } = useSandpack()
  const { files } = sandpack
  const { updateProjectFiles } = useAppContext()

  // Always read the latest project without re-running the effect on every prop change
  const projectRef = useRef(project)
  useEffect(() => {
    projectRef.current = project
  }, [project])

  const saveTimerRef = useRef(null)

  useEffect(() => {
    const currentProject = projectRef.current
    if (!currentProject?.files) return

    const updatedFiles = {}
    let hasChanges = false

    for (const [path, fileObj] of Object.entries(files)) {
      // Skip Sandpack's own template files (/package.json, /index.js, etc.)
      if (!(path in currentProject.files)) continue

      const fileCode = fileObj.code
      updatedFiles[path] = fileCode

      const original = currentProject.files[path]
      const originalContent = typeof original === 'string' ? original : original?.content
      if (originalContent !== undefined && originalContent !== fileCode) {
        hasChanges = true
      }
    }

    // Sync live files to parent
    onLiveFilesChange(updatedFiles)

    // Debounced save to DB
    if (hasChanges) {
      clearTimeout(saveTimerRef.current)
      saveTimerRef.current = setTimeout(() => {
        updateProjectFiles(updatedFiles)
      }, SAVE_DEBOUNCE_MS)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])

  // Clear pending save on unmount
  useEffect(() => () => clearTimeout(saveTimerRef.current), [])

  return null
}

const PreviewPanel = ({ project, activeFile, showCode }) => {
  const [showErrorOverlay, setShowErrorOverlay] = useState(false)
  const [liveFiles, setLiveFiles] = useState(project.files || {})
  const [prevProjectKey, setPrevProjectKey] = useState(`${project._id}-${project.version}`)

  // Reset live files when the project or its version changes
  const currentKey = `${project._id}-${project.version}`
  if (prevProjectKey !== currentKey) {
    setPrevProjectKey(currentKey)
    setLiveFiles(project.files || {})
  }

  const handleLiveFilesChange = (newFiles) => {
    setLiveFiles((prev) => {
      const newKeys = Object.keys(newFiles)
      let changed = newKeys.length !== Object.keys(prev).length
      if (!changed) {
        for (const p of newKeys) {
          if (prev[p] !== newFiles[p]) {
            changed = true
            break
          }
        }
      }
      return changed ? newFiles : prev
    })
  }

  // Convert liveFiles to Sandpack format
  const sandpackFiles = useMemo(() => {
    const spFiles = {}
    for (const [path, content] of Object.entries(liveFiles)) {
      const fileCode = typeof content === 'string' ? content : content?.content || ''
      spFiles[path] = {
        code: fileCode,
        active: path === activeFile,
      }
    }
    return spFiles
  }, [liveFiles, activeFile])

  // Detect dependencies from import statements using liveFiles
  const dependencies = useMemo(() => detectDependencies(liveFiles), [liveFiles])

  return (
    <div className="h-full w-full">
      <SandpackProvider
        key={project._id}
        template="react"
        files={sandpackFiles}
        customSetup={{ dependencies }}
        options={{
          externalResources: [
            'https://cdn.tailwindcss.com',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
          ],
          classes: {
            'sp-wrapper': 'sp-wrapper',
            'sp-layout': 'sp-layout',
            'sp-preview': 'sp-preview',
          },
          logLevel: 0,
        }}
        theme={{
          colors: {
            surface1: '#ffffff',
            surface2: '#f4f4f5',
            surface3: '#e4e4e7',
            clickable: '#71717a',
            base: '#27272a',
            disabled: '#a1a1aa',
            hover: '#52525b',
            accent: '#2563eb',
            error: '#ef4444',
            errorSurface: '#fef2f2',
          },
          font: {
            body: "'Urbanist', system-ui, -apple-system, sans-serif",
            mono: "'Geist Mono', ui-monospace, monospace",
            size: '14px',
            lineHeight: '1.6',
          },
        }}
      >
        <SandpackFileWatcher project={project} onLiveFilesChange={handleLiveFilesChange} />
        <SandpackErrorMonitor onErrorChange={setShowErrorOverlay} />

        <SandpackLayout
          style={{
            height: '100%',
            border: 'none',
            borderRadius: 0,
            background: 'transparent',
          }}
        >
          {showCode && (
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              showInlineErrors
              wrapContent
              style={{ height: '100%', flex: 1, minWidth: 0 }}
            />
          )}

          <SandpackPreview
            showNavigator={false}
            showRefreshButton
            showOpenInCodeSandbox={false}
            showSandpackErrorOverlay={showErrorOverlay}
            style={{ height: '100%', flex: showCode ? 1 : 2, minWidth: 0 }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}

export default PreviewPanel