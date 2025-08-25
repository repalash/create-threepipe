import './style.css'
import {
  ContactShadowGroundPlugin,
  GBufferPlugin,
  LoadingScreenPlugin,
  ProgressivePlugin,
  SSAAPlugin,
  SSAOPlugin,
} from 'threepipe';
import {TweakpaneUiPlugin} from '@threepipe/plugin-tweakpane';
import {BloomPlugin, DepthOfFieldPlugin, SSReflectionPlugin, TemporalAAPlugin,} from '@threepipe/webgi-plugins';
import React from 'react'
import {createRoot} from 'react-dom/client'
import {Asset, useViewer, ViewerCanvas} from '@threepipe/plugin-r3f'

function Watch() {
  const viewer = useViewer()
  return <Asset
    url={'https://asset-samples.threepipe.org/demos/classic-watch.glb'}
    importConfig={true}
    onLoad={(asset) => {
      console.log('Asset Loaded', asset)
      // Configure plugin properties after loading the file
      const ground = viewer.getPlugin(ContactShadowGroundPlugin)
      if (ground) {
        ground.material.roughness = 0
        ground.material.metalness = 0.8
      }
      const bloom = viewer.getPlugin(BloomPlugin)
      if (bloom) {
        bloom.pass.threshold = 2
      }
      viewer.scene.envMapIntensity = 0.5 // Set the environment map intensity
    }}
  />
}

function App() {
  return <div id={"threepipe-canvas-container"}>
    <ViewerCanvas
      id="threepipe-canvas"
      useR3FLoop={false}
      viewer={{
        msaa: true,
      }}
      plugins={[
        // Show a loading screen while the model is downloading
        LoadingScreenPlugin,
        // Enable progressive rendering and SSAA
        ProgressivePlugin, SSAAPlugin,
        GBufferPlugin,
        SSAOPlugin,
        TemporalAAPlugin,
        BloomPlugin,
        SSReflectionPlugin,
        DepthOfFieldPlugin,
        // Add a ground with contact shadows
        ContactShadowGroundPlugin
      ]}
      onMount={async (viewer) => {
        console.log('Loaded Viewer', viewer)
        // Add a plugin with a debug UI for tweaking parameters
        const ui = viewer.addPluginSync(new TweakpaneUiPlugin(true));
        // Add some debug UI elements for tweaking parameters
        ui.setupPlugins(SSAAPlugin)
        ui.setupPlugins(SSReflectionPlugin)
        ui.setupPlugins(ContactShadowGroundPlugin)
        ui.appendChild(viewer.scene.uiConfig, {expanded: true})

      }}
    >
      <React.Suspense fallback={<mesh>
        <boxGeometry args={[1, 1, 1]}/>
        <meshStandardMaterial color="orange"/>
      </mesh>}>
      </React.Suspense>
      <Watch/>
    </ViewerCanvas>

    <div className="logos">
      <a href="https://threepipe.org" target="_blank">
        <img src="/threepipe.svg" className="logo threepipe" alt="Threepipe logo"/>
      </a>
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" className="logo vite" alt="Vite logo"/>
      </a>
      <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
        <img src="./javascript.svg" className="logo vanilla" alt="JavaScript logo"/>
      </a>
    </div>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>)
