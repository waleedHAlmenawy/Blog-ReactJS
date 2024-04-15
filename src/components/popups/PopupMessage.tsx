import "../../styles/PopupMessage.css";
export default function PopupMessage({
  trigger,
  setTrigger,
  message,
  btnColor,
  btnName,
  handleOnClick,
}: {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  btnColor: string;
  btnName: string;
  handleOnClick: any;
}) {
  return trigger ? (
    <>
      <div className="outer-message">
        <div className="inner-message">
          <p className="text-center mb-7">{message}</p>
          <div className="flex justify-between w-44 m-auto">
            <button
              className={`btn text-${btnColor}-600 hover:bg-${btnColor}-600 hover:text-white`}
              onClick={() => {
                handleOnClick();
              }}
            >
              {btnName}
            </button>
            <button
              className="btn text-slate-600 hover:bg-slate-600 hover:text-white"
              onClick={() => setTrigger(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
