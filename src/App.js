import { useRef, useState } from "react";
import "./App.css";

function App() {
  // 初始化状态，使用对象key 1-10 对应问题索引
  const [form, setForm] = useState({
    1: "I have no idea.",
    2: "I have no idea.",
    3: "I have no idea.",
    4: "I have no idea.",
    5: "I have no idea.",
    6: "I have no idea.",
    7: "I have no idea.",
    8: "I have no idea.",
    9: "I have no idea.",
    10: "I have no idea.",
  });

  const question = [
    "What is one thing you want to change about yourself?",
    "What things give you a sense of accomplishment?",
    "What has been the best/worst phase of your life?",
    "If you're in a bad mood, do you prefer to be alone or seek someone to comfort you?",
    "Have you ever kept a diary?",
    "What is your favorite book/movie?",
    "What misunderstandings do people have about you?",
    "What is the craziest thing you have ever done?",
    "What do you like to do when you're alone?",
    "Which color do you like?",
  ];

  const [showConfirm, setShowConfirm] = useState(false);
  // 使用 useRef 集合来存储多个 input 的引用（非受控组件核心）
  const inputRefs = useRef({});

  // 处理非受控组件的最终提交，手动收集数据
  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止默认行为

    const newFormData = {};
    // 遍历 refs 收集数据，确保安全访问
    Object.values(inputRefs.current).forEach((ref) => {
      if (ref && ref.name) {
        newFormData[ref.name] = ref.value;
      }
    });

    setForm(newFormData);
    console.log("Form Submitted:", newFormData);
    setShowConfirm(false); // 提交后关闭弹窗

    // 这里可以添加提交成功后的提示逻辑
    alert("Submitted successfully! Check console for data.");
  };

  // 打开确认弹窗
  const handlePrepareSubmit = () => {
    setShowConfirm(true);
  };

  // 计算进度的辅助函数
  const calculateProgress = () => {
    const totalQuestions = question.length;
    // 统计值不等于 "I have no idea." 且不为空的字段数量
    const answeredCount = Object.values(form).filter(
      (value) => value !== "I have no idea." && value.trim() !== "",
    ).length;
    return Math.round((answeredCount / totalQuestions) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Survey Form</h1>
        {/* 表单区域：事件委托的实践点 */}
        <form className="questions" onSubmit={handleSubmit}>
          {question.map((q, index) => (
            <li key={index}>
              <span className="question-text">
                {index + 1}. {q}
              </span>
              {/* 为每个 input 绑定独立的 ref */}
              <input
                name={index + 1}
                ref={(el) => (inputRefs.current[index + 1] = el)}
                defaultValue={form[index + 1]}
                // onChange 实现实时进度更新
                onChange={(e) => {
                  const { name, value } = e.target;
                  setForm((prev) => ({ ...prev, [name]: value }));
                }}
              />
            </li>
          ))}
          <button
            type="button"
            className="submit-btn"
            onClick={handlePrepareSubmit}
          >
            Submit
          </button>
        </form>

        {/* 右侧悬浮状态栏 */}
        <div className="status">
          <h3>Current Progress</h3>
          <div className="progress-container">
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{progress}%</span>
          </div>
          <p className="status-tip">
            {progress === 100 ? "All set! Ready to submit." : "Keep going..."}
          </p>
        </div>
      </div>

      {/* 确认弹窗 */}
      {showConfirm && (
        <ConfirmForm
          onClose={() => setShowConfirm(false)}
          onFinalSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

function ConfirmForm({ onClose, onFinalSubmit }) {
  // 阻止事件冒泡，防止点击内部关闭弹窗
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    onFinalSubmit(e);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="main" onClick={handleModalContentClick}>
        <button className="cancel" onClick={onClose}>
          X
        </button>
        <h1>Confirm your answers</h1>
        <p>Are you sure you want to submit your answers?</p>
        <div className="confirm-actions">
          <button className="btn-confirm" onClick={handleConfirm}>
            Yes
          </button>
          <button className="btn-cancel" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
