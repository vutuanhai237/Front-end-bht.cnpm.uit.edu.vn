import {
    //DOCUMENTS LIST
    GET_DOCUMENTS_LIST_REQUEST,
    GET_DOCUMENTS_LIST_SUCCESS,
    GET_DOCUMENTS_LIST_FAILURE,

    // MY DOC
    GET_MY_DOCUMENTS_REQUEST,
    GET_MY_DOCUMENTS_SUCCESS,
    GET_MY_DOCUMENTS_FAILURE,

    //DOCUMENT SEARCH RESULT
    GET_DOCUMENT_SEARCH_RESULT_REQUEST,
    GET_DOCUMENT_SEARCH_RESULT_SUCCESS,
    GET_DOCUMENT_SEARCH_RESULT_FAILURE,

    GET_ALL_NOT_APPROVED_DOCUMENTS_SUCCESS,
    GET_ALL_NOT_APPROVED_DOCUMENTS_REQUEST,
    GET_ALL_NOT_APPROVED_DOCUMENTS_FAILURE,
    APPROVE_A_DOCUMENT

} from '../constants.js'

const initialState = {


    documentSearchResult: {
        isLoading: false,
        data: [],
        error: ""
    },

    myDocuments: {
        isLoading: false,
        data: [],
        error: ""
    }
}

function DocReducer(state = initialState, action) {
    switch (action.type) {

        // case GET_ALL_NOT_APPROVED_DOCUMENTS:
        //     return { ...state, requestedDocuments: action.payload };
        case APPROVE_A_DOCUMENT:
            return { ...state, currentDocumentApprovedStatus: action.payload }

        //new documents
       
        //my post
        case GET_MY_DOCUMENTS_REQUEST:
            return {
                ...state, myDocuments: { isLoading: true }
            };
        case GET_MY_DOCUMENTS_SUCCESS:
            {
                return { ...state, myDocuments: { isLoading: false, data: action.payload, error: '' } }
            }
        case GET_MY_DOCUMENTS_FAILURE:
            {
                return { ...state, myDocuments: { isLoading: false, error: action.payload, data: [] } }
            }

        //document search result 
        //my post
        case GET_DOCUMENT_SEARCH_RESULT_REQUEST:
        case GET_DOCUMENTS_LIST_REQUEST:
            return {
                ...state, documentSearchResult: { isLoading: true }
            };
        case GET_DOCUMENT_SEARCH_RESULT_SUCCESS:
        case GET_DOCUMENTS_LIST_SUCCESS:
            {
                return { ...state, documentSearchResult: { isLoading: false, data: action.payload, error: '' } }
            }
        case GET_DOCUMENT_SEARCH_RESULT_FAILURE:
        case GET_DOCUMENTS_LIST_FAILURE:
            {
                return { ...state, documentSearchResult: { isLoading: false, error: action.payload, data: [] } }
            }




        default:
            return state;
    }
}

export default DocReducer;

