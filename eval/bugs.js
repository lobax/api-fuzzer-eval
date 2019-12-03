
module.exports = [
    {
        id: 0,
        name: 'Type Error',
        path: /exception\/.*[^\d\s]+.*$/,
        method: /get/i,
        body: /[\s\S]*/
    },
    {
        id: 1,
        name: 'Empty Payload',
        path: /other_methods$/,
        method: /post/i,
        body: /^[\S]*$/
    },
]

