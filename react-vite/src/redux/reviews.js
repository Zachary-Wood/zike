// actions
const GET_CURRENT_REVIEWS = 'reviews/GET_CURRENT_REVIEWS'
const GET_REVIEWS_FOR_PRODUCT = 'reviews/GET_REVIEWS_FOR_PRODUCT'
const CREATE_REVIEW = 'reviews/CREATE_REVIEW'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'



// action creators for reviews 

const loadCurrentReviews = (reviews) => ({
    type: GET_CURRENT_REVIEWS,
    payload: reviews
})

const loadReviews = (reviews) => ({
    type: GET_REVIEWS_FOR_PRODUCT,
    payload: reviews
})

const createAReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review
})

const updateAReview = (review) => ({
    type: UPDATE_REVIEW,
    payload: review
})

const deleteAReview = (reviewId) => ({
    type: UPDATE_REVIEW,
    payload: reviewId
})


// Thunks for reviews 
export const loadCurrentReviewsThunk = () => async (dispatch) => {
    const res = await fetch('/api/reviews/current')
    const data = await res.json()

    if (!res.ok) {
        return { errors: data };
    }

    await dispatch(loadCurrentReviews(data))
    return data
}


export const loadReviewsForProductThunk = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews`)
    const data = await res.json()

    if (!res.ok) {
        return { errors: data };
    }

    await dispatch(loadReviews(data))
    return data
}

export const createAReviewThunk = (productId, review) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews/new`, {
        method: "POST",
        body: review
    })
    
    const data = await res.json()

    if (!res.ok) {
        return { errors: data };
    }
    await dispatch(createAReview(data))
    return data
    
}

export const updateAReviewThunk = (productId, review, reviewId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews/${reviewId}`, {
        method: "PUT",
        body: review
    })
    
    const data = await res.json()

    if (!res.ok) {
        return { errors: data };
    }
    await dispatch(updateAReview(data))
    return data
    
}

export const deleteAReviewThunk = (productId, reviewId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}/reviews/${reviewId}`, {
        method: "DELETE"
    })
    
    const data = await res.json()

    if (!res.ok) {
        return { errors: data };
    }
    await dispatch(deleteAReview(reviewId))
    return data
    
}


// reviews reducer
function reviewReducer(state = {}, action){
    switch(action.type) {
        case GET_REVIEWS_FOR_PRODUCT: {
            const newState = {}
            action.payload.forEach(review => {
                newState[review.id] = review
            });
            return newState
        }
        case GET_CURRENT_REVIEWS: {
            const newState = {}
            action.payload.forEach(review => {
                newState[review.id] = review
            });
            return newState
        }
        case CREATE_REVIEW: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case UPDATE_REVIEW: {
            return {
                ...state,
                [action.review.id]: action.review
              };
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default: {
            return state
        }
    }
}


export default reviewReducer






