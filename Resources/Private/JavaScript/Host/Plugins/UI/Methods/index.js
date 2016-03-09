import addChange from './AddChange/';
import addFlashMessage from './AddFlashMessage/';
import blurNode from './BlurNode/';
import focusNode from './FocusNode/';
import hoverNode from './HoverNode/';
import unhoverNode from './UnhoverNode/';
import setDocumentInformation from './SetDocumentInformation/';

const initializeMethods = methodMap => dispatch => {
    const api = {};

    Object.keys(methodMap).forEach(key => {
        api[key] = methodMap[key](dispatch);
    });

    return api;
};

export default initializeMethods({
    addChange,
    addFlashMessage,
    blurNode,
    focusNode,
    hoverNode,
    unhoverNode,
    setDocumentInformation
});
