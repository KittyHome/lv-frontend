import { PropsWithChildren } from "react";
import Popup from "reactjs-popup";
import { PopupPosition } from "reactjs-popup/dist/types";

interface BPopupProps {
  trigger: JSX.Element;
  position?: PopupPosition | PopupPosition[];
}
const BPopup: React.FC<PropsWithChildren<BPopupProps>> = ({
  trigger,
  children,
  position,
}) => {
  return (
    <Popup
      trigger={trigger}
      arrowStyle={{
        color: "#EE1D4F",
      }}
      position={position}
    >
      {children}
    </Popup>
  );
};

export default BPopup;
