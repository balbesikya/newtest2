// Конфигурация ссылок - легко изменить
const CONFIG = {
    // Ссылка для пользователей из США и определенных систем
    whiteSite: 'https://youtube.com',
    
    // Ссылки для кнопок (для остальных пользователей)
    primaryButtonLink: 'https://goo.su/LvC8zE',
    secondaryButtonLink: 'https://goo.su/pMuqVjI'
};

// Функция для определения систем, которые нужно перенаправлять на белый сайт
function shouldRedirectToWhiteSite() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Системы, которые нужно перенаправлять на белый сайт
    const redirectSystems = [
        'googlebot',
        'bingbot',
        'yandexbot',
        'baiduspider',
        'facebookexternalhit',
        'twitterbot',
        'linkedinbot',
        'whatsapp',
        'telegrambot',
        'discordbot',
        'slackbot',
        'crawler',
        'spider',
        'bot',
        'scraper',
        'chrome-lighthouse',
        'pagespeed',
        'gtmetrix',
        'webpagetest'
    ];
    
    // Проверяем User-Agent на наличие систем для редиректа
    const isRedirectSystem = redirectSystems.some(pattern => userAgent.includes(pattern));
    
    return isRedirectSystem;
}

// Функция для определения страны пользователя
async function getUserCountry() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data.country_code;
    } catch (error) {
        console.log('Ошибка определения страны:', error);
        return null;
    }
}

// Функция для редиректа на белый сайт
function redirectToWhiteSite() {
    window.location.href = CONFIG.whiteSite;
}

// Функция для настройки кнопок
function setupButtons() {
    const primaryButton = document.getElementById('primaryButton');
    const secondaryButton = document.getElementById('secondaryButton');
    
    // Добавляем обработчики кликов
    primaryButton.addEventListener('click', () => {
        window.open(CONFIG.primaryButtonLink, '_blank');
    });
    
    secondaryButton.addEventListener('click', () => {
        window.open(CONFIG.secondaryButtonLink, '_blank');
    });
}

// Основная функция инициализации
async function init() {
    // Проверяем, использует ли пользователь систему, которую нужно перенаправлять
    if (shouldRedirectToWhiteSite()) {
        console.log('Обнаружена система для редиректа, перенаправляем на белый сайт');
        redirectToWhiteSite();
        return;
    }
    
    // Определяем страну пользователя
    const country = await getUserCountry();
    
    // Если пользователь из США, редиректим на белый сайт
    if (country === 'US') {
        console.log('Пользователь из США, редирект на белый сайт');
        redirectToWhiteSite();
        return;
    }
    
    // Для остальных пользователей настраиваем кнопки с вашими ссылками
    console.log('Пользователь не из США и не использует систему для редиректа, показываем кнопки');
    setupButtons();
}

// Запускаем инициализацию при загрузке страницы
document.addEventListener('DOMContentLoaded', init);

// Функция для обновления ссылок (можно вызывать из консоли)
function updateLinks(newConfig) {
    Object.assign(CONFIG, newConfig);
    console.log('Ссылки обновлены:', CONFIG);
}

// Пример использования:
// updateLinks({
//     whiteSite: 'https://youtube.com',
//     primaryButtonLink: 'https://goo.su/LvC8zE',
//     secondaryButtonLink: 'https://goo.su/pMuqVjI'
// });
