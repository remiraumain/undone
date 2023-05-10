import React from "react";

type Props = {
  isLoading: boolean;
};

const Loading = (props: Props) => {
  return (
    <>
      {props.isLoading && (
        <div className="flex items-center justify-center">
          <span className="h-3 w-3 animate-spin rounded-full border-b border-t border-black" />
          <h3 className="ml-2">updating</h3>
        </div>
      )}
    </>
  );
};

export default Loading;
