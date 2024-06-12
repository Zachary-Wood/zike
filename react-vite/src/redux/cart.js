// action variables
const LOAD_CART_ITEMS = '/cart/user_id/LOAD_CART_ITEMS'
const CREATE_CART_ITEM = '/cart/CREATE_CART_ITEM'
const UPDATE_CART_ITEM = '/cart/UPDATE_CART_ITEM'
const DELETE_CART_ITEM = '/cart/DELETE_CART_ITEM'




// action creators 
const load_cart_items = (items) => ({
    type: LOAD_CART_ITEMS,
    payload: items
})

const add_cart_item = (item) => ({
    type: CREATE_CART_ITEM,
    payload: item
})


const update_cart_item = (item) => ({
    type: CREATE_CART_ITEM,
    payload: item
})

const delete_cart_item = (item) => ({
    type: CREATE_CART_ITEM,
    payload: item
})


//thunks for cart

export const loadCartItemsThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/cart/${userId}`)
    const data = await res.json() 

    if (!res.ok) {
        return { errors: data };
    }

    await dispatch(load_cart_items(data))
    return data
}


export const createACartItemThunk = (item) => async (dispatch) => {
    const res = await fetch(`/api/cart`, {
        method: "POST",
        body: item,
    })
    
    const data = await res.json()
    console.log('this is data', data)

    if (!res.ok) {
        return { errors: data };
    }
    await dispatch(add_cart_item(data))
    return data
    
}

export const updateACartItemThunk = (itemId, item) => async (dispatch) => {
    const res = await fetch(`/api/cart/${itemId}`, {
        method: "PUT",
        body: item,
    })
    
    const data = await res.json()
    console.log('this is data', data)

    if (!res.ok) {
        return { errors: data };
    }
    await dispatch(update_cart_item(data))
    return data
    
}

export const deleteAProductThunk = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE"
    })
    
    const data = await res.json()

    if (!res.ok) {
        return { errors: data };
    }
    await dispatch(delete_cart_item(itemId))
    return data
    
}


// cart reducer

function cartReducer(state = {}, action) {
    switch(action.type) {
        case LOAD_CART_ITEMS: {
            return { ...state, items: action.payload };
        }
        case CREATE_CART_ITEM: {
            return {...state, item: action.payload}

        };
        case UPDATE_CART_ITEM: {
            return {...state, item: action.payload}
        }
        case DELETE_CART_ITEM: {
            const newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default: {
            return state
        }
    


    }
}


export default cartReducer






