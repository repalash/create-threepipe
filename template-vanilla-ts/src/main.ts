import {
  ContactShadowGroundPlugin,
  IObject3D,
  LoadingScreenPlugin,
  ProgressivePlugin,
  SSAAPlugin,
  ThreeViewer
} from 'threepipe';
import {TweakpaneUiPlugin} from '@threepipe/plugin-tweakpane';

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

  // Add a plugin with a debug UI for tweaking parameters
  const ui = viewer.addPluginSync(new TweakpaneUiPlugin(true));

  // Load an environment map
  await viewer.setEnvironmentMap('https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr', {
    // The environment map can also be used as the scene background
    setBackground: false,
  });

  // Load a 3D model with auto-center and auto-scale options
  const result = await viewer.load<IObject3D>('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf', {
    autoCenter: true,
    autoScale: true,
  });

  // Add some debug UI elements for tweaking parameters
  ui.setupPlugins(SSAAPlugin)
  ui.appendChild(viewer.scene)
  ui.appendChild(viewer.scene.mainCamera.uiConfig)

  // Every object, material, etc has a UI config that can be added to the UI to configure it.
  const model = result?.getObjectByName('node_damagedHelmet_-6514');
  if (model) ui.appendChild(model.uiConfig, {expanded: false});

}

init();
