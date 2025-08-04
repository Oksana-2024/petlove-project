import { useEffect, useState } from "react";

export function ProgressLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25; 
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-wrapper">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="progress-text">{progress}%</p>
    </div>
  );
}



export default ProgressLoader