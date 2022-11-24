import React from "react";

type props = {
  type: "Error" | "Warning" | "Success";
  title: string;
  description: string;
  primaryActionText: string;
  secondaryActionText?: string;
  primaryAction: () => void;
  secondaryAction?: () => void;
  showDialog: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dialog: React.FC<props> = ({
  showDialog,
  setShowDialog,
  type,
  title,
  description,
  primaryActionText,
  secondaryActionText,
  primaryAction,
  secondaryAction,
}) => {
  const exitDialog = () => {
    setShowDialog(false);
  };

  const getImage = () => {
    if (type === "Success") {
      return "https://img.icons8.com/color/96/40C057/checked--v1.png";
    }
    if (type === "Error") {
      return "https://img.icons8.com/ios-filled/50/FA5252/box-important--v1.png";
    }
    if (type === "Warning") {
      return "https://img.icons8.com/ios-glyphs/60/FD7E14/warning-shield.png";
    }
  };

  return (
    <div
      className="fixed z-10 top-0 right-0 h-full w-full justify-center items-center bg-gray-500 bg-opacity-40"
      onClick={() => exitDialog()}
      style={{ display: showDialog ? "flex" : "none" }}
      hidden={!showDialog}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-fit relative flex-col rounded-md bg-slate-50"
        style={{ minWidth: 350 }}>
        <div className="flex h-fit justify-center border-b py-1 rounded-t-md items-center bg-slate-300">
          <p className="font-semibold">{title}</p>
          <img
            className="h-5 rounded-md aspect-square absolute cursor-pointer inset-y-1 right-1"
            onClick={() => exitDialog()}
            src="https://img.icons8.com/ios/50/null/close-window--v1.png"
          />
        </div>
        <div className="flex flex-col py-2 px-4 gap-2">
          <img
            className="h-16 w-fit rounded-md self-center aspect-square"
            src={getImage()}
          />
          <p className="text-center">{description}</p>
        </div>
        <div className="flex py-2 px-4 gap-4">
          {secondaryActionText && secondaryAction ? (
            <button
              className="bg-slate-100 w-full border border-gray-500 hover:bg-slate-300 font-bold py-2 rounded-md"
              type="button"
              onClick={secondaryAction}>
              {secondaryActionText}
            </button>
          ) : (
            ""
          )}
          <button
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 rounded-md"
            type="button"
            onClick={primaryAction}>
            {primaryActionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
