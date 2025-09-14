const mongoose = require('mongoose')

const Product = require('./models/Product')


const products = [
    {
        name: "iPhone 15 Pro Max",
        img: "https://images.unsplash.com/photo-1695048064952-44b984f2af6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGlwaG9uZSUyMDE1fGVufDB8fDB8fHww",
        price: 164900,
        desc: "A17 Pro chip, 6.7-inch display, titanium body."
    },
    {
        name: "iPhone 15",
        img: "https://images.unsplash.com/photo-1695048065127-fbee942eed2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGlwaG9uZSUyMDE1fGVufDB8fDB8fHww",
        price: 79900,
        desc: "A16 Bionic, 6.1-inch display, dual camera."
    },
    {
        name: "iPhone 14",
        img: "https://images.unsplash.com/photo-1663314326611-9e2fd4f11b1b?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price: 69900,
        desc: "A15 chip, OLED display, great battery."
    },
    {
        name: "MacBook Pro 16-inch (M3 Pro)",
        img: "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8TWFjQm9vayUyMFByb3xlbnwwfHwwfHx8MA%3D%3D",
        price: 249900,
        desc: "M3 Pro chip, XDR display, high performance."
    },
    {
        name: "MacBook Air 13-inch (M2)",
        img: "https://images.unsplash.com/photo-1606248897732-2c5ffe759c04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fE1hY0Jvb2slMjBBaXJ8ZW58MHx8MHx8fDA%3D",
        price: 109900,
        desc: "M2 chip, lightweight, long battery life."
    }
];

async function seedDB(){
    await Product.insertMany(products);
    console.log("Data seeded successfully")
}

module.exports = seedDB
