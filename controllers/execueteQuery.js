exports.executeQuery = (req, res) => {
    const connection = req.app.get('connection');
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'No query provided' });
    }

    connection.query(query, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.status(200).json({ result });
    });
};
