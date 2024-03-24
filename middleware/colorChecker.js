//  Support a "color" property for your todo items. The rest of the properties are unimportant but you can use the same structure as our previous "TODO" lab.
//  Add a middleware that will inspect the "color" property and automatically add a "hexColor" property to a todo item when it is being created. Since there are many hex color values, just support the following to keep things simple (you can hardcode this translation in the middleware) :
//      - red - #ff0000
//      - green - #00ff00
//      - blue - #0000ff

const middleware = () => (req, res, next) => {
    console.log('middleware called');
    if (req.body && req.body.color) {
        const color = req.body.color.toLowerCase();
        switch(color) {
            case 'red':
                req.body.hexColor = '#ff0000';
                break;
            case 'green':
                req.body.hexColor = '#00ff00';
                break;
            case 'blue':
                req.body.hexColor = '#0000ff';
                break;
            default:
                break;
        }
        console.log(`Color: ${color}, Hex: ${req.body.hexColor}`);
    }
    next();
};

  
  export default middleware;
  