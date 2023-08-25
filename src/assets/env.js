(function (window) {
  window.env = window.env || {};
  //Enviroment variables

  // Keep the apiUrl and apiKey in chat.component.spec.ts in sync with one of the bots listed here.
  // Check when changing the bot list.
  window['env']['BOT_CONFIG'] =
    [
      {
        id: 'financeBot',
        name: 'Geld und Finanzen',
        imageUrl: 'https://www.alfa-bot.de/wp-content/uploads/2023/07/logo_finanzen_kl.png',
        apiUrl: 'https://alfabot.se-labor.de/alfabotapi',
        apiKey: '92d13306-b96e-11eb-b8e0-0242ac120002'
      },
      {
        id: 'fussballWm2022',
        name: 'Fußball-WM 2022',
        imageUrl: 'https://www.alfa-bot.de/wp-content/uploads/2023/01/logo_fussball.png',
        apiUrl: 'https://alfabot.se-labor.de/api-football-world-cup-2022',
        apiKey: '92d13306-b96e-11eb-b8e0-0242ac120002'
      },
      {
        id: 'learningNuggets',
        name: 'Lern-Häppchen',
        imageUrl: 'https://www.alfa-bot.de/wp-content/uploads/2023/01/logo_lernhappchen.png',
        apiUrl: 'https://alfabot.se-labor.de/api-learning-nuggets',
        apiKey: '92d13306-b96e-11eb-b8e0-0242ac120002'
      }
    ];
})(this);
