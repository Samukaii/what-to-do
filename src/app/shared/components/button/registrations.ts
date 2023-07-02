import { ButtonActionIconComponent } from "./button-actions/action-icon/button-action-icon.component";
import { ButtonActionRaisedComponent } from "./button-actions/button-raised/button-action-raised.component";
import { ButtonActionTypes } from "./types/button-action-types";


export const buttonActionTypes = {
    raised: ButtonActionRaisedComponent,
    icon: ButtonActionIconComponent,
}

export const getComponent = (type: ButtonActionTypes) =>{
    return buttonActionTypes[type];
}
