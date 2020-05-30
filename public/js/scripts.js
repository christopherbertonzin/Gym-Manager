const menuItems = document.querySelectorAll('.header-content-text')
const pathName = location.pathname

for (item of menuItems) {
    const href = item.getAttribute('href')
    if (pathName.includes(href)) 
        item.classList.add('active')
}
