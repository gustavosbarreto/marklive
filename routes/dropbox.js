module.exports = function(app) {
    app.get(/dropbox(\/.*)?/, function(req, res) {
        var path = !req.params[0] ? '/' : req.params[0];

	    var client = dropbox.client(req.cookies.access_token);
        client.metadata(path, function(status, reply) {
            var list = [];

            for (var i in reply.contents) {
                var file = reply.contents[i];
                if (!file.is_dir)
                    continue;
                list.push(file.path);
            }

            res.send(list);
        });
    });

    app.post(/dropbox(\/.*)?/, function(req, res) {
        var path = req.params[0];

	    var client = dropbox.client(req.cookies.access_token);
        client.put(path, req.body.content, function(status, reply) {
            res.send(200);
        });
    });
}
