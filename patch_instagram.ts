import fs from 'fs';
let content = fs.readFileSync('server.ts', 'utf8');

// کدِ API n8n
const n8nEndpoint = `
app.post("/api/n8n-check-slots", async (req, res) => {
  try {
    const { startDate, endDate, durationMinutes } = req.body;
    const adapter = getCalendarAdapter(activeConfig);
    const result = await adapter.checkSlots(startDate, endDate, durationMinutes);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch slots" });
  }
});
`;

// پیدا کردن عبارت const app = express() و تزریق کد دقیقاً زیر آن
if (content.includes('const app = express();') && !content.includes('/api/n8n-check-slots')) {
    content = content.replace('const app = express();', 'const app = express();\n' + n8nEndpoint);
    fs.writeFileSync('server.ts', content);
}
