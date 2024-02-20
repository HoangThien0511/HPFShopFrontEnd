import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, setDoc, deleteDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../../../../firebase/firebase";

function Cart( ) {

    // Load cart data on component mount
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "cart"), (snapshot) => {
            const cartData: any = [];
            snapshot.forEach((doc) => {
                cartData.push(doc.data());
            });
            setCart(cartData);
        });

        // Unsubscribe from cart data on component unmount
        return () => unsubscribe();
    }, []);

    function addtocart(item: any) {
        const cartItem = doc(db, "cart", item.id.toString());
        setDoc(cartItem, item, { merge: true });

        products.map((i: any) => {
            if (i.id === item.id) {
                i.cart = true;
            }
        });
    }

    function removetocart(item: any) {
        const cartItem = doc(db, "cart", item.id.toString());
        deleteDoc(cartItem);

        products.map((i: any) => {
            if (i.id === item.id) {
                i.cart = false;
            }
        });
    }

    function increase(item: any) {
        const cartItem = doc(db, "cart", item.id.toString());
        updateDoc(cartItem, { quantity: increment(1) });
    }

    function decrease(item: any) {
        const cartItem = doc(db, "cart", item.id.toString());
        updateDoc(cartItem, { quantity: increment(-1) });
    }

    function total() {
        let x = 0;
        cart.map((i) => {
            x += i.price * i.quantity;
        });
        return x;
    }

    return (
        <div>
            <h1>Cart</h1>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.price} - {item.quantity}
                        <button onClick={() => increase(item)}>+</button>
                        <button onClick={() => decrease(item)}>-</button>
                        <button onClick={() => removetocart(item)}>Remove from cart</button>
                    </li>
                ))}
            </ul>
            <p>Total: {total()}</p>
            <hr />
            <h2>Products</h2>
            <ul>
                {products.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.price}
                        {!item.cart && <button onClick={() => addtocart(item)}>Add to cart</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Cart;
