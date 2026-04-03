const { z } = require('zod');
const schema = z.record(z.string(), z.string().url().or(z.literal('')));
const res = schema.safeParse({"github":"","linkedin":"","googleScholar":""});   
console.log(res.success);
