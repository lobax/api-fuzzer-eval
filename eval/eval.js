
module.exports = function eval(results, dict) {
    let matches = 0;
    let bugs_found = 0;
    for (const error of results) {
        for (const bug of dict) {
            const url = error.request_url;
            const method = error.request_method;
            const body = error.request_body ? error.request_body : "";

            const urlMatch = url.match(bug.path);
            const methodMatch = method.match(bug.method);
            const bodyMatch = body.match(bug.body);

            if (urlMatch && methodMatch && bodyMatch) {
                bug.match = true;
                matches += 1;
            }
        }
    }

    for (bug of dict) {
        if (bug.match) {
            console.log(`Bug no ${bug.id} found: ${bug.name}`)
            bugs_found += 1;
        }
    }
    console.log("\nRESULTS:");
    console.log(`Bugs found: ${bugs_found}`);
    console.log(`Total reports matched with bugs: ${matches}`);
    console.log(`Uncataloged reports: ${results.length - matches}`);
}
