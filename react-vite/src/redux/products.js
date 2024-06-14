// Actions 
const LOAD_PRODUCTS = "products/LOAD_PRODUCTS"
const LOAD_SINGLE_PRODUCT = '/products/LOAD_SINGLE_PRODUCT'
const CREATE_PRODUCT = '/products/CREATE_PRODUCT'
const UPDATE_PRODUCT = '/products/UPDATE_PRODUCT'
const DELETE_PRODUCT = "/products/DELETE_PRODUCT"


// action creators for products

const loadProducts = (products) => ({
    type: LOAD_PRODUCTS,
    payload: products
})

const loadProductById = (product) => ({
    type: LOAD_SINGLE_PRODUCT,
    payload: product
})

const createAProduct = (product) => ({
    type: CREATE_PRODUCT,
    payload: product
})

const updateAProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product
})

const deleteAProduct = (productId) => ({
    type: DELETE_PRODUCT,
    payload: productId
})



// Thunks for products


export const loadProductsThunk = () => async (dispatch) => {
    const res = await fetch('/api/products/')
    const data = await res.json() 

    if (!res.ok) {
        return { errors: data };
    }

    await dispatch(loadProducts(data))
    return data
}

export const loadProductByIdThunk = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`)
    const data = await res.json()

    if (!res.ok) {
        return { errors: data };
    }
    await dispatch(loadProductById(data))
    return data
    
}

export const createAProductThunk = (product) => async (dispatch) => {
    const res = await fetch(`/api/products/new`, {
        method: "POST",
        body: product,
    })
    
    const data = await res.json()
    console.log('this is data', data)

    if (!res.ok) {
        return { errors: data };
    }
    await dispatch(createAProduct(data))
    return data
    
}

export const updateAProductThunk = (productId, product) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        body: product
    })
    
    const data = await res.json()

    if (!res.ok) {
        return { errors: data };
    }
    await dispatch(updateAProduct(data))
    return data
    
}


export const deleteAProductThunk = (productId) => async (dispatch) => {
    const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE"
    })
    
    const data = await res.json()

    if (!res.ok) {
        return { errors: data };
    }
    await dispatch(deleteAProduct(productId))
    return data
    
}


// product reducer 

function productReducer(state = {}, action){
    switch(action.type) {
        case LOAD_PRODUCTS: {
            const newState = {}
            action.payload.products.forEach(product => {
                newState[product.id] = product
            });
            return newState
        }
        case LOAD_SINGLE_PRODUCT: {
            const newState = { ...state, [action.payload.id]: action.payload };
            return newState;
        }
        case CREATE_PRODUCT: {
            const newState = { ...state };
            console.log('payload', action.payload)
            newState[action.payload.id] = action.payload;
            
            return newState;
        }
        case UPDATE_PRODUCT: {
            return {
                ...state,
                [action.restaurant.id]: action.restaurant
              };
        }
        case DELETE_PRODUCT: {
            const newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default: {
            return state
        }
    }
}


export default productReducer







