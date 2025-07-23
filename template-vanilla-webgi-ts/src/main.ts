import './style.css'
import {
  ContactShadowGroundPlugin, GBufferPlugin,
  IObject3D,
  LoadingScreenPlugin,
  ProgressivePlugin,
  SSAAPlugin,
  SSAOPlugin,
  ThreeViewer
} from 'threepipe';
import {TweakpaneUiPlugin} from '@threepipe/plugin-tweakpane';
import {
  BloomPlugin,
  DepthOfFieldPlugin,
  SSReflectionPlugin,
  TemporalAAPlugin,
} from '@threepipe/webgi-plugins';

async function init() {

  const viewer = new ThreeViewer({
    // The canvas element where the scene will be rendered
    canvas: document.getElementById('threepipe-canvas') as HTMLCanvasElement,
    // Enable/Disable MSAA
    msaa: false,
    // Set the render scale automatically based on the device pixel ratio
    renderScale: "auto",
    // Enable/Disable tone mapping
    tonemap: true,
    // Add some plugins
    plugins: [
      // Show a loading screen while the model is downloading
      LoadingScreenPlugin,
      // Enable progressive rendering and SSAA
      ProgressivePlugin, SSAAPlugin,
      // Add a ground with contact shadows
      ContactShadowGroundPlugin
    ]
  });

  // Add post-processing plugins from threepipe and webgi.dev
  viewer.addPlugins([
    GBufferPlugin,
    SSAOPlugin,
    TemporalAAPlugin,
    BloomPlugin,
    SSReflectionPlugin,
    DepthOfFieldPlugin,
  ])

  // Add a plugin with a debug UI for tweaking parameters
  const ui = viewer.addPluginSync(new TweakpaneUiPlugin(true));

  // Load an environment map(optional). One is already set in the model loaded below.
  // await viewer.setEnvironmentMap('https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr', {});

  // Load a 3D model configured in the threepipe editor
  const result = await viewer.load<IObject3D>('https://asset-samples.threepipe.org/demos/classic-watch.glb');

  // Configure plugin properties after loading the file
  const ground = viewer.getPlugin(ContactShadowGroundPlugin)
  if(ground){
    ground.material!.roughness = 0
    ground.material!.metalness = 0
  }
  const bloom = viewer.getPlugin(BloomPlugin)
  if(bloom){
    bloom.pass!.threshold = 2
  }
  viewer.scene.envMapIntensity = 0.5 // Set the environment map intensity

  // Add some debug UI elements for tweaking parameters
  ui.setupPlugins(SSAAPlugin)
  ui.setupPlugins(SSReflectionPlugin)
  ui.setupPlugins(BloomPlugin)
  ui.appendChild(viewer.scene.uiConfig, {expanded: true})

  console.log(result)
}

init();
