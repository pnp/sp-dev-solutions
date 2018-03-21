define([], function() {
  return {
    //Property Pane
    Property_BasicGroupName: "Properties",
    Property_HeightLabel: "Height",
    Property_EditorGroupName: "Editor",
    Property_EditorThemeLabel: "Theme",
    Property_LineNumbersLabel: "Line Numbers",
    Property_VisibleOn: "On",
    Property_VisibleOff: "Off",
    Property_MiniMapLabel: "Mini Map",
    Property_IndentGuidesLabel: 'Indent Guides',

    //General
    FeatureUnavailableFromLocalWorkbench: 'This feature is not available from the local workbench',
    TechnicalDetailsErrorHeader: 'Technical Details',
    WizardDefaultField: 'MyField',

    //Welcome
    Welcome_Title: 'Column Formatter',
    Welcome_SubTitle: 'Easy editor for modern listview Column Formatting',
    Welcome_NewHeader: 'New',
    Welcome_NewDescription: 'Start with a blank canvas or choose from a template',
    Welcome_OpenHeader: 'Open',
    Welcome_OpenDescription: 'Load from a library or pull from a local list',
    Welcome_ColumnType: 'Column Type',
    Welcome_NewWizardOption: 'Start with a template',
    Welcome_NewBlankOption: 'Start from scratch',
    Welcome_NewNoTemplates: 'No templates available for the choosen column type',
    Welcome_BackButton: 'Back',
    Welcome_OKButton: 'OK',
    Welcome_NextButton: 'Next',
    Welcome_OpenLoadList: 'Load from a local list',
    Welcome_OpenLoadSiteColumn: 'Load from a site column',
    Welcome_OpenLoadFile: 'Load from a file:',
    Welcome_OpenLoadFileLibrary: 'Open a file from a local library',
    Welcome_OpenLoadFileUpload: 'Upload a file',
    Welcome_UploadHeader: 'File Upload',
    Welcome_UploadInstructions1: 'Drop your json file here, or click to select the file to upload.',
    Welcome_UploadInstructions2: 'Only *.json files will be accepted',
    Welcome_UploadUploadButton: 'Choose a File',
    Welcome_UploadRejectError: 'Unable to accept',
    Welcome_UploadEmptyFileError: 'File is empty!',
    Welcome_LoadingError: 'Error while loading!',

    //List Field (Load/Apply)
    ListField_LoadingLists: 'Loading lists...',
    ListField_List: 'Local list',
    ListField_Field: 'Field',
    ListField_LoadingFromList: 'Loading from list...',
    ListField_ListLoadError: 'Error while loading lists!',
    ListField_SaveDialogTitle: 'Apply to local list field',
    ListField_Saving: 'Applying to list...',
    ListField_SaveError: 'Error while applying! Verify you have permission to update this list\'s settings.',

    //Site Column (Load/Apply)
    SiteColumn_LoadingSiteColumns: 'Loading site columns...',
    SiteColumn_Group: 'Group',
    SiteColumn_Field: 'Column',
    SiteColumn_LoadingFromSiteColumn: 'Loading from site column...',
    SiteColumn_SiteColumnsLoadError: 'Error while loading site columns!',
    SiteColumn_SaveDialogTitle: 'Apply to site column',
    SiteColumn_PushToListsOn: 'Push changes to lists',
    SiteColumn_PushToListsOff: 'Site column only',
    SiteColumn_Saving: 'Applying to site column...',
    SiteColumn_SaveError: 'Error while applying! Verify you have permission to update site columns.',

    //Library (Load/Save)
    Library_LoadingLibraries: 'Loading libraries...',
    Library_Library: 'Local library',
    Library_FolderPath: 'Folder path',
    Library_Filename: 'Filename',
    Library_LoadingFromLibrary: 'Loading from library...',
    Library_LibrariesLoadError: 'Error while loading libraries!',
    Library_LoadFromLibraryError: 'Error while loading! Verify the folderpath is correct (if used) and that you have permission to access this library.',
    Library_SaveDialogTitle: 'Save to local library',
    Library_Saving: 'Saving to Library...',
    Library_SaveError: 'Error while saving! Verify the folderpath is correct (if used) and that you have permission to save to this library.',

    //Tab Names
    Tab_Wizard: "Wizard",
    Tab_Tree: "Tree",
    Tab_Data: "Data",
    Tab_Preview: "Preview",
    Tab_Code: "Code",
    Tab_Split: "Side by side",

    //Panel Headers
    PanelHeader_Data: "Test values",
    PanelHeader_Preview: "Preview",
    PanelHeader_Code: "Code editor",

    //Editor CommandBar
    Command_New: 'New',
    Command_Customize: 'Customize',
    Command_Editor: 'Theme',
    Command_SaveAs: 'Save As',
    Command_Download: 'Download',
    Command_Copy: 'Copy to clipboard',
    Command_SaveToLibrary: 'Save to local library',
    Command_ApplyToSiteColumn: 'Apply to site column',
    Command_ApplyToList: 'Apply to local list field',
    Command_Save: 'Save',

    //Dialogs Shared
    Dialog_Yes: 'Yes',
    Dialog_Cancel: 'Cancel',
    Dialog_Save: 'Save',

    //New Confirmation Dialog
    NewConfirmationDialog_Title: 'Start Fresh?',
    NewConfirmationDialog_Text: 'Any unsaved changes will be lost. Do you want to continue?',

    //Customize Confirmation Dialog
    CustomizeConfirmationDialog_Title: 'Remove Wizard?',
    CustomizeConfirmationDialog_Text: 'You will be able to edit the code directly, but the wizard pane will no longer be available. This is for advanced users. Are you sure?',

    //Copy
    CopyToClipboardError: 'Unable to copy!',

    //Data Column/Row buttons
    DataColumn_DeleteRow: "Delete row",
    DataColumn_AddRow: "Add row",
    DataColumn_DeleteColumn: "Delete field",
    DataColumn_AddColumn: "Add field",

    //Data Column Editing
    DataColumn_ColumnNameChangeTooltip: "Internal field name",
    DataColumn_ColumnTypeHeadline: "Column Type",
    DataColumn_ColumnTypeMessage: "Changing the type will also reset the values",
    DataColumn_ColumnTypeChangeTooltip: "Click to change",
    DataColumn_SubPropertiesHeadline: "Sub Properties",
    DataColumn_TimeHeadline: "Time",
    DataColumn_DefaultName: "NewField",
    DataColumn_LinkDescriptionLabel: 'desc',
    DataColumn_LookupIdLabel: 'lookupId',
    DataColumn_PersonIdLabel: 'id',
    DataColumn_PersonEmailLabel: 'email',
    DataColumn_PersonSIPLabel: 'sip',
    DataColumn_PersonPictureLabel: 'picture',
    DataColumn_HourLabel: "Hour",
    DataColumn_MinuteLabel: "Minute",
    DataColumn_SecondsLabel: "Seconds",

    //Column Type Names
    ColumnType_Boolean: "Yes/No",
    ColumnType_Choice: "Choice",
    ColumnType_DateTime: "Date/Time",
    ColumnType_Link: "Hyperlink",
    ColumnType_Picture: "Picture",
    ColumnType_Lookup: "Lookup",
    ColumnType_Number: "Number",
    ColumnType_Person: "Person",
    ColumnType_Text: "Text",
    ColumnType_Unknown: "Unknown",

    //Boolean Values
    BoolValueStringTrue: "Yes",
    BoolValueStringFalse: "No",

    //DateTime Editor Strings
    DateTime_Month1: "January",
    DateTime_Month2: "February",
    DateTime_Month3: "March",
    DateTime_Month4: "April",
    DateTime_Month5: "May",
    DateTime_Month6: "June",
    DateTime_Month7: "July",
    DateTime_Month8: "August",
    DateTime_Month9: "September",
    DateTime_Month10: "October",
    DateTime_Month11: "November",
    DateTime_Month12: "December",
    DateTime_Month1Short: "Jan",
    DateTime_Month2Short: "Feb",
    DateTime_Month3Short: "Mar",
    DateTime_Month4Short: "Apr",
    DateTime_Month5Short: "May",
    DateTime_Month6Short: "Jun",
    DateTime_Month7Short: "Jul",
    DateTime_Month8Short: "Aug",
    DateTime_Month9Short: "Sep",
    DateTime_Month10Short: "Oct",
    DateTime_Month11Short: "Nov",
    DateTime_Month12Short: "Dec",
    DateTime_Day1: "Sunday",
    DateTime_Day2: "Monday",
    DateTime_Day3: "Tuesday",
    DateTime_Day4: "Wednesday",
    DateTime_Day5: "Thursday",
    DateTime_Day6: "Friday",
    DateTime_Day7: "Saturday",
    DateTime_Day1Short: "S",
    DateTime_Day2Short: "M",
    DateTime_Day3Short: "T",
    DateTime_Day4Short: "W",
    DateTime_Day5Short: "T",
    DateTime_Day6Short: "F",
    DateTime_Day7Short: "S",
    DateTime_DTgoToToday: "Go to today",
    DateTime_DTprevMonthAriaLabel: "Go to previous month",
    DateTime_DTnextMonthAriaLabel: "Go to next month",
    DateTime_DTprevYearAriaLabel: "Go to previous year",
    DateTime_DTnextYearAriaLabel: "Go to next year",

    //Custom Formatting Error Strings
    CFS_ariaError: "No aria- tags found. As such, the field will not be accessible via a screen reader.",
    CFS_elmTypeInvalid: "Invalid elmType: {0}. Must be one of {1}.",
    CFS_elmTypeMissing: "Must specify elmType.",
    CFS_invalidProtocol: "A URL was blocked. Only http, https and mailto protocols are allowed.",
    CFS_invalidStyleAttribute: "'{0}' is not a supported style attribute.",
    CFS_invalidStyleValue: "The style values '{0}' contains one or more of the following disallowed characters ( : & ; ! .",
    CFS_nan: "{0} is not a number. Number expected in the expression {1}.",
    CFS_operandMissing: "There must be at least 1 operand in the expression {0}.",
    CFS_operandNOnly: "Expecting {0} operand(s) for the expression {1}.",
    CFS_operatorInvalid: "'{0}' is not a valid operator. It must be one of {1} in the expression {2}.",
    CFS_operatorMissing: "Missing operator in expression: {0}.",
    CFS_unsupportedType: "The type of field {0} is unsupported at this time.",
    CFS_userFieldError: "The field '{0}' is of type 'User', and can't be used directly because it has sub-properties. You need to specify which sub-property you want to use. e.g. [$AssignedTo.email]",
    CFS_RowLabel: 'Row',

    //Format Validation Messages
    PreviewValidation_Good: 'Validation passed!',
    PreviewValidation_Bad: 'Invalid JSON (code):',

    //Tree View
    TreeView_Header: 'Elements tree',
    TreeView_Error: 'Error loading tree!',

    //Standard Colors
    Color_Yellow: 'Yellow',
    Color_YellowLight: 'Yellow light',
    Color_Orange: 'Orange',
    Color_OrangeLight: 'Orange light',
    Color_OrangeLighter: 'Orange lighter',
    Color_RedDark: 'Red dark',
    Color_Red: 'Red',
    Color_MagentaDark: 'Magenta dark',
    Color_Magenta: 'Magenta',
    Color_MagentaLight: 'Magenta light',
    Color_PurpleDark: 'Purple dark',
    Color_Purple: 'Purple',
    Color_PurpleLight: 'Purple light',
    Color_BlueDark: 'Blue dark',
    Color_BlueMid: 'Blue mid',
    Color_Blue: 'Blue',
    Color_BlueLight: 'Blue light',
    Color_TealDark: 'Teal dark',
    Color_Teal: 'Teal',
    Color_TealLight: 'Teal light',
    Color_GreenDark: 'Green dark',
    Color_Green: 'Green',
    Color_GreenLight: 'Green light',
    Color_Black: 'Black',
    Color_NeutralDark: 'Neutral dark',
    Color_NeutralPrimary: 'Neutral primary',
    Color_NeutralPrimaryAlt: 'Neutral primary alt',
    Color_NeutralSecondary: 'Neutral secondary',
    Color_NeutralTertiary: 'Neutral tertiary',
    Color_NeutralTertiaryAlt: 'Neutral tertiary alt',
    Color_NeutralLight: 'Neutral light',
    Color_NeutralLighter: 'Neutral lighter',
    Color_NeutralLighterAlt: 'Neutral lighter alt',
    Color_White: 'White',
    Color_Transparent: 'Transparent',

    //Wizard Shared Group Labels
    Wizard_GroupLabelRange: 'Range',
    Wizard_GroupLabelValueDisplay: 'Value Display',
    Wizard_GroupLabelConditionalValues: 'Conditional Values',
    Wizard_GroupLabelDisplay: 'Display',
    Wizard_GroupLabelParameters: 'Parameters',

    //Wizard Shared Field Labels
    Wizard_PercentRangeEmptyLabel: 'Low',
    Wizard_PercentRangeEmptyTooltip: 'The lowest value on the scale\nValues equal or lower than this will be shown as 0% full',
    Wizard_PercentRangeFullLabel: 'High',
    Wizard_PercentRangeFullTooltip: 'The highest value on the scale\nValues equal or higher than this will be shown as 100% full',
    Wizard_ValueDisplayActual: 'Show actual value',
    Wizard_ValueDisplayPercentage: 'Show percentage',
    Wizard_ValueDisplayNone: 'None',
    Wizard_ValueVisibleOn: 'Show value',
    Wizard_ValueVisibleOff: 'Hide value',
    Wizard_IconVisibleOn: 'Show icon',
    Wizard_IconVisibleOff: 'Hide icon',
    Wizard_Text: 'Text',
    Wizard_Icon: 'Icon',
    Wizard_Color: 'Color',
    Wizard_Size: 'Size',
    Wizard_TooltipOn: 'Show tooltip',
    Wizard_TooltipOff: 'No tooltip',

    //Wizard Data Bars
    WizardDataBars_Name: 'Data Bars',
    WizardDataBars_Description: 'Adds horizontal bars to the field to visually express the value by length',

    //Wizard Checkboxes
    WizardCheckboxes_Name: 'Checkboxes',
    WizardCheckboxes_Description: 'Displays Yes/No fields as checkboxes',

    //Wizard Overdue
    WizardOverdue_Name: 'Overdue',
    WizardOverdue_Description: 'Colors the field red once the date is greater than today',

    //Wizard Overdue Status
    WizardOverdueStatus_Name: 'Overdue Task',
    WizardOverdueStatus_Description: 'Colors the field red once the date is greater than today if the Status is not Complete',
    WizardOverdueStatus_StatusColumn: 'Status',
    WizardOverdueStatus_Complete: 'Complete',
    WizardOverdueStatus_InProgress: 'In Progress',

    //Wizard Number Trending
    WizardNumberTrending_Name: '# Trending',
    WizardNumberTrending_Description: 'Compares other fields in the row to provide an icon based on trending values',
    WizardNumberTrending_Current: 'Current',
    WizardNumberTrending_Previous: 'Previous',

    //Wizard Action Link
    WizardActionLink_Name: 'Action Link',
    WizardActionLink_Description: 'Adds a Quick Action icon to a link',

    //Wizard Severity
    WizardSeverity_Name: 'Severity',
    WizardSeverity_Description: 'Conditionally applies the severity styles based on the field\'s value',
    WizardSeverity_Good: 'Done',
    WizardSeverity_Low: 'In progress',
    WizardSeverity_Warning: 'In review',
    WizardSeverity_SevereWarning: 'Has issues',
    WizardSeverity_Blocked: 'Blocked',
    WizardSeverity_Other: 'Other Value',
    WizardSeverity_GoodLabel: 'Good',
    WizardSeverity_LowLabel: 'Low',
    WizardSeverity_WarningLabel: 'Warning',
    WizardSeverity_SevereWarningLabel: 'Severe warning',
    WizardSeverity_BlockedLabel: 'Blocked',
    WizardSeverity_DefaultSeverityLabel: 'Default severity',

    //Wizard Current User
    WizardCurrentUser_Name: 'Current User',
    WizardCurrentUser_Description: 'Highlights the current user',

    //Wizard Round Image
    WizardRoundImage_Name: 'Round Image',
    WizardRoundImage_Description: 'Displays the picture / user picture as a circle',

    //Wizard Mail To
    WizardMailTo_Name: 'Mail To',
    WizardMailTo_Description: 'Creates a link to launch an email',
    WizardMailTo_Subject: 'Subject',
    WizardMailTo_DefaultSubject: 'Stuff',
    WizardMailTo_Body: 'Body',
    WizardMailTo_DefaultBody: 'Dear Vesa,\r\nSharing is caring.\r\nbuhbye!',
    WizardMailTo_BCC: 'bcc',
    WizardMailTo_CC: 'cc',
    WizardMailTo_IconLink: 'Icon link',
    WizardMailTo_TextLink: 'Text link',
    WizardMailTo_DefaultText: 'Send Mail',

    //Wizard Mini Map
    WizardMiniMap_Name: 'Tiny Map',
    WizardMiniMap_Description: 'Displays a tiny map image for a location (be sure to use your own API key)',

    //Wizard Flow
    WizardFlow_Name: 'Start Flow',
    WizardFlow_Description: 'Creates a button to easily launch a Flow for an item',
    WizardFlow_FlowId: 'Flow id',
    WizardFlow_FlowIdInstructions: 'From the flow details copy the portion of the URL between flows/ and /details\nSo for "flows/40ae7493-a7c7-41af-9f54-3d83f32c4b56/details"\nThe Id is: "40ae7493-a7c7-41af-9f54-3d83f32c4b56"',

    //Wizard Donut
    WizardDonut_Name: 'Donut',
    WizardDonut_Description: 'Shows values using a donut or pie chart',
    WizardDonut_Donut: 'Donut',
    WizardDonut_Pie: 'Pie',
    WizardDonut_OuterColor: 'Outer color',
    WizardDonut_InnerColor: 'Inner color',
    WizardDonut_TextColor: 'Text color',

    //Wizard Twitter
    WizardTwitter_Name: 'Twitter Pic',
    WizardTwitter_Description: 'Displays Twitter profile pictures from Twitter handles',
    WizardTwitter_Rounding: 'Rounding',
    WizardTwitter_LinkOn: 'Link to profile',
    WizardTwitter_LinkOff: 'No link'
  }
});