import React from "react";

function OverviewComponent(props,children) {
  return (
    <div className="w-full flex items-center justify-center">
      <div>
        {children}
        <p>{props.label}</p>
        <p>{props.value}</p>
      </div>
    </div>
  );
}

export default OverviewComponent;
