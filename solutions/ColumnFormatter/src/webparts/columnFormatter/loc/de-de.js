define([], function() {
  return {
    //Property Pane
    PropertyBasicGroupName: "Eigenschaften",
    PropertyHeightLabel: "Höhe",

    //General
    FeatureUnavailableFromLocalWorkbench: 'Dieses Feature ist in der lokalen Workbench nicht verfügbar',
    TechnicalDetailsErrorHeader: 'Technische Details',
    WizardDefaultField: 'MyField',

    //Welcome
    WelcomeTitle: 'Column Formatter',
    WelcomeSubTitle: 'Editor zur einfachen Konfiguration von Spaltenformatierungen in modernen Listen',
    WelcomeNewHeader: 'Neu',
    WelcomeNewDescription: 'Neue Formatierung erstellen.',
    WelcomeOpenHeader: 'Öffnen',
    WelcomeOpenDescription: 'Vorhande Formatierung aus einer Liste laden.',
    WelcomeNewColumnTypeLabel: 'Spaltentyp',
    WelcomeNewWizardOption: 'Vorlage verwenden',
    WelcomeNewBlankOption: 'Neu von leerer Vorlage',
    WelcomeNewNoTemplates: 'Keine Vorlage für gewählten Spaltentyp vorhanden',
    WelcomeBackButton: 'Zurück',
    WelcomeOKButton: 'OK',
    WelcomeNextButton: 'Weiter',
    WelcomeOpenLoadList: 'Von lokaler Liste laden',
    WelcomeOpenLoadFile: 'Von Datei laden:',
    WelcomeOpenColumnTypeLabel: 'Spaltentyp',
    WelcomeOpenLoadFileLibrary: 'Datei aus lokaler Bibliothek öffnen',
    WelcomeOpenLoadFileUpload: 'Datei hochladen',
    WelcomeUploadHeader: 'Hochladen der Datei',
    WelcomeUploadInstructions1: 'Drop your json file here, or click to select the file to upload.',
    WelcomeUploadInstructions2: 'Nur Datein mit der Endung .json werden unterstützt.',
    WelcomeUploadUploadButton: 'Datei auswählen',
    WelcomeUploadRejectError: 'Datei kann nicht hochgeladen werden.',
    WelcomeUploadEmptyFileError: 'Datei ist leer!',
    WelcomeLoadFromListLoadingLists: 'Lade Listen...',
    WelcomeLoadFromListListLabel: 'Lokale Liste',
    WelcomeLoadFromListFieldLabel: 'Field',
    WelcomeLoadFromListLoading: 'Lade von Liste...',
    WelcomeLoadFromListLoadingListsError: 'Fehler beim Laden der Listen!',
    WelcomeLoadFromListLoadingError: 'Fehler beim Laden!',
    WelcomeLoadFromLibraryLoadingLibraries: 'Lade Bibliotheken...',
    WelcomeLoadFromLibraryLibraryLabel: 'Lokale Bibiliothek',
    WelcomeLoadFromLibraryFolderPathLabel: 'Ordner Pfad',
    WelcomeLoadFromLibraryFilenameLabel: 'Dateiname',
    WelcomeLoadFromLibraryLoading: 'Lade aus Bibiliothek...',
    WelcomeLoadFromLibraryLoadingLibrariesError: 'Fehler beim Laden der Bibliotheken!',
    WelcomeLoadFromLibraryLoadingError: 'Fehler beim Laden! Überprüfen Sie die benötigten Berechtigungen und den Ordner Pfad, fals in Verwendung.',

    //Tab Names
    TabWizard: "Assisten",
    TabTree: "Hierarchie",
    TabData: "Daten",
    TabPreview: "Vorschau",
    TabCode: "Code",
    TabSplit: "Nebeneinander",

    //Panel Headers
    PanelHeaderData: "Test Werte",
    PanelHeaderPreview: "Vorschau",
    PanelHeaderCode: "Code Editor",

    //Editor CommandBar
    CommandNew: 'Neu',
    CommandCustomize: 'Customize',
    CommandEditor: 'Editor Design',
    CommandSaveAs: 'Speichern unter',
    CommandDownload: 'Download',
    CommandCopy: 'In Zwischenablage kopieren',
    CommandSaveToLibrary: 'In lokale Liste speichern',
    CommandApplyToList: 'Auf lokales Feld anwenden',
    CommandSave: 'Speichern',

    //New Confirmation Dialog
    NewConfirmationDialogTitle: 'Von vorne beginnen?',
    NewConfirmationDialogText: 'Alle Änderungen werden verworfen. Sind Sie sicher?',
    NewConfirmationDialogConfirmButton: 'Ja',
    NewConfirmationDialogCancelButton: 'Abbrechen',

    //Customize Confirmation Dialog
    CustomizeConfirmationDialogTitle: 'Assistent abschalten?',
    CustomizeConfirmationDialogText: 'Code kann direkt bearbeitet werden ohne Assistent. Für erfahrene User gedacht. Sind Sie sicher?',
    CustomizeConfirmationDialogConfirmButton: 'Ja',
    CustomizeConfirmationDialogCancelButton: 'Abbrechen',

    //Save To Library Dialog
    SaveToLibraryDialogTitle: 'In lokale Bibliothek speichern',
    SaveToLibraryDialogConfirmButton: 'Speichern',
    SaveToLibraryDialogCancelButton: 'Abbrechen',
    SaveToLibraryLoading: 'Lade Bibliothken...',
    SaveToLibraryLibraryLabel: 'Lokale Bibliothek',
    SaveToLibraryFolderPathLabel: 'Ordner Pfad (optional)',
    SaveToLibraryFilenameLabel: 'Dateinae',
    SaveToLibrarySaving: 'Speichere in Bibliothek...',
    SaveToLibraryLoadError: 'Fehler beim Laden von Bibliothek!',
    SaveToLibrarySaveError: 'Fehler beim Speichern! Überprüfen Sie die Berechtgiungen der Bibliothek und falls verwendent den Ordner Pfad.',

    //Apply To List Dialog
    ApplyToListDialogTitle: 'Auf lokales Listefeld anwenden',
    ApplyToListDialogConfirmButton: 'Speichern',
    ApplyToListDialogCancelButton: 'Abbrechen',
    ApplyToListLoading: 'Lade Listen...',
    ApplyToListListLabel: 'Lokale Liste',
    ApplyToListFieldLabel: 'Feld',
    ApplyToListApplying: 'Formatierung wird gesetzt...',
    ApplyToListLoadError: 'Fehler beim Laden der Listen!',
    ApplyToListApplyError: 'Fehler beim Setzen der Formatierung. Überprüfen Sie Ihre Berechtigungen auf der Liste.',

    //Copy
    CopyToClipboardError: 'Fehler beim Kopieren!',

    //Data Column/Row buttons
    DeleteRow: "Zeile löschen",
    AddRow: "Zeile hinzufügen",
    DeleteColumn: "Feld löschen",
    AddColumn: "Feld hinzufügen",

    //Data Column Editing
    ColumnNameChangeTooltip: "Interner Feldname",
    ColumnTypeHeadline: "Spaltentyp",
    ColumnTypeMessage: "Ändern des Typs setzt Werte zurück.",
    ColumnTypeChangeTooltip: "Zum Ändern klicken",
    SubPropertiesHeadline: "Eigenschaften",
    TimeHeadline: "Uhrzeit",
    DataColumnDefaultName: "NeuesFeld",
    DataColumnLinkDescriptionLabel: 'desc:',
    DataColumnLookupIdLabel: 'lookupId:',
    DataColumnPersonIdLabel: 'id:',
    DataColumnPersonEmailLabel: 'email:',
    DataColumnPersonSIPLabel: 'sip:',
    DataColumnPersonPictureLabel: 'picture:',

    //Column Type Names
    ColumnTypeBoolean: "Ja/Nein",
    ColumnTypeChoice: "Auswahl",
    ColumnTypeDateTime: "Datum und Uhrzeit",
    ColumnTypeLink: "Hyperlink",
    ColumnTypePicture: "Bild",
    ColumnTypeLookup: "Nachschlagen (Lookup)",
    ColumnTypeNumber: "Zahl",
    ColumnTypePerson: "Person",
    ColumnTypeText: "Text",
    ColumnTypeUnknown: "Unknown",

    //Boolean Values
    BoolValueStringTrue: "Ja",
    BoolValueStringFalse: "Nein",

    //DateTime Editor Strings
    Month1: "Jänner",
    Month2: "Februar",
    Month3: "März",
    Month4: "April",
    Month5: "Mai",
    Month6: "Juni",
    Month7: "Juli",
    Month8: "August",
    Month9: "September",
    Month10: "Oktober",
    Month11: "November",
    Month12: "Dezember",
    Month1Short: "Jan",
    Month2Short: "Feb",
    Month3Short: "Mar",
    Month4Short: "Apr",
    Month5Short: "Mai",
    Month6Short: "Jun",
    Month7Short: "Jul",
    Month8Short: "Aug",
    Month9Short: "Sep",
    Month10Short: "Okt",
    Month11Short: "Nov",
    Month12Short: "Dez",
    Day1: "Sonntag",
    Day2: "Montag",
    Day3: "Dienstag",
    Day4: "Mittwoch",
    Day5: "Donnerstag",
    Day6: "Freitag",
    Day7: "Samstag",
    Day1Short: "So",
    Day2Short: "Mo",
    Day3Short: "Di",
    Day4Short: "Mi",
    Day5Short: "Do",
    Day6Short: "Fr",
    Day7Short: "Sa",
    DTgoToToday: "Zu Heute",
    DTprevMonthAriaLabel: "Zu vorigem Monat",
    DTnextMonthAriaLabel: "Zu nächstem Monat",
    DTprevYearAriaLabel: "Zu vorigem Jahr",
    DTnextYearAriaLabel: "Zu nächstem Jahr",
    HourLabel: "Stunde",
    MinuteLabel: "Minute",
    SecondsLabel: "Sekunde",

    //Custom Formatting Error Strings
    CFSariaError: "Keine aria- Tags gefunden. Screen reader werden das Feld daher nicht erkennen können.",
    CFSelmTypeInvalid: "Ungültiger elmType: {0}. Nur {1} erlaubt.",
    CFSelmTypeMissing: "Fehlender elmType.",
    CFSinvalidProtocol: "URL blockiert. Nur http, https und mailto erlaubt.",
    CFSinvalidStyleAttribute: "'{0}' ist kein unterstütztes Style Attribut.",
    CFSinvalidStyleValue: "Das Style Elment '{0}' enthält eines oder mehrere ungültige Zeichen ( : & ; ! .",
    CFSnan: "{0} ist keine Zahl. Nur Zahlen in Ausdruck {1} erlaubt.",
    CFSoperandMissing: "Ein Ausdruck muss zumindest einen Operanten beinhalten {0}.",
    CFSoperandNOnly: "Benötige {0} Operant(en) für Ausdruck {1}.",
    CFSoperatorInvalid: "'{0}' ist kein gültiger Operator. Muss aus {1} bestehen in Ausdruck {2}.",
    CFSoperatorMissing: "Fehlender Operator in Ausdruck: {0}.",
    CFSunsupportedType: "Der Feldtyp {0} wird aktuell nicht unterstützt.",
    CFSuserFieldError: "Das Feld '{0}' ist vom Typ 'Person' und kann nicht direkt angewendet werden. Geben Sie ein Eigenschaft an. Zb: [$AssignedTo.email]",
    CFSRowLabel: 'Zeile',

    //Format Validation Messages
    PreviewValidationGood: 'Validierung erfolgreich!',
    PreviewValidationBad: 'Ungültiger JSON Code:',

    //Tree View
    TreeViewHeader: 'Elementhierarchie',
    TreeViewError: 'Fehler beim Laden der Hierarchie!',

    //Wizard Data Bars
    WizardDataBarsName: 'Datenbalken',
    WizardDataBarsDescription: 'Fügt horizontale Balken hinzu deren Länge den Wert darstellt.',
    WizardDataBarsEmptyBarLabel: 'Nieder:',
    WizardDataBarsEmptyBarTooltip: 'Kleinst Wert auf der Skala\nWerte kleiner oder gleich werden als 0% dargestellt',
    WizardDataBarsFullBarLabel: 'Hoch:',
    WizardDataBarsFullBarTooltip: 'Größter Wert auf der Skala\nWerte größer oder gleich werden als 100% dargestellt',
    WizardDataBarsRangeGroupLabel: 'Bereich',
    WizardDataBarsValueDisplayGroupLabel: 'Anzeige Optionen',
    WizardDataBarsValueDisplayActual: 'Wert anzeigen',
    WizardDataBarsValueDisplayPercentage: 'Prozent anzeigen',
    WizardDataBarsValueDisplayNone: 'Keine',

    //Wizard Checkboxes
    WizardCheckboxesName: 'Checkboxen',
    WizardCheckboxesDescription: 'Zeigt Ja/Nein Feld als Checkbox',

    //Wizard Overdue
    WizardOverdueName: 'Überfällig',
    WizardOverdueDescription: 'Färbt Feld Rot wenn Wert größer als heute.',

    //Wizard Number Trending
    WizardNumberTrendingName: '# Trending',
    WizardNumberTrendingDescription: 'Vergleicht Felder in der Zeile fügt Icon je nach Trend hinzu',
    WizardNumberTrendingCurrent: 'Aktuell',
    WizardNumberTrendingPrevious: 'Vorherig',

    //Wizard Action Link
    WizardActionLinkName: 'Action Link',
    WizardActionLinkDescription: 'Fügt Quick Action Symbol zu Link hinzu.',

    //Wizard Severity
    WizardSeverityName: 'Status',
    WizardSeverityDescription: 'Unterschiedlicher Style je nach Feld Status',
    WizardSeverityGood: 'Erledigt',
    WizardSeverityLow: 'In Bearbeitung',
    WizardSeverityWarning: 'In Review',
    WizardSeveritySevereWarning: 'Achtung',
    WizardSeverityBlocked: 'Blockiert',
    WizardSeverityOther: 'Anderer Wert',
    WizardSeverityGroupValues: 'Bedingter Wert',
    WizardSeverityGoodLabel: 'Gut',
    WizardSeverityLowLabel: 'Nieder',
    WizardSeverityWarningLabel: 'Warnung',
    WizardSeveritySevereWarningLabel: 'Letzte Warnung',
    WizardSeverityBlockedLabel: 'Blockiert',
    WizardSeverityDefaultSeverityLabel: 'Default Status',
    WizardSeverityGroupDisplay: 'Anzeige',
    WizardSeverityValueVisible: 'Wert sichtbar',
    WizardSeverityValueHidden: 'Wert nicht sichtbar',
    WizardSeverityIconVisible: 'Symbol sichtbar',
    WizardSeverityIconHidden: 'Symbol nicht sichtbar',

    //Wizard Current User
    WizardCurrentUserName: 'Aktueller Benutzer',
    WizardCurrentUserDescription: 'Hebt aktuellen Benutzer hervor',

    //Wizard Round Image
    WizardRoundImageName: 'Rundes Bild',
    WizardRoundImageDescription: 'Stellt Benutzerbild rund dar',

    //Wizard Mail To
    WizardMailToName: 'Email an',
    WizardMailToDescription: 'Erstellt Link für neue Email',
    WizardMailToGroupDisplay: 'Anzeige',
    WizardMailToDisplayValue: 'Text',
    WizardMailToGroupParameters: 'Parameter',
    WizardMailToSubject: 'Betreff',
    WizardMailToBody: 'Body',
    WizardMailToBCC: 'bcc',
    WizardMailToCC: 'cc',
    WizardMailToIconLink: 'Symbol Link',
    WizardMailToTextLink: 'Text Link',

    //Wizard Mini Map
    WizardMiniMapName: 'Mini Map',
    WizardMiniMapDescription: 'Zeigt winzige Map für Ort an (verwenden Sie Ihren eigenen API key)'
  }
});