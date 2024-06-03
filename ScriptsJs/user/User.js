class User {
    static lastId = 0;

    constructor(name, email, password, country, state, mainStreet, postalCode) {
        this.id = User.lastId++;
        this.name = name;
        this.email = email;
        this.password = password;
        this.country = country;
        this.state = state;
        this.mainStreet = mainStreet;
        this.postalCode = postalCode;
        this.favorites=[];
        this.cart = [];
        this.orders = [];
        this.otherAccounts =[];
    }
    
}
const user = new User(
    'John Doe',
    'john@example.com',
    'securePassword123',
    'Country Name',
    'State Name',
    '123 Main Street',
    '12345'
); 