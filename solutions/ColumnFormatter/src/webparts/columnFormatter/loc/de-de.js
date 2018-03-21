define([], function() {
  return {
    //Property Pane
    Property_BasicGroupName: "Eigenschaften",
    Property_HeightLabel: "Höhe",
    Property_EditorGroupName: "Editor",
    Property_EditorThemeLabel: "Thema",
    Property_LineNumbersLabel: "Linien Nummern",
    Property_VisibleOn: "Auf",
    Property_VisibleOff: "Aus",
    Property_MiniMapLabel: "Mini Karte",
    Property_IndentGuidesLabel: 'Indent-Hilfslinien',

    //General
    FeatureUnavailableFromLocalWorkbench: 'Dieses Feature ist in der lokalen Workbench nicht verfügbar',
    TechnicalDetailsErrorHeader: 'Technische Details',
    WizardDefaultField: 'MyField',

    //Welcome
    Welcome_Title: 'Column Formatter',
    Welcome_SubTitle: 'Editor zur einfachen Konfiguration von Spaltenformatierungen in modernen Listen',
    Welcome_NewHeader: 'Neu',
    Welcome_NewDescription: 'Neue Formatierung erstellen.',
    Welcome_OpenHeader: 'Öffnen',
    Welcome_OpenDescription: 'Vorhande Formatierung aus einer Liste laden.',
    Welcome_ColumnType: 'Spaltentyp',
    Welcome_NewWizardOption: 'Vorlage verwenden',
    Welcome_NewBlankOption: 'Neu von leerer Vorlage',
    Welcome_NewNoTemplates: 'Keine Vorlage für gewählten Spaltentyp vorhanden',
    Welcome_BackButton: 'Zurück',
    Welcome_OKButton: 'OK',
    Welcome_NextButton: 'Weiter',
    Welcome_OpenLoadList: 'Von lokaler liste laden',
    Welcome_OpenLoadSiteColumn: 'Von einer Site-Spalte laden',
    Welcome_OpenLoadFile: 'Von Datei laden:',
    Welcome_OpenLoadFileLibrary: 'Datei aus lokaler Bibliothek öffnen',
    Welcome_OpenLoadFileUpload: 'Datei hochladen',
    Welcome_UploadHeader: 'Hochladen der Datei',
    Welcome_UploadInstructions1: 'Drop your json file here, or click to select the file to upload.',
    Welcome_UploadInstructions2: 'Nur Datein mit der Endung .json werden unterstützt.',
    Welcome_UploadUploadButton: 'Datei auswählen',
    Welcome_UploadRejectError: 'Datei kann nicht hochgeladen werden.',
    Welcome_UploadEmptyFileError: 'Datei ist leer!',
    Welcome_LoadingError: 'Fehler beim Laden!',

    //List Field (Load/Apply)
    ListField_LoadingLists: 'Lade Listen...',
    ListField_List: 'Lokale Liste',
    ListField_Field: 'Field',
    ListField_LoadingFromList: 'Lade von Liste...',
    ListField_ListLoadError: 'Fehler beim Laden der Listen!',
    ListField_SaveDialogTitle: 'Auf lokales Listefeld anwenden',
    ListField_Saving: 'Formatierung wird gesetzt...',
    ListField_SaveError: 'Fehler beim Setzen der Formatierung. Überprüfen Sie Ihre Berechtigungen auf der Liste.',

    //Site Column (Load/Apply)
    SiteColumn_LoadingSiteColumns: 'Laden von Site-Spalten...',
    SiteColumn_Group: 'Gruppe',
    SiteColumn_Field: 'Spalte',
    SiteColumn_LoadingFromSiteColumn: 'Laden aus der Site-Spalte...',
    SiteColumn_SiteColumnsLoadError: 'Fehler beim Laden der Site-Spalten!',
    SiteColumn_SaveDialogTitle: 'Auf die Sitespalte anwenden',
    SiteColumn_PushToListsOn: 'Änderungen an Listen übernehmen',
    SiteColumn_PushToListsOff: 'Nur Site-Spalte',
    SiteColumn_Saving: 'Anwenden auf die Site-Spalte...',
    SiteColumn_SaveError: 'Fehler bei der Bewerbung! Stellen Sie sicher, dass Sie berechtigt sind, Site-Spalten zu aktualisieren.',

    //Library (Load/Save)
    Library_LoadingLibraries: 'Lade Bibliotheken...',
    Library_Library: 'Lokale Bibiliothek',
    Library_FolderPath: 'Ordner Pfad',
    Library_Filename: 'Dateiname',
    Library_LoadingFromLibrary: 'Lade aus Bibiliothek...',
    Library_LibrariesLoadError: 'Fehler beim Laden der Bibliotheken!',
    Library_LoadFromLibraryError: 'Fehler beim Laden! Überprüfen Sie die benötigten Berechtigungen und den Ordner Pfad, fals in Verwendung.',
    Library_SaveDialogTitle: 'In lokale Bibliothek speichern',
    Library_Saving: 'Speichere in Bibliothek...',
    Library_SaveError: 'Fehler beim Speichern! Überprüfen Sie die Berechtgiungen der Bibliothek und falls verwendent den Ordner Pfad.',

    //Tab Names
    Tab_Wizard: "Assisten",
    Tab_Tree: "Hierarchie",
    Tab_Data: "Daten",
    Tab_Preview: "Vorschau",
    Tab_Code: "Code",
    Tab_Split: "Nebeneinander",

    //Panel Headers
    PanelHeader_Data: "Test Werte",
    PanelHeader_Preview: "Vorschau",
    PanelHeader_Code: "Code Editor",

    //Editor CommandBar
    Command_New: 'Neu',
    Command_Customize: 'Customize',
    Command_Editor: 'Editor Design',
    Command_SaveAs: 'Speichern unter',
    Command_Download: 'Download',
    Command_Copy: 'In Zwischenablage kopieren',
    Command_SaveToLibrary: 'In lokale Liste speichern',
    Command_ApplyToSiteColumn: 'Auf die Sitespalte anwenden',
    Command_ApplyToList: 'Auf lokales Feld anwenden',
    Command_Save: 'Speichern',

    //Dialogs Shared
    Dialog_Yes: 'Ja',
    Dialog_Cancel: 'Abbrechen',
    Dialog_Save: 'Speichern',

    //New Confirmation Dialog
    NewConfirmationDialog_Title: 'Von vorne beginnen?',
    NewConfirmationDialog_Text: 'Alle Änderungen werden verworfen. Sind Sie sicher?',

    //Customize Confirmation Dialog
    CustomizeConfirmationDialog_Title: 'Assistent abschalten?',
    CustomizeConfirmationDialog_Text: 'Code kann direkt bearbeitet werden ohne Assistent. Für erfahrene User gedacht. Sind Sie sicher?',

    //Copy
    CopyToClipboardError: 'Fehler beim Kopieren!',

    //Data Column/Row buttons
    DataColumn_DeleteRow: "Zeile löschen",
    DataColumn_AddRow: "Zeile hinzufügen",
    DataColumn_DeleteColumn: "Feld löschen",
    DataColumn_AddColumn: "Feld hinzufügen",

    //Data Column Editing
    DataColumn_ColumnNameChangeTooltip: "Interner Feldname",
    DataColumn_ColumnTypeHeadline: "Spaltentyp",
    DataColumn_ColumnTypeMessage: "Ändern des Typs setzt Werte zurück.",
    DataColumn_ColumnTypeChangeTooltip: "Zum Ändern klicken",
    DataColumn_SubPropertiesHeadline: "Eigenschaften",
    DataColumn_TimeHeadline: "Uhrzeit",
    DataColumn_DefaultName: "NeuesFeld",
    DataColumn_LinkDescriptionLabel: 'desc',
    DataColumn_LookupIdLabel: 'lookupId',
    DataColumn_PersonIdLabel: 'id',
    DataColumn_PersonEmailLabel: 'email',
    DataColumn_PersonSIPLabel: 'sip',
    DataColumn_PersonPictureLabel: 'picture',
    DataColumn_HourLabel: "Stunde",
    DataColumn_MinuteLabel: "Minute",
    DataColumn_SecondsLabel: "Sekunde",

    //Column Type Names
    ColumnType_Boolean: "Ja/Nein",
    ColumnType_Choice: "Auswahl",
    ColumnType_DateTime: "Datum und Uhrzeit",
    ColumnType_Link: "Hyperlink",
    ColumnType_Picture: "Bild",
    ColumnType_Lookup: "Nachschlagen (Lookup)",
    ColumnType_Number: "Zahl",
    ColumnType_Person: "Person",
    ColumnType_Text: "Text",
    ColumnType_Unknown: "Unknown",

    //Boolean Values
    BoolValueStringTrue: "Ja",
    BoolValueStringFalse: "Nein",

    //DateTime Editor Strings
    DateTime_Month1: "Jänner",
    DateTime_Month2: "Februar",
    DateTime_Month3: "März",
    DateTime_Month4: "April",
    DateTime_Month5: "Mai",
    DateTime_Month6: "Juni",
    DateTime_Month7: "Juli",
    DateTime_Month8: "August",
    DateTime_Month9: "September",
    DateTime_Month10: "Oktober",
    DateTime_Month11: "November",
    DateTime_Month12: "Dezember",
    DateTime_Month1Short: "Jan",
    DateTime_Month2Short: "Feb",
    DateTime_Month3Short: "Mar",
    DateTime_Month4Short: "Apr",
    DateTime_Month5Short: "Mai",
    DateTime_Month6Short: "Jun",
    DateTime_Month7Short: "Jul",
    DateTime_Month8Short: "Aug",
    DateTime_Month9Short: "Sep",
    DateTime_Month10Short: "Okt",
    DateTime_Month11Short: "Nov",
    DateTime_Month12Short: "Dez",
    DateTime_Day1: "Sonntag",
    DateTime_Day2: "Montag",
    DateTime_Day3: "Dienstag",
    DateTime_Day4: "Mittwoch",
    DateTime_Day5: "Donnerstag",
    DateTime_Day6: "Freitag",
    DateTime_Day7: "Samstag",
    DateTime_Day1Short: "So",
    DateTime_Day2Short: "Mo",
    DateTime_Day3Short: "Di",
    DateTime_Day4Short: "Mi",
    DateTime_Day5Short: "Do",
    DateTime_Day6Short: "Fr",
    DateTime_Day7Short: "Sa",
    DateTime_DTgoToToday: "Zu Heute",
    DateTime_DTprevMonthAriaLabel: "Zu vorigem Monat",
    DateTime_DTnextMonthAriaLabel: "Zu nächstem Monat",
    DateTime_DTprevYearAriaLabel: "Zu vorigem Jahr",
    DateTime_DTnextYearAriaLabel: "Zu nächstem Jahr",

    //Custom Formatting Error Strings
    CFS_ariaError: "Keine aria- Tags gefunden. Screen reader werden das Feld daher nicht erkennen können.",
    CFS_elmTypeInvalid: "Ungültiger elmType: {0}. Nur {1} erlaubt.",
    CFS_elmTypeMissing: "Fehlender elmType.",
    CFS_invalidProtocol: "URL blockiert. Nur http, https und mailto erlaubt.",
    CFS_invalidStyleAttribute: "'{0}' ist kein unterstütztes Style Attribut.",
    CFS_invalidStyleValue: "Das Style Elment '{0}' enthält eines oder mehrere ungültige Zeichen ( : & ; ! .",
    CFS_nan: "{0} ist keine Zahl. Nur Zahlen in Ausdruck {1} erlaubt.",
    CFS_operandMissing: "Ein Ausdruck muss zumindest einen Operanten beinhalten {0}.",
    CFS_operandNOnly: "Benötige {0} Operant(en) für Ausdruck {1}.",
    CFS_operatorInvalid: "'{0}' ist kein gültiger Operator. Muss aus {1} bestehen in Ausdruck {2}.",
    CFS_operatorMissing: "Fehlender Operator in Ausdruck: {0}.",
    CFS_unsupportedType: "Der Feldtyp {0} wird aktuell nicht unterstützt.",
    CFS_userFieldError: "Das Feld '{0}' ist vom Typ 'Person' und kann nicht direkt angewendet werden. Geben Sie ein Eigenschaft an. Zb: [$AssignedTo.email]",
    CFS_RowLabel: 'Zeile',

    //Format Validation Messages
    PreviewValidation_Good: 'Validierung erfolgreich!',
    PreviewValidation_Bad: 'Ungültiger JSON Code:',

    //Tree View
    TreeView_Header: 'Elementhierarchie',
    TreeView_Error: 'Fehler beim Laden der Hierarchie!',

    //Standard Colors
    Color_Yellow: 'Gelb',
    Color_YellowLight: 'Hellgelb',
    Color_Orange: 'Orange',
    Color_OrangeLight: 'Hell orange',
    Color_OrangeLighter: 'Leichtere Orange',
    Color_RedDark: 'Dunkelrot',
    Color_Red: 'Rot',
    Color_MagentaDark: 'Dunkle Magenta',
    Color_Magenta: 'Magenta',
    Color_MagentaLight: 'Helles Magenta',
    Color_PurpleDark: 'Dunkelviolett',
    Color_Purple: 'Lila',
    Color_PurpleLight: 'Helles Lila',
    Color_BlueDark: 'Dunkelblau',
    Color_BlueMid: 'Mitte blau',
    Color_Blue: 'Blau',
    Color_BlueLight: 'Hellblau',
    Color_TealDark: 'Dunkel blaugrün',
    Color_Teal: 'Blaugrün',
    Color_TealLight: 'Helles aquamarines',
    Color_GreenDark: 'Dunkelgrün',
    Color_Green: 'Grün',
    Color_GreenLight: 'hellgrün',
    Color_Black: 'Schwarz',
    Color_NeutralDark: 'Dunkel Neutral',
    Color_NeutralPrimary: 'Neutrale primäre',
    Color_NeutralPrimaryAlt: 'Neutrale primäre alt',
    Color_NeutralSecondary: 'Neutrale sekundäre',
    Color_NeutralTertiary: 'Neutrales Tertiär',
    Color_NeutralTertiaryAlt: 'Neutrales Tertiär alt',
    Color_NeutralLight: 'Hell Neutral',
    Color_NeutralLighter: 'Leichter Neutral',
    Color_NeutralLighterAlt: 'Leichter Neutral alt',
    Color_White: 'Weiß',
    Color_Transparent: 'Transparent',

    //Wizard Shared Group Labels
    Wizard_GroupLabelRange: 'Bereich',
    Wizard_GroupLabelValueDisplay: 'Anzeige Optionen',
    Wizard_GroupLabelConditionalValues: 'Bedingter Wert',
    Wizard_GroupLabelDisplay: 'Anzeige',
    Wizard_GroupLabelParameters: 'Parameter',

    //Wizard Shared Field Labels
    Wizard_PercentRangeEmptyLabel: 'Nieder',
    Wizard_PercentRangeEmptyTooltip: 'Kleinst Wert auf der Skala\nWerte kleiner oder gleich werden als 0% dargestellt',
    Wizard_PercentRangeFullLabel: 'Hoch',
    Wizard_PercentRangeFullTooltip: 'Größter Wert auf der Skala\nWerte größer oder gleich werden als 100% dargestellt',
    Wizard_ValueDisplayActual: 'Wert anzeigen',
    Wizard_ValueDisplayPercentage: 'Prozent anzeigen',
    Wizard_ValueDisplayNone: 'Keine',
    Wizard_ValueVisibleOn: 'Wert sichtbar',
    Wizard_ValueVisibleOff: 'Wert nicht sichtbar',
    Wizard_IconVisibleOn: 'Symbol sichtbar',
    Wizard_IconVisibleOff: 'Symbol nicht sichtbar',
    Wizard_Text: 'Text',
    Wizard_Icon: 'Symbol',
    Wizard_Color: 'Farbe',
    Wizard_Size: 'Größe',
    Wizard_TooltipOn: 'Zeige Tooltip',
    Wizard_TooltipOff: 'Kein Tooltipp',

    //Wizard Data Bars
    WizardDataBars_Name: 'Datenbalken',
    WizardDataBars_Description: 'Fügt horizontale Balken hinzu deren Länge den Wert darstellt.',

    //Wizard Checkboxes
    WizardCheckboxes_Name: 'Checkboxen',
    WizardCheckboxes_Description: 'Zeigt Ja/Nein Feld als Checkbox',

    //Wizard Overdue
    WizardOverdue_Name: 'Überfällig',
    WizardOverdue_Description: 'Färbt Feld Rot wenn Wert größer als heute.',

    //Wizard Overdue Status
    WizardOverdueStatus_Name: 'Überfällige Aufgabe',
    WizardOverdueStatus_Description: 'Färbt das Feld rot, wenn das Datum größer als heute ist, wenn der Status nicht vollständig ist',
    WizardOverdueStatus_StatusColumn: 'Status',
    WizardOverdueStatus_Complete: 'Voll',
    WizardOverdueStatus_InProgress: 'Unvollständig',

    //Wizard Number Trending
    WizardNumberTrending_Name: '# Trending',
    WizardNumberTrending_Description: 'Vergleicht Felder in der Zeile fügt Icon je nach Trend hinzu',
    WizardNumberTrending_Current: 'Aktuell',
    WizardNumberTrending_Previous: 'Vorherig',

    //Wizard Action Link
    WizardActionLink_Name: 'Action Link',
    WizardActionLink_Description: 'Fügt Quick Action Symbol zu Link hinzu.',

    //Wizard Severity
    WizardSeverity_Name: 'Status',
    WizardSeverity_Description: 'Unterschiedlicher Style je nach Feld Status',
    WizardSeverity_Good: 'Erledigt',
    WizardSeverity_Low: 'In Bearbeitung',
    WizardSeverity_Warning: 'In Review',
    WizardSeverity_SevereWarning: 'Achtung',
    WizardSeverity_Blocked: 'Blockiert',
    WizardSeverity_Other: 'Anderer Wert',
    WizardSeverity_GoodLabel: 'Gut',
    WizardSeverity_LowLabel: 'Nieder',
    WizardSeverity_WarningLabel: 'Warnung',
    WizardSeverity_SevereWarningLabel: 'Letzte Warnung',
    WizardSeverity_BlockedLabel: 'Blockiert',
    WizardSeverity_DefaultSeverityLabel: 'Default Status',

    //Wizard Current User
    WizardCurrentUser_Name: 'Aktueller Benutzer',
    WizardCurrentUser_Description: 'Hebt aktuellen Benutzer hervor',

    //Wizard Round Image
    WizardRoundImage_Name: 'Rundes Bild',
    WizardRoundImage_Description: 'Stellt Benutzerbild rund dar',

    //Wizard Mail To
    WizardMailTo_Name: 'Email an',
    WizardMailTo_Description: 'Erstellt Link für neue Email',
    WizardMailTo_Subject: 'Betreff',
    WizardMailTo_DefaultSubject: 'Sachen',
    WizardMailTo_Body: 'Body',
    WizardMailTo_DefaultBody: 'Lieber Vesa,\r\nTeilen ist Kümmern.\r\nbuhbye!',
    WizardMailTo_BCC: 'bcc',
    WizardMailTo_CC: 'cc',
    WizardMailTo_IconLink: 'Symbol Link',
    WizardMailTo_TextLink: 'Text Link',
    WizardMailTo_DefaultText: 'E-Mail senden',

    //Wizard Mini Map
    WizardMiniMap_Name: 'Mini Map',
    WizardMiniMap_Description: 'Zeigt winzige Map für Ort an (verwenden Sie Ihren eigenen API key)',

    //Wizard Flow
    WizardFlow_Name: 'Start Flow',
    WizardFlow_Description: 'Erstellt eine Schaltfläche zum einfachen Starten eines Flow für ein Objekt',
    WizardFlow_FlowId: 'Flow id',
    WizardFlow_FlowIdInstructions: 'Aus den Flussdetails kopieren Sie den Teil der URL zwischen flows/ und /details\nSo für "flows/40ae7493-a7c7-41af-9f54-3d83f32c4b56/details"\nDie ID ist: "40ae7493-a7c7-41af-9f54-3d83f32c4b56"',

    //Wizard Donut
    WizardDonut_Name: 'Donut',
    WizardDonut_Description: 'Zeigt Werte mit einem Donut- oder Kreisdiagramm an',
    WizardDonut_Donut: 'Donut',
    WizardDonut_Pie: 'Kreisdiagramm',
    WizardDonut_OuterColor: 'Äußere Farbe',
    WizardDonut_InnerColor: 'Innere Farbe',
    WizardDonut_TextColor: 'Textfarbe',

    //Wizard Twitter
    WizardTwitter_Name: 'Twitter Bild',
    WizardTwitter_Description: 'Zeigt Twitter-Profilbilder von Twitter-Handles an',
    WizardTwitter_Rounding: 'Rundung',
    WizardTwitter_LinkOn: 'Link zum Profil',
    WizardTwitter_LinkOff: 'Keine link'
  }
});