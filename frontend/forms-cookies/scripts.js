function addToCart(item) {
    const cart = getCart();
    cart.push(item);
    setSecureCookie('cart', JSON.stringify(cart), 2);
    console.log('cart :>> ', cart);
}

// addToCart({ name: 'Banana', price: 0.5 });
// addToCart({ name: 'sadas', price: 3.4 });

function getCart() {
  let cart = getSecureCookie("cart");
  cart = cart ? JSON.parse(decodeURIComponent(cart)) : [];
  return cart;
}
// getCart();

function getSecureCookie(name) {
  const nameEQ = `${name}=`;
  const cookiesArray = document.cookie.split(";");

  for (let cookie of cookiesArray) {
    if (cookie.trim().indexOf(nameEQ) === 0)
      return decodeURIComponent(cookie.substring(nameEQ.length));
  }
  return null;
}
//console.log(getSecureCookie("user1"));

function deleteAllCookies() {
  const cookiesArray = document.cookie.split(";");

  for (let cookie of cookiesArray) {
    const trimmed = cookie.trim();
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex > 0) {
      // Проверяем, что = есть и не в начале
      const name = trimmed.substring(0, eqIndex);
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
}
// deleteAllCookies();

function setSecureCookie(
  name,
  value,
  expireDays,
  path = "/",
  domain = "",
  samesite = "strict"
) {
  const date = new Date();
  date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);

  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; ${expires}; path=${path}; domain=${domain}; samesite=${samesite}`;
}
// setSecureCookie('user1', 'jojo', 11)
// setSecureCookie('cart', {name: "Banana", price: 0.4}, 1);
