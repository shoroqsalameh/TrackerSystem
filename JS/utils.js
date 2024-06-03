
const ENV = {
    ADMIN_EMAIL: 'superAdmin@admin.com',
    ADMIN_PASSWORD: '123456'
};

export function getEnv(key) {
    return ENV[key];
}

export function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}
