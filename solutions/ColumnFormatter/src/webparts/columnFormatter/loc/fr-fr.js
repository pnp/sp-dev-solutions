define([], function() {
  return {
    //Property Pane
    Property_BasicGroupName: 'Propriétés',
    Property_HeightLabel: 'Hauteur',
    Property_EditorGroupName: "Éditeur",
    Property_EditorThemeLabel: "Thème",
    Property_LineNumbersLabel: "Numéros de ligne",
    Property_VisibleOn: "Sur",
    Property_VisibleOff: "De",
    Property_MiniMapLabel: "Mini carte",
    Property_IndentGuidesLabel: 'Guides de retrait',

    //General
    FeatureUnavailableFromLocalWorkbench: 'Cette fonctionnalité n\'est pas disponible depuis l\'atelier local',
    TechnicalDetailsErrorHeader: 'Détails techniques',
    WizardDefaultField: 'MonChamp',

    //Welcome
    Welcome_Title: 'Column Formatter',
    Welcome_SubTitle: 'Éditeur simplifier pour la mise en forme de colonne pour l\'expérience moderne',
    Welcome_NewHeader: 'Nouveau',
    Welcome_NewDescription: 'Commencez à partir de zéro ou choisissez un modèle',
    Welcome_OpenHeader: 'Ouvrir',
    Welcome_OpenDescription: 'Charger depuis une bibliothèque ou récupéré d\'une liste locale',
    Welcome_ColumnType: 'Type de colonne',
    Welcome_NewWizardOption: 'Commencez avec un modèle',
    Welcome_NewBlankOption: 'Commencer à partir de zéro',
    Welcome_NewNoTemplates: 'Aucun modèle disponible pour le type de colonne choisi',
    Welcome_BackButton: 'Précedent',
    Welcome_OKButton: 'OK',
    Welcome_NextButton: 'Suivant',
    Welcome_OpenLoadList: 'Charger à partir d\'une liste locale',
    Welcome_OpenLoadSiteColumn: 'Charger à partir d\'une colonne de site',
    Welcome_OpenLoadFile: 'Charger à partir d\'un fichier :',
    Welcome_OpenLoadFileLibrary: 'Ouvrir un fichier à partir d\'une bibliothèque locale',
    Welcome_OpenLoadFileUpload: 'Téléverser un fichier',
    Welcome_UploadHeader: 'Téléversement d\'un fichier',
    Welcome_UploadInstructions1: 'Déposez votre fichier json ici, ou cliquez pour sélectionner le fichier à téléverser.',
    Welcome_UploadInstructions2: 'Seuls les fichiers *.json seront acceptés',
    Welcome_UploadUploadButton: 'Choisissez un fichier',
    Welcome_UploadRejectError: 'Impossible d\'accepter :',
    Welcome_UploadEmptyFileError: 'Le fichier est vide !',
    Welcome_LoadingError: 'Erreur lors du chargement !',
    
    //List Field (Load/Apply)
    ListField_LoadingLists: 'Chargement des listes ...',
    ListField_List: 'Liste locale',
    ListField_Field: 'Champ',
    ListField_LoadingFromList: 'Chargement de la liste ...',
    ListField_ListLoadError: 'Erreur lors du chargement des listes !',
    ListField_SaveDialogTitle: 'Appliquer au champ de liste local',
    ListField_Saving: 'Appliquer à la liste ...',
    ListField_SaveError: 'Erreur lors de l\'application! Vérifiez que vous avez la permission de mettre à jour les paramètres de cette bibliothèque.',

    //Site Column (Load/Apply)
    SiteColumn_LoadingSiteColumns: 'Chargement des colonnes du site ...',
    SiteColumn_Group: 'Groupe',
    SiteColumn_Field: 'Colonne',
    SiteColumn_LoadingFromSiteColumn: 'Chargement depuis la colonne du site ...',
    SiteColumn_SiteColumnsLoadError: 'Erreur lors du chargement des colonnes de site !',
    SiteColumn_SaveDialogTitle: 'Appliquer à la colonne de site',
    SiteColumn_PushToListsOn: 'Pousser les modifications aux listes',
    SiteColumn_PushToListsOff: 'Colonne du site uniquement',
    SiteColumn_Saving: 'Application à la colonne de site ...',
    SiteColumn_SaveError: 'Erreur lors de l\'application! Vérifiez que vous avez l\'autorisation de mettre à jour les colonnes du site.',

    //Library (Load/Save)
    Library_LoadingLibraries: 'Chargement des bibliothèques ...',
    Library_Library: 'Bibliothèque locale',
    Library_FolderPath: 'Chemin du dossier',
    Library_Filename: 'Nom de fichier',
    Library_LoadingFromLibrary: 'Chargement de la bibliothèque ...',
    Library_LibrariesLoadError: 'Erreur lors du chargement des bibliothèques !',
    Library_LoadFromLibraryError: 'Erreur lors du chargement! Vérifiez que le chemin du dossier est correct (s\'il est utilisé) et que vous avez l\'autorisation d\'accéder à cette bibliothèque.',
    Library_SaveDialogTitle: 'Enregistrer dans la bibliothèque locale',
    Library_Saving: 'Enregistrement dans la bibliothèque ...',
    Library_SaveError: 'Erreur lors de l\'enregistrement ! Vérifiez que le chemin du dossier est correct (s\'il est utilisé) et que vous avez la permission d\'enregistrer dans cette bibliothèque.',

    //Tab Names
    Tab_Wizard: 'Assistant',
    Tab_Tree: 'Arbre',
    Tab_Data: 'Donnée',
    Tab_Preview: 'Aperçu',
    Tab_Code: 'Code',
    Tab_Split: 'Cote à cote',

    //Panel Headers
    PanelHeader_Data: 'Valeurs de test',
    PanelHeader_Preview: 'Aperçu',
    PanelHeaderC_ode: 'Éditeur de code',

    //Editor CommandBar
    Command_New: 'Nouveau',
    Command_Customize: 'Personnaliser',
    Command_Editor: 'Thème',
    Command_SaveAs: 'Enregistrer sous',
    Command_Download: 'Télécharger',
    Command_Copy: 'Copier dans le presse-papier',
    Command_SaveToLibrary: 'Copier dans le presse-papier',
    Command_ApplyToSiteColumn: 'Appliquer à la colonne du site',
    Command_ApplyToList: 'Appliquer au champ de liste local',
    Command_Save: 'Sauvegarder',

    //Dialogs Shared
    Dialog_Yes: 'Oui',
    Dialog_Cancel: 'Annuler',
    Dialog_Save: 'Enregistrer',

    //New Confirmation Dialog
    NewConfirmationDialog_Title: 'Recommencer ?',
    NewConfirmationDialog_Text: 'Tout changement non enregistré sera perdu. Voulez-vous continuer ?',

    //Customize Confirmation Dialog
    CustomizeConfirmationDialog_Title: 'Enlever l\'assistant ?',
    CustomizeConfirmationDialog_Text: 'Vous serez en mesure de modifier le code directement, mais le volet de l\'assistant ne sera plus disponible. Ceci est pour les utilisateurs avancés. Êtes-vous sûr ?',

    //Copy
    CopyToClipboardError: 'Impossible de copier !',

    //Data Column/Row buttons
    DataColumn_DeleteRow: 'Supprimer la ligne',
    DataColumn_AddRow: 'Ajouter une ligne    ',
    DataColumn_DeleteColumn: 'Supprimer le champ',
    DataColumn_AddColumn: 'Ajouter le champ',

    //Data Column Editing
    DataColumn_ColumnNameChangeTooltip: 'Nom du champ interne',
    DataColumn_ColumnTypeHeadline: 'Type de colonne',
    DataColumn_ColumnTypeMessage: 'Changer le type réinitialisera également les valeurs',
    DataColumn_ColumnTypeChangeTooltip: 'Cliquez pour changer',
    DataColumn_SubPropertiesHeadline: 'Sous Propriétés',
    DataColumn_TimeHeadline: 'Temps',
    DataColumn_DefaultName: 'NouveauChamp',
    DataColumn_LinkDescriptionLabel: 'desc',
    DataColumn_LookupIdLabel: 'lookupId',
    DataColumn_PersonIdLabel: 'id',
    DataColumn_PersonEmailLabel: 'email',
    DataColumn_PersonSIPLabel: 'sip',
    DataColumn_PersonPictureLabel: 'image',
    DataColumn_HourLabel: 'Heure',
    DataColumn_MinuteLabel: 'Minute',
    DataColumn_SecondsLabel: 'Seconde',

    //Column Type Names
    ColumnType_Boolean: 'Oui/Non',
    ColumnType_Choice: 'Choix',
    ColumnType_DateTime: 'Date / heure',
    ColumnType_Link: 'Hyperlien',
    ColumnType_Picture: 'Image',
    ColumnType_Lookup: 'Lookup',
    ColumnType_Number: 'Nombre',
    ColumnType_Person: 'Personne',
    ColumnType_Text: 'Texte',
    ColumnType_Unknown: 'Inconnu',

    //Boolean Values
    BoolValueStringTrue: 'Oui',
    BoolValueStringFalse: 'Non',

    //DateTime Editor Strings
    DateTime_Month1: 'Janvier',
    DateTime_Month2: 'Février',
    DateTime_Month3: 'Mars',
    DateTime_Month4: 'Avril',
    DateTime_Month5: 'Mai',
    DateTime_Month6: 'Juin',
    DateTime_Month7: 'Juillet',
    DateTime_Month8: 'Août',
    DateTime_Month9: 'Septembre',
    DateTime_Month10: 'Octobre',
    DateTime_Month11: 'Novembre',
    DateTime_Month12: 'Décembre',
    DateTime_Month1Short: 'Jan.',
    DateTime_Month2Short: 'Fev.',
    DateTime_Month3Short: 'Mar.',
    DateTime_Month4Short: 'Avr.',
    DateTime_Month5Short: 'Mai',
    DateTime_Month6Short: 'Juin',
    DateTime_Month7Short: 'Jui.',
    DateTime_Month8Short: 'Aou.',
    DateTime_Month9Short: 'Sep.',
    DateTime_Month10Short: 'Oct.',
    DateTime_Month11Short: 'Nov.',
    DateTime_Month12Short: 'Déc.',
    DateTime_Day1: 'Dimanche',
    DateTime_Day2: 'Lundi',
    DateTime_Day3: 'Mardi',
    DateTime_Day4: 'Mercredi',
    DateTime_Day5: 'Jeudi',
    DateTime_Day6: 'Vendredi',
    DateTime_Day7: 'Samedi',
    DateTime_Day1Short: 'D',
    DateTime_Day2Short: 'L',
    DateTime_Day3Short: 'M',
    DateTime_Day4Short: 'M',
    DateTime_Day5Short: 'J',
    DateTime_Day6Short: 'V',
    DateTime_Day7Short: 'S',
    DateTime_DTgoToToday: 'Aujourd\'hui',
    DateTime_DTprevMonthAriaLabel: 'Aller au mois précédent',
    DateTime_DTnextMonthAriaLabel: 'Aller au mois suivant',
    DateTime_DTprevYearAriaLabel: 'Aller à l\'année précédente',
    DateTime_DTnextYearAriaLabel: 'Aller à l\'année prochaine',

    //Custom Formatting Error Strings
    CFS_ariaError: 'Aucune étiquette trouvée. En tant que tel, le champ ne sera pas accessible via un lecteur d\'écran.',
    CFS_elmTypeInvalid: 'ElmType non valide: {0}. Doit être l\'un de {1}.',
    CFS_elmTypeMissing: 'Doit spécifier elmType.',
    CFS_invalidProtocol: 'Une URL a été bloquée. Seuls les protocoles http, https et mailto sont autorisés.',
    CFS_invalidStyleAttribute: '"{0}" n\'est pas un attribut de style pris en charge.',
    CFS_invalidStyleValue: 'Les valeurs de style "{0}" contiennent un ou plusieurs des caractères non autorisés suivants ( : & ; ! .',
    CFS_nan: '{0} n\'est pas un nombre. Nombre attendu dans l\'expression {1}.',
    CFS_operandMissing: 'Il doit y avoir au moins 1 opérande dans l\'expression {0}.',
    CFS_operandNOnly: '{0} attendant opérande (s) pour l\'expression {1}.',
    CFS_operatorInvalid: '"{0}" n\'est pas un opérateur valide. Ce doit être l\'un de {1} dans l\'expression {2}.',
    CFS_operatorMissing: 'Opérateur manquant dans l\'expression: {0}.',
    CFS_unsupportedType: 'Le type de champ {0} n\'est pas pris en charge pour le moment.',
    CFS_userFieldError: 'Le champ "{0}" est de type "Utilisateur" et ne peut pas être utilisé directement car il possède des sous-propriétés. Vous devez spécifier la sous-propriété que vous souhaitez utiliser. par exemple : [$ AssignedTo.email]',
    CFS_RowLabel: 'Ligne',

    //Format Validation Messages
    PreviewValidation_Good: 'Validation passée !',
    PreviewValidation_Bad: 'JSON (code) incorrect :',

    //Tree View
    TreeView_Header: 'Arbre des éléments',
    TreeView_Error: 'Erreur lors du chargement de l\'arborescence !',

    //Standard Colors
    Color_Yellow: 'Jaune',
    Color_YellowLight: 'Jaune clair',
    Color_Orange: 'Orange',
    Color_OrangeLight: 'Orange clair',
    Color_OrangeLighter: 'Orange plus clair',
    Color_RedDark: 'Rouge foncé',
    Color_Red: 'Rouge',
    Color_MagentaDark: 'Magenta foncé',
    Color_Magenta: 'Magenta',
    Color_MagentaLight: 'Magenta clair',
    Color_PurpleDark: 'Violet foncé',
    Color_Purple: 'Violet',
    Color_PurpleLight: 'Violet clair',
    Color_BlueDark: 'Bleu foncé',
    Color_BlueMid: 'Bleu mid',
    Color_Blue: 'Bleu',
    Color_BlueLight: 'Bleu clair',
    Color_TealDark: 'Sarcelle foncé',
    Color_Teal: 'Sarcelle',
    Color_TealLight: 'Sarcelle clair',
    Color_GreenDark: 'Vert foncé',
    Color_Green: 'Vert',
    Color_GreenLight: 'Vert clair',
    Color_Black: 'Noir',
    Color_NeutralDark: 'Neutre foncé',
    Color_NeutralPrimary: 'Neutre primaire',
    Color_NeutralPrimaryAlt: 'Neutre primaire alt',
    Color_NeutralSecondary: 'Neutre secondaire',
    Color_NeutralTertiary: 'Neutre tertiaire',
    Color_NeutralTertiaryAlt: 'Neutre tertiaire',
    Color_NeutralLight: 'Neutre clair',
    Color_NeutralLighter: 'Neutre plus clair',
    Color_NeutralLighterAlt: 'Neutre plus clair alt',
    Color_White: 'Blanc',
    Color_Transparent: 'Transparent',

    //Wizard Shared Group Labels
    Wizard_GroupLabelRange: 'Fourchette',
    Wizard_GroupLabelValueDisplay: 'Affichage de la valeur',
    Wizard_GroupLabelConditionalValues: 'Valeurs conditionnelles',
    Wizard_GroupLabelDisplay: 'Afficher',
    Wizard_GroupLabelParameters: 'Paramètres',

    //Wizard Shared Field Labels
    Wizard_PercentRangeEmptyLabel: 'Basse',
    Wizard_PercentRangeEmptyTooltip: 'La valeur la plus basse sur l\'échelle \nLes valeurs égales ou inférieures à cela seront affichées à 0%',
    Wizard_PercentRangeFullLabel: 'Haute',
    Wizard_PercentRangeFullTooltip: 'La valeur la plus élevée sur l\'échelle \nLes valeurs égales ou supérieures à celle-ci seront affichées comme étant à 100%',
    Wizard_ValueDisplayActual: 'Afficher la valeur réelle',
    Wizard_ValueDisplayPercentage: 'Afficher le pourcentage',
    Wizard_ValueDisplayNone: 'Aucun',
    Wizard_ValueVisibleOn: 'Valeur visible',
    Wizard_ValueVisibleOff: 'Valeur invisible',
    Wizard_IconVisibleOn: 'Icone visible',
    Wizard_IconVisibleOff: 'Icone invisible',
    Wizard_Text: 'Texte',
    Wizard_Icon: 'Icone',
    Wizard_Color: 'Couleur',
    Wizard_Size: 'Taille',
    Wizard_TooltipOn: 'Info-bulle visible',
    Wizard_TooltipOff: 'Info-bulle invisible',

    //Wizard Data Bars
    WizardDataBars_Name: 'Barres de données',
    WizardDataBars_Description: 'Ajoute des barres horizontales au champ pour exprimer visuellement la valeur par longueur',

    //Wizard Checkboxes
    WizardCheckboxes_Name: 'Cases à cocher',
    WizardCheckboxes_Description: 'Affiche les champs Oui / Non en tant que cases à cocher',

    //Wizard Overdue
    WizardOverdue_Name: 'En retard',
    WizardOverdue_Description: 'Couleurs le champ rouge une fois que la date est plus grande qu\'aujourd\'hui',

    //Wizard Overdue Status
    WizardOverdueStatus_Name: 'Tâche en retard',
    WizardOverdueStatus_Description: 'Colore le champ rouge une fois que la date est plus grande qu\'aujourd\'hui si l\'État n\'est pas complet',
    WizardOverdueStatus_StatusColumn: 'Statut',
    WizardOverdueStatus_Complete: 'Complet',
    WizardOverdueStatus_InProgress: 'incomplète',

    //Wizard Number Trending
    WizardNumberTrending_Name: '# Tendance',
    WizardNumberTrending_Description: 'Compare les autres champs de la ligne pour fournir une icône basée sur les valeurs de tendance',
    WizardNumberTrending_Current: 'Actuel',
    WizardNumberTrending_Previous: 'Précédent',

    //Wizard Action Link
    WizardActionLink_Name: 'Lien d\'action',
    WizardActionLink_Description: 'Ajoute une icône d\'action rapide à un lien',

    //Wizard Severity
    WizardSeverity_Name: 'Gravité',
    WizardSeverity_Description: 'Applique conditionnellement les styles de gravité en fonction de la valeur du champ',
    WizardSeverity_Good: 'Terminé',
    WizardSeverity_Low: 'En cours',
    WizardSeverity_Warning: 'En revue',
    WizardSeverity_SevereWarning: 'A des problèmes',
    WizardSeverity_Blocked: 'Bloqué',
    WizardSeverity_Other: 'Autre valeur',
    WizardSeverity_GoodLabel: 'Bien',
    WizardSeverity_LowLabel: 'Bas',
    WizardSeverity_WarningLabel: 'Attention',
    WizardSeverity_SevereWarningLabel: 'Avertissement sévère',
    WizardSeverity_BlockedLabel: 'Bloqué',
    WizardSeverity_DefaultSeverityLabel: 'Gravité par défaut',

    //Wizard Current User
    WizardCurrentUser_Name: 'Utilisateur actuel',
    WizardCurrentUser_Description: 'Mise en avant de l\'utilisateur actuel',

    //Wizard Round Image
    WizardRoundImage_Name: 'Image ronde',
    WizardRoundImage_Description: 'Affiche l\'image / l\'image de l\'utilisateur sous la forme d\'un cercle',

    //Wizard Mail To
    WizardMailTo_Name: 'Mail à',
    WizardMailTo_Description: 'Crée un lien pour lancer un e-mail',
    WizardMailTo_Subject: 'Sujet',
    WizardMailTo_DefaultSubject: 'Des trucs',
    WizardMailTo_Body: 'Corp',
    WizardMailTo_DefaultBody: 'Cher Vesa,\r\nPartager c\'est aimer !\r\nbuhbye !',
    WizardMailTo_BCC: 'bcc',
    WizardMailTo_CC: 'cc',
    WizardMailTo_IconLink: 'Icone du lien',
    WizardMailTo_TextLink: 'Texte du lien',
    WizardMailTo_DefaultText: 'Envoyer un email',

    //Wizard Mini Map
    WizardMiniMap_Name: 'Mini carte',
    WizardMiniMap_Description: 'Affiche une carte minuscule pour un voir un emplacement (veillez à utiliser votre propre clé API)',

    //Wizard Flow
    WizardFlow_Name: 'Flow',
    WizardFlow_Description: 'Crée un bouton pour lancer facilement un flux pour un élément',
    WizardFlow_FlowId: 'Flow id',
    WizardFlow_FlowIdInstructions: 'À partir des détails du flux, copiez la partie de l\'URL entre flows/ et /details\nDonc pour "flows/40ae7493-a7c7-41af-9f54-3d83f32c4b56/details"\nL\'identifiant est : "40ae7493-a7c7-41af-9f54-3d83f32c4b56"',

    //Wizard Donut
    WizardDonut_Name: 'Anneau',
    WizardDonut_Description: 'Affiche les valeurs à l\'aide d\'un graphique en anneau ou en camembert',
    WizardDonut_Donut: 'Anneau',
    WizardDonut_Pie: 'Camembert',
    WizardDonut_OuterColor: 'Couleur extérieure',
    WizardDonut_InnerColor: 'Couleur intérieure',
    WizardDonut_TextColor: 'Couleur du texte',

    //Wizard Twitter
    WizardTwitter_Name: 'Pic Twitter',
    WizardTwitter_Description: 'Affiche les photos de profil Twitter des poignées Twitter',
    WizardTwitter_Rounding: 'Arrondir',
    WizardTwitter_LinkOn: 'Lien vers le profil',
    WizardTwitter_LinkOff: 'pas d\'URL'
  }
});
