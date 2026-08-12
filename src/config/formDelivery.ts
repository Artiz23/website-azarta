/** Form delivery config. Telegram is primary — works without email activation. */
export const formDelivery = {
  /**
   * 1) Telegram → @BotFather → /newbot
   * 2) Copy token here
   * 3) Open your bot and press Start
   * 4) Open https://api.telegram.org/bot<TOKEN>/getUpdates
   * 5) Copy chat.id into chatId below
   */
  telegramBotToken: '',
  telegramChatId: '',
}
