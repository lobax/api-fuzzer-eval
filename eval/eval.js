
module.exports = function eval(results, dict) {
    for (const error of results) {
        for (const bug of dict) {
            const url = error.request_url;
            const method = error.request_method;
            const body = error.request_body;

            const urlMatch = url.match(bug.path);
            const methodMatch = method.match(bug.method);
            const bodyMatch = method.match(bug.body);

            if (urlMatch && methodMatch && bodyMatch) {
                bug.match = true;
                console.log(`Test no ${error.test_number} matches bug no ${bug.id}`);
            }
        }
    }

    for (bug of dict) {
        if (bug.match) {
            console.log(`Bug no ${bug.id} found: ${bug.name}`)
        }
    }
}
