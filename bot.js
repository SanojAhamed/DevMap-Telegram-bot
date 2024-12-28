require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');
const app = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

const roadmaps = {
  frontend: `*Frontend Developer Roadmap*\\:\n
1\\. Learn Basics: *HTML*, *CSS*, *JavaScript*\n
2\\. Version Control: *Git* and *GitHub*\n
3\\. Frameworks: React, Vue, Angular\n
4\\. Build Tools: Webpack, Vite\n
5\\. Testing: Jest, Cypress\n
[Learn More on Roadmap\\.sh](https://roadmap.sh/frontend)\n
[30 Days of JavaScript on GitHub](https://github.com/Asabeneh/30-Days-Of-JavaScript)`,

  backend: `*Backend Developer Roadmap*\\:\n
1\\. Server\\-Side Programming: PHP, Node\\.js, Python, Java, etc\\.\n
2\\. Databases: PostgreSQL, MongoDB, etc\\.\n
3\\. RESTful APIs: Design and Testing\n
4\\. Authentication: JWT, OAuth\n
5\\. DevOps Basics: Docker, CI/CD\n
[Learn More on Roadmap\\.sh](https://roadmap.sh/backend)`,

  fullstack: `*Fullstack Developer Roadmap*\\:\n
1\\. Combine Frontend and Backend Skills\n
2\\. Learn Deployment: Netlify, Vercel, AWS\n
3\\. Master APIs: GraphQL, REST\n
[Learn More on Roadmap\\.sh](https://roadmap.sh/fullstack)`,

  devops: `*DevOps Engineer Roadmap*\\:\n
1\\. Infrastructure Basics: Networking, Linux\n
2\\. Automation: CI/CD Pipelines\n
3\\. Cloud Platforms: AWS, Azure, Google Cloud\n
4\\. Monitoring: Grafana, Prometheus\n
[Learn More on Roadmap\\.sh](https://roadmap.sh/devops)`,

  mobile: `*Mobile Developer Roadmap*\\:\n
1\\. Learn Mobile Basics: Android \\(Java/Kotlin\\) or iOS \\(Swift\\)\n
2\\. Cross\\-Platform Frameworks: Flutter, React Native\n
3\\. Testing: Appium, Detox\n
[Learn More on Roadmap\\.sh](https://roadmap.sh/mobile)`,
};

const showMenu = (ctx) => {
  ctx.reply(
    "Choose a roadmap to explore\\:",
    {
      parse_mode: "MarkdownV2",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Frontend", callback_data: "frontend" }],
          [{ text: "Backend", callback_data: "backend" }],
          [{ text: "Fullstack", callback_data: "fullstack" }],
          [{ text: "DevOps", callback_data: "devops" }],
          [{ text: "Mobile Development", callback_data: "mobile" }],
        ],
      },
    }
  );
};

bot.start((ctx) => {
  const firstName = ctx.from.first_name ? ctx.from.first_name.replace(/_/g, "\\_") : "Developer";
  ctx.reply(
    `Welcome, *${firstName}*\\ 🎉\nI'm *DevMapBot*, your guide to developer roadmap\\. Select a roadmap to get started or type /menu to see options anytime\\.`,
    { parse_mode: "MarkdownV2" }
  );
  showMenu(ctx);
});

bot.command("menu", (ctx) => {
  showMenu(ctx);
});

bot.action("frontend", (ctx) => {
  ctx.replyWithMarkdownV2(roadmaps.frontend);
});
bot.action("backend", (ctx) => {
  ctx.replyWithMarkdownV2(roadmaps.backend);
});
bot.action("fullstack", (ctx) => {
  ctx.replyWithMarkdownV2(roadmaps.fullstack);
});
bot.action("devops", (ctx) => {
  ctx.replyWithMarkdownV2(roadmaps.devops);
});
bot.action("mobile", (ctx) => {
  ctx.replyWithMarkdownV2(roadmaps.mobile);
});

// bot.launch();

app.use(bot.webhookCallback('/webhook'));

app.get('/', (req, res) => {
  res.send('DevMapBot is running!');
});

bot.telegram.setWebhook(`${process.env.HOST_URL}/webhook`);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});