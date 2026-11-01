import type { LegalDocument, LegalDocumentKind } from "../types/legal.types";

/** isWindows: the Windows app (else, on the desktop, the Mac app). */
type Placeholders = { publisher: string; email: string; isDesktop: boolean; isWindows: boolean };

const en = ({
  publisher,
  email,
  isDesktop,
  isWindows,
}: Placeholders): Record<LegalDocumentKind, LegalDocument> => ({
  privacy: {
    title: "Privacy policy",
    intro: `Shiftify is a timesheet app published by ${publisher}, a personal, non-commercial project made for fun. It is built to keep your data on your ${isDesktop ? (isWindows ? "PC" : "Mac") : "phone"}: there is no account, no server of ours and no tracking.`,
    sections: [
      {
        heading: "What the app stores",
        body: [
          "Everything you enter stays on your device, in the app's own storage:",
          "• clients: name, dates, country, schedule, pay settings;",
          "• the days you log: hours, days off and their kind, notes;",
          "• your details, if you add them: business name, tax ID (CUI or VAT number), registration number, address, VAT status;",
          "• your preferences: theme, language, your currency, reminder time.",
          "We (the publisher) never receive this data. We cannot see, access or recover it.",
        ],
      },
      {
        heading: "Bank holidays",
        body: [
          "To mark bank holidays, the app downloads the public holiday list for your client's country from Nager.Date (date.nager.at), a free public service. The request contains only a country code and a year, nothing about you or your timesheets. As with any internet request, that service can see your device's IP address. Its own privacy terms apply to it. The list is saved on your device, so this happens about once a year per country.",
        ],
      },
      {
        heading: "Exchange rates",
        body: [
          "When a client's pay is in another currency than yours, the app downloads the day's official exchange rates: from the National Bank of Romania (curs.bnr.ro) when your currency is the leu, otherwise from the European Central Bank (ecb.europa.eu). The request contains nothing about you; as with any internet request, the service can see your device's IP address. The rates are saved on your device.",
        ],
      },
      {
        heading: "Looking up your details",
        body: [
          `Only when you ${isDesktop ? "click" : "tap"} Look up in Your details, the tax ID you typed is sent to ANAF (Romanian CUIs) or to the European Commission's VIES service (other EU VAT numbers), which return the business's registered name and address. Nothing else is sent. These are public registers, under their own terms.`,
        ],
      },
      {
        heading: "App lock",
        only: "phone",
        body: [
          "If you turn on the app lock, unlocking uses your phone's own Face ID, Touch ID, fingerprint or passcode check. The app only learns whether it succeeded; your face, fingerprint and passcode never reach the app or us.",
        ],
      },
      {
        heading: "Reminders",
        body: [
          `Each client's reminders (the daily check-in and the monthly one to send the timesheet) are scheduled locally ${isDesktop ? (isWindows ? "by the app on your PC, and shown as Windows notifications" : "by the app on your Mac, and shown as macOS notifications") : "by your device's operating system"}. No server is involved and no notification token is created or sent anywhere.`,
        ],
      },
      {
        heading: "Daily backups",
        only: "desktop",
        body: [
          `At the end of each day, the ${isWindows ? "Windows" : "Mac"} app saves a backup file of your data, keeping the last 14 days. By default it goes to iCloud Drive › Shiftify Backups (Documents if iCloud Drive is off); you can pick another folder or turn daily backups off in Settings › Data. When the folder is in iCloud Drive or another cloud service, that service stores it under its own terms; the files never reach us. Delete all data removes them.`,
        ],
      },
      {
        heading: "Exports and backups",
        body: [
          "Timesheets (Excel or PDF) and backup files are created only when you ask for them, and go only where you send or save them (for example email, Files, iCloud Drive or Google Drive). From then on, the service you chose handles them under its own terms.",
          "Backup files are not encrypted: anyone who has the file can read its contents. Keep them somewhere private.",
        ],
      },
      {
        heading: "What we don't do",
        body: [
          "The app has no analytics, no advertising, no tracking across apps or websites, no account and no sign-in. It does not sell or share any data, because it has none to share.",
        ],
      },
      {
        heading: "Your rights and deleting your data",
        body: [
          `Since your data is only on your device, you are fully in control of it. You can delete everything at any time from Settings → Data → Delete all data${isDesktop ? "" : ", or by uninstalling the app"}. Backup files you created stay where you saved them until you delete them.`,
          "Under the GDPR you have the right to information, access, rectification, erasure and to lodge a complaint with a supervisory authority (in Romania, ANSPDCP). For any privacy question, contact us at the address below.",
        ],
      },
      {
        heading: "Children",
        body: [
          "The app is meant for adults tracking their working time. It is not directed at children and collects no data from anyone.",
        ],
      },
      {
        heading: "Changes and contact",
        body: [
          "If this policy changes, the new version will be published in the app and on its web page, with a new date.",
          `Contact: ${email}`,
        ],
      },
    ],
  },
  terms: {
    title: "Terms of use",
    intro: `These terms apply to your use of Shiftify, published by ${publisher}. By using the app you agree to them. Where you downloaded the app from a store, they complement that store's standard licence terms.`,
    sections: [
      {
        heading: "What the app is",
        body: [
          "Shiftify helps you record the days and hours you work for your clients or employers, and produce timesheets. It is a tool for your own records.",
        ],
      },
      {
        heading: "A personal project",
        body: [
          "Shiftify is a personal project, made for fun by one person and shared free of charge. It is not a commercial product: there is no company behind it, nothing is sold, and support, fixes, updates and availability are not guaranteed. The app may change or stop being offered at any time.",
          "You download, install and use the app at your own risk.",
        ],
      },
      {
        heading: "Pay figures are estimates",
        body: [
          "Pay amounts, totals and statistics are calculated from what you enter and the settings you choose. They are estimates for your convenience, not accounting, tax, payroll or legal advice.",
          "You are responsible for checking every timesheet and amount before you send, invoice or rely on it. Rules for paid holidays, leave, overtime and taxes depend on your contract and the law that applies to you.",
        ],
      },
      {
        heading: "Bank holidays",
        body: [
          "Bank holidays come from a public third-party source and may be incomplete or change. Check them against your contract and official announcements.",
        ],
      },
      {
        heading: "Your data",
        body: [
          "Your data is stored only on your device and we cannot recover it. You are responsible for keeping backups. We are not liable for data lost because of a lost or reset device, an uninstall, or a deleted backup.",
        ],
      },
      {
        heading: "Licence",
        body: [
          "You may use the app, free of charge, to track your own working time. It is not for commercial use: you may not sell, rent, redistribute or offer it as part of a paid product or service, or copy, modify or reverse engineer it, except where the law allows.",
        ],
      },
      {
        heading: "No warranty and liability",
        body: [
          `You download, install and use the app at your own risk. ${isDesktop ? (isWindows ? "The Windows app is not signed with a code-signing certificate, so Windows may warn you before installing it. " : "The Mac app is distributed outside the App Store and is not notarized by Apple. ") : ""}You are responsible for your device and for keeping backups of your data.`,
          'The app is provided "as is", without warranties of any kind. To the extent permitted by law, the publisher is not liable for indirect or consequential damages, including lost income or data, arising from the use of the app or from figures it shows. Nothing in these terms limits liability that cannot be limited by law, or your rights as a consumer.',
        ],
      },
      {
        heading: "Changes, law and contact",
        body: [
          "We may update these terms; the new version will be published in the app with a new date. These terms are governed by Romanian law.",
          `Contact: ${email}`,
        ],
      },
    ],
  },
});

export { en };
