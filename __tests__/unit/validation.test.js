const { validateUser } = require('../../src/utils/validator');

describe('User Object Validation',() => {

    test('validateUser accepts valid login and password',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?andREfigu31roaGG' 
        }
        const { error } = validateUser(testUser);
        expect(error).toBeNull();
    });

    test('validateUser refuses login with less than 3 characters',() => {
        const testUser = {
            login: 'an',
            password: '?andREfigu31roaGG' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe('"login" length must be at least 3 characters long');
    });

    test('validateUser accepts login with exact 3 characters',() => {
        const testUser = {
            login: 'and',
            password: '?andREfigu31roaGG' 
        }
        const { error } = validateUser(testUser);
        expect(error).toBeNull();
    });

    test('validateUser refuses login with more than 30 characters',() => {
        const testUser = {
            login: 'andrefigueiroafigueiroaandrealfbblfa',
            password: '?andREfigu31roaGG' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe('"login" length must be less than or equal to 30 characters long');
    });

    test('validateUser accepts login with exact 30 characters',() => {
        const testUser = {
            login: 'andrefigueiroafigueiroaandreax',
            password: '?andREfigu31roaGG' 
        }
        const { error } = validateUser(testUser);
        expect(error).toBeNull();
    });

    test('validateUser refuses login with non aplhanumeric digit',() => {
        const testUser = {
            login: 'Andre_figueiroa123',
            password: '?andREfigu31roaGG' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe('"login" must only contain alpha-numeric characters');
    });

    test('validateUser refuses without login',() => {
        const testUser = {
            password: '?andREfigu31roaGG' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe('"login" is required');
    });

    test('validateUser refuses without password',() => {
        const testUser = {
            login: 'Andrefigueiroa123' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe('"password" is required');
    });

    test('validateUser accepts user with valid "about" field',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?andREfigu31roaGG',
            about: 'I am a web developer from Recize, Pernambuco, Brazil. I am programming cool websites with ReactJS and NodeJS!'
        }
        const { error } = validateUser(testUser);
        expect(error).toBeNull();
    });

    test('validateUser accepts user with 300 lenght "about" field',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?andREfigu31roaGG',
            about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec molestie lectus. Donec elit diam, cursus ac dui vitae, tincidunt convallis nisl. Pellentesque ullamcorper tincidunt felis at placerat. Vivamus vestibulum id diam non ultricies. Nulla ultrices pellentesque diam, dapibus interdum nullam.'
        }
        const { error } = validateUser(testUser);
        expect(error).toBeNull();
    });

    test('validateUser refuses user with more than 300 lenght "about" field',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?andREfigu31roaGG',
            about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec molestie lectus. Donec elit diam, cursus ac dui vitae, tincidunt convallis nisl. Pellentesque ullamcorper tincidunt felis at placerat. Vivamus vestibulum id diam non ultricies. Nulla ultrices pellentesque diam, dapibus interdum nullam. Pellentesque ullamcorper tincidunt felis at placerat. Vivamus vestibulum id diam non ultricies. Nulla ultrices pellentesque diam, dapibus interdum nullam.'
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe('"about" length must be less than or equal to 300 characters long');
    });

    test('validateUser refuses password with less than 16 characters',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?Aa1z' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe('"password" length must be at least 16 characters long');
    });

    test('validateUser accepts password with exact 16 characters',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?Aa1zxxxxxxxxxxx' 
        }
        const { error } = validateUser(testUser);
        expect(error).toBeNull();
    });

    test('validateUser accepts password with exact 32 characters',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?Aa1zxxxxxxxxxxx?Aa1zxxxxxxxxxxx' 
        }
        const { error } = validateUser(testUser);
        expect(error).toBeNull();
    });

    test('validateUser accepts password with more than 32 characters',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?Aa1zxxxxxxxxxxx?Aa1zxxxxxxxxxxx?Aa1zxxxxxxxxxxx' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe('"password" length must be less than or equal to 32 characters long');
    });

    test('validateUser refuses password without lowercase characters',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?AA1ZXXXXXXXXXXXX' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe(`"password" with value "${testUser.password}" fails to match the required pattern: /[a-z]+/`);
    });

    test('validateUser refuses password without uppercase characters',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?aa1zxxxxxxxxxxxx' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe(`"password" with value "${testUser.password}" fails to match the required pattern: /[A-Z]+/`);
    });

    test('validateUser refuses password without digits',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?AAIzxxxxxxxxxxxx' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe(`"password" with value "${testUser.password}" fails to match the required pattern: /[0-9]+/`);
    });

    test('validateUser refuses password without any special character',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: 'AAA1zxxxxxxxxxxxx' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe(`"password" with value "${testUser.password}" fails to match the required pattern: /\\W+/`);
    });

    test('validateUser refuses password with any blank space',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?AA1zxxxxx xxxxxxx' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe(`"password" with value "${testUser.password}" fails to match the required pattern: /^\\S*$/`);
    });

    test('validateUser refuses password with any Key Tab (\\t)',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?AA1zxxxxx\txxxxxxx' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe(`"password" with value "${testUser.password}" fails to match the required pattern: /^\\S*$/`);
    });

    test('validateUser refuses password with any New Line (\\n)',() => {
        const testUser = {
            login: 'Andrefigueiroa123',
            password: '?AA1zxxxxx\nxxxxxxx' 
        }
        const { error: {
            name,
            details
        } } = validateUser(testUser);
        expect(name).toBe('ValidationError');
        expect(details[0].message).toBe(`"password" with value "${testUser.password}" fails to match the required pattern: /^\\S*$/`);
    });
});
