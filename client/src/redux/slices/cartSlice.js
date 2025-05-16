import { createSlice } from '@reduxjs/toolkit';

const getCartKey = () => {
    const token = localStorage.getItem('token');
    return token ? `cart_${token}` : 'cart_guest';
};

const initialState = {
    items: [],
    itemCount: 0,
};

// Khôi phục trạng thái giỏ hàng từ localStorage
const loadCartFromLocalStorage = () => {
    try {
        const cartKey = getCartKey();
        const serializedCart = localStorage.getItem(cartKey);
        if (serializedCart === null) {
            return initialState;
        }
        const parsedCart = JSON.parse(serializedCart);
        return {
            ...parsedCart,
            items: Array.isArray(parsedCart.items) ? parsedCart.items : [],
        };
    } catch (e) {
        console.error("Could not load cart from localStorage", e);
        return initialState;
    }
};

const saveCartToLocalStorage = (state) => {
    try {
        const cartKey = getCartKey();
        const serializedCart = JSON.stringify(state);
        localStorage.setItem(cartKey, serializedCart);
    } catch (e) {
        console.error("Could not save cart to localStorage", e);
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCartFromLocalStorage(),
    reducers: {
        addToCart: (state, action) => {
            // Kiểm tra xem user đã đăng nhập chưa
            const token = localStorage.getItem('token');
            if (!token) {
                // Nếu chưa đăng nhập, không thêm vào cart
                return state;
            }

            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.quantity += newItem.quantity || 1;
            } else {
                state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
            }

            state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
            saveCartToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            state.itemCount = state.items.reduce((count, item) => count + item.quantity, 0);
            saveCartToLocalStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.itemCount = 0;
            saveCartToLocalStorage(state);
        },
        setAllCart: (state, action) => {
            state.items = action.payload;
            state.itemCount = action.payload.reduce((count, item) => count + item.quantity, 0);
            saveCartToLocalStorage(state);
        },
        loadUserCart: (state) => {
            const newState = loadCartFromLocalStorage();
            state.items = newState.items;
            state.itemCount = newState.itemCount;
        }
    }
});

export const { addToCart, removeFromCart, clearCart, setAllCart, loadUserCart } = cartSlice.actions;
export default cartSlice.reducer;
