document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});

function checkCode() {
    const code = document.getElementById('access-code').value.trim();
    if (code === '1992') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-screen').style.display = 'block';
    } else {
        alert('Código incorrecto.');
    }
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        checkCode();
    }
}

let selectedApp = '';

function selectApp(appName) {
    selectedApp = appName;
    document.getElementById('selected-app-name').innerText = appName;
    closeMenu();
}

function openMenu() {
    document.getElementById('app-selection').style.display = 'block';
}

function closeMenu() {
    document.getElementById('app-selection').style.display = 'none';
}

function generateNotifications() {
    const title = document.getElementById('notification-title').value;
    const message = document.getElementById('notification-message').value.replace('[Mi Tienda]', `[${selectedApp}]`);
    const amount = document.getElementById('notification-amount').value;
    const count = document.getElementById('notification-count').value;
    const randomText = document.getElementById('random-text').value;

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    let iconPath = '';
    switch (selectedApp.toLowerCase()) {
        case 'shopify':
            iconPath = 'icons/shopify-icon.png';
            break;
        case 'woocommerce':
            iconPath = 'icons/woocommerce-icon.png';
            break;
        case 'ebay':
            iconPath = 'icons/ebay-icon.png';
            break;
        case 'amazon':
            iconPath = 'icons/amazon-icon.png';
            break;
        case 'vinted':
            iconPath = 'icons/vinted-icon.png';
            break;
        default:
            iconPath = 'icons/default-icon.png';
    }

    for (let i = 0; i < count; i++) {
        if (Notification.permission === "granted") {
            const notification = new Notification(title, {
                body: `${message} - Valor: ${amount} € - ${randomText}`,
                icon: iconPath // Usa el ícono de la tienda seleccionada
            });

            notification.onclick = function() {
                window.focus();
            };
        }
    }

    alert(`${count} notificaciones generadas para ${selectedApp}.`);
}

function openPreview() {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('preview-screen').style.display = 'block';

    // Mostrar texto de vista previa
    const title = document.getElementById('notification-title').value;
    const message = document.getElementById('notification-message').value.replace('[Mi Tienda]', `[${selectedApp}]`);
    const amount = document.getElementById('notification-amount').value;
    document.getElementById('preview-text').innerText = `${title} - ${message} - Valor: ${amount} €`;
}

function closePreview() {
    document.getElementById('preview-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
}

document.getElementById('open-menu-btn').addEventListener('click', openMenu);
