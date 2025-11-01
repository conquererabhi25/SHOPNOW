import React from "react";

const Loader = ({ size = 80, color = "#2563eb", text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 h-screen">
      <div
        className="animate-spin rounded-full border-t-4 border-b-4"
        style={{
          width: size,
          height: size,
          borderColor: `${color} transparent transparent transparent`,
        }}
      ></div>
      {text && (
        <p className="mt-3 text-black text-lg font-semibold tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
