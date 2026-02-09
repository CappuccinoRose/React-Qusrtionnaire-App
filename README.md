# React-Questionnaire-App

 **React 事件处理机制深度实践** 的问卷调查应用。

本项目不仅仅是表单的堆砌，而是一个综合性的实战演练，在一个业务场景中同时演示了**事件委托、默认行为阻止、事件冒泡控制**，以及**受控组件与非受控组件的混合使用**。

## ✨ 核心亮点

### 1. 混合架构：受控与非受控组件的协同
这是本项目最大的技术亮点。打破了单一使用 `useState` 或单一使用 `useRef` 的常规做法，实现了性能与体验的平衡：
*   **非受控组件 (核心数据流)**: 使用 `useRef` 结合回调引用 `ref={el => ...}` 管理大量输入框的 DOM 节点。在表单提交时，直接通过 DOM 读取最终数据。
    *   *优势*: 避免了 10 个输入框同时触发 `setState` 导致的频繁重渲染，性能极佳。
*   **受控组件 (UI 交互)**: 利用 `onChange` 事件更新本地 State，驱动**实时进度条**和输入反馈。
    *   *优势*: 保证了用户交互的即时性，实现了流畅的视觉反馈。

### 2. React 事件机制全演练
项目完整覆盖了 React 面试中最高频的事件处理考点：
*   **事件委托**: 利用 `<form>` 标签统一管理提交逻辑，而非在每个按钮上绑定事件。
*   **阻止默认行为**: 在提交函数中使用 `e.preventDefault()`，实现无刷新提交。
*   **阻止事件冒泡**: 在自定义 Modal 弹窗中，通过 `e.stopPropagation()` 实现了“点击遮罩关闭，点击内容保留”的精细化交互。

### 3. 沉浸式交互体验
*   **实时进度反馈**: 右侧悬浮栏动态计算填写进度，配合 CSS3 弹性动画与流光效果，引导用户完成填写。
*   **微交互动画**: 列表悬停上浮、按钮点击回缩、弹窗滑入，提升了应用的精致感。

## 🚀 技术栈

- **React 18**: Hooks (useState, useRef)
- **CSS3**: Flexbox, Grid, Keyframe Animations, Glassmorphism (毛玻璃特效)
- **JavaScript ES6+**: 箭头函数, 解构赋值, 高阶数组方法

## 📦 安装与运行

1.  克隆项目
    
```bash
git clone https://github.com/CappuccinoRose/React-Qusrtionnaire-App.git
```

2.  进入项目目录

```bash
cd React-Questionnaire-App
```

3.  安装依赖

```bash
npm install
```

4.  运行项目

```bash
npm start
```

5.  打开浏览器访问 [http://localhost:3000](http://localhost:3000)
