import { SetStateAction, useEffect, useRef } from "react";

export default function SuccessMessage(props: {
  isSuccessfulPayment: boolean;
  setIsSuccessfulPayment: (value: SetStateAction<boolean>) => void;
}) {
  const refDialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!refDialog) return;
    if (props.isSuccessfulPayment) {
      refDialog.current?.showModal();
    } else {
      refDialog.current?.close();
    }
  });
  const closeDialog = () => {
    if (!refDialog) return;
    props.setIsSuccessfulPayment(false);
  };
  return (
    <dialog
      ref={refDialog}
      className="fixed top-0 left-0 right-0 bottom-0 bg-transparent backdrop:bg-[#00000033]"
    >
      <div className="flex flex-col gap-10 p-12 pb-8 m-auto rounded-2xl bg-[#E6E6E6] w-fit h-fit">
        <p className="text-4xl font-semibold">Successful payment</p>
        <button
          onClick={closeDialog}
          className="flex justify-center items-center px-6 py-2 w-full h-[3.75rem] rounded-2xl bg-green-coin font-medium text-2xl text-white transition-all hover:bg-green-coin-hover active:bg-green-coin-active"
        >
          Continue shopping
        </button>
      </div>
    </dialog>
  );
}
