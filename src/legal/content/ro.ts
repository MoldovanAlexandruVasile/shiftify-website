import type { LegalDocument, LegalDocumentKind } from "../types/legal.types";

/** isWindows: the Windows app (else, on the desktop, the Mac app). */
type Placeholders = { publisher: string; email: string; isDesktop: boolean; isWindows: boolean };

const ro = ({
  publisher,
  email,
  isDesktop,
  isWindows,
}: Placeholders): Record<LegalDocumentKind, LegalDocument> => ({
  privacy: {
    title: "Politica de confidențialitate",
    intro: `Shiftify este o aplicație de pontaj publicată de ${publisher}, un proiect personal, necomercial, făcut din pasiune. Este construită ca datele tale să rămână pe ${isDesktop ? (isWindows ? "PC" : "Mac") : "telefon"}: nu există cont, niciun server al nostru și nicio urmărire.`,
    sections: [
      {
        heading: "Ce stochează aplicația",
        body: [
          "Tot ce introduci rămâne pe dispozitivul tău, în spațiul de stocare al aplicației:",
          "• clienții: nume, perioadă, țară, program, setări de plată;",
          "• zilele înregistrate: ore, zile libere și tipul lor, note;",
          "• datele tale, dacă le adaugi: denumire, cod fiscal (CUI sau cod de TVA), nr. de înregistrare, adresă, statut de TVA;",
          "• preferințele tale: temă, limbă, moneda ta, ora mementoului.",
          "Noi (editorul aplicației) nu primim niciodată aceste date. Nu le putem vedea, accesa sau recupera.",
        ],
      },
      {
        heading: "Sărbători legale",
        body: [
          "Pentru a marca sărbătorile legale, aplicația descarcă lista sărbătorilor publice pentru țara clientului de la Nager.Date (date.nager.at), un serviciu public gratuit. Cererea conține doar un cod de țară și un an, nimic despre tine sau pontajele tale. Ca la orice cerere pe internet, serviciul poate vedea adresa IP a dispozitivului. Pentru el se aplică propriile condiții de confidențialitate. Lista se salvează pe dispozitiv, așa că acest lucru se întâmplă cam o dată pe an pentru fiecare țară.",
        ],
      },
      {
        heading: "Cursuri de schimb",
        body: [
          "Când plata unui client e în altă monedă decât a ta, aplicația descarcă cursurile oficiale ale zilei: de la Banca Națională a României (curs.bnr.ro) când moneda ta e leul, altfel de la Banca Centrală Europeană (ecb.europa.eu). Cererea nu conține nimic despre tine; ca la orice cerere pe internet, serviciul poate vedea adresa IP a dispozitivului. Cursurile se salvează pe dispozitiv.",
        ],
      },
      {
        heading: "Căutarea datelor tale",
        body: [
          `Doar când ${isDesktop ? "dai clic pe" : "atingi"} Caută în Datele tale, codul fiscal introdus e trimis la ANAF (CUI-uri românești) sau la serviciul VIES al Comisiei Europene (alte coduri de TVA din UE), care returnează denumirea și adresa înregistrate. Nu se trimite nimic altceva. Sunt registre publice, cu propriile condiții.`,
        ],
      },
      {
        heading: "Blocarea aplicației",
        only: "phone",
        body: [
          "Dacă activezi blocarea aplicației, deblocarea folosește verificarea telefonului tău: Face ID, Touch ID, amprentă sau cod. Aplicația află doar dacă a reușit; fața, amprenta și codul tău nu ajung niciodată la aplicație sau la noi.",
        ],
      },
      {
        heading: "Mementouri",
        body: [
          `Mementourile fiecărui client (pontajul zilnic și cel lunar pentru trimiterea pontajului) sunt programate local ${isDesktop ? (isWindows ? "de aplicație pe PC-ul tău și afișate ca notificări Windows" : "de aplicație pe Mac-ul tău și afișate ca notificări macOS") : "de sistemul de operare al dispozitivului"}. Niciun server nu este implicat și niciun token de notificare nu este creat sau trimis nicăieri.`,
        ],
      },
      {
        heading: "Copii zilnice",
        only: "desktop",
        body: [
          `La finalul fiecărei zile, aplicația pentru ${isWindows ? "Windows" : "Mac"} salvează un fișier de rezervă cu datele tale, păstrând ultimele 14 zile. Implicit ajunge în iCloud Drive › Shiftify Backups (în Documente dacă iCloud Drive e oprit); poți alege alt dosar sau poți opri copiile zilnice din Setări › Date. Când dosarul e în iCloud Drive sau în alt serviciu cloud, acel serviciu îl stochează conform propriilor condiții; fișierele nu ajung niciodată la noi. „Șterge toate datele” le elimină.`,
        ],
      },
      {
        heading: "Exporturi și copii de siguranță",
        body: [
          "Pontajele (Excel sau PDF) și copiile de siguranță se creează doar când le ceri și ajung doar unde le trimiți sau le salvezi (de exemplu email, Fișiere, iCloud Drive sau Google Drive). De acolo, serviciul ales le gestionează conform propriilor condiții.",
          "Copiile de siguranță nu sunt criptate: oricine are fișierul îi poate citi conținutul. Păstrează-le într-un loc privat.",
        ],
      },
      {
        heading: "Ce nu facem",
        body: [
          "Aplicația nu are analiză de utilizare, reclame, urmărire în alte aplicații sau site-uri, cont sau autentificare. Nu vinde și nu partajează date, pentru că nu are niciunele.",
        ],
      },
      {
        heading: "Drepturile tale și ștergerea datelor",
        body: [
          `Datele fiind doar pe dispozitivul tău, ai control deplin asupra lor. Le poți șterge oricând din Setări → Date → Șterge toate datele${isDesktop ? "" : " sau dezinstalând aplicația"}. Copiile de siguranță create rămân unde le-ai salvat până le ștergi.`,
          "Conform GDPR ai dreptul la informare, acces, rectificare, ștergere și dreptul de a depune o plângere la autoritatea de supraveghere (în România, ANSPDCP). Pentru orice întrebare despre confidențialitate, scrie-ne la adresa de mai jos.",
        ],
      },
      {
        heading: "Copii",
        body: [
          "Aplicația este destinată adulților care își țin evidența timpului de lucru. Nu se adresează copiilor și nu colectează date de la nimeni.",
        ],
      },
      {
        heading: "Modificări și contact",
        body: [
          "Dacă politica se schimbă, noua versiune va fi publicată în aplicație și pe pagina ei web, cu o dată nouă.",
          `Contact: ${email}`,
        ],
      },
    ],
  },
  terms: {
    title: "Termeni de utilizare",
    intro: `Acești termeni se aplică utilizării Shiftify, publicată de ${publisher}. Folosind aplicația ești de acord cu ei. Dacă ai descărcat aplicația dintr-un magazin, ei completează termenii standard de licență ai acestuia.`,
    sections: [
      {
        heading: "Ce este aplicația",
        body: [
          "Shiftify te ajută să înregistrezi zilele și orele lucrate pentru clienții sau angajatorii tăi și să generezi pontaje. Este un instrument pentru propria evidență.",
        ],
      },
      {
        heading: "Un proiect personal",
        body: [
          "Shiftify este un proiect personal, făcut din pasiune de o singură persoană și oferit gratuit. Nu este un produs comercial: nu există o companie în spate, nu se vinde nimic, iar asistența, remedierile, actualizările și disponibilitatea nu sunt garantate. Aplicația se poate schimba sau poate înceta să fie oferită oricând.",
          "Descarci, instalezi și folosești aplicația pe propriul risc.",
        ],
      },
      {
        heading: "Sumele de plată sunt estimări",
        body: [
          "Sumele, totalurile și statisticile sunt calculate din ce introduci și din setările alese. Sunt estimări pentru confortul tău, nu consultanță contabilă, fiscală, de salarizare sau juridică.",
          "Ești responsabil să verifici fiecare pontaj și sumă înainte să le trimiți, să facturezi sau să te bazezi pe ele. Regulile pentru sărbători plătite, concedii, ore suplimentare și taxe depind de contractul tău și de legea care ți se aplică.",
        ],
      },
      {
        heading: "Sărbători legale",
        body: [
          "Sărbătorile legale provin dintr-o sursă publică terță și pot fi incomplete sau se pot schimba. Verifică-le cu contractul tău și cu anunțurile oficiale.",
        ],
      },
      {
        heading: "Datele tale",
        body: [
          "Datele tale sunt stocate doar pe dispozitiv și nu le putem recupera. Ești responsabil să faci copii de siguranță. Nu răspundem pentru date pierdute din cauza unui dispozitiv pierdut sau resetat, a dezinstalării sau a unei copii de siguranță șterse.",
        ],
      },
      {
        heading: "Licență",
        body: [
          "Poți folosi aplicația gratuit, pentru evidența propriului timp de lucru. Nu este destinată uzului comercial: nu ai voie să o vinzi, închiriezi, redistribui sau oferi ca parte a unui produs sau serviciu plătit, nici să o copiezi, modifici sau să faci inginerie inversă, cu excepția situațiilor permise de lege.",
        ],
      },
      {
        heading: "Fără garanții și răspundere",
        body: [
          `Descarci, instalezi și folosești aplicația pe propriul risc. ${isDesktop ? (isWindows ? "Aplicația pentru Windows nu este semnată cu un certificat de semnare a codului, așa că Windows te poate avertiza înainte de instalare. " : "Aplicația pentru Mac este distribuită în afara App Store și nu este notarizată de Apple. ") : ""}Ești responsabil pentru dispozitivul tău și pentru copiile de siguranță ale datelor.`,
          "Aplicația este oferită „ca atare”, fără garanții de niciun fel. În limita permisă de lege, editorul nu răspunde pentru daune indirecte sau consecutive, inclusiv venituri sau date pierdute, rezultate din folosirea aplicației sau din sumele afișate. Nimic din acești termeni nu limitează răspunderea care nu poate fi limitată prin lege și nici drepturile tale de consumator.",
        ],
      },
      {
        heading: "Modificări, lege aplicabilă și contact",
        body: [
          "Putem actualiza acești termeni; noua versiune va fi publicată în aplicație cu o dată nouă. Termenii sunt guvernați de legea română.",
          `Contact: ${email}`,
        ],
      },
    ],
  },
});

export { ro };
