import { createI18n } from 'vue-i18n';

/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/unplugin-vue-i18n/messages';

function checkDefaultLanguage(): string | undefined {
  const supportedLanguages = Object.getOwnPropertyNames(messages);
  const matched = (languages: string[]): string | undefined => {
    const locale = navigator.language;
    return languages.find((lang) => lang === locale)
      || languages.find((lang) => lang === locale?.split('-')[0])
      || languages.find((lang) => lang.split('-')[0] === locale?.split('-')[0]);
  };

  return matched(supportedLanguages);
}

const i18n = createI18n({
  locale: checkDefaultLanguage() || 'en-US',
  fallbackLocale: 'en-US',
  messages,
});

export default i18n;
