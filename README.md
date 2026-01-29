# 3D Model Viewer Demo

基于 [React Bits](https://reactbits.dev) 的 **ModelViewer** 组件进行修改的 3D 模型预览示例项目。支持 GLB/GLTF/FBX/OBJ 格式，可切换模型、环境、光照与交互参数。

## 说明

- **ModelViewer 组件**：源自 [React Bits - Model Viewer](https://reactbits.dev/components/model-viewer)，在本项目中进行了修改与集成。
- 使用 React Three Fiber（@react-three/fiber）与 drei，底层为 Three.js，实现模型加载、光照、环境、轨道控制与截图等能力。

## 技术栈

- React 19 + TypeScript + Vite
- Three.js + @react-three/fiber + @react-three/drei
- Tailwind CSS + SCSS
- shadcn/ui（Radix UI）

## 功能

- 多模型切换（`public/models` 下模型列表）
- 环境预设（工作室、森林、城市等）
- 模型偏移、初始旋转、缩放范围
- 鼠标视差、拖拽旋转、悬停旋转、滚轮缩放
- 环境光 / 主光 / 补光 / 轮廓光强度
- 自动旋转与旋转速度
- 自动取景、加载淡入、截图按钮、占位图 URL
- 参数变更后组件重新加载以应用新配置

## 部署（GitHub Pages）

- 项目配置了 **base 路径** `/react-3d-model-viewer-demo/`，用于发布到 GitHub 仓库页。
- 推送 `main` 分支会触发 `.github/workflows/deploy.yml`：安装依赖 → 构建 → 上传并部署到 GitHub Pages。
- 部署完成后访问：**https://mitkimi.github.io/react-3d-model-viewer-demo**
- 在仓库 **Settings → Pages** 中，将 Source 选为 **GitHub Actions**。

## 快速开始

```bash
# 安装依赖
yarn install
# 或 npm install

# 开发
yarn dev
# 或 npm run dev

# 构建
yarn build
# 或 npm run build

# 预览构建结果
yarn preview
# 或 npm run preview
```

## 项目结构

```
├── public/
│   └── models/          # 3D 模型文件（glb 等）
├── src/
│   ├── components/
│   │   ├── ModelViewer.tsx   # 基于 React Bits 修改的 3D 查看器
│   │   └── ui/               # shadcn 表单组件
│   ├── App.tsx
│   ├── App.scss
│   └── main.tsx
├── index.html
└── package.json
```

## 致谢

- [React Bits](https://reactbits.dev) — Model Viewer 组件来源
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) / [drei](https://github.com/pmndrs/drei) — React 3D 渲染
- [Three.js](https://threejs.org/) — 3D 引擎
