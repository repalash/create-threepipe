import './style.css'
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
    canvas: document.getElementById('threepipe-canvas') as HTMLCanvasElement,
    msaa: false,
    renderScale: "auto",
    tonemap: true,
    plugins: [LoadingScreenPlugin, ProgressivePlugin, SSAAPlugin, ContactShadowGroundPlugin]
  });

  const ui = viewer.addPluginSync(new TweakpaneUiPlugin(true));

  await viewer.setEnvironmentMap('https://threejs.org/examples/textures/equirectangular/venice_sunset_1k.hdr', {
    setBackground: false,
  });

  const result = await viewer.load<IObject3D>('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf', {
    autoCenter: true,
    autoScale: true,
  });

  ui.setupPlugins(SSAAPlugin)
  ui.appendChild(viewer.scene)
  ui.appendChild(viewer.scene.mainCamera.uiConfig)

  const model = result?.getObjectByName('node_damagedHelmet_-6514');
  if (model) ui.appendChild(model.uiConfig, {expanded: false});

}

init();
