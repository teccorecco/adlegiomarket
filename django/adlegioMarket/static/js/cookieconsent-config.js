import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';

CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: "box",
            position: "bottom right",
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {
        necessary: {
            readOnly: true,
            enabled: true,
            title: "Streng notwendige Cookies",
            description: "Diese Cookies sind notwendig, damit die Website funktioniert und können in unseren Systemen nicht ausgeschaltet werden.<br><br><ul><li><strong>CookieConsent</strong>: Speichert den Zustimmungsstatus des Benutzers für Cookies auf der aktuellen Domäne.</li><li><strong>csrftoken</strong>: Wird verwendet, um Anfragen vor CSRF-Angriffen zu schützen.</li></ul>"
        },
        functionality: {
            title: "Funktionalitäts-Cookies",
            description: "Diese Cookies ermöglichen es der Website, verbesserte Funktionalität und Personalisierung zu bieten.<br><br><ul><li><strong>language_preference</strong>: Speichert die vom Benutzer ausgewählte Sprache auf der Website.</li></ul>"
        }
    },
    language: {
        default: "de",
        autoDetect: "browser",
        translations: {
            de: {
                consentModal: {
                    title: "Hallo Reisende, es ist Kekszeit!",
                    description: "Wir verwenden notwendige Cookies, um unsere Website zu betreiben. Weitere Cookies werden verwendet, um Inhalte zu personalisieren und Funktionen bereitzustellen.",
                    acceptAllBtn: "Alle akzeptieren",
                    acceptNecessaryBtn: "Nur notwendige akzeptieren",
                    showPreferencesBtn: "Einstellungen verwalten",
                    footer: "<a href='/agb_datenschutz/'>AGB & Datenschutz</a>"
                },
                preferencesModal: {
                    title: "Präferenzen für die Zustimmung",
                    acceptAllBtn: "Alle akzeptieren",
                    acceptNecessaryBtn: "Nur notwendige akzeptieren",
                    savePreferencesBtn: "Einstellungen speichern",
                    closeIconLabel: "Modal schließen",
                    sections: [
                        {
                            title: "Verwendung von Cookies",
                            description: "Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Sie können Ihre Cookie-Einstellungen jederzeit ändern."
                        },
                        {
                            title: "Streng notwendige Cookies <span class=\"cc__badge cc__badge--primary\">Immer aktiv</span>",
                            description: "Diese Cookies sind notwendig, damit die Website funktioniert und können in unseren Systemen nicht ausgeschaltet werden.<br><br><ul><li><strong>CookieConsent</strong>: Speichert den Zustimmungsstatus des Benutzers für Cookies auf der aktuellen Domäne.</li><li><strong>csrftoken</strong>: Wird verwendet, um Anfragen vor CSRF-Angriffen zu schützen.</li></ul>",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Funktionalitäts-Cookies",
                            description: "Diese Cookies ermöglichen es der Website, verbesserte Funktionalität und Personalisierung zu bieten.<br><br><ul><li><strong>language_preference</strong>: Speichert die vom Benutzer ausgewählte Sprache auf der Website.</li></ul>",
                            linkedCategory: "functionality"
                        },
                        {
                            title: "Weitere Informationen",
                            description: "Für Fragen zu unserer Cookie-Richtlinie und Ihren Wahlmöglichkeiten lesen Sie bitte unsere <a class=\"cc__link\" href='/agb_datenschutz/'>AGB & Datenschutz</a>."
                        }
                    ]
                }
            },
            en: {
                consentModal: {
                    title: "Hello traveler, it's cookie time!",
                    description: "We use necessary cookies to operate our website. Additional cookies are used to personalize content and provide features.",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Accept only necessary",
                    showPreferencesBtn: "Manage preferences",
                    footer: "<a href='/agb_datenschutz/'>Terms & Privacy</a>"
                },
                preferencesModal: {
                    title: "Consent Preferences",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Accept only necessary",
                    savePreferencesBtn: "Save preferences",
                    closeIconLabel: "Close modal",
                    sections: [
                        {
                            title: "Cookie Usage",
                            description: "We use cookies to enhance your experience on our website. You can change your cookie settings at any time."
                        },
                        {
                            title: "Strictly Necessary Cookies <span class=\"cc__badge cc__badge--primary\">Always active</span>",
                            description: "These cookies are necessary for the website to function and cannot be switched off in our systems.<br><br><ul><li><strong>CookieConsent</strong>: Stores the user's consent status for cookies on the current domain.</li><li><strong>csrftoken</strong>: Used to protect against Cross-Site Request Forgery attacks.</li></ul>",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Functionality Cookies",
                            description: "These cookies enable the website to provide enhanced functionality and personalization.<br><br><ul><li><strong>language_preference</strong>: Stores the user's selected language on the website.</li></ul>",
                            linkedCategory: "functionality"
                        },
                        {
                            title: "More information",
                            description: "For questions regarding our cookie policy and your choices, please read our <a class=\"cc__link\" href='/agb_datenschutz/'>Terms & Privacy</a>."
                        }
                    ]
                }
            }
        }
    }
});
