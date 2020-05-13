import { BotDeclaration } from "express-msteams-host";
import { CardFactory, TurnContext, MemoryStorage, ConversationState, TeamsActivityHandler, MessagingExtensionAction, MessagingExtensionActionResponse } from "botbuilder";
import { Lead } from "../../../../webpart/src/Lead";
import { SampleLeads } from "../../../../webpart/src/SampleLeads";

/**
 * Implementation for Leads Bot
 */
@BotDeclaration(
  "/api/messages",
  new MemoryStorage(),
  process.env.MICROSOFT_APP_ID,
  process.env.MICROSOFT_APP_PASSWORD)

export class LeadsBot extends TeamsActivityHandler {
  /**
   * The constructor
   * @param conversationState
   */
  public constructor(conversationState: ConversationState) {
    super();
  }

  protected async handleTeamsMessagingExtensionSubmitAction(context: TurnContext, action: MessagingExtensionAction): Promise<MessagingExtensionActionResponse> {
    const lead: Lead = action.data;
    let leadChangeIcon: string = "";
    if (lead.change > 0) {
      leadChangeIcon = "🔼 ";
    } else if (lead.change < 0) {
      leadChangeIcon = "🔽 ";
    }

    const leadCard = CardFactory.adaptiveCard({
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      "body": [
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "items": [
                {
                  "text": lead.account,
                  "type": "TextBlock",
                  "size": "Small"
                }
              ],
              "width": "stretch"
            },
            {
              "type": "Column",
              "items": [
                {
                  "text": lead.requiresAttention ? "❗" : "",
                  "type": "TextBlock",
                  "size": "Large"
                }
              ],
              "width": "auto"
            }
          ]
        },
        {
          "text": lead.title,
          "type": "TextBlock",
          "size": "Large"
        },
        {
          "text": lead.description,
          "type": "TextBlock",
          "spacing": "Medium"
        },
        {
          "type": "ColumnSet",
          "columns": [
            {
              "type": "Column",
              "items": [
                {
                  "type": "Image",
                  "style": "Person",
                  "url": SampleLeads.getPhotoUrl(lead.createdBy.email),
                  "size": "Small"
                }
              ],
              "width": "auto"
            },
            {
              "type": "Column",
              "items": [
                {
                  "type": "TextBlock",
                  "weight": "Bolder",
                  "text": lead.createdBy.name,
                  "wrap": true,
                  "size": "Small"
                },
                {
                  "type": "TextBlock",
                  "spacing": "None",
                  "text": `Created ${new Date(lead.createdOn).toLocaleDateString()}`,
                  "isSubtle": true,
                  "wrap": true,
                  "size": "Small"
                }
              ],
              "width": "stretch"
            }
          ],
          "spacing": "Medium"
        },
        {
          "type": "ColumnSet",
          "columns": [
            {
              "width": "stretch",
              "type": "Column",
              "items": [
                {
                  "text": " ",
                  "type": "TextBlock",
                  "color": "Attention"
                }
              ]
            },
            {
              "width": "auto",
              "type": "Column",
              "items": [
                {
                  "text": `${leadChangeIcon}${(lead.change > 0 ? "+" : "")}${lead.change}`,
                  "type": "TextBlock",
                  "color": lead.change >= 0 ? "Good" : "Attention"
                }
              ]
            },
            {
              "width": "auto",
              "type": "Column",
              "items": [
                {
                  "text": `${lead.percentComplete}%`,
                  "type": "TextBlock",
                  "horizontalAlignment": "Right"
                }
              ]
            }
          ]
        }
      ]
    });

    await context.sendActivity({ attachments: [leadCard] });

    return Promise.resolve({});
  }
}
