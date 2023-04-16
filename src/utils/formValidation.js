export const validateEmail = (email) => {
    if (email.trim() === '') {
        return 'Email is required.';
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email.toLowerCase())) {
        return 'Email is invalid.';
    }

    return '';
};

export const validatePassword = (password) => {
    if (password.trim() === '') {
        return 'Password is required.';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters long.';
    }

    return '';
};

export const validateNotEmpty = (value, fieldName) => {
    if (value.trim() === '') {
        return `${fieldName} is required.`;
    }

    return '';
};
