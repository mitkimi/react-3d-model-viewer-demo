import { useState } from 'react'
import ModelViewer from '@/components/ModelViewer'
import type { ViewerProps } from '@/components/ModelViewer'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import './App.scss'

const MODELS = [
  { value: '/models/2014_mercedes-benz_sls_amg_black_series.glb', label: '奔驰 SLS AMG Black Series' },
  { value: '/models/sci-fi_shoe.glb', label: 'Sci-Fi 鞋（1）' },
  { value: '/models/sci-fi_sneaker.glb', label: 'Sci-Fi 运动鞋（2）' },
  { value: '/models/salomon_xt6_sneaker_photo_scan.glb', label: 'Salomon XT6 鞋' },
  { value: '/models/tron_moto_sdc__free.glb', label: 'Tron 摩托' },
  { value: '/models/freefire_new_sukuna_3d_model.glb', label: 'Free Fire 宿傩' },
  { value: '/models/low_poly_restaurant_interior_scene.glb', label: '低模餐厅场景' },
] as const

const ENV_PRESETS: { value: ViewerProps['environmentPreset']; label: string }[] = [
  { value: 'studio', label: '工作室' },
  { value: 'apartment', label: '公寓' },
  { value: 'forest', label: '森林' },
  { value: 'park', label: '公园' },
  { value: 'city', label: '城市' },
  { value: 'sunset', label: '日落' },
  { value: 'dawn', label: '黎明' },
  { value: 'night', label: '夜晚' },
  { value: 'none', label: '无' },
]

