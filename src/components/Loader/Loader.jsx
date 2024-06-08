
import './loader.css';

export const Loader = () => {
  return (
    <div className="spinner center">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className={`spinner-blade`}
          style={{
            animationDelay: `${index * 0.083}s`,
            transform: `rotate(${index * 30}deg)`,
          }}
        ></div>
      ))}
    </div>
  );
};

