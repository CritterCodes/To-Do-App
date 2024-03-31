const middleware = () => (req, res, next) => {
    console.log('middleware called');
    if (req.body && req.body.color) {
        const color = req.body.color.toLowerCase();
        switch (color) {
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
