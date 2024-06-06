let product = [ ]
for (let i = 0; i < 100; i++) {
    let product1 = new CreateProduct(`Name${i}`, 10000, ["Iconos/Default.webp"], 12, "Product Default", "Seller", ["Tags"], 5000);
    product.push(product1);
}
