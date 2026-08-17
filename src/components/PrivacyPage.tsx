import { Link } from 'react-router-dom'
import { contacts } from '../data/content'
import { useLang } from '../i18n/LangContext'

export function PrivacyPage() {
  const { lang, t } = useLang()
  const operatorName = lang === 'en' ? 'Azarta' : 'Azarta'
  const personName = lang === 'en' ? contacts.nameEn : contacts.name

  return (
    <main className="legal-page">
      <div className="container legal-page__inner">
        <Link to="/" className="legal-page__back">
          ← {t.privacyBack}
        </Link>

        <p className="section-label">{t.privacyLabel}</p>
        <h1 className="legal-page__title">{t.privacyTitle}</h1>

        <div className="legal-page__content">
          {lang === 'ru' ? (
            <>
              <p>
                Я, субъект персональных данных, даю свое согласие {operatorName} (контактное лицо:{' '}
                {personName}, email: {contacts.email}, телефон: {contacts.phone}) (далее —
                Оператор) на обработку моих персональных данных, как без использования средств
                автоматизации, так и с их использованием, на следующих условиях:
              </p>

              <ol>
                <li>
                  <p>Согласие дается на обработку следующих персональных данных:</p>
                  <ul>
                    <li>Фамилия, Имя;</li>
                    <li>номера телефонов;</li>
                    <li>адреса электронной почты (email);</li>
                    <li>
                      пользовательские данные (сведения о местоположении; тип и версия ОС; тип и
                      версия Браузера; тип устройства и разрешение его экрана; источник, откуда
                      пришел на сайт пользователь; с какого сайта или по какой рекламе; язык ОС и
                      Браузера; какие страницы открывает и на какие кнопки нажимает пользователь;
                      IP-адрес).
                    </li>
                  </ul>
                </li>
                <li>
                  Согласие на обработку персональных данных дается с целью предоставления
                  консультаций в ответ на заявки, поступающие через формы обратной связи на сайте,
                  информирования пользователя посредством отправки электронных писем и сообщений,
                  обработки запросов о разработке сайтов, Telegram-ботов и связанных услуг.
                </li>
                <li>
                  Мне известно, что при обработке персональных данных с ними будут совершены
                  действия, такие как: сбор, изменение, систематизация, использование, запись,
                  удаление, накопление, хранение, обновление, блокирование, уничтожение, извлечение,
                  передача, предоставление доступа.
                </li>
                <li>
                  Персональные данные обрабатываются до окончания взаимодействия между Сторонами
                  или до момента отзыва данного согласия (в зависимости от того, что наступит
                  раньше) и после уничтожаются в течение 30 дней согласно п. 4, 5 ст. 21
                  Федерального закона № 152-ФЗ «О персональных данных».
                </li>
                <li>
                  Я признаю и подтверждаю, что в случае необходимости Оператор вправе предоставлять
                  мои персональные данные третьим лицам исключительно в целях оказания услуг
                  технической поддержки, доставки сообщений и аналитики сайта, а также (в
                  обезличенном виде) в статистических и маркетинговых целях. Такие третьи лица
                  имеют право на обработку персональных данных на основании настоящего Согласия.
                </li>
                <li>
                  <p>Третьи лица, которые могут обрабатывать предоставленные персональные данные по поручению:</p>
                  <ul>
                    <li>
                      сервисы доставки форм и email-уведомлений (в том числе FormSubmit /
                      аналогичные сервисы обработки заявок);
                    </li>
                    <li>
                      ООО «Яндекс» (Россия), ИНН 7736207543, 119021, г. Москва, ул. Льва Толстого,
                      д. 16 — при использовании сервисов аналитики и рекламы;
                    </li>
                    <li>
                      хостинг-провайдеры и инфраструктура размещения сайта (включая GitHub Pages /
                      аналогичные платформы).
                    </li>
                  </ul>
                </li>
                <li>
                  <p>
                    Мне известно, что согласие может быть отозвано путем направления письменного
                    заявления по следующим адресам:
                  </p>
                  <ul>
                    <li>
                      Для электронного обращения:{' '}
                      <a href={contacts.emailHref}>{contacts.email}</a>;
                    </li>
                    <li>
                      Для связи по телефону:{' '}
                      <a href={contacts.phoneHref}>{contacts.phone}</a> ({personName}).
                    </li>
                  </ul>
                </li>
              </ol>

              <p>
                Настоящее согласие действует до момента прекращения обработки персональных данных,
                указанных в настоящем Согласии.
              </p>

              <p className="legal-page__meta">
                Оператор: {operatorName}
                <br />
                Контакт: {personName}, {contacts.phone}, {contacts.email}
              </p>
            </>
          ) : (
            <>
              <p>
                I, the personal data subject, give my consent to {operatorName} (contact person:{' '}
                {personName}, email: {contacts.email}, phone: {contacts.phone}) (hereinafter — the
                Operator) to process my personal data, both with and without automation, on the
                following terms:
              </p>

              <ol>
                <li>
                  <p>Consent is given to process the following personal data:</p>
                  <ul>
                    <li>First and last name;</li>
                    <li>phone numbers;</li>
                    <li>email addresses;</li>
                    <li>
                      user data (location information; OS type and version; browser type and
                      version; device type and screen resolution; traffic source; referring site or
                      ad; OS and browser language; pages opened and buttons clicked; IP address).
                    </li>
                  </ul>
                </li>
                <li>
                  Consent is given to provide consultations in response to requests submitted via
                  website forms, to inform the user by email/messages, and to process inquiries
                  about websites, Telegram bots, and related services.
                </li>
                <li>
                  I understand that personal data may be collected, changed, systematized, used,
                  recorded, deleted, accumulated, stored, updated, blocked, destroyed, extracted,
                  transferred, and shared as needed for the purposes above.
                </li>
                <li>
                  Personal data is processed until the parties finish their interaction or until
                  this consent is withdrawn (whichever comes first), and is destroyed within 30 days
                  thereafter in line with applicable personal data laws.
                </li>
                <li>
                  I acknowledge that the Operator may share my personal data with third parties
                  solely for technical support, message delivery, and site analytics, and (in
                  anonymized form) for statistical and marketing purposes.
                </li>
                <li>
                  <p>Third parties that may process personal data on the Operator’s behalf:</p>
                  <ul>
                    <li>form delivery and email notification services (including FormSubmit / similar);</li>
                    <li>analytics and advertising providers when used on the site;</li>
                    <li>hosting providers used to publish the website (including GitHub Pages / similar).</li>
                  </ul>
                </li>
                <li>
                  <p>This consent may be withdrawn by sending a written request to:</p>
                  <ul>
                    <li>
                      Email: <a href={contacts.emailHref}>{contacts.email}</a>;
                    </li>
                    <li>
                      Phone: <a href={contacts.phoneHref}>{contacts.phone}</a> ({personName}).
                    </li>
                  </ul>
                </li>
              </ol>

              <p>This consent remains valid until personal data processing ends as described above.</p>

              <p className="legal-page__meta">
                Operator: {operatorName}
                <br />
                Contact: {personName}, {contacts.phone}, {contacts.email}
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
