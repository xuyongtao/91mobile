// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/22278302bd9abc5cd022e1e336893aa567d40a96/react-modal/react-modal.d.ts
declare module "react-modal" {
    interface ReactModal {
        isOpen: boolean;
        style?: {
            content?: {
                [key: string]: any;
            },
            overlay?: {
                [key: string]: any;
            }
        },
        appElement?: HTMLElement | {},
        onAfterOpen?: Function,
        onRequestClose?: Function,
        closeTimeoutMS?: number,
        ariaHideApp?: boolean,
        shouldCloseOnOverlayClick?: boolean,
        overlayClassName?: string,
        className?: string
    }
    let ReactModal: __React.ClassicComponentClass<ReactModal>;
    export = ReactModal;
}