function App() {
  const [modelUrl, setModelUrl] = useState<string>(MODELS[0].value)
  const [environmentPreset, setEnvironmentPreset] = useState<ViewerProps['environmentPreset']>('studio')
  const [modelXOffset, setModelXOffset] = useState(0)
  const [modelYOffset, setModelYOffset] = useState(0)
  const [defaultRotationX, setDefaultRotationX] = useState(-45)
  const [defaultRotationY, setDefaultRotationY] = useState(20)
  const [defaultZoom, setDefaultZoom] = useState(1)
  const [minZoomDistance, setMinZoomDistance] = useState(0.5)
  const [maxZoomDistance, setMaxZoomDistance] = useState(20)
  const [enableMouseParallax, setEnableMouseParallax] = useState(false)
  const [enableManualRotation, setEnableManualRotation] = useState(true)
  const [enableHoverRotation, setEnableHoverRotation] = useState(true)
  const [enableManualZoom, setEnableManualZoom] = useState(true)
  const [ambientIntensity, setAmbientIntensity] = useState(0.3)
  const [keyLightIntensity, setKeyLightIntensity] = useState(1)
  const [fillLightIntensity, setFillLightIntensity] = useState(0.5)
  const [rimLightIntensity, setRimLightIntensity] = useState(0.8)
  const [autoFrame, setAutoFrame] = useState(true)
  const [fadeIn, setFadeIn] = useState(false)
  const [autoRotate, setAutoRotate] = useState(false)
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(0.35)
  const [showScreenshotButton, setShowScreenshotButton] = useState(false)
  const [placeholderSrc, setPlaceholderSrc] = useState('')

  return (
    <div className="app">
      <h1 className="app__title">3D model viewer demo</h1>

      <section className="app__canvas" aria-label="模型画布">
        <ModelViewer
          key={JSON.stringify({
            modelUrl,
            modelXOffset,
            modelYOffset,
            defaultRotationX,
            defaultRotationY,
            defaultZoom,
            minZoomDistance,
            maxZoomDistance,
            enableMouseParallax,
            enableManualRotation,
            enableHoverRotation,
            enableManualZoom,
            ambientIntensity,
            keyLightIntensity,
            fillLightIntensity,
            rimLightIntensity,
            environmentPreset,
            autoFrame,
            fadeIn,
            autoRotate,
            autoRotateSpeed,
            showScreenshotButton,
            placeholderSrc: placeholderSrc || undefined,
          })}
          url={import.meta.env.BASE_URL + modelUrl.replace(/^\//, '')}
          width="100%"
          height="100%"
          modelXOffset={modelXOffset}
          modelYOffset={modelYOffset}
          defaultRotationX={defaultRotationX}
          defaultRotationY={defaultRotationY}
          defaultZoom={defaultZoom}
          minZoomDistance={minZoomDistance}
          maxZoomDistance={maxZoomDistance}
          enableMouseParallax={enableMouseParallax}
          enableManualRotation={enableManualRotation}
          enableHoverRotation={enableHoverRotation}
          enableManualZoom={enableManualZoom}
          ambientIntensity={ambientIntensity}
          keyLightIntensity={keyLightIntensity}
          fillLightIntensity={fillLightIntensity}
          rimLightIntensity={rimLightIntensity}
          environmentPreset={environmentPreset}
          autoFrame={autoFrame}
          fadeIn={fadeIn}
          autoRotate={autoRotate}
          autoRotateSpeed={autoRotateSpeed}
          showScreenshotButton={showScreenshotButton}
          placeholderSrc={placeholderSrc || undefined}
        />
      </section>

      <section className="app__controls" aria-label="控制区域">
        <div className="app__control-group">
          <Label htmlFor="model-select" className="app__label">模型</Label>
          <Select value={modelUrl} onValueChange={setModelUrl}>
            <SelectTrigger id="model-select" className="w-[180px]">
              <SelectValue placeholder="选择模型" />
            </SelectTrigger>
            <SelectContent>
              {MODELS.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="app__control-group">
          <Label htmlFor="env-select" className="app__label">环境</Label>
          <Select
            value={environmentPreset}
            onValueChange={(v: string) => setEnvironmentPreset(v as ViewerProps['environmentPreset'])}
          >
            <SelectTrigger id="env-select" className="w-[140px]">
              <SelectValue placeholder="选择环境" />
            </SelectTrigger>
            <SelectContent>
              {ENV_PRESETS.map((p) => (
                <SelectItem key={p.value} value={p.value as string}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="app__control-group app__control-group--slider">
          <Label className="app__label">模型 X 偏移 {modelXOffset}</Label>
          <Slider
            min={-2}
            max={2}
            step={0.1}
            value={[modelXOffset]}
            onValueChange={([v]) => setModelXOffset(v ?? 0)}
            className="app__slider"
          />
        </div>
        <div className="app__control-group app__control-group--slider">
          <Label className="app__label">模型 Y 偏移 {modelYOffset}</Label>
          <Slider
            min={-2}
            max={2}
            step={0.1}
            value={[modelYOffset]}
            onValueChange={([v]) => setModelYOffset(v ?? 0)}
            className="app__slider"
          />
        </div>

        <div className="app__control-group app__control-group--slider">
          <Label className="app__label">初始旋转 X {defaultRotationX}°</Label>
          <Slider
            min={-180}
            max={180}
            step={5}
            value={[defaultRotationX]}
            onValueChange={([v]) => setDefaultRotationX(v ?? -50)}
            className="app__slider"
          />
        </div>
        <div className="app__control-group app__control-group--slider">
          <Label className="app__label">初始旋转 Y {defaultRotationY}°</Label>
          <Slider
            min={-180}
            max={180}
            step={5}
            value={[defaultRotationY]}
            onValueChange={([v]) => setDefaultRotationY(v ?? 20)}
            className="app__slider"
          />
        </div>

        <div className="app__control-group app__control-group--slider">
          <Label className="app__label">初始缩放 {defaultZoom}</Label>
          <Slider
            min={0.1}
            max={5}
            step={0.1}
            value={[defaultZoom]}
            onValueChange={([v]) => setDefaultZoom(v ?? 0.5)}
            className="app__slider"
          />
        </div>
        <div className="app__control-group app__control-group--slider">
          <Label className="app__label">最小缩放 {minZoomDistance}</Label>
          <Slider
            min={0.1}
            max={5}
            step={0.1}
            value={[minZoomDistance]}
            onValueChange={([v]) => setMinZoomDistance(v ?? 0.5)}
            className="app__slider"
          />
        </div>
        <div className="app__control-group app__control-group--slider">
          <Label className="app__label">最大缩放 {maxZoomDistance}</Label>
          <Slider
            min={1}
            max={20}
            step={0.5}
            value={[maxZoomDistance]}
            onValueChange={([v]) => setMaxZoomDistance(v ?? 10)}
            className="app__slider"
          />
        </div>

        <div className="app__control-group app__control-group--switch">
          <Label htmlFor="mouseParallax" className="app__label">鼠标视差</Label>
          <Switch
            id="mouseParallax"
            checked={enableMouseParallax}
            onCheckedChange={setEnableMouseParallax}
          />
        </div>
        <div className="app__control-group app__control-group--switch">
          <Label htmlFor="manualRotate" className="app__label">拖拽旋转</Label>
          <Switch
            id="manualRotate"
            checked={enableManualRotation}
            onCheckedChange={setEnableManualRotation}
          />
        </div>
        <div className="app__control-group app__control-group--switch">
          <Label htmlFor="hoverRotate" className="app__label">悬停旋转</Label>
          <Switch
            id="hoverRotate"
            checked={enableHoverRotation}
            onCheckedChange={setEnableHoverRotation}
          />
        </div>
        <div className="app__control-group app__control-group--switch">
          <Label htmlFor="manualZoom" className="app__label">滚轮缩放</Label>
          <Switch
            id="manualZoom"
            checked={enableManualZoom}
            onCheckedChange={setEnableManualZoom}
          />
        </div>

        <div className="app__control-group app__control-group--slider">
          <Label className="app__label">环境光 {ambientIntensity.toFixed(2)}</Label>
          <Slider
            min={0}
            max={2}
            step={0.1}
            value={[ambientIntensity]}
            onValueChange={([v]) => setAmbientIntensity(v ?? 0.3)}
            className="app__slider"
          />
        </div>
        <div className="app__control-group app__control-group--slider">
          <Label className="app__label">主光 {keyLightIntensity.toFixed(2)}</Label>
          <Slider
            min={0}
            max={3}
            step={0.1}
            value={[keyLightIntensity]}
            onValueChange={([v]) => setKeyLightIntensity(v ?? 1)}
            className="app__slider"
          />
        </div>
        <div className="app__control-group app__control-group--slider">
          <Label className="app__label">补光 {fillLightIntensity.toFixed(2)}</Label>
          <Slider
            min={0}
            max={2}
            step={0.1}
            value={[fillLightIntensity]}
            onValueChange={([v]) => setFillLightIntensity(v ?? 0.5)}
            className="app__slider"
          />
        </div>
        <div className="app__control-group app__control-group--slider">
          <Label className="app__label">轮廓光 {rimLightIntensity.toFixed(2)}</Label>
          <Slider
            min={0}
            max={2}
            step={0.1}
            value={[rimLightIntensity]}
            onValueChange={([v]) => setRimLightIntensity(v ?? 0.8)}
            className="app__slider"
          />
        </div>

        <div className="app__control-group app__control-group--switch">
          <Label htmlFor="autoFrame" className="app__label">自动取景</Label>
          <Switch id="autoFrame" checked={autoFrame} onCheckedChange={setAutoFrame} />
        </div>
        <div className="app__control-group app__control-group--switch">
          <Label htmlFor="fadeIn" className="app__label">加载淡入</Label>
          <Switch id="fadeIn" checked={fadeIn} onCheckedChange={setFadeIn} />
        </div>
        <div className="app__control-group app__control-group--switch">
          <Label htmlFor="autoRotate" className="app__label">自动旋转</Label>
          <Switch id="autoRotate" checked={autoRotate} onCheckedChange={setAutoRotate} />
        </div>
        {autoRotate && (
          <div className="app__control-group app__control-group--slider">
            <Label className="app__label">旋转速度 {autoRotateSpeed.toFixed(2)}</Label>
            <Slider
              min={0.1}
              max={1.5}
              step={0.05}
              value={[autoRotateSpeed]}
              onValueChange={([v]) => setAutoRotateSpeed(v ?? 0.35)}
              className="app__slider"
            />
          </div>
        )}
        <div className="app__control-group app__control-group--switch">
          <Label htmlFor="showScreenshot" className="app__label">截图按钮</Label>
          <Switch
            id="showScreenshot"
            checked={showScreenshotButton}
            onCheckedChange={setShowScreenshotButton}
          />
        </div>

        <div className="app__control-group app__control-group--slider">
          <Label className="app__label">占位图 URL</Label>
          <input
            type="text"
            className="app__input"
            placeholder="可选，加载时占位图"
            value={placeholderSrc}
            onChange={(e) => setPlaceholderSrc(e.target.value)}
          />
        </div>
      </section>
    </div>
  )
}

export default App
