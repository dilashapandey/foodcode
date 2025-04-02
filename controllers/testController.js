const testController = (req, res) => {
    // Simulate a test response
    res.json({ message: 'Test route is working!' });
}

module.exports = {
    testController
};